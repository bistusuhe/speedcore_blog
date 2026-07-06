import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getAllProjects, getProjectBySlug } from '@/lib/projects'
import { renderMdx } from '@/lib/mdx'
import { articleJsonLd } from '@/lib/seo'
import { siteConfig } from '@/config/site'
import { locales } from '@/i18n/routing'
import { Container } from '@/components/common/container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BackToTop } from '@/components/common/back-to-top'
import { ScrollProgress } from '@/components/common/scroll-progress'
import { Toc } from '@/components/blog/toc'
import { LikeButton } from '@/components/blog/like-button'
import { ShareButtons } from '@/components/blog/share-buttons'
import { Comments } from '@/components/blog/comments'
import { FadeUp } from '@/components/motion/motion'
import { formatDate } from '@/lib/utils'
import { Calendar, Clock, Github, ExternalLink } from 'lucide-react'

// 预生成所有 locale × project 的静态参数
export function generateStaticParams() {
  const projects = getAllProjects()
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  const url = `${siteConfig.url}/${locale}/projects/${project.slug}`
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      type: 'article',
      title: project.title,
      description: project.description,
      url,
      images: project.cover ? [{ url: project.cover }] : undefined,
      publishedTime: project.date,
      tags: project.tags,
    },
    alternates: { canonical: url },
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale as 'zh' | 'en')
  const t = await getTranslations('projects')

  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const mdx = renderMdx(project.body)

  // Article JSON-LD 结构化数据
  const jsonLd = articleJsonLd({
    title: project.title,
    description: project.description,
    date: project.date,
    slug: project.slug,
    category: project.category ?? 'Project',
  })

  return (
    <>
      <ScrollProgress className="fixed left-0 top-16 z-30 h-0.5 w-full bg-foreground" />
      <article>
        <Container size="narrow" className="pt-12">
          <FadeUp className="space-y-6">
            {project.cover && (
              <div className="aspect-[16/8] w-full overflow-hidden rounded-2xl border border-border bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.cover}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="space-y-4">
              {project.category && (
                <Badge variant="solid">{project.category}</Badge>
              )}

              <h1 className="text-display-xl text-balance tracking-tight">
                {project.title}
              </h1>

              <p className="text-lg text-muted-foreground">{project.description}</p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(project.date, locale as 'zh' | 'en')}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {project.readingTime} min
                </span>
              </div>

              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">#{tag}</Badge>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {project.github && (
                  <Button asChild variant="outline">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" /> {t('github')}
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" /> {t('demo')}
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </FadeUp>
        </Container>

        <Container size="narrow" className="py-25">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div className="prose prose-neutral max-w-none dark:prose-invert min-w-0">
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
            title={project.title}
            slug={slug}
            locale={locale as 'zh' | 'en'}
          />
          <LikeButton slug={slug} />
          <Comments locale={locale as 'zh' | 'en'} />
        </Container>
      </article>
      <BackToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
