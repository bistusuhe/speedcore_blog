'use client'

import { Link2, Twitter, Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCopy } from '@/hooks/use-copy'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

interface ShareButtonsProps {
  title: string
  slug: string
  locale: 'zh' | 'en'
}

/** 文章分享按钮（复制链接 + X/Twitter 分享） */
export function ShareButtons({ title, slug, locale }: ShareButtonsProps) {
  const t = useTranslations('blog')
  const tContact = useTranslations('contact')
  const { copied, copy } = useCopy()

  const url = `${siteConfig.url}/${locale}/blog/${slug}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title,
  )}&url=${encodeURIComponent(url)}`

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {t('share')}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => void copy(url)}
          aria-label={copied ? tContact('copied') : tContact('copy')}
          className={cn(
            'inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors',
            copied
              ? 'border-foreground bg-foreground text-background'
              : 'border-border bg-card text-foreground hover:border-foreground/40',
          )}
        >
          {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        </button>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter / X"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-foreground/40"
        >
          <Twitter className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

export default ShareButtons
