import { supabase } from './supabaseClient';

const migrateBlogPosts = async () => {
  try {
    // Check if the slug column exists
    const { data: columnExists, error: columnError } = await supabase
      .from('blog_posts')
      .select('slug')
      .limit(1);

    if (columnError && columnError.message.includes('column "slug" does not exist')) {
      console.log('Adding slug column to blog_posts table...');
      
      // Add slug column
      const { error: alterError } = await supabase.rpc('exec_sql', {
        sql: `
          ALTER TABLE blog_posts ADD COLUMN slug VARCHAR(255) UNIQUE;
          ALTER TABLE blog_posts ALTER COLUMN slug SET NOT NULL;
          CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
        `
      });

      if (alterError) {
        console.error('Error adding slug column:', alterError);
        return;
      }

      console.log('Successfully added slug column to blog_posts table');
    } else if (columnError) {
      console.error('Error checking slug column:', columnError);
      return;
    } else {
      console.log('Slug column already exists in blog_posts table');
    }
  } catch (error) {
    console.error('Error migrating blog_posts table:', error);
  }
};

migrateBlogPosts();