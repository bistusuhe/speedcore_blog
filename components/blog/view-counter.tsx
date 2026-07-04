'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface ViewCounterProps {
  slug: string
}

/** 文章阅读量计数器（记录一次访问并展示去重阅读人数） */
export function ViewCounter({ slug }: ViewCounterProps) {
  const t = useTranslations('blog')
  const [count, setCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetch('/api/view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    })
      .then((r) => r.json())
      .then((data: { count: number }) => setCount(data.count))
      .catch(() => {})
  }, [slug])

  if (!mounted) return null

  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
      <Eye className="h-4 w-4" />
      {count} {t('views')}
    </span>
  )
}

export default ViewCounter
