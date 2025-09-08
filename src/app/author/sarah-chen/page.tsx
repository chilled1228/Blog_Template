import { getBlogPostsByAuthor } from '@/lib/blogService';
import React from 'react';
import { Layout } from '@/components/layout';
import BlogPostsGrid from '@/components/ui/BlogPostsGrid';
import StructuredData from '@/components/ui/StructuredData';

const SarahChenPage: React.FC = async () => {
  const posts = await getBlogPostsByAuthor('sarah-chen');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

  return (
    <Layout>
      <StructuredData slug="sarah-chen-page" />
      <div className="content-wrapper">
        <div className="page-header">
          <h1 className="page-title">Sarah Chen</h1>
          <p className="page-description">
            Technology enthusiast and web development expert, sharing insights on the latest trends and innovations in the tech world.
          </p>
        </div>
        <BlogPostsGrid posts={posts} />
      </div>
    </Layout>
  );
};

export default SarahChenPage;