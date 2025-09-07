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