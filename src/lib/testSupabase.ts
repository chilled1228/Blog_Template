import { supabase } from './supabaseClient';
import { getBlogPostBySlug } from './blogService';

const testSupabase = async () => {
  console.log('Testing Supabase connection...');
  
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug')
      .limit(1);

    if (error) {
      console.error('Supabase connection test failed:', error);
      return;
    }

    console.log('Supabase connection successful!');
    
    if (data && data.length > 0) {
      console.log('Sample blog post:', data[0]);
      
      // Test fetching by slug
      const post = await getBlogPostBySlug(data[0].slug);
      if (post) {
        console.log('Successfully fetched post by slug:', post.title);
      } else {
        console.log('No post found for slug:', data[0].slug);
      }
    } else {
      console.log('No blog posts found in the database');
    }
  } catch (error) {
    console.error('Error testing Supabase connection:', error);
  }
};

testSupabase();