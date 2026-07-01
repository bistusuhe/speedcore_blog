'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('theme')

  useEffect(() => setMounted(true), [])

  const cycle = () => {
    const order = ['light', 'dark', 'system'] as const
    const current = order.indexOf((theme as 'light' | 'dark' | 'system') ?? 'system')
    setTheme(order[(current + 1) % order.length]!)
  }

  if (!mounted) {
    return <div className={cn('h-9 w-9', className)} aria-hidden />
  }

  const Icon = theme === 'system' ? Monitor : resolvedTheme === 'dark' ? Moon : Sun

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={t('toggle')}
      title={t('toggle')}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/80 transition hover:bg-muted hover:text-foreground',
        className,
      )}
    >
      <Icon className="h-[18px] w-[18px]" />
    </button>
  )
}
