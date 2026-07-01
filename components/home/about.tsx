import { getTranslations } from 'next-intl/server'
import { Section, SectionHeading } from '@/components/common/section'
import { Container } from '@/components/common/container'
import { FadeUp } from '@/components/motion/motion'
import { siteConfig } from '@/config/site'
import type { Locale } from '@/i18n/routing'

interface AboutProps {
  locale: Locale
}

/** 将 bio 中 **加粗** 片段解析为 <strong> */
function renderBio(bio: string) {
  const parts = bio.split(/\*\*(.+?)\*\*/)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

/** 首页「关于我」：头像 + bio + 教育经历 + Logo */
export async function About({ locale }: AboutProps) {
  const t = await getTranslations('about')
  const bio = t('bio')

  return (
    <Section id="about">
      <Container size="narrow">
        <SectionHeading titleKey="about.title" subtitleKey="about.subtitle" index="01" />

        <div className="flex flex-col items-start gap-10 md:flex-row md:items-center">
          {/* 头像 */}
          <FadeUp className="flex shrink-0 flex-col items-center gap-3">
            <div className="rounded-full border border-border p-1.5 bg-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={siteConfig.author.avatar}
                alt={locale === 'zh' ? siteConfig.author.name : siteConfig.author.nameEn}
                width={120}
                height={120}
                className="h-[120px] w-[120px] rounded-full object-cover"
              />
            </div>
            {/* 小 Logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteConfig.author.logo}
              alt="logo"
              className="h-6 w-auto opacity-70"
              aria-hidden
            />
          </FadeUp>

          {/* 右侧文本 */}
          <div className="flex-1 space-y-6">
            <FadeUp delay={0.1}>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {renderBio(bio)}
              </p>
            </FadeUp>

            <FadeUp delay={0.18}>
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {t('education')}
                </p>
                <p className="mt-2 text-base font-medium text-foreground">{t('major')}</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default About
