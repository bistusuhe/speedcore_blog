import { getTranslations } from 'next-intl/server'
import { Section, SectionHeading } from '@/components/common/section'
import { Container } from '@/components/common/container'
import { Link } from '@/i18n/routing'
import { ProjectCard } from '@/components/projects/project-card'
import { ArrowRight } from 'lucide-react'
import { getAllProjects } from '@/lib/projects'

/** 首页「最新项目」：取最近 3 个项目，空态不渲染 */
export async function LatestProjects() {
  const t = await getTranslations('projects')
  const projects = getAllProjects().slice(0, 3)
  if (projects.length === 0) return null

  return (
    <Section id="projects">
      <Container>
        {/* 标题 + 查看全部 */}
        <div className="mb-12 flex items-end justify-between gap-4">
          <SectionHeading
            titleKey="projects.title"
            subtitleKey="projects.subtitle"
            index="03"
            className="mb-0"
          />
          <Link
            href="/projects"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            {t('viewAll')}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default LatestProjects
