import type { ReactNode } from 'react'
import type { Locale } from '@/i18n/routing'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '../globals.css'

import { Providers } from '@/components/layout/providers'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { MusicPlayer } from '@/components/common/music-player'
import { MouseGlow } from '@/components/motion/mouse-glow'
import siteConfig from '@/config/site'
import { websiteJsonLd, personJsonLd } from '@/lib/seo'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) notFound()
  const activeLocale = locale as Locale
  // 启用静态渲染
  setRequestLocale(activeLocale)
  const messages = await getMessages()

  return (
    <html lang={activeLocale} suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased grain`}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {/* JSON-LD 结构化数据 */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
            />

            <MouseGlow />
            <Header />
            <main className="relative z-10 min-h-screen pt-16">{children}</main>
            <Footer />
            <MusicPlayer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export const metadata = {
  title: {
    default: `${siteConfig.name} · ${siteConfig.nameEn} — AI Agent Developer & Game Developer Lover`,
    template: `%s · ${siteConfig.nameEn}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
}
