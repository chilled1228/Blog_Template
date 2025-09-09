import type { Metadata } from "next";
import { Funnel_Sans } from "next/font/google";
import "./globals.css";

const funnelSans = Funnel_Sans({
  variable: "--font-funnel-sans",
  subsets: ["latin"],
  weight: "variable",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Learn, get inspired, create! | Freepik Blog",
  description: "The official Freepik blog with expert insights on royalty-free stock images, vectors, design trends, graphic design tips, and free creative resources for designers and creators.",
  keywords: ["freepik blog", "design blog", "graphic design", "stock images", "design tips", "creative resources", "vectors", "design trends"],
  authors: [{ name: "Freepik Team" }],
  creator: "Freepik",
  publisher: "Freepik",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    siteName: "Freepik Blog",
    title: "Learn, get inspired, create! | Freepik Blog",
    description: "The official Freepik blog with expert insights on royalty-free stock images, vectors, design trends, graphic design tips, and free creative resources.",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Freepik Blog - Design Resources and Tips",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@freepik",
    creator: "@freepik",
    title: "Learn, get inspired, create! | Freepik Blog",
    description: "The official Freepik blog with expert insights on royalty-free stock images, vectors, design trends, graphic design tips, and free creative resources.",
    images: ["https://your-domain.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://your-domain.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${funnelSans.variable} font-sans antialiased freepik home blog wp-theme-freepik-blog hfeed`}>
        {children}
      </body>
    </html>
  );
}
