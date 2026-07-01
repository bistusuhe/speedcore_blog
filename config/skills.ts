import type { Skill } from '@/types'

/**
 * 技能配置 —— 新增技能只需在此追加一项，无需改动任何组件代码
 * icon 取自 lucide-react 图标名（见 components/common/Icon.tsx 映射）
 */
export const skills: Skill[] = [
  { name: 'Python', icon: 'Python', category: 'language', level: 90, color: '#3776AB' },
  { name: 'Java', icon: 'Coffee', category: 'language', level: 82, color: '#E76F00' },
  { name: 'JavaScript', icon: 'Braces', category: 'language', level: 85, color: '#F7DF1E' },
  { name: 'HTML', icon: 'Code2', category: 'language', level: 88, color: '#E34F26' },
  { name: 'CSS', icon: 'Palette', category: 'language', level: 85, color: '#1572B6' },
  { name: 'Spring Boot', icon: 'Leaf', category: 'framework', level: 75, color: '#6DB33F' },
  { name: 'Vue', icon: 'Component', category: 'framework', level: 80, color: '#42B883' },
  { name: 'Unity', icon: 'Gamepad2', category: 'framework', level: 78, color: '#000000' },
  { name: 'AI Agent', icon: 'Bot', category: 'ai', level: 80, color: '#10A37F' },
  { name: 'Git', icon: 'GitBranch', category: 'tool', level: 85, color: '#F05032' },
  { name: 'Linux', icon: 'Terminal', category: 'tool', level: 78, color: '#FCC624' },
]

export default skills
