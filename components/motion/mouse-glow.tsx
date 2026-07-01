'use client'

import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'

/** 鼠标跟随光晕（用于 Hero 等大区域） */
export function MouseGlow({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 120, damping: 20 })
  const sy = useSpring(y, { stiffness: 120, damping: 20 })

  useEffect(() => {
    if (reduce) return
    const handler = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [x, y, reduce])

  if (reduce) return null

  return (
    <motion.div
      aria-hidden
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 480,
        height: 480,
        translateX: sx,
        translateY: sy,
        x: '-50%',
        y: '-50%',
        pointerEvents: 'none',
        background:
          'radial-gradient(circle, hsl(var(--foreground) / 0.06) 0%, transparent 60%)',
        zIndex: 0,
      }}
    />
  )
}
