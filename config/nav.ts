import type { NavItem } from '@/types'

/** 顶部导航（key 对应 i18n nav.*） */
export const navItems: NavItem[] = [
  { key: 'home', href: '/' },
  { key: 'blog', href: '/blog' },
  { key: 'projects', href: '/projects' },
  { key: 'contact', href: '/contact' },
]

export default navItems
