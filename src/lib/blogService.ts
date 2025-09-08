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
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }

    return data || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

export const getFeaturedPosts = async (limit: number = 5): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('date', { ascending: false })
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

export const getBlogPostsByCategory = async (categorySlug: string): Promise<BlogPost[]> => {
  try {
    // Convert slug back to category name
    const categoryName = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('category', categoryName)
      .order('date', { ascending: false });

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

export const getBlogPostsByAuthor = async (authorSlug: string): Promise<BlogPost[]> => {
  try {
    // Convert slug back to author name (assuming author names are URL-friendly)
    const authorName = authorSlug.replace(/-/g, ' ');
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('author', authorName)
      .order('date', { ascending: false });

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