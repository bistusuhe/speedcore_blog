'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Spark {
  x: number
  y: number
  angle: number
  progress: number
}

interface Burst {
  sparks: Spark[]
  startTime: number
}

interface ClickSparkProps {
  sparkColor?: string
  sparkCount?: number
  sparkRadius?: number
  sparkSize?: number
  duration?: number
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export function ClickSpark({
  sparkColor = '#fff',
  sparkCount = 12,
  sparkRadius = 40,
  sparkSize = 16,
  duration = 700,
}: ClickSparkProps) {
  const reduce = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const burstsRef = useRef<Burst[]>([])
  const rafRef = useRef<number>(0)

  const resize = useCallback(() => {
    const c = canvasRef.current
    if (!c) return
    const dpr = window.devicePixelRatio || 1
    c.width = window.innerWidth * dpr
    c.height = window.innerHeight * dpr
    c.style.width = `${window.innerWidth}px`
    c.style.height = `${window.innerHeight}px`
    const ctx = c.getContext('2d')
    if (ctx) ctx.scale(dpr, dpr)
  }, [])

  useEffect(() => {
    if (reduce) return
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [reduce, resize])

  useEffect(() => {
    if (reduce) return

    const handler = (e: MouseEvent) => {
      const sparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
        x: e.clientX,
        y: e.clientY,
        angle: (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.3,
        progress: 0,
      }))
      burstsRef.current.push({ sparks, startTime: performance.now() })
    }
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [reduce, sparkCount])

  useEffect(() => {
    if (reduce) return
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    const drawSpark = (spark: Spark) => {
      const t = spark.progress
      const lineLen =
        t < 0.25 ? (t / 0.25) * sparkSize : (1 - (t - 0.25) / 0.75) * sparkSize
      const dist = sparkRadius * easeOutCubic(t)
      const midX = spark.x + Math.cos(spark.angle) * dist
      const midY = spark.y + Math.sin(spark.angle) * dist
      const halfLen = lineLen / 2

      const alpha = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85

      ctx.globalAlpha = alpha
      ctx.strokeStyle = sparkColor
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(midX - Math.cos(spark.angle) * halfLen, midY - Math.sin(spark.angle) * halfLen)
      ctx.lineTo(midX + Math.cos(spark.angle) * halfLen, midY + Math.sin(spark.angle) * halfLen)
      ctx.stroke()
    }

    const animate = (now: number) => {
      const w = c.width / (window.devicePixelRatio || 1)
      const h = c.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, w, h)

      burstsRef.current = burstsRef.current.filter((b) => {
        const elapsed = now - b.startTime
        if (elapsed > duration) return false
        for (const spark of b.sparks) {
          spark.progress = Math.min(elapsed / duration, 1)
          drawSpark(spark)
        }
        return true
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [reduce, sparkColor, sparkCount, sparkRadius, sparkSize, duration])

  if (reduce) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  )
}
