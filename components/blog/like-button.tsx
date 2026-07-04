'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface LikeButtonProps {
  slug: string
}

/** 文章点赞按钮（服务端全局计数 + IP 去重） */
export function LikeButton({ slug }: LikeButtonProps) {
  const t = useTranslations('blog')
  const [count, setCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetch(`/api/like?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data: { count: number; liked: boolean }) => {
        setCount(data.count)
        setLiked(data.liked)
      })
      .catch(() => {})
  }, [slug])

  const toggle = useCallback(async () => {
    if (pending) return
    setPending(true)
    try {
      const res = await fetch('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      })
      const data: { count: number; liked: boolean } = await res.json()
      setCount(data.count)
      setLiked(data.liked)
    } catch {
      /* ignore */
    } finally {
      setPending(false)
    }
  }, [slug, pending])

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
        <Heart className={cn('h-4 w-4', liked && 'fill-current')} />
      </motion.span>
      <span>
        {mounted ? count : 0} {t('like')}
      </span>
    </motion.button>
  )
}

export default LikeButton
