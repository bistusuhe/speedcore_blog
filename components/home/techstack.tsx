import { Section, SectionHeading } from '@/components/common/section'
import { Container } from '@/components/common/container'
import { Reveal, RevealItem } from '@/components/motion/motion'
import { Badge } from '@/components/ui/badge'
import { techStack } from '@/config/techstack'
import type { Locale } from '@/i18n/routing'

interface TechStackProps {
  locale: Locale
}

/** 首页「技术栈」：分组展示，每组以 Badge 网格排列 */
export async function TechStack({ locale }: TechStackProps) {
  if (techStack.length === 0) return null

  return (
    <Section id="techstack">
      <Container>
        <SectionHeading
          titleKey="techstack.title"
          subtitleKey="techstack.subtitle"
          index="09"
        />

        <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((group, i) => (
            <RevealItem key={`${group.category[locale]}-${i}`}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {group.category[locale]}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item} variant="default">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}

export default TechStack
