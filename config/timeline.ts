import type { TimelineItem } from '@/types'

/**
 * 时间线配置 —— 新增条目只需在此追加，自动出现在时间线页与首页
 */
export const timeline: TimelineItem[] = [
  {
    date: '2022-09',
    title: { zh: '进入大学 · 数据科学与大数据技术', en: 'University · Data Science & Big Data' },
    description: {
      zh: '开始系统学习数学、统计、机器学习与大数据技术栈。',
      en: 'Started systematic study of math, statistics, ML and big data stack.',
    },
    type: 'study',
  },
  {
    date: '2023-06',
    title: { zh: '首届 AI Agent 创新赛 · 省级二等奖', en: 'AI Agent Innovation Contest · Provincial 2nd Prize' },
    description: {
      zh: '带队构建多智能体协作系统，负责 Agent 编排与工具调用模块。',
      en: 'Led a team building a multi-agent collaboration system, owning agent orchestration & tool use.',
    },
    type: 'award',
  },
  {
    date: '2024-03',
    title: { zh: '某互联网公司 · 算法实习生', en: 'Tech Company · Algorithm Intern' },
    description: {
      zh: '参与推荐系统召回层迭代，上线 A/B 实验带来点击率提升。',
      en: 'Iterated recall layer of a recommendation system; shipped A/B tests with CTR uplift.',
    },
    type: 'internship',
  },
  {
    date: '2024-09',
    title: { zh: '全国大学生数学建模竞赛 · 国家二等奖', en: 'CUMCM · National 2nd Prize' },
    description: {
      zh: '负责建模与代码实现，72 小时内完成端到端方案。',
      en: 'Owned modeling & implementation, delivering an end-to-end solution in 72 hours.',
    },
    type: 'contest',
  },
  {
    date: '2025-01',
    title: { zh: '开源 AI Agent 框架 · 个人项目', en: 'Open-source AI Agent Framework · Side Project' },
    description: {
      zh: '基于 Python 实现轻量级多 Agent 编排框架，支持工具调用与记忆。',
      en: 'A lightweight multi-agent orchestration framework in Python with tool use & memory.',
    },
    type: 'project',
    link: 'https://github.com',
  },
]

export default timeline
