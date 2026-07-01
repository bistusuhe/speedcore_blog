import { getTranslations } from 'next-intl/server'
import { Section, SectionHeading } from '@/components/common/section'
import { Container } from '@/components/common/container'
import { Link } from '@/i18n/routing'
import { PostCard } from '@/components/blog/post-card'
import { ArrowRight } from 'lucide-react'
import { getAllPosts } from '@/lib/posts'

/** 首页「最新文章」：取最近 3 篇，空态不渲染 */
export async function LatestArticles() {
  const t = await getTranslations('articles')
  const posts = getAllPosts().slice(0, 3)
  if (posts.length === 0) return null

  return (
    <Section id="articles">
      <Container>
        {/* 标题 + 查看全部 */}
        <div className="mb-12 flex items-end justify-between gap-4">
          <SectionHeading
            titleKey="articles.title"
            subtitleKey="articles.subtitle"
            index="04"
            className="mb-0"
          />
          <Link
            href="/blog"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            {t('viewAll')}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default LatestArticles
