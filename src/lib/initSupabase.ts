import { supabase } from './supabaseClient';

const initSupabase = async () => {
  try {
    // Check if the blog_posts table exists
    const { data: tableExists, error: tableError } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(1);

    if (tableError && tableError.message.includes('relation "blog_posts" does not exist')) {
      console.log('Creating blog_posts table...');
      
      // Create the blog_posts table with slug column for better SEO
      const { error: createError } = await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE blog_posts (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            slug VARCHAR(255) NOT NULL UNIQUE,
            url VARCHAR(255) NOT NULL,
            category VARCHAR(100) NOT NULL,
            category_url VARCHAR(255) NOT NULL,
            author VARCHAR(100) NOT NULL,
            author_url VARCHAR(255) NOT NULL,
            date VARCHAR(100) NOT NULL,
            datetime TIMESTAMP NOT NULL,
            image VARCHAR(255) NOT NULL,
            content TEXT,
            excerpt TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
          
          -- Create indexes for better performance and SEO
          CREATE INDEX idx_blog_posts_date ON blog_posts(date);
          CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
        `
      });

      if (createError) {
        console.error('Error creating blog_posts table:', createError);
        return;
      }

      console.log('Successfully created blog_posts table with SEO-friendly slugs');
    } else if (tableError) {
      console.error('Error checking blog_posts table:', tableError);
      return;
    } else {
      console.log('blog_posts table already exists');
    }
  } catch (error) {
    console.error('Error initializing Supabase:', error);
  }
};

initSupabase();