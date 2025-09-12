import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Load environment variables from .env.local
import { config } from 'dotenv';
config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('❌ Firebase configuration is missing. Please check your .env.local file.');
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function initializeFirstAdmin() {
  try {
    const adminEmail = 'behindthebrainblog@gmail.com'; // Replace with your email
    
    console.log('🔧 Initializing admin user...');
    
    // Create the admin user document
    const adminDoc = doc(db, 'admin_users', adminEmail);
    await setDoc(adminDoc, {
      email: adminEmail,
      addedBy: 'system',
      addedAt: serverTimestamp(),
      role: 'admin'
    });
    
    console.log(`✅ Admin user ${adminEmail} has been initialized successfully!`);
    console.log('🔐 You can now log in to the admin panel with this email address using Google Sign-In or email/password.');
    console.log('📍 Admin panel: http://localhost:3001/admin');
  } catch (error) {
    console.error('❌ Error initializing admin user:', error.message);
    console.log('💡 Make sure your Firebase project is properly configured and you have internet connection.');
  }
}

// Run the initialization
initializeFirstAdmin();