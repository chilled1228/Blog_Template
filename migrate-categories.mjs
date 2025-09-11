import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
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

const defaultCategories = [
  {
    name: 'Technology',
    slug: 'technology',
    description: 'Latest technology trends and innovations',
    color: '#3B82F6',
    icon: 'Lightbulb'
  },
  {
    name: 'Frontend',
    slug: 'frontend',
    description: 'Frontend development tips and tutorials',
    color: '#10B981',
    icon: 'TrendingUp'
  },
  {
    name: 'Backend',
    slug: 'backend',
    description: 'Backend development and server-side technologies',
    color: '#8B5CF6',
    icon: 'Sparkles'
  },
  {
    name: 'CSS',
    slug: 'css',
    description: 'CSS styling techniques and best practices',
    color: '#F59E0B',
    icon: 'Newspaper'
  },
  {
    name: 'Database',
    slug: 'database',
    description: 'Database design and management',
    color: '#EF4444',
    icon: 'Database'
  },
  {
    name: 'AI',
    slug: 'ai',
    description: 'Artificial Intelligence and Machine Learning',
    color: '#06B6D4',
    icon: 'Sparkles'
  },
  {
    name: 'Tips & Trends',
    slug: 'tips-trends',
    description: 'Development tips and industry trends',
    color: '#84CC16',
    icon: 'TrendingUp'
  },
  {
    name: 'Product Updates',
    slug: 'product-updates',
    description: 'Latest product updates and announcements',
    color: '#F97316',
    icon: 'Monitor'
  }
];

async function checkCategoryExists(slug) {
  const q = query(collection(db, 'categories'), where('slug', '==', slug));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

async function migrateCategories() {
  console.log('Starting category migration...');
  
  try {
    const categoriesCollection = collection(db, 'categories');
    
    for (const category of defaultCategories) {
      const exists = await checkCategoryExists(category.slug);
      
      if (!exists) {
        await addDoc(categoriesCollection, {
          ...category,
          createdAt: new Date(),
          updatedAt: new Date(),
          postCount: 0
        });
        console.log(`✅ Created category: ${category.name}`);
      } else {
        console.log(`⏭️ Category already exists: ${category.name}`);
      }
    }
    
    console.log('✅ Category migration completed successfully!');
  } catch (error) {
    console.error('❌ Error during migration:', error);
  }
}

migrateCategories();