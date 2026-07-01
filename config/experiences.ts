import type { AwardItem, ExperienceItem, InterestItem } from '@/types'

/** 实习经历 */
export const internships: ExperienceItem[] = [
  {
    period: { zh: '2024.03 – 2024.08', en: '2024.03 – 2024.08' },
    role: { zh: '算法实习生', en: 'Algorithm Intern' },
    company: { zh: '某互联网科技公司', en: 'A Tech Company' },
    description: {
      zh: '负责推荐系统召回层迭代，使用 Python / Spark 处理亿级用户行为数据，上线 A/B 实验带来 +4.2% 点击率提升。',
      en: 'Iterated the recall layer of a recommendation system using Python/Spark over 100M+ user events; shipped A/B tests with +4.2% CTR uplift.',
    },
    tags: ['Python', 'Spark', 'Recommendation', 'A/B Test'],
  },
]

/** 获奖 */
export const awards: AwardItem[] = [
  {
    date: '2024-09',
    title: { zh: '全国大学生数学建模竞赛', en: 'CUMCM' },
    level: { zh: '国家二等奖', en: 'National 2nd Prize' },
    description: {
      zh: '72 小时内完成建模、编程与论文撰写。',
      en: 'Completed modeling, coding and paper writing in 72 hours.',
    },
  },
  {
    date: '2023-06',
    title: { zh: 'AI Agent 创新赛', en: 'AI Agent Innovation Contest' },
    level: { zh: '省级二等奖', en: 'Provincial 2nd Prize' },
    description: {
      zh: '多智能体协作系统，队长。',
      en: 'Multi-agent collaboration system, team lead.',
    },
  },
  {
    date: '2023-11',
    title: { zh: 'ACM-ICPC 区域赛', en: 'ACM-ICPC Regional' },
    level: { zh: '银奖', en: 'Silver' },
  },
]

/** 兴趣 */
export const interests: InterestItem[] = [
  {
    icon: 'Gamepad2',
    title: { zh: '游戏开发', en: 'Game Dev' },
    description: { zh: 'Unity 独立小游戏，喜欢打磨手感与关卡设计。', en: 'Indie Unity games — polishing feel & level design.' },
  },
  {
    icon: 'Bot',
    title: { zh: '智能体', en: 'AI Agents' },
    description: { zh: '研究多 Agent 协作与工具调用。', en: 'Exploring multi-agent collaboration & tool use.' },
  },
  {
    icon: 'BookOpen',
    title: { zh: '阅读', en: 'Reading' },
    description: { zh: '科幻、技术、认知科学。', en: 'Sci-fi, tech, cognitive science.' },
  },
  {
    icon: 'Music',
    title: { zh: '音乐', en: 'Music' },
    description: { zh: 'Lo-fi、电子、电影原声。', en: 'Lo-fi, electronic, film scores.' },
  },
  {
    icon: 'Camera',
    title: { zh: '摄影', en: 'Photography' },
    description: { zh: '街头与极简风景。', en: 'Street & minimal landscape.' },
  },
  {
    icon: 'Dumbbell',
    title: { zh: '健身', en: 'Fitness' },
    description: { zh: '力量训练与跑步。', en: 'Strength training & running.' },
  },
]
