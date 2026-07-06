import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { Container } from '@/components/common/container'
import { Section } from '@/components/common/section'
import { Badge } from '@/components/ui/badge'
import { PostCard } from '@/components/blog/post-card'
import { getAllTags, getPostsByTag } from '@/lib/posts'
import { locales } from '@/i18n/routing'
import { cn } from '@/lib/utils'

export async function generateStaticParams() {
  const tags = getAllTags()
  return locales.flatMap((locale) =>
    tags.map((tg) => ({ locale, tag: tg.name })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>
}): Promise<Metadata> {
  const { tag } = await params
  return { title: `#${tag}` }
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>
}) {
  const { locale, tag } = await params
  setRequestLocale(locale as 'zh' | 'en')
  const t = await getTranslations('blog')
  const posts = getPostsByTag(tag)
  const tags = getAllTags()

  return (
    <Section>
      <Container>
        {/* 面包屑 */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog" className="hover:text-foreground">
            {t('title')}
          </Link>
          <span>/</span>
          <span className="text-foreground">{t('tag')}</span>
        </nav>

        <header className="mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t('tag')}
          </p>
          <h1 className="mt-2 text-display-lg tracking-tight">#{tag}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t('count', { count: posts.length })}
          </p>
        </header>

        {/* 标签筛选 */}
        <div className="mb-10 flex flex-wrap items-center gap-2">
          <Link href="/blog">
            <Badge variant="outline" className="cursor-pointer hover:border-foreground/40">
              {t('all')}
            </Badge>
          </Link>
          {tags.map((tg) => {
            const active = tg.name.toLowerCase() === tag.toLowerCase()
            return (
              <Link key={tg.name} href={`/blog/tag/${tg.name}`}>
                <Badge
                  variant={active ? 'solid' : 'outline'}
                  className={cn(
                    'cursor-pointer',
                    !active && 'hover:border-foreground/40',
                  )}
                >
                  #{tg.name} · {tg.count}
                </Badge>
              </Link>
            )
          })}
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-muted-foreground">{t('empty')}</p>
        )}
      </Container>
    </Section>
  )
}
