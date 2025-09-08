// Fallback data for when Supabase is not available or empty
import { BlogPost } from './blogService';

export const fallbackBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Web Development: Trends to Watch in 2025',
    slug: 'future-of-web-development-trends-2025',
    url: '/future-of-web-development-trends-2025',
    category: 'Technology',
    category_url: '/category/technology',
    author: 'Sarah Chen',
    author_url: '/author/sarah-chen',
    date: 'January 15, 2025',
    datetime: '2025-01-15T09:00:00+00:00',
    image: '/images/web-dev-future.jpg',
    excerpt: 'Explore the cutting-edge trends that will shape web development in 2025, from AI integration to new frameworks.',
    content: `<article>
      <h2>Introduction</h2>
      <p>The web development landscape continues to evolve at a rapid pace. As we move through 2025, several key trends are emerging that will fundamentally change how we build and interact with web applications.</p>
      
      <h2>AI-Powered Development Tools</h2>
      <p>Artificial Intelligence is revolutionizing the development process. From code completion to automated testing, AI tools are making developers more productive than ever before.</p>
      
      <h2>WebAssembly Goes Mainstream</h2>
      <p>WebAssembly (WASM) is finally hitting its stride in 2025. With improved browser support and better tooling, more applications are leveraging WASM for performance-critical operations.</p>
      
      <h2>Conclusion</h2>
      <p>These trends represent just the beginning of what's possible in modern web development.</p>
    </article>`
  },
  {
    id: 2,
    title: 'Building Scalable APIs with Node.js and Express',
    slug: 'building-scalable-apis-nodejs-express',
    url: '/building-scalable-apis-nodejs-express',
    category: 'Backend',
    category_url: '/category/backend',
    author: 'Michael Rodriguez',
    author_url: '/author/michael-rodriguez',
    date: 'January 12, 2025',
    datetime: '2025-01-12T14:30:00+00:00',
    image: '/images/nodejs-api.jpg',
    excerpt: 'Learn how to build robust, scalable APIs using Node.js and Express with best practices for production environments.',
    content: `<article>
      <h2>Getting Started</h2>
      <p>Building scalable APIs is crucial for modern web applications. Node.js and Express provide an excellent foundation for creating high-performance backends.</p>
      
      <h2>Architecture Patterns</h2>
      <p>Learn about MVC, microservices, and other architectural patterns that help build maintainable applications.</p>
      
      <h2>Performance Optimization</h2>
      <p>Discover techniques for optimizing API performance, including caching, load balancing, and database optimization.</p>
    </article>`
  },
  {
    id: 3,
    title: 'Modern CSS Grid Techniques for Responsive Design',
    slug: 'modern-css-grid-techniques-responsive-design',
    url: '/modern-css-grid-techniques-responsive-design',
    category: 'CSS',
    category_url: '/category/css',
    author: 'Emma Thompson',
    author_url: '/author/emma-thompson',
    date: 'January 10, 2025',
    datetime: '2025-01-10T11:15:00+00:00',
    image: '/images/css-grid.jpg',
    excerpt: 'Master CSS Grid Layout with practical examples and learn how to create stunning responsive designs.',
    content: `<article>
      <h2>Introduction to CSS Grid</h2>
      <p>CSS Grid is a powerful layout system that allows you to create complex, responsive designs with ease.</p>
      
      <h2>Grid Fundamentals</h2>
      <p>Learn the basic concepts of CSS Grid, including grid containers, grid items, and grid tracks.</p>
      
      <h2>Advanced Techniques</h2>
      <p>Explore advanced Grid features like named grid lines, grid areas, and implicit grids.</p>
    </article>`
  },
  {
    id: 4,
    title: 'React State Management: Redux vs Zustand vs Context API',
    slug: 'react-state-management-redux-zustand-context',
    url: '/react-state-management-redux-zustand-context',
    category: 'Frontend',
    category_url: '/category/frontend',
    author: 'David Park',
    author_url: '/author/david-park',
    date: 'January 8, 2025',
    datetime: '2025-01-08T16:45:00+00:00',
    image: '/images/react-state.jpg',
    excerpt: 'Compare different React state management solutions and learn when to use each approach.',
    content: `<article>
      <h2>State Management Overview</h2>
      <p>Managing state in React applications can be challenging. Let's explore different approaches and their trade-offs.</p>
      
      <h2>Redux: The Traditional Approach</h2>
      <p>Redux has been the go-to solution for complex state management in React applications.</p>
      
      <h2>Zustand: A Lightweight Alternative</h2>
      <p>Zustand offers a simpler API while maintaining powerful state management capabilities.</p>
    </article>`
  }
];

export const getFallbackPostBySlug = (slug: string): BlogPost | null => {
  return fallbackBlogPosts.find(post => post.slug === slug) || null;
};

export const getFallbackFeaturedPosts = (limit: number = 5): BlogPost[] => {
  return fallbackBlogPosts.slice(0, limit);
};

export const getFallbackPostsByCategory = (categorySlug: string): BlogPost[] => {
  const categoryName = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
  return fallbackBlogPosts.filter(post => post.category.toLowerCase() === categoryName.toLowerCase());
};