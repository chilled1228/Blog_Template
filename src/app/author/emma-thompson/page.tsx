import { getBlogPostsByAuthor } from '@/lib/blogService';
import React from 'react';
import { Layout } from '@/components/layout';
import BlogPostsGrid from '@/components/ui/BlogPostsGrid';
import StructuredData from '@/components/ui/StructuredData';

const EmmaThompsonPage: React.FC = async () => {
  const posts = await getBlogPostsByAuthor('emma-thompson');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

  return (
    <Layout>
      <StructuredData slug="emma-thompson-page" />
      <div className="content-wrapper">
        <div className="page-header">
          <h1 className="page-title">Emma Thompson</h1>
          <p className="page-description">
            Frontend development expert passionate about React, modern JavaScript, and creating exceptional user experiences.
          </p>
        </div>
        <BlogPostsGrid posts={posts} />
      </div>
    </Layout>
  );
};

export default EmmaThompsonPage;