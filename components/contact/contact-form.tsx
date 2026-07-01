'use client'

import { type FormEvent, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Input, Textarea } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FadeUp } from '@/components/motion/motion'
import { cn } from '@/lib/utils'

interface ContactMessage {
  name: string
  email: string
  message: string
  createdAt: string
}

type Errors = { name?: boolean; email?: boolean; message?: boolean }

/** 联系表单：无后端，留言存入 localStorage，提交后显示成功提示 */
export function ContactForm() {
  const t = useTranslations('contact')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [success, setSuccess] = useState(false)

  function validate(): boolean {
    const next: Errors = {}
    if (!name.trim()) next.name = true
    if (!email.trim()) next.email = true
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = true
    if (!message.trim()) next.message = true
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (!validate()) return

    const entry: ContactMessage = {
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    }
    try {
      const raw = localStorage.getItem('contact:messages')
      const list: ContactMessage[] = raw ? (JSON.parse(raw) as ContactMessage[]) : []
      list.push(entry)
      localStorage.setItem('contact:messages', JSON.stringify(list))
    } catch {
      /* localStorage 不可用时静默忽略 */
    }

    setName('')
    setEmail('')
    setMessage('')
    setSuccess(true)
    window.setTimeout(() => setSuccess(false), 4000)
  }

  const errorClass = (has: boolean) =>
    cn(has && 'border-red-500/60 focus-visible:ring-red-500/30')

  return (
    <FadeUp className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="space-y-2">
          <label htmlFor="contact-name" className="text-sm font-medium">
            {t('form.name')}
          </label>
          <Input
            id="contact-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('form.namePlaceholder')}
            aria-invalid={!!errors.name}
            className={errorClass(!!errors.name)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-email" className="text-sm font-medium">
            {t('form.email')}
          </label>
          <Input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('form.emailPlaceholder')}
            aria-invalid={!!errors.email}
            className={errorClass(!!errors.email)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-message" className="text-sm font-medium">
            {t('form.message')}
          </label>
          <Textarea
            id="contact-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('form.messagePlaceholder')}
            aria-invalid={!!errors.message}
            className={errorClass(!!errors.message)}
          />
        </div>

        {success && (
          <p className="rounded-xl bg-muted px-4 py-3 text-sm">{t('form.success')}</p>
        )}

        <Button type="submit" className="w-full">
          {t('form.submit')}
        </Button>
      </form>
    </FadeUp>
  )
}
