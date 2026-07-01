'use client'

import { useTranslations } from 'next-intl'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { QrCode } from 'lucide-react'
import siteConfig from '@/config/site'

/** 微信联系方式：点击按钮弹出二维码 */
export function WechatDialog() {
  const t = useTranslations('contact')
  const qr = siteConfig.author.wechatQr
  const hasQr = Boolean(qr)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <QrCode className="h-4 w-4" /> {t('wechat')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('wechat')}</DialogTitle>
          <DialogDescription>{t('wechatTip')}</DialogDescription>
        </DialogHeader>

        {hasQr ? (
          <div className="flex flex-col items-center gap-4 py-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qr}
              alt={t('wechat')}
              className="h-56 w-56 rounded-xl border border-border object-cover"
            />
            <p className="text-center text-sm text-muted-foreground">{t('wechatTip')}</p>
          </div>
        ) : (
          <p className="py-6 text-center text-sm text-muted-foreground">{t('wechatTip')}</p>
        )}
      </DialogContent>
    </Dialog>
  )
}
