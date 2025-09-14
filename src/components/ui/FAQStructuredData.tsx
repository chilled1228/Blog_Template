import JsonLd from '@/components/ui/JsonLd';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQStructuredDataProps {
  faqs: FAQItem[];
  url?: string;
  name?: string;
  description?: string;
}

export default function FAQStructuredData({ 
  faqs, 
  url, 
  name = "Frequently Asked Questions", 
  description = "Common questions and answers about our services" 
}: FAQStructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://behindyourbrain.com';
  
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    })),
    ...(url && {
      "url": url.startsWith('http') ? url : `${siteUrl}${url}`
    }),
    "name": name,
    "description": description,
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "isPartOf": {
      "@type": "CreativeWork",
      "name": "behindthebrain Blog",
      "url": siteUrl
    }
  };

  return <JsonLd data={faqStructuredData} />;
}

// FAQ Component for displaying FAQs
interface FAQDisplayProps {
  faqs: FAQItem[];
  className?: string;
  schemaUrl?: string;
}

export function FAQDisplay({ faqs, className = "", schemaUrl }: FAQDisplayProps) {
  return (
    <>
      <FAQStructuredData faqs={faqs} url={schemaUrl} />
      <div className={`space-y-4 ${className}`}>
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
            <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </>
  );
}