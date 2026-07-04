import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { createHash } from 'crypto'
import { kv } from '@/lib/kv'

function hashIp(ip: string): string {
  return createHash('sha256').update(ip).digest('hex').slice(0, 16)
}

const viewKey = (slug: string) => `pageviews:${slug}`

export async function POST(request: Request) {
  try {
    const { slug } = (await request.json()) as { slug?: string }
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
    }

    const headersList = await headers()
    const forwarded = headersList.get('x-forwarded-for')
    const ip = forwarded?.split(',')[0]?.trim() ?? '127.0.0.1'
    const fingerprint = hashIp(ip)

    if (kv) {
      await kv.pfadd(viewKey(slug), fingerprint)
      const count = await kv.pfcount(viewKey(slug))
      return NextResponse.json({ count })
    }

    return NextResponse.json({ count: 0 })
  } catch {
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}
