'use client'

import dynamicIconImports from 'lucide-react/dynamicIconImports'
import * as Lucide from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * 通过字符串名称渲染 lucide 图标
 * 动态加载，仅打包用到的图标
 */
type IconName = keyof typeof Lucide.icons

interface IconProps extends Lucide.LucideProps {
  name: string
  className?: string
}

export function Icon({ name, className, ...props }: IconProps) {
  const Comp = (Lucide as unknown as Record<string, Lucide.LucideIcon>)[name] as
    | Lucide.LucideIcon
    | undefined
  if (Comp) {
    return <Comp className={cn('h-5 w-5', className)} {...props} />
  }
  // 兜底：使用 Circle 图标
  const Fallback = Lucide.Circle
  void dynamicIconImports
  return <Fallback className={cn('h-5 w-5', className)} {...props} />
}

export type { IconName }
