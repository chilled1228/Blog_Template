import JsonLd from '@/components/ui/JsonLd';
import { getBlogPostBySlug } from '@/lib/blogService';

interface StructuredDataProps {
  slug: string;
}

export default async function StructuredData({ slug }: StructuredDataProps) {
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return null;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
  const imageUrl = post.image || `${siteUrl}/default-og-image.jpg`;

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || post.content?.substring(0, 160) || '',
    "image": imageUrl,
    "url": `${siteUrl}/${slug}`,
    "datePublished": post.datetime,
    "dateModified": post.datetime,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": post.author_url
    },
    "publisher": {
      "@type": "Organization",
      "name": "Freepik",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/${slug}`
    },
    "articleSection": post.category,
    "wordCount": post.content ? post.content.split(' ').length : 0,
    "inLanguage": "en-US"
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${siteUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.category,
        "item": post.category_url
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": post.title,
        "item": `${siteUrl}/${slug}`
      }
    ]
  };

  return (
    <>
      <JsonLd data={articleStructuredData} />
      <JsonLd data={breadcrumbStructuredData} />
    </>
  );
}