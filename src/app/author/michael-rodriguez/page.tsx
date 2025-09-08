import { getBlogPostsByAuthor } from '@/lib/blogService';
import React from 'react';
import { Layout } from '@/components/layout';
import BlogPostsGrid from '@/components/ui/BlogPostsGrid';
import StructuredData from '@/components/ui/StructuredData';

const MichaelRodriguezPage: React.FC = async () => {
  const posts = await getBlogPostsByAuthor('michael-rodriguez');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

  return (
    <Layout>
      <StructuredData slug="michael-rodriguez-page" />
      <div className="content-wrapper">
        <div className="page-header">
          <h1 className="page-title">Michael Rodriguez</h1>
          <p className="page-description">
            Backend development specialist with expertise in Node.js, Express, and scalable API architecture.
          </p>
        </div>
        <BlogPostsGrid posts={posts} />
      </div>
    </Layout>
  );
};

export default MichaelRodriguezPage;