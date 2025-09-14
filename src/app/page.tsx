import { Layout } from '@/components/layout';
import React from 'react';
import HeroSlider from '@/components/ui/HeroSlider';
import BlogPostsGrid from '@/components/ui/BlogPostsGrid';
import Pagination from '@/components/ui/Pagination';
import HomePageStructuredData from '@/components/ui/HomePageStructuredData';

const HomePage: React.FC = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://behindyourbrain.com';
  
  return (
    <Layout>
      <HomePageStructuredData url={siteUrl} />
      <HeroSlider />
      <BlogPostsGrid />
      <Pagination />
    </Layout>
  );
};

export default HomePage;