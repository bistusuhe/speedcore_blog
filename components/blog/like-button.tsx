'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface LikeButtonProps {
  slug: string
}

const storageKey = (slug: string) => `like:${slug}`
const likedKey = (slug: string) => `liked:${slug}`

/** 文章点赞按钮（localStorage 持久化，点击弹跳动画） */
export function LikeButton({ slug }: LikeButtonProps) {
  const t = useTranslations('blog')
  const [count, setCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const raw = window.localStorage.getItem(storageKey(slug))
      setCount(raw ? Number.parseInt(raw, 10) || 0 : 0)
      setLiked(window.localStorage.getItem(likedKey(slug)) === '1')
    } catch {
      /* localStorage 不可用时静默降级 */
    }
  }, [slug])

  const toggle = () => {
    if (liked) {
      const next = Math.max(0, count - 1)
      setCount(next)
      setLiked(false)
      try {
        window.localStorage.setItem(storageKey(slug), String(next))
        window.localStorage.removeItem(likedKey(slug))
      } catch {
        /* ignore */
      }
    } else {
      const next = count + 1
      setCount(next)
      setLiked(true)
      try {
        window.localStorage.setItem(storageKey(slug), String(next))
        window.localStorage.setItem(likedKey(slug), '1')
      } catch {
        /* ignore */
      }
    }
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      aria-pressed={liked}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm transition-colors',
        liked
          ? 'border-foreground bg-foreground text-background'
          : 'border-border bg-card text-foreground hover:border-foreground/40',
      )}
    >
      <motion.span
        key={liked ? 'liked' : 'unliked'}
        initial={mounted ? { scale: 0.6 } : false}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 12 }}
        className="inline-flex"
      >
        <Heart
          className={cn('h-4 w-4', liked && 'fill-current')}
        />
      </motion.span>
      <span>
        {mounted ? count : 0} {t('like')}
      </span>
    </motion.button>
  )
}

export default LikeButton
