import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/blogService';

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
  
  return {
    title: "Latest Blog Posts | Freepik Blog",
    description: "Discover the latest design trends, tips, and inspiration from the Freepik team. Stay updated with our newest articles and tutorials.",
    openGraph: {
      title: "Latest Blog Posts | Freepik Blog",
      description: "Discover the latest design trends, tips, and inspiration from the Freepik team.",
      url: `${siteUrl}/`,
      type: "website",
    },
    twitter: {
      title: "Latest Blog Posts | Freepik Blog",
      description: "Discover the latest design trends, tips, and inspiration from the Freepik team.",
    },
  };
}

export default function HomePageLayout() {
  return null;
}