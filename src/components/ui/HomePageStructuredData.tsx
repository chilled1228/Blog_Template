import JsonLd from '@/components/ui/JsonLd';

interface HomePageStructuredDataProps {
  url: string;
}

export default function HomePageStructuredData({ url }: HomePageStructuredDataProps) {
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "behindthebrain",
    "description": "behindthebrain - Empowering personal growth through self-help, mindfulness, productivity, and life transformation.",
    "url": url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "behindthebrain",
      "logo": {
        "@type": "ImageObject",
        "url": `${url}/logo.png`
      }
    }
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "behindthebrain",
    "url": url,
    "logo": {
      "@type": "ImageObject",
      "url": `${url}/logo.png`
    },
    "sameAs": [
      "https://twitter.com/behindthebrain",
      "https://facebook.com/behindthebrain",
      "https://instagram.com/behindthebrain",
      "https://linkedin.com/company/behindthebrain"
    ],
    "description": "behindthebrain is a leading resource for personal growth, self-help strategies, and life transformation guidance."
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": url
      }
    ]
  };

  return (
    <>
      <JsonLd data={websiteStructuredData} />
      <JsonLd data={organizationStructuredData} />
      <JsonLd data={breadcrumbStructuredData} />
    </>
  );
}