'use client'

import { useTranslations } from 'next-intl'
import { Section, SectionHeading } from '@/components/common/section'
import { Container } from '@/components/common/container'
import { Icon } from '@/components/common/Icon'
import { Reveal, RevealItem, HoverLift } from '@/components/motion/motion'
import { skills } from '@/config/skills'
import type { Skill, SkillCategory } from '@/types'

/** 分类展示顺序 */
const CATEGORY_ORDER: SkillCategory[] = ['language', 'framework', 'tool', 'ai']

/** 按分类聚合技能 */
function groupByCategory(items: Skill[]): Record<SkillCategory, Skill[]> {
  const grouped: Record<SkillCategory, Skill[]> = {
    language: [],
    framework: [],
    tool: [],
    ai: [],
  }
  for (const item of items) grouped[item.category].push(item)
  return grouped
}

/** 单个技能卡片 */
function SkillCard({ skill }: { skill: Skill }) {
  return (
    <HoverLift>
      <div className="group h-full rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/30">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background"
            style={skill.color ? { color: skill.color } : undefined}
          >
            <Icon name={skill.icon} className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold tracking-tight">{skill.name}</p>
            <p className="font-mono text-xs text-muted-foreground">{skill.level}%</p>
          </div>
        </div>
        {/* 进度条 */}
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-foreground transition-all duration-700 ease-out group-hover:opacity-80"
            style={{ width: `${skill.level}%` }}
          />
        </div>
      </div>
    </HoverLift>
  )
}

/** 首页「技能栈」：按分类分组展示，含进度条与 stagger 入场 */
export function Skills() {
  const t = useTranslations('skills')
  const grouped = groupByCategory(skills)

  return (
    <Section id="skills">
      <Container>
        <SectionHeading titleKey="skills.title" subtitleKey="skills.subtitle" index="02" />

        <div className="space-y-14">
          {CATEGORY_ORDER.map((category) => {
            const items = grouped[category]
            if (items.length === 0) return null
            return (
              <div key={category}>
                <RevealItem className="mb-6">
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {t(`categories.${category}`)}
                  </h3>
                </RevealItem>
                <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((skill) => (
                    <RevealItem key={skill.name}>
                      <SkillCard skill={skill} />
                    </RevealItem>
                  ))}
                </Reveal>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

export default Skills
