# Supabase Integration Guide

This guide explains how to set up Supabase with your blog to replace mock data with real data from a database.

## 1. Setting up Supabase

1. Go to [Supabase](https://supabase.io/) and create a new project.
2. Once your project is created, navigate to the Project Settings > API page.
3. Copy your Project URL and anon key.

## 2. Environment Variables

Update your `.env.local` file with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
```

## 3. Creating the Database Table

The blog posts are stored in a table called `blog_posts`. To create this table, you can either:

### Option A: Using the Supabase SQL Editor

Run this SQL query in your Supabase SQL editor:

```sql
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
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

-- Create an index on the date column for ordering
CREATE INDEX idx_blog_posts_date ON blog_posts(date);
```

### Option B: Using the init script

Run the init script to automatically create the table:

```bash
npm run init-supabase
```

## 4. Seeding the Database

To seed your database with the mock blog posts:

```bash
npm run seed-blog-posts
```

## 5. Running the Application

After setting up Supabase and seeding the database, you can run your application as usual:

```bash
npm run dev
```

Your blog will now fetch real data from Supabase instead of using mock data.