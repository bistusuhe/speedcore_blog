import type { AwardItem, ExperienceItem, InterestItem } from '@/types'

/** 实习经历 */
export const internships: ExperienceItem[] = [
  {
    period: { zh: '2024.03 – 2024.08', en: '2024.03 – 2024.08' },
    role: { zh: '无', en: 'None' },
    company: { zh: '无', en: 'None' },
    description: {
      zh: '无',
      en: 'None',
    },
    tags: [],
  },
]

/** 获奖 */
export const awards: AwardItem[] = [
  {
    date: '2026-10-20',
    title: {
      zh: '全国大学生数学建模竞赛',
      en: 'China Undergraduate Mathematical Contest in Modeling',
    },
    level: { zh: '北京赛区二等奖', en: 'Beijing Division 2nd Prize' },
  },
  {
    date: '2026-06',
    title: { zh: '蓝桥杯大赛', en: 'Blue Bridge Cup' },
    level: { zh: '省二等奖', en: 'Provincial 2nd Prize' },
    description: {
      zh: '算法与数据结构竞赛',
      en: 'Algorithm and data structure competition',
    },
  },{
    date: '2026-06',
    title: { zh: '计算机博弈大赛', en: 'Computer Game Competition' },
    level: { zh: '国家级一等奖', en: 'National 1st Prize' },
    description: {
      zh: '计算机博弈竞赛',
      en: 'Computer game competition',
    },
  }
]

/** 兴趣 */
export const interests: InterestItem[] = [
  {
    icon: 'Gamepad2',
    title: { zh: '游戏开发', en: 'Game Dev' },
    description: { zh: 'Unity游戏开发', en: 'Indie Unity games' },
  },
  {
    icon: 'Bot',
    title: { zh: '智能体', en: 'AI Agents' },
    description: { zh: '研究AIAgent协作与工具调用。', en: 'Exploring multi-agent collaboration & tool use.' },
  },
  {
    icon: 'BookOpen',
    title: { zh: '阅读', en: 'Reading' },
    description: { zh: '技术、心理。', en: 'Tech, psychology.' },
  },
  {
    icon: 'Music',
    title: { zh: '音乐', en: 'Music' },
    description: { zh: 'Lo-fi、电子、电影原声。', en: 'Lo-fi, electronic, film scores.' },
  },

  {
    icon: 'Dumbbell',
    title: { zh: '健身', en: 'Fitness' },
    description: { zh: '力量训练与跑步。', en: 'Strength training & running.' },
  },
]
