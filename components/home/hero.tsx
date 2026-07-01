'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { ChevronDown, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FadeUp } from '@/components/motion/motion'
import { siteConfig } from '@/config/site'

/** 首页 Hero：全屏大字 + CTA + 渐变背景 + 向下滚动提示 */
export function Hero() {
  const t = useTranslations('hero')

  return (
    <section
      aria-label={t('name')}
      className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden"
    >
      {/* 背景渐变 blob + 深色遮罩 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/5 blur-3xl animate-blob" />
        <div className="absolute -right-20 top-1/4 h-[40vmin] w-[40vmin] rounded-full bg-foreground/[0.03] blur-3xl animate-blob [animation-delay:-6s]" />
        <div className="absolute -left-20 bottom-1/4 h-[36vmin] w-[36vmin] rounded-full bg-foreground/[0.03] blur-3xl animate-blob [animation-delay:-12s]" />
        {/* 底部柔和遮罩，让内容更聚焦 */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background" />
      </div>

      <div className="mx-auto w-full max-w-4xl px-6 py-24 text-center md:px-8">
        {/* 主名 */}
        <FadeUp>
          <h1 className="text-display-2xl text-balance">{t('name')}</h1>
        </FadeUp>

        {/* 英文名 */}
        <FadeUp delay={0.08}>
          <p className="mt-3 font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground md:text-base">
            {t('nameEn')}
          </p>
        </FadeUp>

        {/* Tagline */}
        <FadeUp delay={0.16}>
          <p className="mt-8 text-lg font-medium tracking-tight text-foreground/90 md:text-xl">
            {t('tagline')}
          </p>
        </FadeUp>

        {/* 副标 */}
        <FadeUp delay={0.24}>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-sm text-muted-foreground md:text-base">
            {t('subtitle')}
          </p>
        </FadeUp>

        {/* CTA 按钮，stagger 入场 */}
        <FadeUp delay={0.32}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/#about">{t('cta.about')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/blog">{t('cta.blog')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={siteConfig.author.github} target="_blank" rel="noopener noreferrer">
                {t('cta.github')}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href="/contact">{t('cta.contact')}</Link>
            </Button>
          </div>
        </FadeUp>
      </div>

      {/* 向下滚动提示，chevron 摇晃 */}
      <FadeUp delay={0.5} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a
          href="#about"
          className="group flex flex-col items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="font-mono uppercase tracking-widest">{t('scroll')}</span>
          <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden />
        </a>
      </FadeUp>
    </section>
  )
}

export default Hero
