import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
  
  return {
    title: "Latest Blog Posts | behindyourbrain Blog",
    description: "Discover the latest design trends, tips, and inspiration from the behindyourbrain team. Stay updated with our newest articles and tutorials.",
    openGraph: {
      title: "Latest Blog Posts | behindyourbrain Blog",
      description: "Discover the latest design trends, tips, and inspiration from the behindyourbrain team.",
      url: `${siteUrl}/`,
      type: "website",
    },
    twitter: {
      title: "Latest Blog Posts | behindyourbrain Blog",
      description: "Discover the latest design trends, tips, and inspiration from the behindyourbrain team.",
    },
  };
}

export default function HomePageLayout() {
  return null;
}