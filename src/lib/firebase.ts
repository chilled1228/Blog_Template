import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, Timestamp, collection, doc, getDoc, setDoc, updateDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
  console.warn('Firebase configuration is missing. Please check your environment variables.');
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Collections
export const adminUsersCollection = collection(db, 'admin_users');
export const userProfilesCollection = collection(db, 'user_profiles');

// Admin user management functions
export const checkIfUserIsAdmin = async (email: string): Promise<boolean> => {
  try {
    const q = query(adminUsersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

export const addAdminUser = async (email: string, addedBy: string): Promise<boolean> => {
  try {
    // Get user profile to fetch the display name
    const userProfile = await getUserProfileByEmail(email);
    
    const userDoc = doc(adminUsersCollection, email);
    await setDoc(userDoc, {
      email,
      displayName: userProfile?.displayName || email,
      addedBy,
      addedAt: serverTimestamp(),
      role: 'admin'
    });
    return true;
  } catch (error) {
    console.error('Error adding admin user:', error);
    return false;
  }
};

export const removeAdminUser = async (email: string): Promise<boolean> => {
  try {
    const userDoc = doc(adminUsersCollection, email);
    await deleteDoc(userDoc);
    return true;
  } catch (error) {
    console.error('Error removing admin user:', error);
    return false;
  }
};

export const getAllAdminUsers = async (): Promise<Array<{email: string, displayName: string, addedBy: string, addedAt: string}>> => {
  try {
    const querySnapshot = await getDocs(adminUsersCollection);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        email: doc.id,
        displayName: data.displayName || doc.id,
        addedBy: data.addedBy || '',
        addedAt: data.addedAt?.toDate().toISOString() || ''
      };
    });
  } catch (error) {
    console.error('Error getting admin users:', error);
    return [];
  }
};

// User profile management functions
export const createUserProfile = async (user: {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}): Promise<boolean> => {
  try {
    const userDoc = doc(userProfilesCollection, user.uid);
    await setDoc(userDoc, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      role: 'user'
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error creating user profile:', error);
    return false;
  }
};

export const getUserProfileByEmail = async (email: string): Promise<{ uid: string; email: string; displayName: string; photoURL: string; createdAt: string; updatedAt: string; role: string } | null> => {
  try {
    const querySnapshot = await getDocs(query(userProfilesCollection, where('email', '==', email)));
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return {
        uid: data.uid,
        email: data.email,
        displayName: data.displayName || '',
        photoURL: data.photoURL || '',
        createdAt: data.createdAt?.toDate().toISOString() || '',
        updatedAt: data.updatedAt?.toDate().toISOString() || '',
        role: data.role || 'user'
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile by email:', error);
    return null;
  }
};

export const getUserProfile = async (uid: string): Promise<{ uid: string; email: string; displayName: string; photoURL: string; createdAt: string; updatedAt: string; role: string } | null> => {
  try {
    const userDoc = doc(userProfilesCollection, uid);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        uid: data.uid,
        email: data.email,
        displayName: data.displayName || '',
        photoURL: data.photoURL || '',
        createdAt: data.createdAt?.toDate().toISOString() || '',
        updatedAt: data.updatedAt?.toDate().toISOString() || '',
        role: data.role || 'user'
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

export const getAllUserProfiles = async (): Promise<Array<{ uid: string; email: string; displayName: string; photoURL: string; createdAt: string; updatedAt: string; role: string }>> => {
  try {
    const querySnapshot = await getDocs(userProfilesCollection);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        uid: data.uid,
        email: data.email,
        displayName: data.displayName || '',
        photoURL: data.photoURL || '',
        createdAt: data.createdAt?.toDate().toISOString() || '',
        updatedAt: data.updatedAt?.toDate().toISOString() || '',
        role: data.role || 'user'
      };
    });
  } catch (error) {
    console.error('Error getting all user profiles:', error);
    return [];
  }
};

export const updateUserProfile = async (uid: string, updates: Record<string, unknown>): Promise<boolean> => {
  try {
    const userDoc = doc(userProfilesCollection, uid);
    await updateDoc(userDoc, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
};

// Helper function for server timestamp
const serverTimestamp = () => Timestamp.now();

// Utility function to convert Firestore Timestamp objects to ISO strings
export const convertTimestamps = (obj: Record<string, unknown>): unknown => {
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  // If it's a Timestamp object, convert to ISO string
  if (obj && typeof obj.toDate === 'function') {
    return obj.toDate().toISOString();
  }
  
  // If it's an array, recursively convert all elements
  if (Array.isArray(obj)) {
    return obj.map(convertTimestamps);
  }
  
  // If it's an object, recursively convert all properties
  if (typeof obj === 'object' && obj !== null && obj.constructor === Object) {
    const converted: Record<string, unknown> = {};
    for (const key in obj) {
      converted[key] = convertTimestamps(obj[key]);
    }
    return converted;
  }
  
  // Return primitive values as-is
  return obj;
};

export default app;