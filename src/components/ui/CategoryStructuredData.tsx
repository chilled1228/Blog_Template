import JsonLd from '@/components/ui/JsonLd';
import { BlogPost } from '@/lib/blogService';

interface CategoryStructuredDataProps {
  category: string;
  url: string;
  posts?: BlogPost[];
}

export default function CategoryStructuredData({ category, url, posts = [] }: CategoryStructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
  
  // Category page structured data
  const categoryStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category} Articles`,
    "description": `Browse our comprehensive collection of ${category.toLowerCase()} articles and tutorials.`,
    "url": url,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": posts.length,
      "itemListElement": posts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt || post.content?.substring(0, 160) || '',
          "url": `${siteUrl}${post.url}`,
          "image": post.image,
          "author": {
            "@type": "Person",
            "name": post.author
          },
          "datePublished": post.published_at || post.datetime,
          "dateModified": post.published_at || post.datetime
        }
      }))
    },
    "breadcrumb": {
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
          "name": "Categories",
          "item": `${siteUrl}/categories`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": category,
          "item": url
        }
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Freepik Blog",
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    }
  };

  return <JsonLd data={categoryStructuredData} />;
}