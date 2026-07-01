'use client'

import { type ComponentType, type ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import { Github, Mail, QrCode, ExternalLink, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCopy } from '@/hooks/use-copy'
import { WechatDialog } from './wechat-dialog'
import siteConfig from '@/config/site'

/** 单张联系方式卡片：图标 + 标题 + 自定义内容 */
function ChannelCard({
  icon: Icon,
  label,
  children,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  children: ReactNode
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/20">
      <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4" /> {label}
      </div>
      {children}
    </div>
  )
}

/** 联系方式信息卡组：GitHub / Email（带复制）/ WeChat（弹窗） */
export function ContactInfo() {
  const t = useTranslations('contact')
  const { copied, copy } = useCopy()
  const email = siteConfig.author.email
  const github = siteConfig.author.github
  const githubLabel = github.replace(/^https?:\/\//, '')

  return (
    <div className="space-y-4">
      <ChannelCard icon={Github} label={t('github')}>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 font-medium hover:underline"
        >
          <span className="truncate">{githubLabel}</span>
          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition group-hover:text-foreground" />
        </a>
      </ChannelCard>

      <ChannelCard icon={Mail} label={t('email')}>
        <div className="flex items-center justify-between gap-3">
          <span className="truncate font-medium">{email}</span>
          <Button variant="outline" size="sm" onClick={() => copy(email)}>
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copied ? t('copied') : t('copy')}
          </Button>
        </div>
      </ChannelCard>

      <ChannelCard icon={QrCode} label={t('wechat')}>
        <WechatDialog />
      </ChannelCard>
    </div>
  )
}
