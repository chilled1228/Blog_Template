import JsonLd from '@/components/ui/JsonLd';

interface HomePageStructuredDataProps {
  url: string;
}

export default function HomePageStructuredData({ url }: HomePageStructuredDataProps) {
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Freepik Blog",
    "description": "The official Freepik blog with expert insights on royalty-free stock images, vectors, design trends, graphic design tips, and free creative resources.",
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
      "name": "Freepik",
      "logo": {
        "@type": "ImageObject",
        "url": `${url}/logo.png`
      }
    }
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Freepik",
    "url": url,
    "logo": {
      "@type": "ImageObject",
      "url": `${url}/logo.png`
    },
    "sameAs": [
      "https://twitter.com/freepik",
      "https://facebook.com/freepik",
      "https://instagram.com/freepik",
      "https://linkedin.com/company/freepik"
    ],
    "description": "Freepik is the leading search engine for stock photos, vectors, and PSD files. Find the perfect graphic resources for your creative projects."
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