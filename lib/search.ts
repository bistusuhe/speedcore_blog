import 'server-only'
import { getAllPosts } from './posts'
import { getAllProjects } from './projects'
import { getAllCategories, getAllTags } from './posts'
import type { SearchEntry } from '@/types'
import { truncate } from './utils'

/**
 * 构建全站搜索索引（构建时调用，输出到 public/search-index.json）
 */
export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = []

  for (const post of getAllPosts()) {
    entries.push({
      type: 'post',
      slug: post.slug,
      title: post.title,
      description: post.description,
      href: `/blog/${post.slug}`,
      category: post.category,
      tags: post.tags,
      date: post.date,
      content: truncate(post.content ?? post.body, 2000),
    })
  }

  for (const project of getAllProjects()) {
    entries.push({
      type: 'project',
      slug: project.slug,
      title: project.title,
      description: project.description,
      href: `/projects/${project.slug}`,
      category: project.category,
      tags: project.tags,
      date: project.date,
      content: truncate(project.body, 2000),
    })
  }

  for (const c of getAllCategories()) {
    entries.push({
      type: 'category',
      slug: c.name,
      title: c.name,
      description: `${c.count} posts`,
      href: `/blog/category/${encodeURIComponent(c.name)}`,
      content: c.name,
    })
  }

  for (const t of getAllTags()) {
    entries.push({
      type: 'tag',
      slug: t.name,
      title: t.name,
      description: `${t.count} posts`,
      href: `/blog/tag/${encodeURIComponent(t.name)}`,
      content: t.name,
    })
  }

  return entries
}
