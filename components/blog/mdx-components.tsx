import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  ReactNode,
  ThHTMLAttributes,
} from 'react'
import { Callout } from '@/components/blog/callout'
import { Mermaid } from '@/components/blog/mermaid'

/** MDX 通用子节点类型 */
interface MDXProps {
  children?: ReactNode
}

/** MDX 原生标签组件映射 */
export const MdxComponents = {
  h1: ({ children }: MDXProps) => (
    <h1 className="mt-10 mb-6 scroll-mt-24 text-3xl font-bold tracking-tight">{children}</h1>
  ),
  h2: ({ children }: MDXProps) => (
    <h2 className="mt-12 mb-4 scroll-mt-24 text-2xl font-semibold tracking-tight">{children}</h2>
  ),
  h3: ({ children }: MDXProps) => (
    <h3 className="mt-10 mb-3 scroll-mt-24 text-xl font-semibold tracking-tight">{children}</h3>
  ),
  h4: ({ children }: MDXProps) => (
    <h4 className="mt-8 mb-3 scroll-mt-24 text-lg font-semibold tracking-tight">{children}</h4>
  ),
  h5: ({ children }: MDXProps) => (
    <h5 className="mt-6 mb-2 scroll-mt-24 text-base font-semibold tracking-tight">{children}</h5>
  ),
  h6: ({ children }: MDXProps) => (
    <h6 className="mt-6 mb-2 scroll-mt-24 text-sm font-semibold tracking-tight text-muted-foreground">
      {children}
    </h6>
  ),
  p: ({ children }: MDXProps) => <p className="my-4 leading-7">{children}</p>,
  a: ({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
    >
      {children}
    </a>
  ),
  ul: ({ children }: MDXProps) => (
    <ul className="my-4 ml-6 list-disc space-y-1.5 leading-7">{children}</ul>
  ),
  ol: ({ children }: MDXProps) => (
    <ol className="my-4 ml-6 list-decimal space-y-1.5 leading-7">{children}</ol>
  ),
  li: ({ children }: MDXProps) => <li className="pl-1">{children}</li>,
  blockquote: ({ children }: MDXProps) => (
    <blockquote className="my-6 border-l-4 border-foreground/30 pl-4 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: HTMLAttributes<HTMLElement>) => (
    <code {...props}>{children}</code>
  ),
  // 不覆盖 pre，让 rehype-pretty-code 的 figure 结构自行处理
  img: ({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) =>
    src ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...props}
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        className="my-6 rounded-xl border border-border"
      />
    ) : null,
  table: ({ children }: MDXProps) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children, ...props }: ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      {...props}
      className="border-b border-border bg-muted/50 px-4 py-2 text-left font-semibold"
    >
      {children}
    </th>
  ),
  td: ({ children }: MDXProps) => (
    <td className="border-b border-border px-4 py-2 align-top">{children}</td>
  ),
  hr: () => <hr className="my-8 border-border" />,
  Callout,
  Mermaid,
}

export default MdxComponents
