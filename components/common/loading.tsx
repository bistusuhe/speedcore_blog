'use client'

import { motion } from 'framer-motion'

/** OpenAI 风格 Loading：渐变脉冲 Logo */
export function Loading({ className }: { className?: string }) {
  return (
    <div
      className={
        'flex min-h-[40vh] flex-col items-center justify-center gap-4 ' + (className ?? '')
      }
    >
      <motion.div
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background"
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-lg font-bold">S</span>
      </motion.div>
      <motion.div
        className="h-1 w-24 overflow-hidden rounded-full bg-muted"
        aria-hidden
      >
        <motion.div
          className="h-full w-1/2 rounded-full bg-foreground"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  )
}

/** 骨架卡片 */
export function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="skeleton h-40 w-full" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-4 w-2/3 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-5/6 rounded" />
        <div className="flex gap-2 pt-2">
          <div className="skeleton h-5 w-12 rounded-full" />
          <div className="skeleton h-5 w-12 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
