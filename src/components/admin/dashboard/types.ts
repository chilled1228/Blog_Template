import { BlogPost } from '@/lib/blogService';

export interface AdminBlogPost extends BlogPost {
  id: string;
  created_at: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
}

export interface AdminUser {
  email: string;
  addedBy: string;
  addedAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: string;
  updatedAt: string;
  role: string;
}

export interface User {
  id: string;
  email: string;
  role?: string;
}

export interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export type PageType = 'dashboard' | 'posts' | 'categories' | 'media' | 'users' | 'admins' | 'stats' | 'settings';
