import { getAllPosts } from '@/lib/posts'
import { getAllProjects } from '@/lib/projects'
import { getSearchIndex } from '@/lib/search-index'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(getSearchIndex(), {
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}

// 触发内容模块加载，确保 tree-shaking 不丢
export const revalidate = 3600
void getAllPosts
void getAllProjects
