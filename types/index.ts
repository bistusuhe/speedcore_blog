import type { ComponentType } from 'react'

/** 站点配置 */
export interface SiteConfig {
  name: string
  nameEn: string
  url: string
  description: string
  locale: 'zh' | 'en'
  author: {
    name: string
    nameEn: string
    email: string
    github: string
    avatar: string
    logo: string
    wechatQr: string
  }
  social: {
    github: string
    email: string
  }
}

/** 导航项 */
export interface NavItem {
  key: string
  href: string
}

/** 技能 */
export interface Skill {
  name: string
  icon: string
  category: SkillCategory
  level: number
  color?: string
}
export type SkillCategory = 'language' | 'framework' | 'tool' | 'ai'

/** 经历条目（实习） */
export interface ExperienceItem {
  period: { zh: string; en: string }
  role: { zh: string; en: string }
  company: { zh: string; en: string }
  description: { zh: string; en: string }
  tags: string[]
}

/** 获奖 */
export interface AwardItem {
  date: string
  title: { zh: string; en: string }
  level?: { zh: string; en: string }
  description?: { zh: string; en: string }
}

/** 兴趣 */
export interface InterestItem {
  icon: string
  title: { zh: string; en: string }
  description: { zh: string; en: string }
}

/** 技术栈分组 */
export interface TechStackGroup {
  category: { zh: string; en: string }
  items: string[]
}

/** 文章 frontmatter */
export interface PostFrontmatter {
  title: string
  description: string
  date: string
  updated?: string
  slug?: string
  category: string
  tags: string[]
  cover?: string
  author?: string
  lang?: 'zh' | 'en'
  draft?: boolean
  pinned?: boolean
}

/** 项目 frontmatter */
export interface ProjectFrontmatter {
  title: string
  description: string
  date: string
  updated?: string
  category?: string
  tags: string[]
  cover?: string
  github?: string
  demo?: string
  video?: string
  pinned?: boolean
  lang?: 'zh' | 'en'
}

/** 解析后的文章 */
export interface Post extends PostFrontmatter {
  slug: string
  body: string
  readingTime: number
  wordCount: number
  content?: string
}

/** 解析后的项目 */
export interface Project extends ProjectFrontmatter {
  slug: string
  body: string
  readingTime: number
}

/** 搜索索引条目 */
export interface SearchEntry {
  type: 'post' | 'project' | 'tag' | 'category'
  slug: string
  title: string
  description: string
  href: string
  category?: string
  tags?: string[]
  date?: string
  content: string
}

/** 图标组件类型（lucide 动态名） */
export type IconType = ComponentType<{ className?: string }>
