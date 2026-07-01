import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { Container } from '@/components/common/container'
import { ScrollProgress } from '@/components/common/scroll-progress'
import { BackToTop } from '@/components/common/back-to-top'
import { PostHeader } from '@/components/blog/post-header'
import { Toc } from '@/components/blog/toc'
import { LikeButton } from '@/components/blog/like-button'
import { ShareButtons } from '@/components/blog/share-buttons'
import { RelatedPosts } from '@/components/blog/related-posts'
import { PostPager } from '@/components/blog/post-pager'
import { Comments } from '@/components/blog/comments'
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  getAdjacentPosts,
} from '@/lib/posts'
import { renderMdx } from '@/lib/mdx'
import { articleJsonLd } from '@/lib/seo'
import { siteConfig } from '@/config/site'
import { locales } from '@/i18n/routing'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const url = `${siteConfig.url}/${locale}/blog/${post.slug}`
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url,
      images: post.cover ? [{ url: post.cover }] : undefined,
      publishedTime: post.date,
      authors: [post.author ?? siteConfig.author.name],
      tags: post.tags,
    },
    alternates: { canonical: url },
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale as 'zh' | 'en')
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const activeLocale = locale as 'zh' | 'en'
  const related = getRelatedPosts(slug)
  const { prev, next } = getAdjacentPosts(slug)
  const mdx = renderMdx(post.body)

  return (
    <>
      <ScrollProgress className="fixed left-0 top-16 z-30 h-0.5 w-full bg-foreground" />
      <article>
        <Container size="narrow" className="pt-12">
          <PostHeader post={post} locale={activeLocale} />
        </Container>

        <Container size="narrow" className="py-25">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div className="prose prose-neutral max-w-none dark:prose-invert">
              {mdx}
            </div>
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <Toc />
              </div>
            </div>
          </div>
        </Container>

        <Container size="narrow" className="space-y-12 py-12">
          <ShareButtons
            title={post.title}
            slug={slug}
            locale={activeLocale}
          />
          <LikeButton slug={slug} />
          <RelatedPosts posts={related} />
          <PostPager prev={prev} next={next} locale={activeLocale} />
          <Comments locale={activeLocale} />
        </Container>
      </article>
      <BackToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post)) }}
      />
    </>
  )
}
