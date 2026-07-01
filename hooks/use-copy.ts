'use client'

import { useState } from 'react'

/** 复制到剪贴板，返回 copied 状态 */
export function useCopy(resetDelay = 2000) {
  const [copied, setCopied] = useState(false)
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), resetDelay)
    } catch {
      /* ignore */
    }
  }
  return { copied, copy }
}
