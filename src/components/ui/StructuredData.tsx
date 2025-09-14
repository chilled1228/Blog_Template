import JsonLd from '@/components/ui/JsonLd';
import { getBlogPostBySlug, calculateReadingTime } from '@/lib/blogService';

interface StructuredDataProps {
  slug: string;
}

export default async function StructuredData({ slug }: StructuredDataProps) {
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return null;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://behindyourbrain.com';
  const imageUrl = post.image || `${siteUrl}/default-og-image.jpg`;
  const readingTime = post.content ? calculateReadingTime(post.content) : 0;
  
  // Enhanced article structured data with more comprehensive markup
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.meta_title || post.title,
    "alternativeHeadline": post.title,
    "description": post.meta_description || post.excerpt || post.content?.substring(0, 160) || '',
    "image": {
      "@type": "ImageObject",
      "url": imageUrl,
      "height": 400,
      "width": 800,
      "caption": post.title
    },
    "url": post.canonical_url || `${siteUrl}/${slug}`,
    "datePublished": post.published_at || post.datetime,
    "dateModified": post.published_at || post.datetime,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": post.author_url || `${siteUrl}/author/${post.author.toLowerCase().replace(/\s+/g, '-')}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "behindthebrain Blog",
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`,
        "width": 200,
        "height": 60
      },
      "sameAs": [
        "https://twitter.com/behindthebrain",
        "https://facebook.com/behindthebrain",
        "https://instagram.com/behindthebrain"
      ]
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.canonical_url || `${siteUrl}/${slug}`
    },
    "articleSection": post.category,
    "genre": post.category,
    "keywords": post.meta_keywords || post.category,
    "wordCount": post.content ? post.content.split(/\s+/).length : 0,
    "timeRequired": `PT${readingTime}M`,
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "isFamilyFriendly": true,
    "copyrightHolder": {
      "@type": "Organization",
      "name": "behindthebrain"
    },
    "copyrightYear": new Date(post.published_at || post.datetime).getFullYear(),
    "creativeWorkStatus": "Published",
    "interactionStatistic": post.view_count ? {
      "@type": "InteractionCounter",
      "interactionType": "https://schema.org/ReadAction",
      "userInteractionCount": post.view_count
    } : undefined
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

  // Website schema for better site understanding
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "behindthebrain Blog",
    "url": siteUrl,
    "description": "behindthebrain - Empowering personal growth through self-help, mindfulness, productivity, and life transformation.",
    "publisher": {
      "@type": "Organization",
      "name": "behindthebrain"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Organization schema
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "behindthebrain",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "sameAs": [
      "https://twitter.com/behindthebrain",
      "https://facebook.com/behindthebrain",
      "https://instagram.com/behindthebrain"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": `${siteUrl}/contact`
    }
  };

  return (
    <>
      <JsonLd data={articleStructuredData} />
      <JsonLd data={breadcrumbStructuredData} />
      <JsonLd data={websiteStructuredData} />
      <JsonLd data={organizationStructuredData} />
    </>
  );
}