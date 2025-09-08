import { getBlogPostsByCategory } from '@/lib/blogService';
import React from 'react';
import { Layout } from '@/components/layout';
import BlogPostsGrid from '@/components/ui/BlogPostsGrid';
import StructuredData from '@/components/ui/StructuredData';

const BackendPage: React.FC = async () => {
  const posts = await getBlogPostsByCategory('backend');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

  return (
    <Layout>
      <StructuredData slug="backend-page" />
      <div className="content-wrapper">
        <div className="page-header">
          <h1 className="page-title">Backend</h1>
          <p className="page-description">
            Dive into server-side development, API design, database architecture, and scalable backend solutions for modern web applications.
          </p>
        </div>
        <BlogPostsGrid posts={posts} />
      </div>
    </Layout>
  );
};

export default BackendPage;