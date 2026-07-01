'use client'

import { Link } from '@/i18n/routing'
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { HoverLift } from '@/components/motion/motion'
import { useLocale } from 'next-intl'
import { formatDate } from '@/lib/utils'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const locale = useLocale() as 'zh' | 'en'

  return (
    <HoverLift>
      <Link
        href={`/projects/${project.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-foreground/20"
      >
        {project.cover && (
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.cover}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold leading-snug tracking-tight">
              {project.title}
            </h3>
            <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
          </div>
          <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
            <span>{formatDate(project.date, locale)}</span>
            {project.github && (
              <span className="inline-flex items-center gap-1">
                <Github className="h-3 w-3" /> Code
              </span>
            )}
            {project.demo && (
              <span className="inline-flex items-center gap-1">
                <ExternalLink className="h-3 w-3" /> Demo
              </span>
            )}
          </div>
        </div>
      </Link>
    </HoverLift>
  )
}
