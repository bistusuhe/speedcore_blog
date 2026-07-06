import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { Container } from '@/components/common/container'
import { Section, SectionHeading } from '@/components/common/section'
import { Badge } from '@/components/ui/badge'
import { PostCard } from '@/components/blog/post-card'
import { getAllPosts, getAllCategories } from '@/lib/posts'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  return { title: t('title') }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale as 'zh' | 'en')
  const t = await getTranslations('blog')
  const posts = getAllPosts()
  const categories = getAllCategories()

  return (
    <Section>
      <Container>
        <SectionHeading titleKey="blog.title" subtitleKey="blog.subtitle" />

        {/* 分类筛选 */}
        <div className="mb-10 flex flex-wrap items-center gap-2">
          <Link href="/blog">
            <Badge variant="solid" className="cursor-pointer">
              {t('all')}
            </Badge>
          </Link>
          {categories.map((c) => (
            <Link
              key={c.name}
              href={`/blog/category/${c.name}`}
            >
              <Badge
                variant="outline"
                className="cursor-pointer hover:border-foreground/40"
              >
                {c.name} · {c.count}
              </Badge>
            </Link>
          ))}
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
