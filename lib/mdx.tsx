import 'server-only'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code'
import type { ReactElement } from 'react'
import { MdxComponents } from '@/components/blog/mdx-components'

const prettyCodeOptions: PrettyCodeOptions = {
  theme: { dark: 'github-dark-dimmed', light: 'github-light' },
  keepBackground: true,
  defaultLang: 'plaintext',
  // 限制预加载的语言，减少 Shiki 初始化开销
  langs: [
    'typescript', 'tsx', 'javascript', 'jsx',
    'python', 'java', 'xml', 'hlsl',
    'json', 'yaml', 'bash', 'shell', 'css',
    'markdown', 'plaintext', 'text',
  ],
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
}

/** 渲染 MDX 字符串为 React 元素 */
export function renderMdx(source: string): ReactElement {
  return (
    <MDXRemote
      source={source}
      components={MdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMath],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { className: ['heading-anchor'] } }],
            rehypeKatex,
            [rehypePrettyCode, prettyCodeOptions],
          ],
        },
      }}
    />
  )
}
