'use client'

import { motion, useReducedMotion } from 'framer-motion'

/** 极简细线 Loading：适用于路由切换和局部异步内容 */
export function Loading({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className={'flex min-h-[40vh] items-center justify-center ' + (className ?? '')}
      role="status"
      aria-label="Loading"
    >
      <div className="w-36">
        <div className="mb-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          <span>Loading</span>
          <motion.span
            aria-hidden
            animate={reduceMotion ? undefined : { opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            S
          </motion.span>
        </div>
        <div className="h-px overflow-hidden bg-border" aria-hidden>
          <motion.div
            className="h-full w-2/5 bg-foreground"
            animate={reduceMotion ? { x: '150%' } : { x: ['-110%', '260%'] }}
            transition={{ duration: 1.15, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
          />
        </div>
      </div>
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
