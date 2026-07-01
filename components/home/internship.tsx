import { Section, SectionHeading } from '@/components/common/section'
import { Container } from '@/components/common/container'
import { Reveal, RevealItem } from '@/components/motion/motion'
import { Badge } from '@/components/ui/badge'
import { internships } from '@/config/experiences'
import type { Locale } from '@/i18n/routing'

interface InternshipProps {
  locale: Locale
}

/** 首页「实习经历」：纵向时间线 + 左侧竖线与节点，空态不渲染 */
export async function Internship({ locale }: InternshipProps) {
  if (internships.length === 0) return null

  return (
    <Section id="internship">
      <Container size="narrow">
        <SectionHeading
          titleKey="internship.title"
          subtitleKey="internship.subtitle"
          index="05"
        />

        <Reveal className="relative">
          {/* 左侧竖线 */}
          <div
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-border"
          />
          <div className="space-y-10">
            {internships.map((item, i) => (
              <RevealItem key={`${item.role[locale]}-${i}`} className="relative pl-8">
                {/* 时间点节点 */}
                <span
                  aria-hidden
                  className="absolute left-0 top-2 h-3.5 w-3.5 rounded-full border-2 border-foreground bg-background"
                />
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {item.period[locale]}
                </p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight">
                  {item.role[locale]}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-foreground/80">
                  {item.company[locale]}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description[locale]}
                </p>
                {item.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

export default Internship
