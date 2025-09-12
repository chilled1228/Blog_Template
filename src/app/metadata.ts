import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
  
  return {
    title: "Latest Blog Posts | behindthebrain",
    description: "Discover personal growth insights, self-help strategies, and life transformation tips from the behindthebrain team. Stay updated with our newest articles and motivation.",
    openGraph: {
      title: "Latest Blog Posts | behindthebrain",
      description: "Discover personal growth insights, self-help strategies, and life transformation tips from the behindthebrain team.",
      url: `${siteUrl}/`,
      type: "website",
    },
    twitter: {
      title: "Latest Blog Posts | behindthebrain",
      description: "Discover personal growth insights, self-help strategies, and life transformation tips from the behindthebrain team.",
    },
  };
}

export default function HomePageLayout() {
  return null;
}