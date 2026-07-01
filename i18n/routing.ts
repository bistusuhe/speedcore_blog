import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const locales = ['zh', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'zh'

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
})

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
