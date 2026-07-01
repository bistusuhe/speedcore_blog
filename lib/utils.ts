import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** 合并 Tailwind class，处理冲突 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/** 日期格式化 */
export function formatDate(date: string, locale: 'zh' | 'en' = 'zh'): string {
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/** ISO 日期（用于 sitemap / rss） */
export function isoDate(date: string): string {
  const d = new Date(date)
  return Number.isNaN(d.getTime()) ? date : d.toISOString()
}

/** 文件名转 slug */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\.mdx?$/, '')
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/** 简单 debounce */
export function debounce<T extends (...args: never[]) => void>(fn: T, delay = 200) {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

/** 截取摘要 */
export function truncate(text: string, max = 160): string {
  const clean = text.replace(/[#*`>\-\[\]!()]/g, '').replace(/\s+/g, ' ').trim()
  return clean.length > max ? `${clean.slice(0, max)}…` : clean
}

/** 拼接相对路径 */
export function joinPath(...parts: string[]): string {
  return parts.filter(Boolean).join('/').replace(/\/+/g, '/')
}
