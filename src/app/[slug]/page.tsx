import { getBlogPostBySlug } from '@/lib/blogService';
import { notFound } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import { Layout } from '@/components/layout';
import BlogContentRenderer from '@/components/ui/BlogContentRenderer';
import StructuredData from '@/components/ui/StructuredData';
import RelatedPosts from '@/components/ui/RelatedPosts';
import ScrollToTop from '@/components/ui/ScrollToTop';
import MobileTableOfContents from '@/components/ui/MobileTableOfContents';
import { createMetadata, generateArticleJsonLd } from '@/lib/seo';
import { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  // Include unpublished posts to handle drafts properly
  const post = await getBlogPostBySlug(slug, true);

  if (!post) {
    return createMetadata({
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
      noIndex: true,
    });
  }

  const publishedDate = post.published_at || post.created_at || new Date().toISOString();
  const modifiedDate = post.updated_at || publishedDate;
  
  // If post is draft, set noIndex to prevent search engine indexing
  const isDraft = post.status === 'draft';

  return createMetadata({
    title: post.title,
    description: post.meta_description || post.excerpt || `Read about ${post.title} on our blog`,
    path: `/${slug}`,
    image: post.image,
    keywords: post.tags ? post.tags.split(',').map(tag => tag.trim()) : undefined,
    author: post.author,
    publishedTime: publishedDate,
    modifiedTime: modifiedDate,
    type: 'article',
    noIndex: isDraft, // Prevent indexing of draft posts
  });
}

const BlogPostPage: React.FC<BlogPostPageProps> = async ({ params }) => {
  const { slug } = await params;
  // Include unpublished posts to handle drafts properly
  const post = await getBlogPostBySlug(slug, true);

  if (!post) {
    notFound();
  }
  
  // Check if post is draft and user is not authorized to view drafts
  // In production, you might want to add authentication check here
  const isDraft = post.status === 'draft';
  if (isDraft) {
    // For now, we'll allow draft viewing but with noindex
    // You can add authentication logic here if needed
    console.warn(`Viewing draft post: ${post.title}`);
  }

  const publishedDate = post.published_at || post.created_at || new Date().toISOString();
  const modifiedDate = post.updated_at || publishedDate;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
  const postUrl = `${siteUrl}/${slug}`;

  // Only generate structured data for published posts
  const articleJsonLd = !isDraft ? generateArticleJsonLd({
    title: post.title,
    description: post.meta_description || post.excerpt || `Read about ${post.title} on our blog`,
    author: post.author,
    publishedDate,
    modifiedDate,
    image: post.image,
    url: postUrl,
    category: post.category,
  }) : null;

  return (
    <Layout>
      {/* Additional noindex for draft posts */}
      {isDraft && (
        <meta name="robots" content="noindex,nofollow,noarchive,nosnippet" />
      )}
      {/* Only include structured data for published posts */}
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
      <ScrollToTop />
      <StructuredData slug={slug} />
      <MobileTableOfContents />
      <div className="blog-container">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Main Content */}
          <div className="blog-main-content">
            <div className="blog-content-wrapper">
              <article className="blog-article">
              {/* Featured Image */}
              <div className="blog-featured-image">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  width={800}
                  height={400}
                  className="w-full h-auto"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
                />
              </div>

              {/* Title */}
              <h1 className="blog-main-title">
                {post.title}
                {isDraft && (
                  <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Draft
                  </span>
                )}
              </h1>

              {/* Author Section */}
              <div className="blog-author-section">
                <div className="blog-author-avatar">
                  <Image 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=6366f1&color=fff&size=48`} 
                    alt={post.author}
                    width={24}
                    height={24}
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

              {/* Mobile TOC outside blog content to prevent layout conflicts */}
              <div className="mb-8" style={{background: 'transparent'}}>
                <div id="inline-mobile-toc" className="mobile-toc-inline" style={{background: 'none', backgroundColor: 'transparent'}}>
                  <div className="mobile-toc-inline-header">
                    <span className="mobile-toc-icon">📄</span>
                    <span className="mobile-toc-title">Table of Contents</span>
                  </div>
                  {/* TOC content will be populated by MobileTableOfContents component */}
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
                  <Image 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=6366f1&color=fff&size=96`} 
                    alt={post.author}
                    width={48}
                    height={48}
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

          
        </div>

        {/* Related Posts Section */}
        <RelatedPosts 
          currentPostSlug={post.slug} 
          category={post.category} 
          limit={4} 
        />
      </div>
    </Layout>
  );
};

export default BlogPostPage;