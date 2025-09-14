import { Metadata } from 'next';

export function createCategoryMetadata({
  title,
  description,
  category,
  url,
  image,
}: {
  title: string;
  description: string;
  category: string;
  url: string;
  image?: string;
}): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://behindyourbrain.com';
  const fullTitle = title ? `${title} | behindthebrain` : 'behindthebrain';
  const ogImage = image || `${siteUrl}/og-default.jpg`;
  const canonicalUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;

  return {
    metadataBase: new URL(siteUrl),
    title: fullTitle,
    description,
    keywords: [category, 'behindthebrain', 'blog', 'articles', 'tutorials'],
    authors: [{ name: 'behindthebrain Team' }],
    creator: 'behindthebrain',
    publisher: 'behindthebrain',
    robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      siteName: 'behindthebrain',
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@behindthebrain',
      creator: '@behindthebrain',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}