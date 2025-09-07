import React from 'react';
import BlogPostCard from './BlogPostCard';

interface BlogPost {
  id: number;
  title: string;
  url: string;
  category: string;
  categoryUrl: string;
  author: string;
  authorUrl: string;
  date: string;
  datetime: string;
  image: string;
}

const blogPostsData: BlogPost[] = [
  {
    id: 41174,
    title: 'How to create better visuals with less prompting: Workshop by Jerrod',
    url: '/how-to-create-better-visuals-with-less-prompting-workshop-by-jerrod/',
    category: 'AI',
    categoryUrl: '/category/ai/',
    author: 'Amanda Sanhonorato',
    authorUrl: '/author/amandagordillo/',
    date: 'May 26, 2025',
    datetime: '2025-05-26T13:20:10+00:00',
    image: '/images/Workshop-Jerrod-Lew-Cover.png'
  },
  {
    id: 41153,
    title: 'How to use Auto Ducking in Premiere Pro for clean, professional audio',
    url: '/how-to-use-auto-ducking-in-premiere-pro-for-clean-professional-audio/',
    category: 'Tips and Trends',
    categoryUrl: '/category/tips-trends/',
    author: 'Myriam Mira',
    authorUrl: '/author/myriammira/',
    date: 'May 21, 2025',
    datetime: '2025-05-21T10:23:02+00:00',
    image: '/images/Frame-7-1.jpg'
  },
  {
    id: 41134,
    title: 'Fixing OpenAI\'s color bias with simple RGB scaling',
    url: '/fixing-openais-color-bias-with-simple-rgb-scaling/',
    category: 'AI',
    categoryUrl: '/category/ai/',
    author: 'Freepik',
    authorUrl: '/author/itadm/',
    date: 'May 8, 2025',
    datetime: '2025-05-08T13:16:12+00:00',
    image: '/images/cover.jpg'
  },
  {
    id: 41123,
    title: 'How to make a viral product video with AI by Genia',
    url: '/how-to-make-a-viral-product-video-with-ai-by-genia/',
    category: 'Tips and Trends',
    categoryUrl: '/category/tips-trends/',
    author: 'Amanda Sanhonorato',
    authorUrl: '/author/amandagordillo/',
    date: 'May 5, 2025',
    datetime: '2025-05-05T12:59:11+00:00',
    image: '/images/Workshop-Geniasart-1.png'
  },
  {
    id: 41096,
    title: 'F Lite: Freepik & Fal.ai unveil an open-source image model trained on licensed data',
    url: '/f-lite-freepik-and-fal-ai-unveil-open-source-image-model-trained-on-licensed-data/',
    category: 'Product updates',
    categoryUrl: '/category/product-updates/',
    author: 'Iván de Prado',
    authorUrl: '/author/ivan/',
    date: 'April 29, 2025',
    datetime: '2025-04-29T14:00:51+00:00',
    image: '/images/output_tight_mosaic_horizontal.jpeg'
  },
  {
    id: 41088,
    title: 'Master Freepik AI Suite: Create visuals with MetricsMule',
    url: '/master-freepik-ai-suite-create-visuals-with-metricsmule/',
    category: 'Tips and Trends',
    categoryUrl: '/category/tips-trends/',
    author: 'Amanda Sanhonorato',
    authorUrl: '/author/amandagordillo/',
    date: 'April 24, 2025',
    datetime: '2025-04-24T12:20:15+00:00',
    image: '/images/Workshop-MetricsMule.png'
  },
  {
    id: 41068,
    title: 'How to create mockups from scratch with Mockup Generator',
    url: '/how-to-create-mockups/',
    category: 'Product updates',
    categoryUrl: '/category/product-updates/',
    author: 'Javier Sendra',
    authorUrl: '/author/javiersendra/',
    date: 'March 28, 2025',
    datetime: '2025-03-28T10:51:16+00:00',
    image: '/images/BLOG_COVER_1280x720_EN-3.jpg'
  },
  {
    id: 41054,
    title: 'Give your video the sound effects they deserve',
    url: '/sound-effects/',
    category: 'AI',
    categoryUrl: '/category/ai/',
    author: 'Martin LeBlanc',
    authorUrl: '/author/martin/',
    date: 'March 21, 2025',
    datetime: '2025-03-21T15:05:20+00:00',
    image: '/images/Frame-4-6.jpg'
  },
  {
    id: 41031,
    title: 'Understanding Freepik\'s Upscaler modes',
    url: '/understanding-freepiks-upscaler-modes/',
    category: 'Tips and Trends',
    categoryUrl: '/category/tips-trends/',
    author: 'Jessica',
    authorUrl: '/author/jessica/',
    date: 'March 18, 2025',
    datetime: '2025-03-18T06:18:26+00:00',
    image: '/images/COVER-1.jpg'
  },
  {
    id: 41016,
    title: 'How to use Magnific AI Image Upscaler: A comprehensive guide',
    url: '/how-to-use-magnific-ai-image-upscaler-a-comprehensive-guide/',
    category: 'Tips and Trends',
    categoryUrl: '/category/tips-trends/',
    author: 'Jessica',
    authorUrl: '/author/jessica/',
    date: 'March 17, 2025',
    datetime: '2025-03-17T10:29:46+00:00',
    image: '/images/COVER.jpg'
  },
  {
    id: 41003,
    title: 'How to create animated AI avatars',
    url: '/how-to-create-animated-ai-avatars/',
    category: 'Tips and Trends',
    categoryUrl: '/category/tips-trends/',
    author: 'Amanda Sanhonorato',
    authorUrl: '/author/amandagordillo/',
    date: 'March 10, 2025',
    datetime: '2025-03-10T09:33:03+00:00',
    image: '/images/Workshop-TechHalla.jpg'
  },
  {
    id: 40926,
    title: 'Unmatched AI video realism with Google\'s Veo 2',
    url: '/google-veo-2/',
    category: 'AI',
    categoryUrl: '/category/ai/',
    author: 'Javier Sendra',
    authorUrl: '/author/javiersendra/',
    date: 'February 21, 2025',
    datetime: '2025-02-21T15:49:03+00:00',
    image: '/images/BLOG_COVER_1280x720_EN-1.png'
  }
];

const BlogPostsGrid: React.FC = () => {
  return (
    <div className="row row--post mg-none">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-5">
        {blogPostsData.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPostsGrid;