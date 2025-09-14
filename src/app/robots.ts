import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://behindyourbrain.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/_next/',
        '/draft/',
        '/*?*utm_*',
        '/*?*ref=*',
        '/*?*fbclid=*'
      ],
      crawlDelay: 1,
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}