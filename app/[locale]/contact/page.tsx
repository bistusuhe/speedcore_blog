import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Container } from '@/components/common/container'
import { Section, SectionHeading } from '@/components/common/section'
import { ContactInfo } from '@/components/contact/contact-info'
import { ContactForm } from '@/components/contact/contact-form'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale as 'zh' | 'en')
  const t = await getTranslations('contact')
  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale as 'zh' | 'en')

  return (
    <Section>
      <Container>
        <SectionHeading titleKey="contact.title" subtitleKey="contact.subtitle" index="01" />

        <div className="grid gap-8 lg:grid-cols-2">
          <ContactInfo />
          <ContactForm />
        </div>
      </Container>
    </Section>
  )
}
