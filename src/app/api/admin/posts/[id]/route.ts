import { NextRequest, NextResponse } from 'next/server';
import { db, convertTimestamps } from '@/lib/firebase';
import { 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';

interface UpdatePostData {
  title: string;
  slug: string;
  url?: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  author_url: string;
  category: string;
  category_url: string;
  status?: 'draft' | 'published';
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  canonical_url?: string;
  featured?: boolean;
  published_at?: string | null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const docRef = doc(db, 'blog_posts', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const post = convertTimestamps({
      id: docSnap.id,
      ...docSnap.data()
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updateData = await request.json() as UpdatePostData;

    // Get current post to check if status changed
    const docRef = doc(db, 'blog_posts', id);
    const currentDoc = await getDoc(docRef);

    if (!currentDoc.exists()) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const currentPost = currentDoc.data();

    const updatedFields: Record<string, unknown> = {
      title: updateData.title,
      slug: updateData.slug,
      url: updateData.url || `/${updateData.slug}`,
      content: updateData.content,
      excerpt: updateData.excerpt,
      image: updateData.image,
      author: updateData.author,
      author_url: updateData.author_url,
      category: updateData.category,
      category_url: updateData.category_url,
      status: updateData.status || 'draft',
      meta_title: updateData.meta_title || '',
      meta_description: updateData.meta_description || '',
      meta_keywords: updateData.meta_keywords || '',
      canonical_url: updateData.canonical_url || '',
      featured: updateData.featured || false,
    };

    // Handle published_at field based on status change
    if (updateData.status === 'published' && currentPost?.status !== 'published') {
      // Publishing for the first time or republishing
      updatedFields.published_at = serverTimestamp();
    } else if (updateData.status === 'draft' && currentPost?.status === 'published') {
      // Unpublishing
      updatedFields.published_at = null;
    }

    await updateDoc(docRef, updatedFields);

    // Get the updated document
    const updatedDoc = await getDoc(docRef);
    const post = convertTimestamps({
      id: updatedDoc.id,
      ...updatedDoc.data()
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const docRef = doc(db, 'blog_posts', id);
    
    await deleteDoc(docRef);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}