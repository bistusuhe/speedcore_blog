import type { Metadata } from 'next'
import { siteConfig } from './site'

/** 默认 SEO metadata 生成器 */
export function createMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
}: {
  title?: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
} = {}): Metadata {
  const fullTitle = title
    ? `${title} · ${siteConfig.nameEn}`
    : `${siteConfig.name} · ${siteConfig.nameEn} — AI Agent Developer & Game Developer Lover`
  const desc = description ?? siteConfig.description
  const url = `${siteConfig.url}${path}`
  const ogImage = image ?? '/images/og-default.svg'

  return {
    title: fullTitle,
    description: desc,
    keywords: ['Su He', 'AI Agent', 'Unity', 'Java', 'Data Science', '博客', 'Blog'],
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      types: {
        'application/rss+xml': [{ url: '/rss.xml', title: `${siteConfig.nameEn} RSS` }],
      },
    },
    openGraph: {
      type: 'website',
      url,
      title: fullTitle,
      description: desc,
      siteName: siteConfig.nameEn,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.nameEn }],
      locale: 'zh_CN',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  }
}

export default createMetadata
