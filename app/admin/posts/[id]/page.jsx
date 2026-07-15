import AdminPostForm from '../../../../src/views/admin/AdminPostForm'

export default async function Page({ params }) {
  const { id } = await params
  return <AdminPostForm postId={id} />
}
