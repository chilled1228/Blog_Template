import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Firebase configuration
const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Sample blog posts data - you can replace this with your actual Supabase data
const samplePosts = [
  {
    title: "Getting Started with Firebase",
    slug: "getting-started-with-firebase",
    url: "/getting-started-with-firebase",
    category: "Technology",
    category_url: "/category/technology",
    author: "Admin",
    author_url: "/author/admin",
    date: new Date().toLocaleDateString(),
    datetime: new Date().toISOString(),
    image: "https://via.placeholder.com/800x400",
    content: `
      <h2>Introduction to Firebase</h2>
      <p>Firebase is Google's mobile and web application development platform that helps developers build high-quality apps quickly. It provides a suite of tools and services to handle common app development tasks like authentication, database, storage, hosting, and more.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li><strong>Firestore:</strong> A flexible, scalable database for mobile, web, and server development</li>
        <li><strong>Authentication:</strong> User authentication and identity management</li>
        <li><strong>Storage:</strong> Secure file storage and CDN</li>
        <li><strong>Hosting:</strong> Fast and secure hosting for web apps</li>
      </ul>
      
      <h3>Why Choose Firebase?</h3>
      <p>Firebase offers real-time data synchronization, offline support, and seamless integration with other Google services. It's particularly well-suited for rapid prototyping and production applications.</p>
    `,
    excerpt: "Learn about Firebase and its key features for modern web development.",
    status: "published",
    meta_title: "Getting Started with Firebase - Complete Guide",
    meta_description: "Learn about Firebase, its key features, and how to get started with this powerful development platform.",
    meta_keywords: "firebase, web development, database, authentication, google",
    canonical_url: "",
    featured: true,
    view_count: 0,
    reading_time: 5
  },
  {
    title: "Building a Blog with Next.js and Firebase",
    slug: "building-blog-nextjs-firebase",
    url: "/building-blog-nextjs-firebase",
    category: "Development",
    category_url: "/category/development",
    author: "Admin",
    author_url: "/author/admin",
    date: new Date().toLocaleDateString(),
    datetime: new Date().toISOString(),
    image: "https://via.placeholder.com/800x400",
    content: `
      <h2>Creating a Modern Blog Platform</h2>
      <p>Next.js and Firebase make a powerful combination for building modern web applications. In this guide, we'll explore how to create a fully-featured blog platform using these technologies.</p>
      
      <h3>Project Setup</h3>
      <p>First, create a new Next.js project and install the necessary dependencies:</p>
      <pre><code>npm create next-app@latest my-blog
cd my-blog
npm install firebase</code></pre>
      
      <h3>Firebase Configuration</h3>
      <p>Set up your Firebase project and configure it in your Next.js application. Create a Firebase configuration file and initialize the app.</p>
      
      <h3>Database Schema</h3>
      <p>Design your blog post schema with fields like title, slug, content, author, category, and publication status.</p>
    `,
    excerpt: "Learn how to build a modern blog platform using Next.js and Firebase.",
    status: "published",
    meta_title: "Building a Blog with Next.js and Firebase - Tutorial",
    meta_description: "Step-by-step guide to building a modern blog platform using Next.js and Firebase.",
    meta_keywords: "nextjs, firebase, blog, tutorial, web development",
    canonical_url: "",
    featured: false,
    view_count: 0,
    reading_time: 8
  },
  {
    title: "Understanding Firestore Security Rules",
    slug: "understanding-firestore-security-rules",
    url: "/understanding-firestore-security-rules",
    category: "Security",
    category_url: "/category/security",
    author: "Admin",
    author_url: "/author/admin",
    date: new Date().toLocaleDateString(),
    datetime: new Date().toISOString(),
    image: "https://via.placeholder.com/800x400",
    content: `
      <h2>Securing Your Firebase Data</h2>
      <p>Firestore security rules are crucial for protecting your data and ensuring only authorized users can access or modify it. In this article, we'll dive deep into writing effective security rules.</p>
      
      <h3>Basic Security Rules</h3>
      <p>Security rules are written in a domain-specific language that allows you to control access to your data based on conditions like user authentication, document content, and more.</p>
      
      <h3>Common Patterns</h3>
      <p>Learn about common security patterns like user-specific data, public vs. private content, and role-based access control.</p>
    `,
    excerpt: "Learn how to secure your Firestore database with proper security rules.",
    status: "draft",
    meta_title: "Understanding Firestore Security Rules - Security Guide",
    meta_description: "Comprehensive guide to Firestore security rules and best practices for data protection.",
    meta_keywords: "firestore, security, rules, database, protection",
    canonical_url: "",
    featured: false,
    view_count: 0,
    reading_time: 6
  }
];

async function migrateToFirebase() {
  try {
    console.log('🚀 Starting Firebase migration...');
    
    // Initialize Firebase
    const app = initializeApp(config);
    const db = getFirestore(app);
    
    console.log('✅ Firebase initialized successfully');
    
    // Add sample posts to Firestore
    const postsCollection = collection(db, 'blog_posts');
    
    for (const post of samplePosts) {
      const postData = {
        ...post,
        created_at: serverTimestamp(),
        published_at: post.status === 'published' ? serverTimestamp() : null
      };
      
      const docRef = await addDoc(postsCollection, postData);
      console.log(`✅ Created post: "${post.title}" with ID: ${docRef.id}`);
    }
    
    console.log(`\n🎉 Migration completed! Successfully created ${samplePosts.length} blog posts.`);
    console.log('\n📝 Next steps:');
    console.log('1. Test your blog application');
    console.log('2. Set up proper Firestore security rules');
    console.log('3. Customize the sample posts with your own content');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateToFirebase();