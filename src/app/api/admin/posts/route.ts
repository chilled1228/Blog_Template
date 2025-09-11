import { NextRequest, NextResponse } from 'next/server';
import { db, convertTimestamps } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit as queryLimit,
  startAfter,
  serverTimestamp 
} from 'firebase/firestore';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status'); // 'all', 'draft', 'published'
    const offset = (page - 1) * limit;

    let q = query(collection(db, 'blog_posts'));

    // Filter by status if specified
    if (status && status !== 'all') {
      q = query(q, where('status', '==', status));
    }

    q = query(q, orderBy('created_at', 'desc'));

    // Get all documents and then paginate manually
    const querySnapshot = await getDocs(q);
    const allPosts = querySnapshot.docs.map(doc => 
      convertTimestamps({
        id: doc.id,
        ...doc.data()
      })
    );

    // Manual pagination
    const paginatedPosts = allPosts.slice(offset, offset + limit);
    
    // Get total count
    const totalCount = allPosts.length;

    return NextResponse.json({
      posts: paginatedPosts,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const postData = await request.json();
    
    // Generate URL if not provided
    const url = postData.url || `/${postData.slug}`;
    const categoryUrl = postData.category_url || `/category/${postData.category.toLowerCase().replace(/\s+/g, '-')}`;
    const currentDate = new Date();

    const insertData = {
      title: postData.title,
      slug: postData.slug,
      url: url,
      content: postData.content || '',
      excerpt: postData.excerpt || '',
      image: postData.image || '',
      author: postData.author || 'behindyourbrain Team',
      author_url: postData.author_url || '',
      category: postData.category || 'Technology',
      category_url: categoryUrl,
      date: currentDate.toLocaleDateString(),
      datetime: currentDate.toISOString(),
      status: postData.status || 'draft',
      meta_title: postData.meta_title || '',
      meta_description: postData.meta_description || '',
      meta_keywords: postData.meta_keywords || '',
      canonical_url: postData.canonical_url || '',
      featured: postData.featured || false,
      view_count: 0,
      created_at: serverTimestamp(),
      // Set published_at if status is published
      ...(postData.status === 'published' && {
        published_at: serverTimestamp()
      })
    };

    const docRef = await addDoc(collection(db, 'blog_posts'), insertData);
    
    // Get the created document
    const createdDoc = await getDoc(docRef);
    const post = convertTimestamps({
      id: createdDoc.id,
      ...createdDoc.data()
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}