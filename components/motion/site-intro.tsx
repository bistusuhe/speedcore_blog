'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useLayoutEffect, useState } from 'react'

const INTRO_SEEN_KEY = 'suhe-intro-seen-v2'
const ease = [0.76, 0, 0.24, 1] as const

/**
 * 首次进入当前标签页时播放一次的开场。
 * 内容保持简短，让它更像一本作品集的扉页，而不是等待用户看完的广告。
 */
export function SiteIntro() {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)

  useLayoutEffect(() => {
    if (reduceMotion || window.sessionStorage.getItem(INTRO_SEEN_KEY)) {
      setVisible(false)
      return
    }

    window.sessionStorage.setItem(INTRO_SEEN_KEY, 'true')
  }, [reduceMotion])

  useEffect(() => {
    if (!visible) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => setVisible(false), 1650)

    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = previousOverflow
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex cursor-wait items-center justify-center overflow-hidden text-white"
          exit={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          role="status"
          aria-label="Opening Su He portfolio"
        >
          {/* 沿左上—右下切线分开的两块 Low Poly 灰色幕布 */}
          <motion.div
            aria-hidden
            className="site-intro-lowpoly absolute inset-0 will-change-transform"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
            exit={{ x: '100%', y: '-100%' }}
            transition={{ duration: 0.9, ease }}
          />
          <motion.div
            aria-hidden
            className="site-intro-lowpoly absolute inset-0 will-change-transform"
            style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}
            exit={{ x: '-100%', y: '100%' }}
            transition={{ duration: 0.9, ease }}
          />

          <motion.div
            className="relative z-10 w-[min(82vw,34rem)]"
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <motion.div
              className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] opacity-60 sm:text-xs"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              <span>Portfolio</span>
              <span>2026</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.p
                className="text-[clamp(3.5rem,13vw,8rem)] font-semibold leading-[0.82] tracking-[-0.075em]"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.18, ease }}
              >
                SU HE
              </motion.p>
            </div>

            <motion.p
              className="mt-7 text-right font-mono text-[10px] uppercase tracking-[0.24em] opacity-60 sm:text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.4, delay: 0.65 }}
            >
              Code · Ideas · Notes
            </motion.p>
          </motion.div>

          {/* 从画面中心同时向两端生长的切割线 */}
          <motion.svg
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
          >
            <motion.path
              d="M 50 50 L 0 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.12"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.65 }}
              transition={{ duration: 0.55, delay: 0.85, ease }}
            />
            <motion.path
              d="M 50 50 L 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.12"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.65 }}
              transition={{ duration: 0.55, delay: 0.85, ease }}
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
