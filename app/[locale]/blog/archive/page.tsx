import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { Container } from '@/components/common/container'
import { Section, SectionHeading } from '@/components/common/section'
import { Reveal, RevealItem } from '@/components/motion/motion'
import { getPostsArchive } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  return { title: t('archive') }
}

export default async function ArchivePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale as 'zh' | 'en')
  const t = await getTranslations('blog')
  const activeLocale = locale as 'zh' | 'en'
  const archive = getPostsArchive()

  return (
    <Section>
      <Container size="narrow">
        <SectionHeading titleKey="blog.archive" />

        {archive.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">{t('empty')}</p>
        ) : (
          <Reveal className="space-y-16">
            {archive.map((group) => (
              <RevealItem key={group.year}>
                <section>
                  <h2 className="mb-6 text-display-lg font-bold tracking-tight">
                    {group.year}
                  </h2>
                  <ul className="divide-y divide-border border-y border-border">
                    {group.posts.map((post) => (
                      <li key={post.slug}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group flex items-center gap-4 py-4 transition-colors hover:bg-muted/40"
                        >
                          <time
                            dateTime={post.date}
                            className="w-28 shrink-0 font-mono text-xs uppercase tracking-widest text-muted-foreground"
                          >
                            {formatDate(post.date, activeLocale)}
                          </time>
                          <span className="font-medium tracking-tight transition-colors group-hover:text-foreground">
                            {post.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              </RevealItem>
            ))}
          </Reveal>
        )}
      </Container>
    </Section>
  )
}
