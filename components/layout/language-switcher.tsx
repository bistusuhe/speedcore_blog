'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { Languages } from 'lucide-react'
import { useState, useTransition } from 'react'
import { locales, type Locale } from '@/i18n/routing'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const t = useTranslations('language')

  const switchTo = (next: Locale) => {
    if (next === locale) {
      setOpen(false)
      return
    }
    // pathname 形如 /zh/blog，替换首段
    const segments = pathname.split('/')
    segments[1] = next
    startTransition(() => {
      router.replace(segments.join('/') || `/${next}`)
      setOpen(false)
    })
  }

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t('toggle')}
        aria-expanded={open}
        disabled={isPending}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/80 transition hover:bg-muted hover:text-foreground"
      >
        <Languages className="h-[18px] w-[18px]" />
      </button>
      {open && (
        <>
          <button
            aria-hidden
            tabIndex={-1}
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-32 overflow-hidden rounded-xl border border-border bg-card p-1 shadow-xl">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => switchTo(l)}
                className={cn(
                  'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition hover:bg-muted',
                  l === locale && 'bg-muted font-medium',
                )}
              >
                {t(l)}
                {l === locale && <span className="h-1.5 w-1.5 rounded-full bg-foreground" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
