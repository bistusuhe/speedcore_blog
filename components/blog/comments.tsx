'use client'

import { useEffect, useState } from 'react'
import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'

interface CommentsProps {
  locale: 'zh' | 'en'
}

const repo = process.env.NEXT_PUBLIC_GISCUS_REPO
const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID
const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY
const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID

/** 评论区（Giscus，未配置时显示提示） */
export function Comments({ locale }: CommentsProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const configured =
    !!repo && repo !== 'owner/repo' && !!repoId && !!category && !!categoryId

  if (!mounted) return null

  if (!configured || !repo || !repoId || !category || !categoryId) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        {locale === 'zh' ? '评论系统未配置' : 'Comments are not configured.'}
      </div>
    )
  }

  return (
    <Giscus
      repo={repo as `${string}/${string}`}
      repoId={repoId}
      category={category}
      categoryId={categoryId}
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      lang={locale === 'zh' ? 'zh-CN' : 'en'}
      loading="lazy"
    />
  )
}

export default Comments
