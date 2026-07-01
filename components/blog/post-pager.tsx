import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import type { Post } from '@/types'

interface PostPagerProps {
  prev: Post | null
  next: Post | null
  locale: 'zh' | 'en'
}

/** 上一篇 / 下一篇 分页导航 */
export async function PostPager({ prev, next }: PostPagerProps) {
  const t = await getTranslations('blog')

  if (!prev && !next) return null

  return (
    <nav className="grid gap-4 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex flex-col gap-1 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/30"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <ArrowLeft className="h-3 w-3" />
            {t('prev')}
          </span>
          <span className="font-medium tracking-tight transition-colors group-hover:text-foreground">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" aria-hidden />
      )}

      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex flex-col items-end gap-1 rounded-2xl border border-border bg-card p-5 text-right transition-colors hover:border-foreground/30 sm:col-start-2"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            {t('next')}
            <ArrowRight className="h-3 w-3" />
          </span>
          <span className="font-medium tracking-tight transition-colors group-hover:text-foreground">
            {next.title}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" aria-hidden />
      )}
    </nav>
  )
}

export default PostPager
