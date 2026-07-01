'use client'

import { type KeyboardEvent, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'
import Fuse from 'fuse.js'
import { FileText, FolderGit2, Tag, Folder, Search as SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Loading } from '@/components/common/loading'
import { Link } from '@/i18n/routing'
import type { SearchEntry } from '@/types'

// 按 type 映射图标
const typeIcon = {
  post: FileText,
  project: FolderGit2,
  tag: Tag,
  category: Folder,
} as const

/** 客户端搜索：fetch /api/search 索引，Fuse.js 模糊匹配，实时渲染结果 */
export function SearchClient() {
  const t = useTranslations('search')
  const router = useRouter()
  const searchParams = useSearchParams()
  const initial = searchParams.get('q') ?? ''

  const [query, setQuery] = useState(initial)
  const [entries, setEntries] = useState<SearchEntry[] | null>(null)

  // 仅在挂载时拉取一次索引
  useEffect(() => {
    let cancelled = false
    fetch('/api/search')
      .then((r) => r.json() as Promise<SearchEntry[]>)
      .then((data) => {
        if (!cancelled) setEntries(data)
      })
      .catch(() => {
        if (!cancelled) setEntries([])
      })
    return () => {
      cancelled = true
    }
  }, [])

  const fuse = useMemo(() => {
    if (!entries) return null
    return new Fuse<SearchEntry>(entries, {
      keys: ['title', 'description', 'tags', 'category', 'content'],
      threshold: 0.3,
      ignoreLocation: true,
    })
  }, [entries])

  const results = useMemo(() => {
    if (!fuse) return []
    const q = query.trim()
    if (!q) return []
    return fuse.search(q).slice(0, 20)
  }, [fuse, query])

  const loading = entries === null
  const trimmed = query.trim()

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && results.length > 0) {
      const first = results[0]
      if (first) router.push(first.item.href)
    }
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('placeholder')}
          className="pl-11"
          autoFocus
        />
      </div>

      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {t('hint')}
      </p>

      {loading ? (
        <Loading />
      ) : !trimmed ? (
        <p className="py-20 text-center text-muted-foreground">{t('empty')}</p>
      ) : results.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">{t('noResult')}</p>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{t('resultsFor', { query: trimmed })}</p>
          <ul className="space-y-2">
            {results.map(({ item }) => {
              const Icon = typeIcon[item.type] ?? FileText
              return (
                <li key={`${item.type}-${item.slug}`}>
                  <Link
                    href={item.href}
                    className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-foreground/20"
                  >
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition group-hover:text-foreground">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{item.title}</span>
                      <span className="block truncate text-sm text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
