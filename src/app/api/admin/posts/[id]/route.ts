import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
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
    const updateData = await request.json();

    // Get current post to check if status changed
    const { data: currentPost } = await supabase
      .from('blog_posts')
      .select('status')
      .eq('id', id)
      .single();

    const updatedFields: any = {
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
      updatedFields.published_at = new Date().toISOString();
    } else if (updateData.status === 'draft' && currentPost?.status === 'published') {
      // Unpublishing
      updatedFields.published_at = null;
    }

    const { data: post, error } = await supabase
      .from('blog_posts')
      .update(updatedFields)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post });
  } catch (error) {
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
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}