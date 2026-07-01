import { Section, SectionHeading } from '@/components/common/section'
import { Container } from '@/components/common/container'
import { Reveal, RevealItem, HoverLift } from '@/components/motion/motion'
import { Badge } from '@/components/ui/badge'
import { awards } from '@/config/experiences'
import { formatDate } from '@/lib/utils'
import type { Locale } from '@/i18n/routing'

interface AwardsProps {
  locale: Locale
}

/** 首页「获奖荣誉」：网格卡片，空态不渲染 */
export async function Awards({ locale }: AwardsProps) {
  if (awards.length === 0) return null

  return (
    <Section id="awards">
      <Container>
        <SectionHeading titleKey="awards.title" subtitleKey="awards.subtitle" index="06" />

        <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((item, i) => (
            <RevealItem key={`${item.title[locale]}-${i}`}>
              <HoverLift>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/20">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-muted-foreground">
                      {formatDate(item.date, locale)}
                    </span>
                    {item.level && (
                      <Badge variant="solid">{item.level[locale]}</Badge>
                    )}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight">
                    {item.title[locale]}
                  </h3>
                  {item.description && (
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description[locale]}
                    </p>
                  )}
                </div>
              </HoverLift>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}

export default Awards
