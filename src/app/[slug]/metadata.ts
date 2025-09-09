import { getBlogPostBySlug } from '@/lib/blogService';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
  const imageUrl = post.image || `${siteUrl}/default-og-image.jpg`;

  return {
    title: `${post.title} | Freepik Blog`,
    description: post.excerpt || post.content?.substring(0, 160) || 'Read this blog post on Freepik Blog',
    keywords: post.category ? [post.category, 'freepik blog', 'design', 'creative resources'] : ['freepik blog', 'design', 'creative resources'],
    authors: [{ name: post.author, url: post.author_url }],
    creator: "Freepik",
    publisher: "Freepik",
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content?.substring(0, 160) || 'Read this blog post',
      url: `${siteUrl}/${slug}`,
      siteName: 'Freepik Blog',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.datetime,
      modifiedTime: post.datetime,
      authors: [post.author],
      tags: post.category ? [post.category] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.content?.substring(0, 160) || 'Read this blog post',
      images: [imageUrl],
      creator: '@freepik',
    },
    alternates: {
      canonical: `${siteUrl}/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}