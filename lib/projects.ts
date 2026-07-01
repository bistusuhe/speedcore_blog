import 'server-only'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { glob } from 'glob'
import type { Project, ProjectFrontmatter } from '@/types'
import { slugify } from './utils'

const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects')

function readProjectFile(filePath: string): Project | null {
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const fm = data as ProjectFrontmatter
  const slug = slugify(path.basename(filePath))
  const stats = readingTime(content)
  return {
    ...fm,
    title: fm.title ?? slug,
    description: fm.description ?? '',
    date: fm.date ?? new Date().toISOString(),
    tags: fm.tags ?? [],
    slug,
    body: content,
    readingTime: Math.max(1, Math.round(stats.minutes)),
  }
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return []
  const files = glob.sync('**/*.{md,mdx}', { cwd: PROJECTS_DIR })
  const projects = files
    .map((f) => {
      try {
        return readProjectFile(path.join(PROJECTS_DIR, f))
      } catch {
        return null
      }
    })
    .filter((p): p is Project => p !== null)
  return projects.sort((a, b) => +new Date(b.date) - +new Date(a.date))
}

export function getProjectBySlug(slug: string): Project | null {
  const files = glob.sync('**/*.{md,mdx}', { cwd: PROJECTS_DIR })
  const target = files.find((f) => slugify(path.basename(f)) === slug)
  if (!target) return null
  try {
    return readProjectFile(path.join(PROJECTS_DIR, target))
  } catch {
    return null
  }
}

export function getProjectCategories(): { name: string; count: number }[] {
  const projects = getAllProjects()
  const map = new Map<string, number>()
  for (const p of projects) {
    const c = p.category ?? 'Other'
    map.set(c, (map.get(c) ?? 0) + 1)
  }
  return [...map.entries()].map(([name, count]) => ({ name, count }))
}

export function getProjectTags(): { name: string; count: number }[] {
  const projects = getAllProjects()
  const map = new Map<string, number>()
  for (const p of projects) for (const t of p.tags) map.set(t, (map.get(t) ?? 0) + 1)
  return [...map.entries()].map(([name, count]) => ({ name, count }))
}
