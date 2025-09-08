import { getBlogPostsByCategory } from '@/lib/blogService';
import React from 'react';
import { Layout } from '@/components/layout';
import BlogPostsGrid from '@/components/ui/BlogPostsGrid';
import StructuredData from '@/components/ui/StructuredData';

const FrontendPage: React.FC = async () => {
  const posts = await getBlogPostsByCategory('frontend');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

  return (
    <Layout>
      <StructuredData slug="frontend-page" />
      <div className="content-wrapper">
        <div className="page-header">
          <h1 className="page-title">Frontend</h1>
          <p className="page-description">
            Discover modern frontend development techniques, JavaScript frameworks, UI/UX best practices, and cutting-edge web technologies.
          </p>
        </div>
        <BlogPostsGrid posts={posts} />
      </div>
    </Layout>
  );
};

export default FrontendPage;