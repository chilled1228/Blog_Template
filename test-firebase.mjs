import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

console.log('Firebase config:', {
  apiKey: config.apiKey ? '***' + config.apiKey.slice(-4) : undefined,
  authDomain: config.authDomain,
  projectId: config.projectId,
  appId: config.appId ? '***' + config.appId.slice(-4) : undefined
});

async function testFirebase() {
  try {
    const app = initializeApp(config);
    console.log('✅ Firebase app initialized successfully');
    
    const db = getFirestore(app);
    console.log('✅ Firestore initialized successfully');
    
    // Try to create a test document
    const testRef = doc(db, 'test', 'connection');
    await setDoc(testRef, {
      test: true,
      timestamp: new Date().toISOString(),
      message: 'Testing Firebase connection'
    });
    console.log('✅ Test document created successfully');
    
    // Try to read it back
    const docSnap = await getDoc(testRef);
    if (docSnap.exists()) {
      console.log('✅ Test document read successfully');
      console.log('Document data:', docSnap.data());
    } else {
      console.log('❌ Test document not found');
    }
    
    // Now let's try to create a sample blog post
    const blogPostRef = doc(db, 'blog_posts', 'sample-post');
    await setDoc(blogPostRef, {
      title: "Sample Blog Post",
      slug: "sample-blog-post",
      url: "/sample-blog-post",
      category: "Technology",
      category_url: "/category/technology",
      author: "Admin",
      author_url: "/author/admin",
      date: new Date().toLocaleDateString(),
      datetime: new Date().toISOString(),
      image: "https://via.placeholder.com/800x400",
      content: "<p>This is a sample blog post for testing the Firebase migration.</p>",
      excerpt: "This is a sample blog post for testing the Firebase migration.",
      status: "published",
      meta_title: "Sample Blog Post",
      meta_description: "This is a sample blog post for testing the Firebase migration",
      featured: false,
      view_count: 0,
      reading_time: 2,
      created_at: new Date().toISOString(),
      published_at: new Date().toISOString()
    });
    
    console.log('✅ Sample blog post created successfully');
    
    // Read it back
    const blogPostSnap = await getDoc(blogPostRef);
    if (blogPostSnap.exists()) {
      console.log('✅ Sample blog post read successfully');
      console.log('Blog post data:', {
        id: blogPostSnap.id,
        title: blogPostSnap.data().title,
        status: blogPostSnap.data().status
      });
    }
    
  } catch (error) {
    console.error('❌ Firebase test failed:', error.message);
    console.error('Full error:', error);
  }
}

testFirebase();