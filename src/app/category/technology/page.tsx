import { getBlogPostsByCategory } from '@/lib/blogService';
import React from 'react';
import { Layout } from '@/components/layout';
import BlogPostsGrid from '@/components/ui/BlogPostsGrid';
import StructuredData from '@/components/ui/StructuredData';

const TechnologyPage: React.FC = async () => {
  const posts = await getBlogPostsByCategory('technology');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

  return (
    <Layout>
      <StructuredData slug="technology-page" />
      <div className="content-wrapper">
        <div className="page-header">
          <h1 className="page-title">Technology</h1>
          <p className="page-description">
            Explore the latest technology trends, innovations, and insights that are shaping the future of web development and digital experiences.
          </p>
        </div>
        <BlogPostsGrid posts={posts} />
      </div>
    </Layout>
  );
};

export default TechnologyPage;