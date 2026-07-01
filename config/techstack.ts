import type { TechStackGroup } from '@/types'

/** 技术栈展示 —— 首页 Tech Stack 区块 */
export const techStack: TechStackGroup[] = [
  {
    category: { zh: '语言', en: 'Languages' },
    items: ['Python', 'Java', 'SQL'],
  },
  {
    category: { zh: '前端', en: 'Frontend' },
    items: [ 'Vue'],
  },
  {
    category: { zh: '后端', en: 'Backend' },
    items: ['Spring Boot',  'FastAPI', 'MySQL', 'Redis'],
  },
  {
    category: { zh: 'AI Agent', en: 'AI / Agent' },
    items: ['PyTorch', 'LangChain'],
  },
  {
    category: { zh: '游戏', en: 'Game' },
    items: ['Unity', 'C#',  'Blender'],
  },
  {
    category: { zh: '工程', en: 'Tooling' },
    items: ['Git', 'Docker', 'Linux', 'Nginx'],
  },
]

export default techStack
