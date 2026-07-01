import { getTranslations } from 'next-intl/server'
import { PostCard } from '@/components/blog/post-card'
import type { Post } from '@/types'

interface RelatedPostsProps {
  posts: Post[]
}

/** 相关推荐（基于分类与标签的相关文章） */
export async function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null
  const t = await getTranslations('blog')

  return (
    <section className="space-y-6">
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {t('related')}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} />
        ))}
      </div>
    </section>
  )
}

export default RelatedPosts
