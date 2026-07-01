import 'server-only'
import siteConfig from '@/config/site'

export interface GitHubUser {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  public_repos: number
  followers: number
  following: number
  html_url: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics?: string[]
  homepage?: string | null
  updated_at: string
}

export interface GitHubContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface GitHubStats {
  user: GitHubUser | null
  totalStars: number
  pinned: GitHubRepo[]
  contributions: GitHubContributionDay[]
  totalContributions: number
}

/** GitHub 用户信息 + 仓库 Star 总数 */
async function fetchUserAndStars(username: string, token?: string): Promise<{
  user: GitHubUser | null
  totalStars: number
  repos: GitHubRepo[]
}> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
  }
  if (token) headers.Authorization = `Bearer ${token}`
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    })
    const user: GitHubUser = userRes.ok ? await userRes.json() : null

    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      { headers, next: { revalidate: 3600 } },
    )
    const repos: GitHubRepo[] = reposRes.ok ? await reposRes.json() : []
    const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0)
    return { user, totalStars, repos }
  } catch {
    return { user: null, totalStars: 0, repos: [] }
  }
}

/** Pinned 仓库（REST 无直接接口，按 star 排序近似） */
function pickPinned(repos: GitHubRepo[], limit = 6): GitHubRepo[] {
  return [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, limit)
}

/**
 * GitHub 综合数据（用户、Star 总数、置顶仓库、贡献热力图）
 * 贡献热力图通过 GraphQL 获取（需要 token）；无 token 时降级为空数组
 */
export async function getGitHubStats(): Promise<GitHubStats> {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'octocat'
  const token = process.env.GITHUB_TOKEN

  const { user, totalStars, repos } = await fetchUserAndStars(username, token)
  const pinned = pickPinned(repos)

  let contributions: GitHubContributionDay[] = []
  let totalContributions = 0
  if (token) {
    try {
      const gqlRes = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query($login: String!) {
              user(login: $login) {
                contributionsCollection {
                  contributionCalendar {
                    totalContributions
                    weeks { contributionDays { contributionCount date } }
                  }
                }
              }
            }`,
          variables: { login: username },
        }),
        next: { revalidate: 3600 },
      })
      if (gqlRes.ok) {
        const json = await gqlRes.json()
        const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? []
        const days = weeks.flatMap(
          (w: { contributionDays: { contributionCount: number; date: string }[] }) =>
            w.contributionDays,
        )
        totalContributions =
          json?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? 0
        contributions = days.map((d: { contributionCount: number; date: string }) => {
          const count = d.contributionCount
          const level: 0 | 1 | 2 | 3 | 4 =
            count === 0 ? 0 : count < 3 ? 1 : count < 7 ? 2 : count < 12 ? 3 : 4
          return { date: d.date, count, level }
        })
      }
    } catch {
      /* ignore */
    }
  }

  return { user, totalStars, pinned, contributions, totalContributions }
}

export function githubUrl(): string {
  return siteConfig.author.github
}
