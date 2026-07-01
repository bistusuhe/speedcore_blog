import { generateRssXml } from '@/lib/seo'

export async function GET() {
  const xml = generateRssXml()
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
