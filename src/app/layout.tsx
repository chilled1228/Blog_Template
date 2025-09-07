import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learn, get inspired, create! | Freepik Blog",
  description: "The official Freepik blog, all information about royalty-free stock images, vectors, trends, design tips, free resources and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased freepik home blog wp-theme-freepik-blog hfeed`}>
        {children}
      </body>
    </html>
  );
}
