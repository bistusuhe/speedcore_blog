import 'server-only'
import { cache } from 'react'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { glob } from 'glob'
import type { Post, PostFrontmatter } from '@/types'
import { slugify } from './utils'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

function readPostFile(filePath: string): Post | null {
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const fm = data as PostFrontmatter
  if (fm.draft) return null
  const slug = fm.slug ?? slugify(path.basename(filePath))
  const stats = readingTime(content)
  return {
    ...fm,
    title: fm.title ?? slug,
    description: fm.description ?? '',
    date: fm.date ?? new Date().toISOString(),
    category: fm.category ?? '随笔',
    tags: fm.tags ?? [],
    slug,
    body: content,
    content,
    readingTime: Math.max(1, Math.round(stats.minutes)),
    wordCount: stats.words,
  }
}

/** 获取全部文章（按日期倒序），同一渲染周期内自动去重 */
export const getAllPosts = cache((): Post[] => {
  if (!fs.existsSync(POSTS_DIR)) return []
  const files = glob.sync('**/*.{md,mdx}', { cwd: POSTS_DIR })
  const posts = files
    .map((f) => {
      try {
        return readPostFile(path.join(POSTS_DIR, f))
      } catch {
        return null
      }
    })
    .filter((p): p is Post => p !== null)
  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))
})

/** 根据 slug 获取单篇（复用 getAllPosts 缓存，不重复扫描磁盘） */
export const getPostBySlug = cache((slug: string): Post | null => {
  return getAllPosts().find((p) => p.slug === slug) ?? null
})

/** 获取全部分类 */
export function getAllCategories(): { name: string; count: number }[] {
  const posts = getAllPosts()
  const map = new Map<string, number>()
  for (const p of posts) map.set(p.category, (map.get(p.category) ?? 0) + 1)
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

/** 获取全部标签 */
export function getAllTags(): { name: string; count: number }[] {
  const posts = getAllPosts()
  const map = new Map<string, number>()
  for (const p of posts) for (const t of p.tags) map.set(t, (map.get(t) ?? 0) + 1)
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

/** 获取某分类文章 */
export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase(),
  )
}

/** 获取某标签文章 */
export function getPostsByTag(tag: string): Post[] {
  const t = tag.toLowerCase()
  return getAllPosts().filter((p) => p.tags.some((x) => x.toLowerCase() === t))
}

/** 归档（按年分组） */
export function getPostsArchive(): { year: number; posts: Post[] }[] {
  const posts = getAllPosts()
  const map = new Map<number, Post[]>()
  for (const p of posts) {
    const y = new Date(p.date).getFullYear()
    if (!map.has(y)) map.set(y, [])
    map.get(y)!.push(p)
  }
  return [...map.entries()]
    .map(([year, ps]) => ({ year, posts: ps }))
    .sort((a, b) => b.year - a.year)
}

/** 相关推荐（基于分类与标签） */
export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const all = getAllPosts()
  const current = all.find((p) => p.slug === slug)
  if (!current) return []
  return all
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0
      if (p.category === current.category) score += 2
      score += p.tags.filter((t) => current.tags.includes(t)).length
      return { post: p, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post)
}

/** 上一篇 / 下一篇（按日期） */
export function getAdjacentPosts(slug: string): { prev: Post | null; next: Post | null } {
  const posts = getAllPosts() // 倒序
  const idx = posts.findIndex((p) => p.slug === slug)
  if (idx === -1) return { prev: null, next: null }
  // 倒序中：下一篇（更新）在前，上一篇（更旧）在后
  return {
    next: idx > 0 ? posts[idx - 1]! : null,
    prev: idx < posts.length - 1 ? posts[idx + 1]! : null,
  }
}
