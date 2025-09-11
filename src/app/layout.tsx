import type { Metadata } from "next";
import { Funnel_Sans } from "next/font/google";
import './globals.css';
import './quill-styles.css';
import { createMetadata, generateWebsiteJsonLd } from "@/lib/seo";

const funnelSans = Funnel_Sans({
  variable: "--font-funnel-sans",
  subsets: ["latin"],
  weight: "variable",
  style: "normal",
});

export const metadata: Metadata = createMetadata({
  title: "Learn, get inspired, create!",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = generateWebsiteJsonLd();
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${funnelSans.variable} font-sans antialiased freepik home blog wp-theme-freepik-blog hfeed`}>
        {children}
      </body>
    </html>
  );
}
