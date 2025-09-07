import { getBlogPosts } from '@/lib/blogService';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
  const posts = await getBlogPosts();

  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  // Dynamic blog post pages with better SEO prioritization
  const dynamicPages = posts.map((post) => {
    const postDate = new Date(post.datetime);
    const now = new Date();
    const daysSincePost = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Higher priority for newer posts
    let priority = 0.7;
    if (daysSincePost <= 7) priority = 0.8;
    else if (daysSincePost <= 30) priority = 0.7;
    else if (daysSincePost <= 90) priority = 0.6;
    else priority = 0.5;
    
    // More frequent changes for newer posts
    let changeFrequency: 'weekly' | 'monthly' | 'yearly' = 'weekly';
    if (daysSincePost <= 30) changeFrequency = 'weekly';
    else if (daysSincePost <= 90) changeFrequency = 'monthly';
    else changeFrequency = 'yearly';
    
    return {
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: postDate,
      changeFrequency,
      priority,
    };
  });

  return [...staticPages, ...dynamicPages];
}