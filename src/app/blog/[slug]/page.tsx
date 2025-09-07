import { getBlogPostBySlug } from '@/lib/blogService';
import { notFound } from 'next/navigation';
import React from 'react';
import { Layout } from '@/components/layout';
import BlogContentRenderer from '@/components/ui/BlogContentRenderer';
import StructuredData from '@/components/ui/StructuredData';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const BlogPostPage: React.FC<BlogPostPageProps> = async ({ params }) => {
  const { slug } = params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Layout>
      <StructuredData slug={slug} />
      <div className="blog-container">
        <div className="blog-content-wrapper">
          <article className="blog-article">
            {/* Featured Image */}
            <div className="blog-featured-image">
              <img 
                src={post.image} 
                alt={post.title}
                width="800"
                height="400"
                style={{ width: '100%', height: 'auto' }}
                loading="eager"
              />
            </div>

            {/* Title */}
            <h1 className="blog-main-title">{post.title}</h1>

            {/* Author Section */}
            <div className="blog-author-section">
              <div className="blog-author-avatar">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=6366f1&color=fff&size=48`} 
                  alt={post.author}
                  width="24"
                  height="24"
                />
              </div>
              <div className="blog-author-info">
                <span>By </span>
                <a href={post.author_url} className="blog-author-link">{post.author}</a>
              </div>
              <div className="blog-meta-divider">•</div>
              <div className="blog-category-section">
                <a href={post.category_url} className="blog-category-link">
                  {post.category}
                </a>
              </div>
              <div className="blog-meta-divider">|</div>
              <div className="blog-date-section">
                <time dateTime={post.datetime}>{post.date}</time>
              </div>
            </div>

            {/* Content */}
            <div className="blog-content">
              {post.content ? (
                <BlogContentRenderer content={post.content} />
              ) : (
                <p>Content will be added soon...</p>
              )}
            </div>

            {/* Author Footer */}
            <div className="blog-author-footer">
              <div className="blog-author-avatar-large">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=6366f1&color=fff&size=96`} 
                  alt={post.author}
                  width="48"
                  height="48"
                />
              </div>
              <div className="blog-author-footer-info">
                <span>By </span>
                <a href={post.author_url} className="blog-author-footer-link">{post.author}</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPostPage;