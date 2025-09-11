import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Mapping of old category names to new category names
const categoryMapping = {
  // Add your mappings here, for example:
  // 'Technology': 'Tech Insights',
  // 'Frontend': 'Frontend Development',
  // 'Backend': 'Backend Development',
  // Add more as needed...
};

async function updateBlogPostCategories() {
  console.log('Starting blog post category update...');
  
  try {
    // Get all blog posts
    const postsSnapshot = await getDocs(collection(db, 'blog_posts'));
    
    console.log(`Found ${postsSnapshot.docs.length} blog posts to check`);
    
    let updatedCount = 0;
    
    for (const postDoc of postsSnapshot.docs) {
      const postData = postDoc.data();
      const currentCategory = postData.category;
      
      // Check if this category needs updating
      if (categoryMapping[currentCategory]) {
        const newCategory = categoryMapping[currentCategory];
        
        console.log(`Updating post "${postData.title}": ${currentCategory} -> ${newCategory}`);
        
        await updateDoc(doc(db, 'blog_posts', postDoc.id), {
          category: newCategory,
          updated_at: new Date()
        });
        
        updatedCount++;
      }
    }
    
    console.log(`✅ Update completed! ${updatedCount} posts updated.`);
    
    if (updatedCount === 0) {
      console.log('ℹ️  No posts needed updating. Make sure to add your category mappings to the script.');
      console.log('Example mapping:');
      console.log(`const categoryMapping = {
  'Technology': 'Tech Insights',
  'Frontend': 'Frontend Development',
  // ... add more mappings
};`);
    }
    
  } catch (error) {
    console.error('❌ Error updating blog post categories:', error);
  }
}

// Also function to check what categories are being used in posts
async function checkCurrentCategories() {
  console.log('Checking current categories in blog posts...');
  
  try {
    const postsSnapshot = await getDocs(collection(db, 'blog_posts'));
    const categories = new Set();
    
    postsSnapshot.docs.forEach(doc => {
      const category = doc.data().category;
      if (category) {
        categories.add(category);
      }
    });
    
    console.log('Categories found in blog posts:');
    Array.from(categories).sort().forEach(cat => {
      console.log(`  - "${cat}"`);
    });
    
    console.log('\nCategories in database:');
    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    categoriesSnapshot.docs.forEach(doc => {
      const catData = doc.data();
      console.log(`  - "${catData.name}" (slug: ${catData.slug})`);
    });
    
  } catch (error) {
    console.error('❌ Error checking categories:', error);
  }
}

// Run both functions
async function main() {
  await checkCurrentCategories();
  console.log('\n' + '='.repeat(50) + '\n');
  await updateBlogPostCategories();
}

main();