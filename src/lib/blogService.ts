import { supabase } from './supabaseClient';

export interface BlogPost {
  id?: number;
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
  status: 'draft' | 'published';
  published_at?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  canonical_url?: string;
  featured: boolean;
  view_count: number;
  reading_time?: number;
}

export const getBlogPosts = async (includeUnpublished = false): Promise<BlogPost[]> => {
  try {
    let query = supabase
      .from('blog_posts')
      .select('*');
    
    // Only show published posts for public users
    if (!includeUnpublished) {
      query = query.eq('status', 'published');
    }
    
    const { data, error } = await query.order('published_at', { ascending: false, nullsFirst: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

export const getBlogPostBySlug = async (slug: string, includeUnpublished = false): Promise<BlogPost | null> => {
  try {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug);
    
    // Only show published posts for public users
    if (!includeUnpublished) {
      query = query.eq('status', 'published');
    }
    
    const { data, error } = await query.single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Post not found
        return null;
      }
      console.error('Error fetching blog post:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

export const getFeaturedPosts = async (limit: number = 5, includeUnpublished = false): Promise<BlogPost[]> => {
  try {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('featured', true);
    
    // Only show published posts for public users
    if (!includeUnpublished) {
      query = query.eq('status', 'published');
    }
    
    const { data, error } = await query
      .order('published_at', { ascending: false, nullsFirst: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured posts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
};

export const getBlogPostsByCategory = async (categorySlug: string, includeUnpublished = false): Promise<BlogPost[]> => {
  try {
    // Convert slug back to category name
    const categoryName = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
    
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('category', categoryName);
    
    // Only show published posts for public users
    if (!includeUnpublished) {
      query = query.eq('status', 'published');
    }
    
    const { data, error } = await query.order('published_at', { ascending: false, nullsFirst: false });

    if (error) {
      console.error('Error fetching blog posts by category:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    return [];
  }
};

export const getBlogPostsByAuthor = async (authorSlug: string, includeUnpublished = false): Promise<BlogPost[]> => {
  try {
    // Convert slug back to author name
    const authorName = authorSlug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('author', authorName);
    
    // Only show published posts for public users
    if (!includeUnpublished) {
      query = query.eq('status', 'published');
    }
    
    const { data, error } = await query.order('published_at', { ascending: false, nullsFirst: false });

    if (error) {
      console.error('Error fetching blog posts by author:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching blog posts by author:', error);
    return [];
  }
};

export const publishPost = async (id: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .update({ 
        status: 'published',
        published_at: new Date().toISOString()
      })
      .eq('id', id);
    
    return !error;
  } catch (error) {
    console.error('Error publishing post:', error);
    return false;
  }
};

export const unpublishPost = async (id: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .update({ 
        status: 'draft',
        published_at: null
      })
      .eq('id', id);
    
    return !error;
  } catch (error) {
    console.error('Error unpublishing post:', error);
    return false;
  }
};

export const incrementViewCount = async (id: number): Promise<void> => {
  try {
    await supabase.rpc('increment_view_count', { post_id: id });
  } catch (error) {
    console.error('Error incrementing view count:', error);
  }
};

// SEO utility functions
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

export const getRelatedPosts = async (postSlug: string, category: string, limit: number = 3, includeUnpublished = false): Promise<BlogPost[]> => {
  try {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('category', category)
      .neq('slug', postSlug); // Exclude the current post
    
    // Only show published posts for public users
    if (!includeUnpublished) {
      query = query.eq('status', 'published');
    }
    
    const { data, error } = await query
      .order('published_at', { ascending: false, nullsFirst: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching related posts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
};

export const generateExcerpt = (content: string, maxLength: number = 160): string => {
  // Remove HTML tags
  const plainText = content.replace(/<[^>]*>/g, '');
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  // Find the last space within the limit
  const lastSpace = plainText.lastIndexOf(' ', maxLength);
  
  if (lastSpace === -1) {
    return plainText.substring(0, maxLength) + '...';
  }
  
  return plainText.substring(0, lastSpace) + '...';
};