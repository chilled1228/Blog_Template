import { supabase } from './supabaseClient';
import { fallbackBlogPosts, getFallbackPostBySlug, getFallbackFeaturedPosts, getFallbackPostsByCategory } from './fallbackData';

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
  // New SEO and publishing fields
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
    // Check if Supabase is configured
    if (!supabase) {
      console.warn('Supabase client not configured. Using fallback data.');
      return getFallbackPostBySlug(slug);
    }

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
      // Handle specific Supabase errors
      if (error.code === 'PGRST116') {
        console.warn(`Blog post not found in database for slug: ${slug}, trying fallback data`);
        return getFallbackPostBySlug(slug);
      }
      console.error('Error fetching blog post from database, using fallback:', {
        code: error.code,
        message: error.message,
        slug
      });
      return getFallbackPostBySlug(slug);
    }

    return data || getFallbackPostBySlug(slug);
  } catch (error) {
    console.error('Unexpected error fetching blog post, using fallback:', {
      error: error instanceof Error ? error.message : error,
      slug
    });
    return getFallbackPostBySlug(slug);
  }
};

export const getFeaturedPosts = async (limit: number = 5, includeUnpublished = false): Promise<BlogPost[]> => {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      console.warn('Supabase client not configured. Using fallback data.');
      return getFallbackFeaturedPosts(limit);
    }

    let query = supabase
      .from('blog_posts')
      .select('*');
    
    // Only show published posts for public users
    if (!includeUnpublished) {
      query = query.eq('status', 'published');
    }
    
    const { data, error } = await query
      .order('published_at', { ascending: false, nullsFirst: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured posts from database, using fallback:', {
        code: error.code,
        message: error.message
      });
      return getFallbackFeaturedPosts(limit);
    }

    return data && data.length > 0 ? data : getFallbackFeaturedPosts(limit);
  } catch (error) {
    console.error('Unexpected error fetching featured posts, using fallback:', {
      error: error instanceof Error ? error.message : error
    });
    return getFallbackFeaturedPosts(limit);
  }
};

export const getBlogPostsByCategory = async (categorySlug: string, includeUnpublished = false): Promise<BlogPost[]> => {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      console.warn('Supabase client not configured. Using fallback data.');
      return getFallbackPostsByCategory(categorySlug);
    }

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
      console.error('Error fetching blog posts by category from database, using fallback:', {
        code: error.code,
        message: error.message,
        categorySlug
      });
      return getFallbackPostsByCategory(categorySlug);
    }

    return data && data.length > 0 ? data : getFallbackPostsByCategory(categorySlug);
  } catch (error) {
    console.error('Unexpected error fetching blog posts by category, using fallback:', {
      error: error instanceof Error ? error.message : error,
      categorySlug
    });
    return getFallbackPostsByCategory(categorySlug);
  }
};

export const getBlogPostsByAuthor = async (authorSlug: string): Promise<BlogPost[]> => {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      console.warn('Supabase client not configured. Using fallback data.');
      return fallbackBlogPosts.filter(post => 
        post.author.toLowerCase().replace(/\s+/g, '-') === authorSlug
      );
    }

    // Convert slug back to author name (assuming author names are URL-friendly)
    const authorName = authorSlug.replace(/-/g, ' ');
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('author', authorName)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts by author from database, using fallback:', {
        code: error.code,
        message: error.message,
        authorSlug
      });
      return fallbackBlogPosts.filter(post => 
        post.author.toLowerCase().replace(/\s+/g, '-') === authorSlug
      );
    }

    // If we have data, return it; otherwise try fallback
    if (data && data.length > 0) {
      return data;
    }
    
    // Return fallback posts for this author
    return fallbackBlogPosts.filter(post => 
      post.author.toLowerCase().replace(/\s+/g, '-') === authorSlug
    );
  } catch (error) {
    console.error('Unexpected error fetching blog posts by author, using fallback:', {
      error: error instanceof Error ? error.message : error,
      authorSlug
    });
    return fallbackBlogPosts.filter(post => 
      post.author.toLowerCase().replace(/\s+/g, '-') === authorSlug
    );
  }
};

export const getRelatedPosts = async (currentPostSlug: string, category: string, limit: number = 4): Promise<BlogPost[]> => {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      console.warn('Supabase client not configured. Using fallback data.');
      return fallbackBlogPosts
        .filter(post => post.category === category && post.slug !== currentPostSlug)
        .slice(0, limit);
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('category', category)
      .neq('slug', currentPostSlug)
      .order('date', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching related posts from database, using fallback:', {
        code: error.code,
        message: error.message,
        category,
        currentPostSlug
      });
      return fallbackBlogPosts
        .filter(post => post.category === category && post.slug !== currentPostSlug)
        .slice(0, limit);
    }

    return data && data.length > 0 
      ? data 
      : fallbackBlogPosts
          .filter(post => post.category === category && post.slug !== currentPostSlug)
          .slice(0, limit);
  } catch (error) {
    console.error('Unexpected error fetching related posts, using fallback:', {
      error: error instanceof Error ? error.message : error,
      category,
      currentPostSlug
    });
    return fallbackBlogPosts
      .filter(post => post.category === category && post.slug !== currentPostSlug)
      .slice(0, limit);
  }
};

// Admin functions for draft/publish management
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

export const updatePostSEO = async (
  id: number, 
  seoData: {
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    canonical_url?: string;
  }
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .update(seoData)
      .eq('id', id);

    return !error;
  } catch (error) {
    console.error('Error updating post SEO:', error);
    return false;
  }
};