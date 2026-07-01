import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // 仅对非静态资源、非 API、非图片资源生效
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
