'use client'

import { Root, List, Trigger, Content } from '@radix-ui/react-tabs'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { cn } from '@/lib/utils'

const Tabs = Root

const TabsList = forwardRef<ElementRef<typeof List>, ComponentPropsWithoutRef<typeof List>>(
  ({ className, ...props }, ref) => (
    <List
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 p-1',
        className,
      )}
      {...props}
    />
  ),
)
TabsList.displayName = 'TabsList'

const TabsTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  ComponentPropsWithoutRef<typeof Trigger>
>(({ className, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-all',
      'data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-sm',
      'hover:text-foreground',
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = 'TabsTrigger'

const TabsContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
  <Content ref={ref} className={cn('mt-8 focus-visible:outline-none', className)} {...props} />
))
TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent }
