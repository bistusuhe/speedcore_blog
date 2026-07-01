import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Container } from '@/components/common/container'
import { Section, SectionHeading } from '@/components/common/section'
import { Loading } from '@/components/common/loading'
import { SearchClient } from '@/components/search/search-client'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale as 'zh' | 'en')
  const t = await getTranslations('search')
  return {
    title: t('title'),
  }
}

export default async function SearchPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale as 'zh' | 'en')

  return (
    <Section>
      <Container>
        <SectionHeading titleKey="search.title" index="01" />
        <Suspense fallback={<Loading />}>
          <SearchClient />
        </Suspense>
      </Container>
    </Section>
  )
}
