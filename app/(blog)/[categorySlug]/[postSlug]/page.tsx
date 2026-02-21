

export default async function PostPage({
  params,
}: {
  params: Promise<{ categorySlug: string; postSlug: string }>;
}) {
  const p = await params;

  return <div>hye</div>;
}
