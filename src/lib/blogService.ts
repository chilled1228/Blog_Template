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
}

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('date', { ascending: false });

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

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      console.warn('Supabase client not configured. Using fallback data.');
      return getFallbackPostBySlug(slug);
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

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

export const getFeaturedPosts = async (limit: number = 5): Promise<BlogPost[]> => {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      console.warn('Supabase client not configured. Using fallback data.');
      return getFallbackFeaturedPosts(limit);
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('date', { ascending: false })
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

export const getBlogPostsByCategory = async (categorySlug: string): Promise<BlogPost[]> => {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      console.warn('Supabase client not configured. Using fallback data.');
      return getFallbackPostsByCategory(categorySlug);
    }

    // Convert slug back to category name
    const categoryName = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('category', categoryName)
      .order('date', { ascending: false });

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