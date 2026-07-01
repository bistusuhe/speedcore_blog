import { NextResponse } from 'next/server'
import { getGitHubStats } from '@/lib/github'

export async function GET() {
  try {
    const stats = await getGitHubStats()
    return NextResponse.json(stats, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    })
  } catch {
    return NextResponse.json({ error: 'failed' }, { status: 502 })
  }
}
