import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { createHash } from 'crypto'
import { kv } from '@/lib/kv'

function hashIp(ip: string): string {
  return createHash('sha256').update(ip).digest('hex').slice(0, 16)
}

const likeCountKey = (slug: string) => `likes:${slug}`
const likedSetKey = (slug: string) => `liked:${slug}`

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

    if (!kv) {
      return NextResponse.json({ count: 0, liked: false })
    }

    const alreadyLiked = await kv.sismember(likedSetKey(slug), fingerprint)

    if (alreadyLiked) {
      await kv.srem(likedSetKey(slug), fingerprint)
      const count = await kv.decr(likeCountKey(slug))
      return NextResponse.json({ count, liked: false })
    }

    await kv.sadd(likedSetKey(slug), fingerprint)
    const count = await kv.incr(likeCountKey(slug))
    return NextResponse.json({ count, liked: true })
  } catch {
    return NextResponse.json({ count: 0, liked: false }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
    }

    const headersList = await headers()
    const forwarded = headersList.get('x-forwarded-for')
    const ip = forwarded?.split(',')[0]?.trim() ?? '127.0.0.1'
    const fingerprint = hashIp(ip)

    if (!kv) {
      return NextResponse.json({ count: 0, liked: false })
    }

    const [count, liked] = await Promise.all([
      kv.get<number>(likeCountKey(slug)),
      kv.sismember(likedSetKey(slug), fingerprint),
    ])

    return NextResponse.json({ count: count ?? 0, liked: liked === 1 })
  } catch {
    return NextResponse.json({ count: 0, liked: false }, { status: 500 })
  }
}
