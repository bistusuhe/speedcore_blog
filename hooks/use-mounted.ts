'use client'

import { useEffect, useState } from 'react'

/** 客户端挂载标记（避免 hydration 不匹配） */
export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}
