import { Layout } from '@/components/layout';
import BlogPostPageSkeleton from '@/components/ui/BlogPostPageSkeleton';

export default function Loading() {
  return (
    <Layout>
      <BlogPostPageSkeleton />
    </Layout>
  );
}