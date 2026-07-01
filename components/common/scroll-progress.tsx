'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/** 顶部阅读进度条 */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      className={className}
      style={{ scaleX, transformOrigin: '0% 50%' }}
      aria-hidden
    />
  )
}
