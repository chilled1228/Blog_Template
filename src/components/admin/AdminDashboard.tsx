'use client';

import { useState, useEffect, useCallback } from 'react';
import { BlogPost, publishPost, unpublishPost, calculateReadingTime } from '@/lib/blogService';
import SimpleEditor from './SimpleEditor';
import MediaLibrary, { MediaFile } from './MediaLibrary';

interface AdminBlogPost extends BlogPost {
  id: string;
  created_at: string;
  updated_at?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
}

interface AdminUser {
  email: string;
  addedBy: string;
  addedAt: string;
}

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: string;
  updatedAt: string;
  role: string;
}

interface User {
  id: string;
  email: string;
  role?: string;
}

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

type TabType = 'posts' | 'stats' | 'settings' | 'media' | 'admins' | 'users';

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [posts, setPosts] = useState<AdminBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState<AdminBlogPost | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 15,
    total: 0,
    pages: 0
  });
  const [activeTab, setActiveTab] = useState<TabType>('posts');
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    seo: false,
    publishing: false
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '', description: '' });
  const [newAdmin, setNewAdmin] = useState({ email: '' });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [activeEditTab, setActiveEditTab] = useState<'write' | 'media'>('write');
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const fetchCategories = useCallback(async () => {
    try {
      // For now, return empty categories array since we're using Firebase
      // Categories can be added back later if needed
      setCategories([]);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Categories functionality disabled for Firebase migration
      alert('Category management is temporarily disabled during Firebase migration');
      setNewCategory({ name: '', slug: '', description: '' });
      setShowAddCategory(false);
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    try {
      // Categories functionality disabled for Firebase migration
      alert('Category management is temporarily disabled during Firebase migration');
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  const handleUpdateCategory = async (id: string, updates: Partial<Category>) => {
    try {
      // Categories functionality disabled for Firebase migration
      alert('Category management is temporarily disabled during Firebase migration');
      setEditingCategory(null);
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  const fetchAdmins = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${user.email}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAdmins(data.adminUsers || []);
      } else {
        console.error('Failed to fetch admin users:', await response.text());
      }
    } catch (error) {
      console.error('Failed to fetch admins:', error);
    }
  }, [user.email]);

  const fetchUserProfiles = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/all-users', {
        headers: {
          'Authorization': `Bearer ${user.email}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserProfiles(data.users || []);
      } else {
        console.error('Failed to fetch user profiles:', await response.text());
      }
    } catch (error) {
      console.error('Failed to fetch user profiles:', error);
    }
  }, [user.email]);

  const promoteToAdmin = async (uid: string, email: string) => {
    try {
      const response = await fetch('/api/admin/all-users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.email}`
        },
        body: JSON.stringify({ uid, updates: { role: 'admin' } })
      });
      
      if (response.ok) {
        await fetchAdmins();
        await fetchUserProfiles();
        alert(`${email} has been promoted to admin successfully!`);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to promote user to admin');
      }
    } catch (error) {
      console.error('Failed to promote user:', error);
      alert('Failed to promote user to admin');
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.email}`
        },
        body: JSON.stringify({ email: newAdmin.email })
      });
      
      if (response.ok) {
        await fetchAdmins();
        setNewAdmin({ email: '' });
        setShowAddAdmin(false);
        alert('Admin user added successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to add admin user');
      }
    } catch (error) {
      console.error('Failed to add admin:', error);
      alert('Failed to add admin user');
    }
  };

  const handleDeleteAdmin = async (email: string) => {
    if (!confirm('Are you sure you want to remove this admin user?')) return;
    
    try {
      const response = await fetch(`/api/admin/users?email=${encodeURIComponent(email)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.email}`
        }
      });
      
      if (response.ok) {
        await fetchAdmins();
        alert('Admin user removed successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to remove admin user');
      }
    } catch (error) {
      console.error('Failed to delete admin:', error);
      alert('Failed to remove admin user');
    }
  };

  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    url: '',
    content: '',
    excerpt: '',
    image: '',
    author: 'Freepik Team',
    author_url: '',
    category: 'Technology',
    category_url: '/category/technology',
    status: 'draft' as 'draft' | 'published',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    canonical_url: '',
    featured: false
  });

  const fetchPosts = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '15',
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(searchQuery && { search: searchQuery })
      });
      
      const response = await fetch(`/api/admin/posts?${params}`);
      const data = await response.json();
      
      if (data.posts) {
        setPosts(data.posts);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQuery]);

  const handlePublish = async (postId: string) => {
    try {
      const success = await publishPost(postId);
      if (success) {
        fetchPosts(pagination.page);
      }
    } catch (error) {
      console.error('Failed to publish post:', error);
    }
  };

  const handleUnpublish = async (postId: string) => {
    try {
      const success = await unpublishPost(postId);
      if (success) {
        fetchPosts(pagination.page);
      }
    } catch (error) {
      console.error('Failed to unpublish post:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
    if (activeTab === 'media') {
      fetchCategories();
    }
    if (activeTab === 'admins') {
      fetchAdmins();
    }
    if (activeTab === 'users') {
      fetchUserProfiles();
    }
  }, [fetchPosts, activeTab, fetchCategories, fetchAdmins, fetchUserProfiles]);

  useEffect(() => {
    // Ensure behind_brain folder exists when dashboard loads
    const ensureFolder = async () => {
      try {
        await fetch('/api/admin/ensure-folder', {
          method: 'POST',
        });
      } catch (error) {
        console.error('Failed to ensure behind_brain folder:', error);
      }
    };
    
    ensureFolder();
  }, []);
  
  // Fetch admins on component mount for author dropdown
  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when user is typing in inputs, textareas, or contenteditable elements
      if (e.target instanceof HTMLInputElement || 
          e.target instanceof HTMLTextAreaElement || 
          e.target instanceof HTMLSelectElement ||
          (e.target as HTMLElement).isContentEditable) {
        return;
      }

      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'n':
            if (!showCreateForm) {
              e.preventDefault();
              setEditingPost(null);
              setFormData({
                title: '',
                slug: '',
                url: '',
                content: '',
                excerpt: '',
                image: '',
                author: 'Freepik Team',
                author_url: '',
                category: 'Technology',
                category_url: '/category/technology',
                status: 'draft' as 'draft' | 'published',
                meta_title: '',
                meta_description: '',
                meta_keywords: '',
                canonical_url: '',
                featured: false
              });
              setShowCreateForm(true);
            }
            break;
          case 'f':
            if (!showCreateForm && activeTab === 'posts') {
              e.preventDefault();
              setTimeout(() => {
                const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
                if (searchInput) {
                  searchInput.focus();
                  searchInput.select();
                }
              }, 0);
            }
            break;
          case 'a':
            if (!showCreateForm && activeTab === 'posts') {
              e.preventDefault();
              setTimeout(() => {
                const selectAll = document.querySelector('input[data-select-all]') as HTMLInputElement;
                if (selectAll) {
                  selectAll.click();
                }
              }, 0);
            }
            break;
          case 's':
            if (showCreateForm) {
              e.preventDefault();
              const form = document.getElementById('post-form') as HTMLFormElement;
              if (form) {
                form.requestSubmit();
              }
            }
            break;
          case 'w':
            if (showCreateForm) {
              e.preventDefault();
              setShowCreateForm(false);
              setEditingPost(null);
            }
            break;
        }
      }
      
      // Escape key to close forms/modals
      if (e.key === 'Escape') {
        if (showCreateForm) {
          e.preventDefault();
          setShowCreateForm(false);
          setEditingPost(null);
        }
        if (showMediaLibrary) {
          e.preventDefault();
          setShowMediaLibrary(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, showCreateForm, showMediaLibrary, setEditingPost, setFormData, setShowCreateForm, setShowMediaLibrary]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingPost 
        ? `/api/admin/posts/${editingPost.id}`
        : '/api/admin/posts';
      
      const method = editingPost ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowCreateForm(false);
        setEditingPost(null);
        setFormData({
          title: '',
          slug: '',
          url: '',
          content: '',
          excerpt: '',
          image: '',
          author: 'Freepik Team',
          author_url: '',
          category: 'Technology',
          category_url: '/category/technology',
          status: 'draft' as 'draft' | 'published',
          meta_title: '',
          meta_description: '',
          meta_keywords: '',
          canonical_url: '',
          featured: false
        });
        fetchPosts(pagination.page);
      }
    } catch {
      console.error('Failed to save post');
    }
  };

  const handleEdit = (post: AdminBlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      url: post.url,
      content: post.content || '',
      excerpt: post.excerpt || '',
      image: post.image,
      author: post.author,
      author_url: post.author_url,
      category: post.category,
      category_url: post.category_url,
      status: post.status,
      meta_title: post.meta_title || '',
      meta_description: post.meta_description || '',
      meta_keywords: post.meta_keywords || '',
      canonical_url: post.canonical_url || '',
      featured: post.featured
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchPosts(pagination.page);
      }
    } catch {
      console.error('Failed to delete post');
    }
  };

  const handleBulkAction = async (action: 'publish' | 'unpublish' | 'delete') => {
    if (selectedPosts.size === 0) return;
    
    if (action === 'delete' && !confirm(`Are you sure you want to delete ${selectedPosts.size} posts?`)) {
      return;
    }

    try {
      const promises = Array.from(selectedPosts).map(id => {
        if (action === 'publish') return publishPost(id);
        if (action === 'unpublish') return unpublishPost(id);
        return fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
      });

      await Promise.all(promises);
      setSelectedPosts(new Set());
      fetchPosts(pagination.page);
    } catch (error) {
      console.error(`Failed to bulk ${action}:`, error);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleMediaSelect = (media: MediaFile) => {
    setFormData(prev => ({
      ...prev,
      image: media.url
    }));
    setShowMediaLibrary(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'behind_brain');
      
      try {
        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        
        if (result.success) {
          setFormData(prev => ({
            ...prev,
            image: result.url
          }));
        } else {
          alert('Upload failed: ' + result.error);
        }
      } catch (error) {
        alert('Upload failed');
      }
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabItems = [
    { id: 'posts' as TabType, icon: '📝', label: 'Posts', count: pagination.total },
    { id: 'stats' as TabType, icon: '📊', label: 'Stats', count: null },
    { id: 'settings' as TabType, icon: '⚙️', label: 'Settings', count: null },
    { id: 'media' as TabType, icon: '📁', label: 'Media', count: null },
    { id: 'admins' as TabType, icon: '🔐', label: 'Admins', count: admins.length },
    { id: 'users' as TabType, icon: '👥', label: 'All Users', count: userProfiles.length },
  ];

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Enhanced Header - Responsive */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingPost(null);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {editingPost ? 'Edit Post' : 'Create New Post'}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    {editingPost ? 'Update your blog post information' : 'Fill in the details for your new blog post'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* User Info */}
                <div className="flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.email?.charAt(0).toUpperCase() || 'A'}
                    </span>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{user?.email || 'Admin'}</p>
                    <p className="text-gray-500">{user?.role || 'Administrator'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Keyboard Shortcuts Help */}
                  <div className="hidden lg:flex items-center space-x-1 px-3 py-2 bg-gray-100 rounded-lg text-xs text-gray-600">
                    <kbd className="px-2 py-1 bg-white rounded border">Ctrl+S</kbd>
                    <span>Save</span>
                    <kbd className="px-2 py-1 bg-white rounded border">Ctrl+W</kbd>
                    <span>Close</span>
                    <kbd className="px-2 py-1 bg-white rounded border">Esc</kbd>
                    <span>Cancel</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      setShowCreateForm(false);
                      setEditingPost(null);
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                    title="Cancel (Ctrl+W or Esc)"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    form="post-form"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap"
                    title={editingPost ? "Update Post (Ctrl+S)" : "Create Post (Ctrl+S)"}
                  >
                    {editingPost ? (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Update Post
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Create Post
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Enhanced Form - Responsive Two Column Layout */}
        <main className="min-h-[calc(100vh-140px)] max-h-[calc(100vh-140px)] overflow-hidden">
          <form onSubmit={handleSubmit} id="post-form" className="h-full flex flex-col lg:flex-row">
            {/* Left Sidebar - Form Information - Responsive */}
            <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 bg-white border-r border-gray-200 p-4 lg:p-6 space-y-4 overflow-y-auto">
              {/* Basic Information */}
              <div className="border border-gray-200 rounded-lg">
                <button
                  type="button"
                  onClick={() => toggleSection('basic')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                      <p className="text-sm text-gray-500">Essential details</p>
                    </div>
                  </div>
                  <svg className={`w-5 h-5 text-gray-400 transform transition-transform ${expandedSections.basic ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSections.basic && (
                  <div className="px-4 pb-4 space-y-4 border-t border-gray-100">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter post title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">URL Slug *</label>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="post-url-slug"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          category: e.target.value,
                          category_url: `/category/${e.target.value.toLowerCase()}`
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Technology">Technology</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="CSS">CSS</option>
                        <option value="Design">Design</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                      <select
                        value={`${formData.author}|${formData.author_url}`}
                        onChange={(e) => {
                          const [name, url] = e.target.value.split('|');
                          setFormData(prev => ({ 
                            ...prev, 
                            author: name,
                            author_url: url || ''
                          }));
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Freepik Team|">Freepik Team</option>
                        {userProfiles.map((userProfile) => (
                          <option key={userProfile.uid} value={`${userProfile.displayName || userProfile.email}|`}>
                            {userProfile.displayName || userProfile.email}
                          </option>
                        ))}
                        {admins.map((adminUser) => (
                          <option key={adminUser.email} value={`${adminUser.email}|`}>
                            {adminUser.displayName}
                          </option>
                        ))}
                        {admins.filter(admin => admin.is_active).map((admin) => (
                          <option key={admin.id} value={`${admin.name || admin.email}|${admin.author_url || ''}`}>
                            {admin.name || admin.email}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Brief description"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* SEO Settings */}
              <div className="border border-gray-200 rounded-lg">
                <button
                  type="button"
                  onClick={() => toggleSection('seo')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">SEO Settings</h3>
                      <p className="text-sm text-gray-500">Search optimization</p>
                    </div>
                  </div>
                  <svg className={`w-5 h-5 text-gray-400 transform transition-transform ${expandedSections.seo ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSections.seo && (
                  <div className="px-4 pb-4 space-y-4 border-t border-gray-100">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                      <input
                        type="text"
                        value={formData.meta_title}
                        onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="SEO title"
                        maxLength={60}
                      />
                      <p className="text-xs text-gray-500 mt-1">{formData.meta_title.length}/60 characters</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                      <textarea
                        value={formData.meta_description}
                        onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="SEO description"
                        maxLength={160}
                      />
                      <p className="text-xs text-gray-500 mt-1">{formData.meta_description.length}/160 characters</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Publishing Settings */}
              <div className="border border-gray-200 rounded-lg">
                <button
                  type="button"
                  onClick={() => toggleSection('publishing')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">Publishing</h3>
                      <p className="text-sm text-gray-500">Media & status</p>
                    </div>
                  </div>
                  <svg className={`w-5 h-5 text-gray-400 transform transition-transform ${expandedSections.publishing ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSections.publishing && (
                  <div className="px-4 pb-4 space-y-4 border-t border-gray-100">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                      <div className="space-y-3">
                        {/* Image Preview */}
                        {formData.image && (
                          <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <img
                              src={formData.image}
                              alt="Featured image preview"
                              className="w-full h-32 object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '';
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        
                        {/* Image URL Input */}
                        <div className="flex gap-2">
                          <input
                            type="url"
                            value={formData.image}
                            onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://example.com/image.jpg"
                          />
                          <button
                            type="button"
                            onClick={() => setShowMediaLibrary(true)}
                            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            title="Select from media library"
                          >
                            📁
                          </button>
                        </div>
                        
                        {/* Upload Option */}
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Or upload new image:</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700">Featured Post</label>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Side - Content Editor with Tabs */}
            <div className="flex-1 flex flex-col bg-gray-50 min-h-0">
              {/* Tab Navigation */}
              <div className="p-4 lg:p-6 bg-white border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      onClick={() => setActiveEditTab('write')}
                      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeEditTab === 'write'
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveEditTab('media')}
                      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeEditTab === 'media'
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Media
                    </button>
                  </div>
                  
                  {activeEditTab === 'write' && formData.content && (
                    <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {calculateReadingTime(formData.content)} min read
                    </div>
                  )}
                </div>
              </div>
              
              {/* Tab Content */}
              <div className="flex-1 p-4 lg:p-6 overflow-hidden">
                {activeEditTab === 'write' && (
                  <div className="h-full border border-gray-300 rounded-lg overflow-hidden bg-white">
                    <SimpleEditor
                      value={formData.content}
                      onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                      placeholder="Start writing your amazing content..."
                    />
                  </div>
                )}
                
                {activeEditTab === 'media' && (
                  <div className="h-full space-y-6">
                    {/* Featured Image Section */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Image</h3>
                      <div className="space-y-4">
                        {/* Current Image Preview */}
                        {formData.image ? (
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Current Image</label>
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                              <img
                                src={formData.image}
                                alt="Current featured image"
                                className="w-full h-48 object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = '';
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <input
                                type="text"
                                value={formData.image}
                                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                placeholder="Image URL"
                              />
                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                                className="ml-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                            <div className="text-gray-400">
                              <svg className="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <p className="text-lg font-medium mb-2">No featured image</p>
                              <p className="text-sm">Add a featured image to make your post more engaging</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            type="button"
                            onClick={() => setShowMediaLibrary(true)}
                            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                          >
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Select from Media Library
                          </button>
                          
                          <label className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center cursor-pointer">
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            Upload New Image
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                        
                        {/* Or Enter URL */}
                        <div className="border-t pt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Or enter image URL:</label>
                          <input
                            type="url"
                            value={formData.image}
                            onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Media Management Section */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Media Library</h3>
                        <button
                          type="button"
                          onClick={() => setShowMediaLibrary(true)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Manage Media
                        </button>
                      </div>
                      <p className="text-gray-600">Access and manage all your uploaded images and media files.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </main>
        
        {/* Media Library Modal */}
        <MediaLibrary
          isOpen={showMediaLibrary}
          onClose={() => setShowMediaLibrary(false)}
          onSelect={handleMediaSelect}
          type="image"
          defaultFolder="behind_brain"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <span className="text-blue-600 mr-2">📊</span>
                Admin Dashboard
              </h1>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search posts..."
                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | 'draft' | 'published')}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="all">All Posts</option>
                  <option value="draft">Drafts</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Keyboard Shortcuts Help */}
              <div className="hidden md:flex items-center space-x-1 px-3 py-2 bg-gray-100 rounded-lg text-xs text-gray-600">
                <kbd className="px-2 py-1 bg-white rounded border">Ctrl+N</kbd>
                <span>New</span>
                <kbd className="px-2 py-1 bg-white rounded border">Ctrl+F</kbd>
                <span>Search</span>
                <kbd className="px-2 py-1 bg-white rounded border">Ctrl+A</kbd>
                <span>Select All</span>
              </div>
              
              {/* User Info */}
              <div className="flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.email?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user?.email || 'Admin'}</p>
                  <p className="text-gray-500">{user?.role || 'Administrator'}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setEditingPost(null);
                  setFormData({
                    title: '',
                    slug: '',
                    url: '',
                    content: '',
                    excerpt: '',
                    image: '',
                    author: 'Freepik Team',
                    author_url: '',
                    category: 'Technology',
                    category_url: '/category/technology',
                    status: 'draft' as 'draft' | 'published',
                    meta_title: '',
                    meta_description: '',
                    meta_keywords: '',
                    canonical_url: '',
                    featured: false
                  });
                  setShowCreateForm(true);
                }}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                title="New Post (Ctrl+N)"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Post
              </button>
              <button
                onClick={onLogout}
                className="inline-flex items-center px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors shadow-sm"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'posts' && (
          <div className="space-y-6">
            {/* Bulk Actions Bar */}
            {selectedPosts.size > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-blue-900">
                      {selectedPosts.size} post{selectedPosts.size !== 1 ? 's' : ''} selected
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleBulkAction('publish')}
                        className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-md hover:bg-green-200 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Publish
                      </button>
                      <button
                        onClick={() => handleBulkAction('unpublish')}
                        className="inline-flex items-center px-3 py-1.5 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-md hover:bg-yellow-200 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Unpublish
                      </button>
                      <button
                        onClick={() => handleBulkAction('delete')}
                        className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 text-sm font-medium rounded-md hover:bg-red-200 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPosts(new Set())}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear selection
                  </button>
                </div>
              </div>
            )}

            {/* Posts Table */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          data-select-all
                          checked={selectedPosts.size === filteredPosts.length && filteredPosts.length > 0}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPosts(new Set(filteredPosts.map(p => p.id)));
                            } else {
                              setSelectedPosts(new Set());
                            }
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Post
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Views
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPosts.map((post) => (
                      <tr 
                        key={post.id} 
                        className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                          selectedPosts.has(post.id) ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                        onDoubleClick={() => handleEdit(post)}
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedPosts.has(post.id)}
                            onChange={(e) => {
                              const newSelected = new Set(selectedPosts);
                              if (e.target.checked) {
                                newSelected.add(post.id);
                              } else {
                                newSelected.delete(post.id);
                              }
                              setSelectedPosts(newSelected);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-start">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {post.title}
                                </p>
                                {post.featured && (
                                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    ★ Featured
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 truncate">
                                /{post.slug}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {post.author}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            post.status === 'published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            <svg className={`w-1.5 h-1.5 mr-1.5 ${
                              post.status === 'published' ? 'text-green-400' : 'text-yellow-400'
                            }`} fill="currentColor" viewBox="0 0 8 8">
                              <circle cx={4} cy={4} r={3} />
                            </svg>
                            {post.status === 'published' ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {post.view_count.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(post.datetime).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleEdit(post)}
                              className="text-blue-600 hover:text-blue-900 transition-colors"
                              title="Edit post"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            {post.status === 'draft' ? (
                              <button
                                onClick={() => handlePublish(post.id)}
                                className="text-green-600 hover:text-green-900 transition-colors"
                                title="Publish post"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUnpublish(post.id)}
                                className="text-orange-600 hover:text-orange-900 transition-colors"
                                title="Unpublish post"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                              title="Delete post"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Enhanced Pagination */}
            {pagination.pages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => fetchPosts(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => fetchPosts(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing{' '}
                      <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span>
                      {' '}to{' '}
                      <span className="font-medium">{Math.min(pagination.page * pagination.limit, pagination.total)}</span>
                      {' '}of{' '}
                      <span className="font-medium">{pagination.total}</span>
                      {' '}results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => fetchPosts(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => fetchPosts(page)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              page === pagination.page
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => fetchPosts(pagination.page + 1)}
                        disabled={pagination.page === pagination.pages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">All Users</h3>
                    <p className="text-sm text-gray-500">Manage all registered users and promote to admin</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {userProfiles.length} users total
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-0">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Display Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userProfiles.map((user) => (
                      <tr key={user.uid} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {user.displayName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                              </span>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.displayName || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.role === 'admin' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role === 'admin' ? 'Admin' : 'User'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            {user.role !== 'admin' && (
                              <button
                                onClick={() => promoteToAdmin(user.uid, user.email)}
                                className="text-blue-600 hover:text-blue-900 transition-colors"
                                title="Promote to Admin"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {userProfiles.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center">
                          <div className="text-gray-500">
                            <div className="text-2xl mb-2">👥</div>
                            <p>No users found.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-12">
            <div className="text-center">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Media Library</h3>
              <p className="text-lg text-gray-600 max-w-md mx-auto">Manage your images, files, and media assets. Upload, organize, and select media for your blog posts.</p>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-12">
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Analytics Dashboard</h3>
              <p className="text-lg text-gray-600 max-w-md mx-auto">Detailed statistics and analytics coming soon. Track your blog performance, visitor insights, and content metrics.</p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-12">
            <div className="text-center">
              <div className="text-6xl mb-4">⚙️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Site Settings</h3>
              <p className="text-lg text-gray-600 max-w-md mx-auto">Configure your blog settings, SEO options, social media integration, and more.</p>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">All Users</h3>
                    <p className="text-sm text-gray-500">Manage all registered users and promote to admin</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {userProfiles.length} users total
                    </span>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Slug
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categories.map((category) => (
                      <tr key={category.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingCategory?.id === category.id ? (
                            <input
                              type="text"
                              value={editingCategory.name}
                              onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                              className="text-sm font-medium text-gray-900 border border-gray-300 rounded px-2 py-1"
                            />
                          ) : (
                            <div className="text-sm font-medium text-gray-900">{category.name}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingCategory?.id === category.id ? (
                            <input
                              type="text"
                              value={editingCategory.slug}
                              onChange={(e) => setEditingCategory({...editingCategory, slug: e.target.value})}
                              className="text-sm text-gray-500 border border-gray-300 rounded px-2 py-1"
                            />
                          ) : (
                            <div className="text-sm text-gray-500">/{category.slug}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {editingCategory?.id === category.id ? (
                            <input
                              type="text"
                              value={editingCategory.description || ''}
                              onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                              className="text-sm text-gray-500 border border-gray-300 rounded px-2 py-1 w-full"
                            />
                          ) : (
                            <div className="text-sm text-gray-500">{category.description || '-'}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(category.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {editingCategory?.id === category.id ? (
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => handleUpdateCategory(category.id, editingCategory)}
                                className="text-green-600 hover:text-green-900"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                              <button
                                onClick={() => setEditingCategory(null)}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => setEditingCategory(category)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(category.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                    {categories.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center">
                          <div className="text-gray-500">
                            <div className="text-2xl mb-2">📁</div>
                            <p>No categories yet. Create your first category!</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add Category Modal */}
            {showAddCategory && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Add New Category</h3>
                    <button
                      onClick={() => setShowAddCategory(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <form onSubmit={handleAddCategory} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        required
                        value={newCategory.name}
                        onChange={(e) => setNewCategory(prev => ({ 
                          ...prev, 
                          name: e.target.value,
                          slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter category name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                      <input
                        type="text"
                        value={newCategory.slug}
                        onChange={(e) => setNewCategory(prev => ({ ...prev, slug: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="category-slug"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={newCategory.description}
                        onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Optional description"
                      />
                    </div>
                    <div className="flex items-center justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowAddCategory(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Add Category
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'admins' && (
          <div className="space-y-6">
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Admin Management</h3>
                    <p className="text-sm text-gray-500">Manage admin users and access</p>
                  </div>
                  <button
                    onClick={() => setShowAddAdmin(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Admin
                  </button>
                </div>
              </div>
              <div className="p-0">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added By</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added At</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {admins.map((admin) => (
                      <tr key={admin.email} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {admin.email?.charAt(0)?.toUpperCase() || 'A'}
                              </span>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{admin.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {admin.addedBy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(admin.addedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            {admin.email !== user?.email && (
                              <button
                                onClick={() => handleDeleteAdmin(admin.email)}
                                className="text-red-600 hover:text-red-900"
                                title="Remove Admin"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {admins.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center">
                          <div className="text-gray-500">
                            <div className="text-2xl mb-2">👥</div>
                            <p>No admin users found.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add Admin Modal */}
            {showAddAdmin && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Add New Admin</h3>
                    <button
                      onClick={() => setShowAddAdmin(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Add an admin user by email. They will need to sign in with Google or email/password to access the admin panel.
                    </p>
                  </div>
                  <form onSubmit={handleAddAdmin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={newAdmin.email}
                        onChange={(e) => setNewAdmin(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="admin@example.com"
                      />
                    </div>
                    <div className="flex items-center justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowAddAdmin(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Add Admin
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}