import 'dotenv/config';
import { mcp__firebase__firestore_query_collection } from '../mcp';

interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  url: string;
  category: string;
  category_url: string;
  author: string;
  author_url: string;
  date: string;
  datetime: string;
  image: string;
  content?: string;
  excerpt?: string;
  created_at?: string;
  status: 'draft' | 'published';
  published_at?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  canonical_url?: string;
  featured: boolean;
  view_count: number;
  reading_time?: number;
}

// Sample data for testing - you can replace this with your actual Supabase data
const samplePosts: BlogPost[] = [
  {
    title: "Welcome to Firebase Blog",
    slug: "welcome-to-firebase-blog",
    url: "/welcome-to-firebase-blog",
    category: "Technology",
    category_url: "/category/technology",
    author: "Admin",
    author_url: "/author/admin",
    date: new Date().toLocaleDateString(),
    datetime: new Date().toISOString(),
    image: "https://via.placeholder.com/800x400",
    content: "<p>This is your first blog post after migrating to Firebase!</p>",
    excerpt: "Welcome to your new Firebase-powered blog!",
    status: "published",
    meta_title: "Welcome to Firebase Blog",
    meta_description: "Your first blog post after migrating to Firebase",
    featured: true,
    view_count: 0,
    reading_time: 2
  },
  {
    title: "Understanding Firestore Database",
    slug: "understanding-firestore-database",
    url: "/understanding-firestore-database",
    category: "Technology",
    category_url: "/category/technology",
    author: "Admin",
    author_url: "/author/admin",
    date: new Date().toLocaleDateString(),
    datetime: new Date().toISOString(),
    image: "https://via.placeholder.com/800x400",
    content: "<p>Learn about Firestore database and its features.</p>",
    excerpt: "Learn about Firestore database and its features.",
    status: "published",
    meta_title: "Understanding Firestore Database",
    meta_description: "Learn about Firestore database and its features",
    featured: false,
    view_count: 0,
    reading_time: 5
  }
];

export const migrateSampleData = async () => {
  console.log('Migrating sample data to Firebase...');
  
  try {
    for (const post of samplePosts) {
      const result = await mcp__firebase__dataconnect_execute({
        query: `
          mutation CreateBlogPost($post: BlogPostInput!) {
            createBlogPost(post: $post) {
              id
              title
              slug
              status
            }
          }
        `,
        variables_json: JSON.stringify({
          post: {
            ...post,
            created_at: new Date().toISOString(),
            published_at: post.status === 'published' ? new Date().toISOString() : null
          }
        })
      });
      
      console.log('Created post:', result);
    }
    
    console.log('Sample data migration completed!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
};

export const checkFirebaseConnection = async () => {
  console.log('Testing Firebase connection...');
  
  try {
    // Try to query the blog posts collection
    const result = await mcp__firebase__firestore_query_collection({
      collection_path: 'blog_posts/',
      filters: [],
      limit: 1
    });
    
    console.log('✅ Firebase connection successful!');
    console.log('Sample query result:', result);
    return true;
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    return false;
  }
};

// Run migration if this file is executed directly
if (require.main === module) {
  const action = process.argv[2];
  
  if (action === 'check') {
    checkFirebaseConnection();
  } else if (action === 'migrate') {
    migrateSampleData();
  } else {
    console.log('Usage:');
    console.log('  npm run migrate-check     # Check Firebase connection');
    console.log('  npm run migrate-sample    # Migrate sample data');
  }
}