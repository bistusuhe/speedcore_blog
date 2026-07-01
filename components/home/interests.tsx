import { Section, SectionHeading } from '@/components/common/section'
import { Container } from '@/components/common/container'
import { Icon } from '@/components/common/Icon'
import { Reveal, RevealItem, HoverLift, ScaleIn } from '@/components/motion/motion'
import { interests } from '@/config/experiences'
import type { Locale } from '@/i18n/routing'

interface InterestsProps {
  locale: Locale
}

/** 首页「兴趣爱好」：图标卡片网格，空态不渲染 */
export async function Interests({ locale }: InterestsProps) {
  if (interests.length === 0) return null

  return (
    <Section id="interests">
      <Container>
        <SectionHeading
          titleKey="interests.title"
          subtitleKey="interests.subtitle"
          index="07"
        />

        <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {interests.map((item, i) => (
            <RevealItem key={`${item.title[locale]}-${i}`}>
              <ScaleIn delay={i * 0.04}>
                <HoverLift>
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/20">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-base font-semibold tracking-tight">
                      {item.title[locale]}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {item.description[locale]}
                    </p>
                  </div>
                </HoverLift>
              </ScaleIn>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}

export default Interests
