import { NextResponse } from 'next/server'
import { requireAdmin } from '../../../../src/lib/adminAuth'
import { getAllPostsForAdmin, createPost } from '../../../../src/lib/blogService'

export async function GET(request) {
  try {
    await requireAdmin(request)
  } catch {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
  }

  const posts = await getAllPostsForAdmin()
  return NextResponse.json({ posts })
}

export async function POST(request) {
  try {
    await requireAdmin(request)
  } catch {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
  }

  const input = await request.json()

  if (!input.title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 })
  }

  const id = await createPost(input)
  return NextResponse.json({ id }, { status: 201 })
}
