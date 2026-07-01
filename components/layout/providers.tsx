'use client'

import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

/** 主题 Provider（Dark / Light / System） */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </ThemeProvider>
  )
}
