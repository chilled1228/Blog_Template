import { getBlogPostsByCategory } from '@/lib/blogService';
import React from 'react';
import { Layout } from '@/components/layout';
import BlogPostsGrid from '@/components/ui/BlogPostsGrid';
import StructuredData from '@/components/ui/StructuredData';

const CssPage: React.FC = async () => {
  const posts = await getBlogPostsByCategory('css');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

  return (
    <Layout>
      <StructuredData slug="css-page" />
      <div className="content-wrapper">
        <div className="page-header">
          <h1 className="page-title">CSS</h1>
          <p className="page-description">
            Master CSS layout techniques, styling best practices, responsive design, and modern CSS features for beautiful web interfaces.
          </p>
        </div>
        <BlogPostsGrid posts={posts} />
      </div>
    </Layout>
  );
};

export default CssPage;