import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'default' | 'narrow' | 'wide'
}

/** 内容容器，统一水平留白与最大宽度 */
export function Container({ children, className, size = 'default' }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-6 md:px-8',
        size === 'narrow' && 'max-w-5xl',
        size === 'default' && 'max-w-6xl',
        size === 'wide' && 'max-w-[1400px]',
        className,
      )}
    >
      {children}
    </div>
  )
}
