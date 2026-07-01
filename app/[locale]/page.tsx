import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Hero } from '@/components/home/hero'
import { About } from '@/components/home/about'
import { Skills } from '@/components/home/skills'
import { LatestProjects } from '@/components/home/latest-projects'
import { LatestArticles } from '@/components/home/latest-articles'
import { Internship } from '@/components/home/internship'
import { Awards } from '@/components/home/awards'
import { Interests } from '@/components/home/interests'
import { GitHub } from '@/components/home/github'
import { TechStack } from '@/components/home/techstack'
import type { Locale } from '@/i18n/routing'

interface HomeProps {
  params: Promise<{ locale: string }>
}

/** 首页元数据：使用 i18n metadata.* */
export async function generateMetadata({
  params,
}: HomeProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  return (
    <>
      <Hero />
      <About locale={locale as Locale} />
      <Skills />
      <LatestProjects />
      <LatestArticles />
      <Internship locale={locale as Locale} />
      <Awards locale={locale as Locale} />
      <Interests locale={locale as Locale} />
      <GitHub />
      <TechStack locale={locale as Locale} />
    </>
  )
}
