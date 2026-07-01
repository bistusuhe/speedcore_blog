'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Github, Mail } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { Container } from '@/components/common/container'

export function Footer() {
  const t = useTranslations()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-base font-semibold tracking-tight">{siteConfig.nameEn}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t('footer.desc')}</p>
          </div>

          <nav className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:text-foreground"
            >
              {t('nav.home')}
            </Link>
            <Link
              href="/blog"
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:text-foreground"
            >
              {t('nav.blog')}
            </Link>
            <Link
              href="/projects"
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:text-foreground"
            >
              {t('nav.projects')}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={siteConfig.author.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/80 transition hover:bg-muted hover:text-foreground"
            >
              <Github className="h-[18px] w-[18px]" />
            </a>
            <a
              href={`mailto:${siteConfig.author.email}`}
              aria-label="Email"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/80 transition hover:bg-muted hover:text-foreground"
            >
              <Mail className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>
            © {year} {siteConfig.nameEn}. {t('footer.rights')}
          </p>
          <p>{t('common.builtWith')}</p>
        </div>
      </Container>
    </footer>
  )
}
