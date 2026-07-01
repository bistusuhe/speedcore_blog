import { getAllPosts } from '@/lib/posts'
import { getAllProjects } from '@/lib/projects'
import siteConfig from '@/config/site'
import { locales } from '@/i18n/routing'
import { isoDate } from '@/lib/utils'

// 静态路由：path 为空表示首页
const STATIC_ROUTES: { path: string; priority: string; changefreq: string }[] = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: 'blog', priority: '0.9', changefreq: 'daily' },
  { path: 'projects', priority: '0.9', changefreq: 'weekly' },
  { path: 'timeline', priority: '0.7', changefreq: 'monthly' },
  { path: 'contact', priority: '0.6', changefreq: 'monthly' },
  { path: 'search', priority: '0.5', changefreq: 'monthly' },
]

export async function GET() {
  const base = siteConfig.url.replace(/\/$/, '')
  const now = isoDate(new Date().toISOString())
  const urls: string[] = []

  for (const locale of locales) {
    // 静态页面
    for (const r of STATIC_ROUTES) {
      const loc = `${base}/${locale}${r.path ? `/${r.path}` : ''}`
      urls.push(
        `  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
      )
    }

    // 文章详情
    for (const post of getAllPosts()) {
      urls.push(
        `  <url>
    <loc>${base}/${locale}/blog/${post.slug}</loc>
    <lastmod>${isoDate(post.updated ?? post.date)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
      )
    }

    // 项目详情
    for (const project of getAllProjects()) {
      urls.push(
        `  <url>
    <loc>${base}/${locale}/projects/${project.slug}</loc>
    <lastmod>${isoDate(project.updated ?? project.date)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
      )
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
