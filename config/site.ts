import type { SiteConfig } from '@/types'

/**
 * 站点核心配置
 * 修改此处即可全局更新站点信息
 */
export const siteConfig: SiteConfig = {
  name: 'speedcore',
  nameEn: 'Su He',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  description:
    'speedcore（Su He）的个人技术博客与项目展示站。AI Agent Developer · Game Developer Lover.',
  locale: 'zh',
  author: {
    name: 'speedcore',
    nameEn: 'Su He',
    email: process.env.NEXT_PUBLIC_EMAIL ?? 'suhe@example.com',
    github: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'your-username'}`,
    avatar: '/avatar/avatar.svg',
    logo: '/logo/logo.svg',
    wechatQr: process.env.NEXT_PUBLIC_WECHAT_QR ?? '/images/wechat-qr.png',
  },
  social: {
    github: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'your-username'}`,
    email: process.env.NEXT_PUBLIC_EMAIL ?? 'suhe@example.com',
  },
}

export default siteConfig
