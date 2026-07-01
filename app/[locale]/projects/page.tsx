import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getAllProjects } from '@/lib/projects'
import { Container } from '@/components/common/container'
import { Section, SectionHeading } from '@/components/common/section'
import { ProjectCard } from '@/components/projects/project-card'
import { FadeUp } from '@/components/motion/motion'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale as 'zh' | 'en')
  const t = await getTranslations('projects')
  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale as 'zh' | 'en')
  const projects = getAllProjects()
  const emptyText = locale === 'zh' ? '暂无项目' : 'No projects yet'

  return (
    <Section>
      <Container>
        <SectionHeading titleKey="projects.title" subtitleKey="projects.subtitle" index="01" />

        {projects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <FadeUp key={project.slug} delay={i * 0.05}>
                <ProjectCard project={project} />
              </FadeUp>
            ))}
          </div>
        ) : (
          <FadeUp>
            <p className="py-24 text-center text-muted-foreground">{emptyText}</p>
          </FadeUp>
        )}
      </Container>
    </Section>
  )
}
