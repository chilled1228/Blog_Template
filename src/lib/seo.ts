import { Metadata } from 'next';

export const SITE_CONFIG = {
  name: 'behindthebrain',
  description: 'behindthebrain - Empowering personal growth through self-help, mindfulness, productivity tips, and life transformation strategies.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://behindyourbrain.com',
  siteName: 'behindthebrain',
  locale: 'en_US',
  themeColor: '#000000',
  twitterHandle: '@behindthebrain',
  keywords: ['behindthebrain', 'self-help', 'personal growth', 'mindfulness', 'productivity', 'life coaching', 'motivation', 'wellness'],
  author: 'behindthebrain Team',
  creator: 'behindthebrain',
  publisher: 'behindthebrain',
  contactEmail: 'blog.boopul@gmail.com',
};

export function createMetadata({
  title,
  description,
  path = '',
  image,
  keywords,
  author,
  publishedTime,
  modifiedTime,
  type = 'website',
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
} = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.name;
  const metaDescription = description || SITE_CONFIG.description;
  const url = `${SITE_CONFIG.url}${path}`;
  const ogImage = image || `${SITE_CONFIG.url}/og-default.jpg`;

  const metadata: Metadata = {
    metadataBase: new URL(SITE_CONFIG.url),
    title: fullTitle,
    description: metaDescription,
    keywords: keywords || SITE_CONFIG.keywords,
    authors: [{ name: author || SITE_CONFIG.author }],
    creator: SITE_CONFIG.creator,
    publisher: SITE_CONFIG.publisher,
    robots: noIndex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    alternates: {
      canonical: url,
    },
    icons: {
      icon: [
        { url: '/logo.svg', type: 'image/svg+xml' },
      ],
      shortcut: '/logo.svg',
      apple: [
        { url: '/logo.svg', type: 'image/svg+xml' },
      ],
      other: [
        {
          rel: 'mask-icon',
          url: '/logo.svg',
          color: '#4CA4A8',
        },
      ],
    },
    manifest: '/manifest.json',
    openGraph: {
      type,
      locale: SITE_CONFIG.locale,
      url,
      siteName: SITE_CONFIG.siteName,
      title: fullTitle,
      description: metaDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || SITE_CONFIG.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      title: fullTitle,
      description: metaDescription,
      images: [ogImage],
    },
    other: {
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'apple-mobile-web-app-title': SITE_CONFIG.name,
      'application-name': SITE_CONFIG.name,
      'msapplication-TileColor': SITE_CONFIG.themeColor,
      'msapplication-config': '/browserconfig.xml',
      'mobile-web-app-capable': 'yes',
      'format-detection': 'telephone=no',
    },
  };

  // Add article-specific metadata
  if (type === 'article' && (publishedTime || modifiedTime)) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: [author || SITE_CONFIG.author],
    };
  }

  return metadata;
}

export function createJsonLd(data: Record<string, unknown>) {
  return {
    '@context': 'https://schema.org',
    ...data,
  };
}

export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return createJsonLd({
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

export function generateArticleJsonLd({
  title,
  description,
  author,
  publishedDate,
  modifiedDate,
  image,
  url,
  category,
}: {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  image: string;
  url: string;
  category?: string;
}) {
  return createJsonLd({
    '@type': 'Article',
    headline: title,
    description,
    image: [image],
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.publisher,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(category && {
      articleSection: category,
      genre: category,
    }),
  });
}

export function generateWebsiteJsonLd() {
  return createJsonLd({
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.publisher,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
  });
}