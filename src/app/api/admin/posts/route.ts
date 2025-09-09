import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status'); // 'all', 'draft', 'published'
    const offset = (page - 1) * limit;

    let query = supabase
      .from('blog_posts')
      .select('*');

    // Filter by status if specified
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data: posts, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get total count with same filter
    let countQuery = supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true });

    if (status && status !== 'all') {
      countQuery = countQuery.eq('status', status);
    }

    const { count } = await countQuery;

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total: count,
        pages: Math.ceil((count || 0) / limit)
      }
    });
  } catch (error) {
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
      author: postData.author || 'Freepik Team',
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
      // Set published_at if status is published
      ...(postData.status === 'published' && {
        published_at: currentDate.toISOString()
      })
    };

    const { data: post, error } = await supabase
      .from('blog_posts')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}