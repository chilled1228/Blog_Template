import { getBlogPostsByAuthor } from '@/lib/blogService';
import { notFound } from 'next/navigation';
import React from 'react';
import { Layout } from '@/components/layout';
import BlogPostsGrid from '@/components/ui/BlogPostsGrid';
import StructuredData from '@/components/ui/StructuredData';

interface AuthorPageProps {
  params: Promise<{
    author: string;
  }>;
}

const AuthorPage: React.FC<AuthorPageProps> = async ({ params }) => {
  const { author } = await params;
  const posts = await getBlogPostsByAuthor(author);

  if (posts.length === 0) {
    notFound();
  }

  const formattedAuthor = author.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <Layout>
      <StructuredData slug={`${author}-page`} />
      <div className="blog-container">
        <div className="blog-content-wrapper">
          <div className="author-header">
            <h1 className="author-title">{formattedAuthor}</h1>
            <p className="author-description">
              Explore articles written by {formattedAuthor}
            </p>
          </div>
          <BlogPostsGrid posts={posts} />
        </div>
      </div>
    </Layout>
  );
};

export default AuthorPage;