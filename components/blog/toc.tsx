'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface TocItem {
  id: string
  text: string
  level: number
}

/** 文章目录（桌面端 sticky 侧栏，IntersectionObserver 高亮当前章节） */
export function Toc() {
  const t = useTranslations('blog')
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // 仅扫描正文 MDX 区域内的标题，避免「相关推荐」等尾部区块污染目录
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>('article .prose h2, article .prose h3'),
    )
    const next: TocItem[] = headings
      .filter((h) => h.id)
      .map((h) => ({
        id: h.id,
        text: h.textContent ?? '',
        level: h.tagName === 'H2' ? 2 : 3,
      }))
    setItems(next)
    if (next.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        const first = visible[0]
        if (first) setActiveId(first.target.id)
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: [0, 1] },
    )
    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [])

  if (items.length === 0) return null

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav aria-label={t('toc')} className="text-sm">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {t('toc')}
      </p>
      <ul className="space-y-1.5 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => handleClick(item.id)}
              className={cn(
                'block w-full border-l-2 py-1 text-left text-muted-foreground transition-colors hover:text-foreground',
                item.level === 3 && 'pl-6',
                item.level === 2 && 'pl-3',
                activeId === item.id &&
                  'border-foreground text-foreground',
                activeId !== item.id && 'border-transparent',
              )}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Toc
