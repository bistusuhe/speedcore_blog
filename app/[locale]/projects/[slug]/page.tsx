import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getAllProjects, getProjectBySlug } from '@/lib/projects'
import { renderMdx } from '@/lib/mdx'
import { articleJsonLd } from '@/lib/seo'
import { locales } from '@/i18n/routing'
import { Container } from '@/components/common/container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BackToTop } from '@/components/common/back-to-top'
import { ScrollProgress } from '@/components/common/scroll-progress'
import { formatDate } from '@/lib/utils'
import { Github, ExternalLink } from 'lucide-react'

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
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.description,
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
    <article>
      <ScrollProgress className="fixed left-0 top-16 z-30 h-0.5 w-full bg-foreground" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container size="narrow" className="pt-12">
        {project.cover && (
          <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.cover}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {project.category && <Badge variant="outline" className="mb-4">{project.category}</Badge>}

        <h1 className="text-display-xl mb-4 text-balance">{project.title}</h1>

        <p className="mb-6 text-lg text-muted-foreground">{project.description}</p>

        <div className="mb-6 text-sm text-muted-foreground">
          {formatDate(project.date, locale as 'zh' | 'en')}
        </div>

        {project.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
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
      </Container>

      <Container size="narrow" className="py-12 prose prose-neutral dark:prose-invert max-w-none">
        {mdx}
      </Container>

      <BackToTop />
    </article>
  )
}
