import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { Container } from '@/components/common/container'
import { Section } from '@/components/common/section'
import { Badge } from '@/components/ui/badge'
import { PostCard } from '@/components/blog/post-card'
import { getAllCategories, getPostsByCategory } from '@/lib/posts'
import { locales } from '@/i18n/routing'
import { cn } from '@/lib/utils'

export async function generateStaticParams() {
  const categories = getAllCategories()
  return locales.flatMap((locale) =>
    categories.map((c) => ({
      locale,
      category: encodeURIComponent(c.name),
    })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>
}): Promise<Metadata> {
  const { category } = await params
  return { title: decodeURIComponent(category) }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>
}) {
  const { locale, category } = await params
  setRequestLocale(locale as 'zh' | 'en')
  const t = await getTranslations('blog')
  const decoded = decodeURIComponent(category)
  const posts = getPostsByCategory(decoded)
  const categories = getAllCategories()

  return (
    <Section>
      <Container>
        {/* 面包屑 */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog" className="hover:text-foreground">
            {t('title')}
          </Link>
          <span>/</span>
          <span className="text-foreground">{t('category')}</span>
        </nav>

        <header className="mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t('category')}
          </p>
          <h1 className="mt-2 text-display-lg tracking-tight">{decoded}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t('count', { count: posts.length })}
          </p>
        </header>

        {/* 分类筛选 */}
        <div className="mb-10 flex flex-wrap items-center gap-2">
          <Link href="/blog">
            <Badge variant="outline" className="cursor-pointer hover:border-foreground/40">
              {t('all')}
            </Badge>
          </Link>
          {categories.map((c) => {
            const active = c.name.toLowerCase() === decoded.toLowerCase()
            return (
              <Link
                key={c.name}
                href={`/blog/category/${encodeURIComponent(c.name)}`}
              >
                <Badge
                  variant={active ? 'solid' : 'outline'}
                  className={cn(
                    'cursor-pointer',
                    !active && 'hover:border-foreground/40',
                  )}
                >
                  {c.name} · {c.count}
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
