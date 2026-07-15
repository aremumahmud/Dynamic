import { NextResponse } from 'next/server'
import { requireAdmin } from '../../../../../src/lib/adminAuth'
import { getPostByIdForAdmin, updatePost, deletePost } from '../../../../../src/lib/blogService'

export async function GET(request, { params }) {
  try {
    await requireAdmin(request)
  } catch {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
  }

  const { id } = await params
  const post = await getPostByIdForAdmin(id)

  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ post })
}

export async function PATCH(request, { params }) {
  try {
    await requireAdmin(request)
  } catch {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
  }

  const { id } = await params
  const input = await request.json()
  await updatePost(id, input)
  return NextResponse.json({ success: true })
}

export async function DELETE(request, { params }) {
  try {
    await requireAdmin(request)
  } catch {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
  }

  const { id } = await params
  await deletePost(id)
  return NextResponse.json({ success: true })
}
