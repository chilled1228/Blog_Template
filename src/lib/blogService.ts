import { db, convertTimestamps } from './firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  increment,
  serverTimestamp 
} from 'firebase/firestore';

export interface BlogPost {
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
  updated_at?: string;
  status: 'draft' | 'published';
  published_at?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  canonical_url?: string;
  tags?: string;
  featured: boolean;
  view_count: number;
  reading_time?: number;
}

const BLOG_POSTS_COLLECTION = 'blog_posts';

export const getBlogPosts = async (includeUnpublished = false): Promise<BlogPost[]> => {
  try {
    let q = query(collection(db, BLOG_POSTS_COLLECTION));
    
    if (!includeUnpublished) {
      q = query(q, where('status', '==', 'published'));
    }
    
    q = query(q, orderBy('published_at', 'desc'), orderBy('created_at', 'desc'));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => 
      convertTimestamps({
        id: doc.id,
        ...doc.data()
      }) as BlogPost
    );
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

export const getBlogPostBySlug = async (slug: string, includeUnpublished = false): Promise<BlogPost | null> => {
  try {
    let q = query(collection(db, BLOG_POSTS_COLLECTION), where('slug', '==', slug));
    
    if (!includeUnpublished) {
      q = query(q, where('status', '==', 'published'));
    }
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return convertTimestamps({
      id: doc.id,
      ...doc.data()
    }) as BlogPost;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

export const getFeaturedPosts = async (limitNum: number = 5, includeUnpublished = false): Promise<BlogPost[]> => {
  try {
    let q = query(collection(db, BLOG_POSTS_COLLECTION), where('featured', '==', true));
    
    if (!includeUnpublished) {
      q = query(q, where('status', '==', 'published'));
    }
    
    q = query(q, orderBy('published_at', 'desc'), limit(limitNum));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => 
      convertTimestamps({
        id: doc.id,
        ...doc.data()
      }) as BlogPost
    );
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
};

export const getBlogPostsByCategory = async (categorySlug: string, includeUnpublished = false): Promise<BlogPost[]> => {
  try {
    const categoryName = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
    
    let q = query(collection(db, BLOG_POSTS_COLLECTION), where('category', '==', categoryName));
    
    if (!includeUnpublished) {
      q = query(q, where('status', '==', 'published'));
    }
    
    q = query(q, orderBy('published_at', 'desc'));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => 
      convertTimestamps({
        id: doc.id,
        ...doc.data()
      }) as BlogPost
    );
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    return [];
  }
};

export const getBlogPostsByAuthor = async (authorSlug: string, includeUnpublished = false): Promise<BlogPost[]> => {
  try {
    const authorName = authorSlug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    let q = query(collection(db, BLOG_POSTS_COLLECTION), where('author', '==', authorName));
    
    if (!includeUnpublished) {
      q = query(q, where('status', '==', 'published'));
    }
    
    q = query(q, orderBy('published_at', 'desc'));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => 
      convertTimestamps({
        id: doc.id,
        ...doc.data()
      }) as BlogPost
    );
  } catch (error) {
    console.error('Error fetching blog posts by author:', error);
    return [];
  }
};

export const createBlogPost = async (post: Omit<BlogPost, 'id' | 'created_at'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, BLOG_POSTS_COLLECTION), {
      ...post,
      created_at: serverTimestamp(),
      view_count: 0
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
};

export const updateBlogPost = async (id: string, post: Partial<BlogPost>): Promise<boolean> => {
  try {
    const docRef = doc(db, BLOG_POSTS_COLLECTION, id);
    await updateDoc(docRef, post);
    return true;
  } catch (error) {
    console.error('Error updating blog post:', error);
    return false;
  }
};

export const deleteBlogPost = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(db, BLOG_POSTS_COLLECTION, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
};

export const publishPost = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(db, BLOG_POSTS_COLLECTION, id);
    await updateDoc(docRef, {
      status: 'published',
      published_at: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error publishing post:', error);
    return false;
  }
};

export const unpublishPost = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(db, BLOG_POSTS_COLLECTION, id);
    await updateDoc(docRef, {
      status: 'draft',
      published_at: null
    });
    return true;
  } catch (error) {
    console.error('Error unpublishing post:', error);
    return false;
  }
};

export const incrementViewCount = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, BLOG_POSTS_COLLECTION, id);
    await updateDoc(docRef, {
      view_count: increment(1)
    });
  } catch (error) {
    console.error('Error incrementing view count:', error);
  }
};

export const getRelatedPosts = async (postSlug: string, category: string, limitNum: number = 3, includeUnpublished = false): Promise<BlogPost[]> => {
  try {
    // Simplified query to avoid composite index requirement while index is building
    const q = query(
      collection(db, BLOG_POSTS_COLLECTION),
      where('category', '==', category),
      orderBy('published_at', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    // Filter out current post and unpublished posts in memory
    let posts = querySnapshot.docs
      .map(doc => convertTimestamps({
        id: doc.id,
        ...doc.data()
      }) as BlogPost)
      .filter(post => post.slug !== postSlug);
    
    if (!includeUnpublished) {
      posts = posts.filter(post => post.status === 'published');
    }
    
    return posts.slice(0, limitNum);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
};

export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

export const generateExcerpt = (content: string, maxLength: number = 160): string => {
  const plainText = content.replace(/<[^>]*>/g, '');
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  const lastSpace = plainText.lastIndexOf(' ', maxLength);
  
  if (lastSpace === -1) {
    return plainText.substring(0, maxLength) + '...';
  }
  
  return plainText.substring(0, lastSpace) + '...';
};