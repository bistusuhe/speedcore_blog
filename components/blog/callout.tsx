import type { ReactNode } from 'react'
import { Info, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type CalloutType = 'info' | 'tip' | 'warning' | 'danger'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: ReactNode
}

/** 不同类型对应的图标与左边框配色（保持灰度为主，仅 warning/danger 用弱彩） */
const config: Record<
  CalloutType,
  { Icon: typeof Info; border: string; icon: string }
> = {
  info: { Icon: Info, border: 'border-l-foreground/40', icon: 'text-foreground/60' },
  tip: { Icon: CheckCircle, border: 'border-l-foreground', icon: 'text-foreground' },
  warning: {
    Icon: AlertTriangle,
    border: 'border-l-amber-500',
    icon: 'text-amber-600 dark:text-amber-400',
  },
  danger: {
    Icon: AlertCircle,
    border: 'border-l-red-500',
    icon: 'text-red-600 dark:text-red-400',
  },
}

/** MDX 内联提示框组件 */
export function Callout({ type = 'info', title, children }: CalloutProps) {
  const { Icon, border, icon } = config[type]
  return (
    <div
      className={cn(
        'my-6 rounded-r-xl border border-border border-l-4 bg-muted/40 p-4',
        border,
      )}
    >
      {title && (
        <div className="mb-1 flex items-center gap-2 font-semibold">
          <Icon className={cn('h-4 w-4', icon)} />
          <span>{title}</span>
        </div>
      )}
      <div className="text-sm text-muted-foreground [&>p]:m-0 [&>p+p]:mt-2">
        {children}
      </div>
    </div>
  )
}

export default Callout
