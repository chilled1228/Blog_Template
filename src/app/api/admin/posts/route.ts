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
    const offset = (page - 1) * limit;

    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { count } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true });

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
    const url = postData.url || `/blog/${postData.slug}`;
    const categoryUrl = postData.category_url || `/category/${postData.category.toLowerCase().replace(/\s+/g, '-')}`;

    const { data: post, error } = await supabase
      .from('blog_posts')
      .insert([{
        title: postData.title,
        slug: postData.slug,
        url: url,
        content: postData.content || '',
        excerpt: postData.excerpt || '',
        image: postData.image || '',
        author: postData.author || 'Freepik Team',
        author_url: postData.author_url || '',
        category: postData.category || 'General',
        category_url: categoryUrl,
        date: new Date().toLocaleDateString(),
        datetime: new Date().toISOString(),
        published: postData.published !== false,
      }])
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