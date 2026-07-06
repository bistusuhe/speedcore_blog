import { Calendar, Clock } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { Badge } from '@/components/ui/badge'
import { FadeUp } from '@/components/motion/motion'
import { siteConfig } from '@/config/site'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/types'

interface PostHeaderProps {
  post: Post
  locale: 'zh' | 'en'
}

/** 文章顶部：封面 / 分类 / 标题 / 描述 / 元信息 / 标签 */
export async function PostHeader({ post, locale }: PostHeaderProps) {
  const t = await getTranslations('blog')
  const authorName = post.author ?? (locale === 'zh' ? siteConfig.author.name : siteConfig.author.nameEn)

  return (
    <FadeUp className="space-y-6">
      {post.cover && (
        <div className="aspect-[16/8] w-full overflow-hidden rounded-2xl border border-border bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="space-y-4">
        <Link href={`/blog/category/${post.category}`}>
          <Badge variant="solid">{post.category}</Badge>
        </Link>

        <h1 className="text-display-xl text-balance tracking-tight">
          {post.title}
        </h1>

        <p className="text-lg text-muted-foreground">{post.description}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteConfig.author.avatar}
              alt={authorName}
              className="h-6 w-6 rounded-full border border-border object-cover"
            />
            {authorName}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.date, locale)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {t('readTime', { minutes: post.readingTime })}
          </span>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/blog/tag/${tag}`}>
                <Badge variant="outline">#{tag}</Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </FadeUp>
  )
}

export default PostHeader
