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
    date: '2024-06',
    title: { zh: '蓝桥杯全国软件和信息技术专业人才大赛', en: 'Blue Bridge Cup' },
    level: { zh: '省二等奖', en: 'Provincial 2nd Prize' },
    description: {
      zh: '算法与数据结构竞赛。',
      en: 'Algorithm and data structure competition.',
    },
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
