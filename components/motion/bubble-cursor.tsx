'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

type BubbleEffect = { destroy: () => void }

declare global {
  interface Window {
    cursoreffects?: {
      bubbleCursor: new (options: {
        fillColor: string
        strokeColor: string
        zIndex: string
      }) => BubbleEffect
    }
  }
}

/** cursor-effects 的气泡拖尾，仅在桌面指针和允许动画时启用。 */
export function BubbleCursor() {
  const [enabled, setEnabled] = useState(false)
  const [scriptReady, setScriptReady] = useState(false)

  useEffect(() => {
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(pointer.matches && !reducedMotion.matches)

    update()
    pointer.addEventListener('change', update)

    return () => {
      pointer.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (!enabled || !scriptReady || !window.cursoreffects?.bubbleCursor) return

    const effect = new window.cursoreffects.bubbleCursor({
      fillColor: 'rgba(230, 241, 247, 0.65)',
      strokeColor: 'rgba(58, 146, 197, 0.85)',
      zIndex: '50',
    })

    return () => effect.destroy()
  }, [enabled, scriptReady])

  if (!enabled) return null

  return (
    <Script
      src="https://unpkg.com/cursor-effects@1.0.18/dist/browser.js"
      strategy="afterInteractive"
      onReady={() => setScriptReady(true)}
    />
  )
}
