'use client'

import { Link } from '@/i18n/routing'
import { Calendar, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { HoverLift } from '@/components/motion/motion'
import { formatDate } from '@/lib/utils'
import { useLocale } from 'next-intl'
import type { Post } from '@/types'
import { useTranslations } from 'next-intl'

interface PostCardProps {
  post: Post
  index?: number
}

export function PostCard({ post }: PostCardProps) {
  const locale = useLocale() as 'zh' | 'en'
  const t = useTranslations('blog')

  return (
    <HoverLift>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-foreground/20"
      >
        {post.cover && (
          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover}
              alt={post.title}
              loading="lazy"
              className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="solid" className="shrink-0">
              {post.category}
            </Badge>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.date, locale)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readingTime} {t('readTime')}
            </span>
          </div>
          <h3 className="text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-foreground">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
            {post.description}
          </p>
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs text-muted-foreground">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </HoverLift>
  )
}
