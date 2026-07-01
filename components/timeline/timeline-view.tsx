import { getTranslations } from 'next-intl/server'
import { Reveal, RevealItem } from '@/components/motion/motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TimelineItem } from '@/types'

// 按 type 区分的圆点颜色（保持低饱和）
const dotColor: Record<TimelineItem['type'], string> = {
  study: 'bg-foreground',
  contest: 'bg-blue-500',
  internship: 'bg-emerald-500',
  award: 'bg-amber-500',
  project: 'bg-violet-500',
}

interface TimelineViewProps {
  items: TimelineItem[]
  locale: 'zh' | 'en'
}

/** 竖向时间轴：左侧竖线 + 圆点 + 右侧卡片，从上到下 stagger 入场 */
export async function TimelineView({ items, locale }: TimelineViewProps) {
  const t = await getTranslations('timeline')

  return (
    <Reveal className="relative border-l border-border pl-8">
      {items.map((item, i) => (
        <RevealItem key={`${item.date}-${i}`} className="relative mb-10 last:mb-0">
          {/* 圆点：定位到左侧竖线上 */}
          <span
            className={cn(
              'absolute -left-[38px] top-1.5 h-3 w-3 rounded-full ring-4 ring-background',
              dotColor[item.type],
            )}
          />

          <div className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/20">
            <div className="mb-2 flex items-center gap-3">
              <span className="font-mono text-xs text-muted-foreground">{item.date}</span>
              <Badge variant="outline">{t(`types.${item.type}`)}</Badge>
            </div>

            <h3 className="mb-1.5 text-lg font-semibold leading-snug tracking-tight">
              {item.title[locale]}
            </h3>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.description[locale]}
            </p>

            {item.link && (
              <Button asChild variant="outline" size="sm" className="mt-4">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  {item.link.replace(/^https?:\/\//, '')}
                </a>
              </Button>
            )}
          </div>
        </RevealItem>
      ))}
    </Reveal>
  )
}
