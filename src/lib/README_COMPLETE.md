# Complete Supabase Integration and SEO Guide

This guide explains how to set up Supabase with your blog to replace mock data with real data from a database, and how to implement SEO improvements with a slug system.

## 1. Supabase Integration

### Environment Variables

Your `.env.local` file has been automatically configured with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://ypqxojzjbocbzdbhphok.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwcXhvanpqYm9jYnpkYmhwaG9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNTUwMTUsImV4cCI6MjA3MjgzMTAxNX0.DYkTgwM4QTqXFldVPH2MLbQahUwuIrDyKMMNBZcoXnI
```

### Database Structure

The blog posts are stored in a table called `blog_posts` with the following structure:

```sql
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
```

## 2. SEO Improvements with Slug System

We've implemented a slug system for better SEO:

1. **URL Structure**: Blog posts are now accessible via `/blog/[slug]` instead of `/blog/[id]`
2. **Descriptive URLs**: URLs contain keywords related to the post content
3. **Permalinks**: Stable URLs that won't change even if titles are updated
4. **Search Engine Friendly**: URLs help search engines understand content

### Benefits

- Better search engine rankings
- Improved user experience
- Cleaner social sharing URLs
- Stable permalinks

## 3. Available Scripts

### Initialize Supabase
```bash
npm run init-supabase
```
Creates the blog_posts table with the proper structure.

### Seed Blog Posts
```bash
npm run seed-blog-posts
```
Populates the database with mock blog posts that include SEO-friendly slugs.

### Test Supabase Connection
```bash
npm run test-supabase
```
Verifies that the Supabase connection is working correctly.

### Migrate Blog Posts Table
```bash
npm run migrate-blog-posts
```
Adds the slug column to existing blog_posts tables if needed.

## 4. API Endpoints

### Get All Blog Posts
```
GET /api/blog
```

### Get Blog Post by Slug
```
GET /api/blog/[slug]
```

## 5. Components and Pages

### Blog Posts Grid
The main page displays blog posts fetched from Supabase instead of using mock data.

### Blog Post Detail
Individual blog posts are accessible via SEO-friendly URLs: `/blog/[slug]`

### Blog Post Card
Each card links to the SEO-friendly URL instead of using IDs.

## 6. Data Structure

The BlogPost interface includes all necessary fields:

```typescript
interface BlogPost {
  id: number;
  title: string;
  slug: string; // SEO improvement
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
```

## 7. Running the Application

After setting up Supabase and seeding the database, you can run your application as usual:

```bash
npm run dev
```

Your blog will now fetch real data from Supabase instead of using mock data, with improved SEO through the slug system.