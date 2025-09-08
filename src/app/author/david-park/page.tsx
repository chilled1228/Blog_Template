import { getBlogPostsByAuthor } from '@/lib/blogService';
import React from 'react';
import { Layout } from '@/components/layout';
import BlogPostsGrid from '@/components/ui/BlogPostsGrid';
import StructuredData from '@/components/ui/StructuredData';

const DavidParkPage: React.FC = async () => {
  const posts = await getBlogPostsByAuthor('david-park');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

  return (
    <Layout>
      <StructuredData slug="david-park-page" />
      <div className="content-wrapper">
        <div className="page-header">
          <h1 className="page-title">David Park</h1>
          <p className="page-description">
            CSS and design systems specialist, helping developers master modern web layout techniques and styling best practices.
          </p>
        </div>
        <BlogPostsGrid posts={posts} />
      </div>
    </Layout>
  );
};

export default DavidParkPage;