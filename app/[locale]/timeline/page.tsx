import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import timeline from '@/config/timeline'
import { Container } from '@/components/common/container'
import { Section, SectionHeading } from '@/components/common/section'
import { TimelineView } from '@/components/timeline/timeline-view'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale as 'zh' | 'en')
  const t = await getTranslations('timeline')
  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

export default async function TimelinePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale as 'zh' | 'en')

  return (
    <Section>
      <Container>
        <SectionHeading titleKey="timeline.title" subtitleKey="timeline.subtitle" index="01" />
        <TimelineView items={timeline} locale={locale as 'zh' | 'en'} />
      </Container>
    </Section>
  )
}
