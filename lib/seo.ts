import 'server-only'
import { siteConfig } from '@/config/site'
import { getAllPosts } from './posts'
import { isoDate } from './utils'

/** RSS 2.0 feed 生成 */
export function generateRssXml(): string {
  const posts = getAllPosts()
  const items = posts
    .map(
      (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${siteConfig.url}/zh/blog/${p.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/zh/blog/${p.slug}</guid>
      <description><![CDATA[${p.description}]]></description>
      <category>${p.category}</category>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    </item>`,
    )
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteConfig.name} · ${siteConfig.nameEn}]]></title>
    <link>${siteConfig.url}</link>
    <description><![CDATA[${siteConfig.description}]]></description>
    <language>zh-CN</language>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`
}

/** JSON-LD Person 结构化数据 */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    alternateName: siteConfig.author.nameEn,
    url: siteConfig.url,
    email: `mailto:${siteConfig.author.email}`,
    sameAs: [siteConfig.author.github],
    jobTitle: 'AI Agent Developer',
    description: siteConfig.description,
  }
}

/** JSON-LD Article 结构化数据 */
export function articleJsonLd(post: {
  title: string
  description: string
  date: string
  slug: string
  category: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: isoDate(post.date),
    dateModified: isoDate(post.date),
    url: `${siteConfig.url}/zh/blog/${post.slug}`,
    author: { '@type': 'Person', name: siteConfig.author.name },
    publisher: { '@type': 'Person', name: siteConfig.author.name },
    articleSection: post.category,
    mainEntityOfPage: `${siteConfig.url}/zh/blog/${post.slug}`,
  }
}

/** JSON-LD Website 结构化数据 */
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.nameEn,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/zh/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}
