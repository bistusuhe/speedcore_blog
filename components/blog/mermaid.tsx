'use client'

import { useEffect, useRef, useState } from 'react'
import { nanoid } from 'nanoid'

interface MermaidProps {
  chart: string
}

/** Mermaid 图表渲染（按需动态加载，避免首屏体积） */
export function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function run() {
      try {
        const { default: mermaid } = await import('mermaid')
        const id = `mermaid-${nanoid(8)}`
        const theme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'default'
        mermaid.initialize({ startOnLoad: false, theme })
        const { svg } = await mermaid.render(id, chart)
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg
          setError(null)
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err))
      }
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [chart])

  if (error) {
    return (
      <div className="mermaid-wrap">
        <pre className="w-full overflow-x-auto text-xs text-muted-foreground">
          {chart}
        </pre>
      </div>
    )
  }

  return (
    <div className="mermaid-wrap">
      <div ref={containerRef} className="mermaid-svg w-full" />
    </div>
  )
}

export default Mermaid
