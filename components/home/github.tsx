'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Section, SectionHeading } from '@/components/common/section'
import { Container } from '@/components/common/container'
import { FadeUp } from '@/components/motion/motion'
import { SkeletonGrid } from '@/components/common/loading'
import { Icon } from '@/components/common/Icon'
import { Star, GitFork, ExternalLink } from 'lucide-react'
import type {
  GitHubStats,
  GitHubRepo,
  GitHubContributionDay,
} from '@/lib/github'

/** 贡献热力图 level -> 透明度映射 */
const LEVEL_OPACITY: Record<number, number> = {
  0: 0.05,
  1: 0.2,
  2: 0.4,
  3: 0.65,
  4: 0.9,
}

/** 数字滚动子组件：requestAnimationFrame 从 0 滚到目标值 */
function Counter({ value, duration = 1200 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const start = performance.now()
    const from = 0
    const to = value
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(1, elapsed / duration)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(from + (to - from) * eased))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [value, duration])

  return <>{display.toLocaleString()}</>
}

/** 把扁平的贡献日按 7 天一组切分为「周」列 */
function chunkWeeks(days: GitHubContributionDay[]): GitHubContributionDay[][] {
  const weeks: GitHubContributionDay[][] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }
  return weeks
}

/** 统计项 */
function StatItem({
  icon,
  label,
  value,
}: {
  icon: string
  label: string
  value: number
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div>
        <p className="text-2xl font-semibold tracking-tight tabular-nums">
          <Counter value={value} />
        </p>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
      </div>
    </div>
  )
}

/** Pinned 仓库条目 */
function PinnedRepo({ repo }: { repo: GitHubRepo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/30"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold tracking-tight transition-colors group-hover:text-foreground">
          {repo.name}
        </h4>
        <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition group-hover:text-foreground" />
      </div>
      <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground">
        {repo.description ?? '—'}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        {repo.language && (
          <span className="inline-flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/60" aria-hidden />
            {repo.language}
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Star className="h-3 w-3" />
          {repo.stargazers_count}
        </span>
        <span className="inline-flex items-center gap-1">
          <GitFork className="h-3 w-3" />
          {repo.forks_count}
        </span>
      </div>
    </a>
  )
}

/** 首页「GitHub 动态」：异步拉取 /api/github，含数字滚动、贡献热力图、Pinned 仓库 */
export function GitHub() {
  const t = useTranslations('github')
  const [state, setState] = useState<
    | { status: 'loading' }
    | { status: 'error' }
    | { status: 'success'; data: GitHubStats }
  >({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    fetch('/api/github')
      .then(async (res) => {
        if (!res.ok) throw new Error('failed')
        const data = (await res.json()) as GitHubStats
        if (!cancelled) setState({ status: 'success', data })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' })
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Section id="github">
      <Container>
        <SectionHeading titleKey="github.title" subtitleKey="github.subtitle" index="08" />

        {/* 加载中 */}
        {state.status === 'loading' && <SkeletonGrid count={3} />}

        {/* 失败 / user 为 null */}
        {(state.status === 'error' ||
          (state.status === 'success' && !state.data.user)) && (
          <FadeUp>
            <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
              {t('failed')}
            </div>
          </FadeUp>
        )}

        {/* 成功 */}
        {state.status === 'success' && state.data.user && (
          <FadeUp className="space-y-10">
            {(() => {
              const { user, totalStars, pinned, contributions, totalContributions } =
                state.data
              return (
                <>
                  {/* 顶部统计行 */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    <StatItem
                      icon="BookMarked"
                      label={t('repos')}
                      value={user.public_repos}
                    />
                    <StatItem icon="Star" label={t('stars')} value={totalStars} />
                    <StatItem icon="Users" label={t('followers')} value={user.followers} />
                  </div>

                  {/* 贡献热力图 */}
                  {contributions.length > 0 && (
                    <div className="rounded-2xl border border-border bg-card p-6">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <p className="text-sm font-medium">
                          {t('contributions')}
                        </p>
                        <p className="font-mono text-xs text-muted-foreground tabular-nums">
                          {totalContributions.toLocaleString()}
                        </p>
                      </div>
                      <div className="overflow-x-auto">
                        <div className="flex gap-[3px]">
                          {chunkWeeks(contributions).map((week, wi) => (
                            <div key={wi} className="flex flex-col gap-[3px]">
                              {week.map((day, di) => (
                                <span
                                  key={di}
                                  title={`${day.date}: ${day.count}`}
                                  className="h-[11px] w-[11px] rounded-[2px] bg-foreground"
                                  style={{ opacity: LEVEL_OPACITY[day.level] ?? 0.05 }}
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* 图例 */}
                      <div className="mt-4 flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                        <span>Less</span>
                        {[0, 1, 2, 3, 4].map((lv) => (
                          <span
                            key={lv}
                            className="h-[11px] w-[11px] rounded-[2px] bg-foreground"
                            style={{ opacity: LEVEL_OPACITY[lv] }}
                          />
                        ))}
                        <span>More</span>
                      </div>
                    </div>
                  )}

                  {/* Pinned 仓库 */}
                  {pinned.length > 0 && (
                    <div>
                      <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {t('pinned')}
                      </h3>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {pinned.map((repo) => (
                          <PinnedRepo key={repo.id} repo={repo} />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )
            })()}
          </FadeUp>
        )}
      </Container>
    </Section>
  )
}

export default GitHub
