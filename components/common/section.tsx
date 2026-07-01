'use client'

import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { FadeUp } from '@/components/motion/motion'
import type { ReactNode } from 'react'

interface SectionHeadingProps {
  titleKey: string
  subtitleKey?: string
  align?: 'left' | 'center'
  className?: string
  index?: string
}

/** 通用区块标题（编号 + 主标 + 副标） */
export function SectionHeading({
  titleKey,
  subtitleKey,
  align = 'left',
  className,
  index,
}: SectionHeadingProps) {
  const t = useTranslations()
  return (
    <FadeUp
      className={cn(
        'mb-12 flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {index && (
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {index}
        </span>
      )}
      <h2 className="text-display-lg text-balance">{t(titleKey)}</h2>
      {subtitleKey && (
        <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
          {t(subtitleKey)}
        </p>
      )}
    </FadeUp>
  )
}

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
}

export function Section({ id, children, className }: SectionProps) {
  return (
    <section id={id} className={cn('py-20 md:py-28', className)}>
      {children}
    </section>
  )
}
