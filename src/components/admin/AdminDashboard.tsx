'use client';

import { useState, useEffect, useCallback } from 'react';
import { BlogPost, publishPost, unpublishPost, calculateReadingTime } from '@/lib/blogService';
import SimpleEditor from './SimpleEditor';

interface AdminBlogPost extends BlogPost {
  id: number;
  created_at: string;
  updated_at?: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

type TabType = 'posts' | 'stats' | 'settings' | 'media' | 'users';

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
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
  const [selectedPosts, setSelectedPosts] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

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

  const handlePublish = async (postId: number) => {
    try {
      const success = await publishPost(postId);
      if (success) {
        fetchPosts(pagination.page);
      }
    } catch (error) {
      console.error('Failed to publish post:', error);
    }
  };

  const handleUnpublish = async (postId: number) => {
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
  }, [fetchPosts]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'n':
            e.preventDefault();
            setShowCreateForm(true);
            break;
          case 'f':
            e.preventDefault();
            const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
            searchInput?.focus();
            break;
          case 'a':
            if (activeTab === 'posts') {
              e.preventDefault();
              const selectAll = document.querySelector('input[type="checkbox"][data-select-all]') as HTMLInputElement;
              selectAll?.click();
            }
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab]);

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
    { id: 'users' as TabType, icon: '👥', label: 'Users', count: null },
  ];

  if (showCreateForm) {
    return (
      <div className="h-screen bg-white overflow-hidden flex flex-col">
        {/* Micro Header */}
        <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-gray-50 h-12">
          <div className="flex items-center space-x-3">
            <h1 className="text-sm font-bold text-gray-900">
              {editingPost ? '✏️ Edit Post' : '➕ Create Post'}
            </h1>
            <span className="text-xs text-gray-500 hidden sm:inline">
              {editingPost ? 'Update post information' : 'Fill in the details'}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => {
                setShowCreateForm(false);
                setEditingPost(null);
              }}
              className="px-2 py-1 bg-gray-600 text-white text-xs font-medium rounded hover:bg-gray-700 transition-colors"
            >
              ✕ Cancel
            </button>
            <button
              type="submit"
              form="post-form"
              className="px-2 py-1 bg-button text-white text-xs font-medium rounded hover:bg-button-hover transition-colors"
            >
              {editingPost ? '💾 Update' : '🚀 Create'}
            </button>
          </div>
        </div>
        
        {/* Compact Form Grid */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} id="post-form" className="p-3">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {/* Column 1: Basic Info */}
              <div className="space-y-3">
                <div className="bg-gray-50 border border-gray-200 rounded p-3">
                  <h3 className="text-xs font-semibold text-gray-900 mb-2 flex items-center">
                    📄 Basic Information
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Enter post title"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div>
                        <label className="block text-xs text-gray-700 mb-1">Slug *</label>
                        <input
                          type="text"
                          required
                          value={formData.slug}
                          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="post-url"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-700 mb-1">Category</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            category: e.target.value,
                            category_url: `/category/${e.target.value.toLowerCase()}`
                          }))}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option value="Technology">Technology</option>
                          <option value="Frontend">Frontend</option>
                          <option value="Backend">Backend</option>
                          <option value="CSS">CSS</option>
                          <option value="Design">Design</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* SEO */}
                <div className="bg-gray-50 border border-gray-200 rounded p-3">
                  <h3 className="text-xs font-semibold text-gray-900 mb-2 flex items-center">
                    🔍 SEO Settings
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">Meta Title</label>
                      <input
                        type="text"
                        value={formData.meta_title}
                        onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="SEO title"
                        maxLength={60}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">Meta Description</label>
                      <textarea
                        value={formData.meta_description}
                        onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                        rows={2}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="SEO description"
                        maxLength={160}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Column 2: Content */}
              <div className="space-y-3">
                <div className="bg-gray-50 border border-gray-200 rounded p-3">
                  <h3 className="text-xs font-semibold text-gray-900 mb-2 flex items-center">
                    📝 Content
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">Excerpt</label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                        rows={2}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Brief description"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">Content</label>
                      <div className="border border-gray-300 rounded text-xs">
                        <SimpleEditor
                          value={formData.content}
                          onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                          placeholder="Write content here..."
                        />
                      </div>
                      {formData.content && (
                        <p className="mt-1 text-xs text-gray-600">
                          ⏱️ {calculateReadingTime(formData.content)} min read
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Column 3: Publishing */}
              <div className="space-y-3">
                <div className="bg-gray-50 border border-gray-200 rounded p-3">
                  <h3 className="text-xs font-semibold text-gray-900 mb-2 flex items-center">
                    📢 Publishing
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">Featured Image</label>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Image URL"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div>
                        <label className="block text-xs text-gray-700 mb-1">Status</label>
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                        </select>
                      </div>
                      <div className="flex items-center pt-4">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={formData.featured}
                          onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                          className="h-3 w-3 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label htmlFor="featured" className="ml-1 text-xs text-gray-900">Featured</label>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <button
                        type="submit"
                        className="w-full px-2 py-1 bg-button text-white text-xs font-medium rounded hover:bg-button-hover transition-colors"
                      >
                        {editingPost ? '💾 Update Post' : '🚀 Create Post'}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="bg-gray-50 border border-gray-200 rounded p-3">
                  <h3 className="text-xs font-semibold text-gray-900 mb-2 flex items-center">
                    ⚡ Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      type="button"
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200 transition-colors"
                    >
                      💾 Save Draft
                    </button>
                    <button
                      type="button"
                      className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded hover:bg-green-200 transition-colors"
                    >
                      👁️ Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white overflow-hidden flex flex-col">
      {/* Micro Header */}
      <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-gray-50 h-12">
        <div className="flex items-center space-x-4">
          <h1 className="text-sm font-bold text-gray-900">🎯 Admin Dashboard</h1>
          <div className="hidden md:flex items-center space-x-2">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts... (Ctrl+F)"
              className="w-32 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'draft' | 'published')}
              className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">All</option>
              <option value="draft">Drafts</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-2 py-1 bg-button text-white text-xs font-medium rounded hover:bg-button-hover transition-colors"
            title="New Post (Ctrl+N)"
          >
            ➕ New
          </button>
          <button
            onClick={onLogout}
            className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors"
          >
            🚪 Exit
          </button>
        </div>
      </div>

      {/* Micro Tabs */}
      <div className="flex items-center h-8 border-b border-gray-200 bg-gray-50">
        {tabItems.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-1 px-3 py-1 text-xs font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
            {tab.count !== null && (
              <span className="bg-gray-200 text-gray-700 px-1 py-0.5 rounded text-xs">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex">
        {activeTab === 'posts' && (
          <>
            {/* Bulk Actions Bar */}
            {selectedPosts.size > 0 && (
              <div className="absolute top-20 left-2 z-10 bg-white border border-gray-200 rounded shadow-lg p-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-700">{selectedPosts.size} selected</span>
                  <button
                    onClick={() => handleBulkAction('publish')}
                    className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded hover:bg-green-200"
                  >
                    Publish
                  </button>
                  <button
                    onClick={() => handleBulkAction('unpublish')}
                    className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded hover:bg-yellow-200"
                  >
                    Unpublish
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedPosts(new Set())}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* Super-Dense Table */}
            <div className="flex-1 overflow-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-2 py-1 w-8">
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
                        className="h-3 w-3 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                    </th>
                    <th className="px-2 py-1 text-left font-semibold text-gray-900 border-b border-gray-200 truncate">
                      Title
                    </th>
                    <th className="px-2 py-1 text-left font-semibold text-gray-900 border-b border-gray-200 w-20">
                      Category
                    </th>
                    <th className="px-2 py-1 text-left font-semibold text-gray-900 border-b border-gray-200 w-20">
                      Author
                    </th>
                    <th className="px-2 py-1 text-left font-semibold text-gray-900 border-b border-gray-200 w-16">
                      Status
                    </th>
                    <th className="px-2 py-1 text-left font-semibold text-gray-900 border-b border-gray-200 w-12">
                      Views
                    </th>
                    <th className="px-2 py-1 text-left font-semibold text-gray-900 border-b border-gray-200 w-16">
                      Date
                    </th>
                    <th className="px-2 py-1 text-left font-semibold text-gray-900 border-b border-gray-200 w-20">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPosts.map((post) => (
                    <tr 
                      key={post.id} 
                      className={`hover:bg-gray-50 transition-colors ${
                        selectedPosts.has(post.id) ? 'bg-blue-50' : ''
                      }`}
                      onDoubleClick={() => handleEdit(post)}
                    >
                      <td className="px-2 py-1">
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
                          className="h-3 w-3 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-2 py-1">
                        <div className="flex items-center">
                          <div>
                            <div className="font-medium text-gray-900 truncate max-w-xs">
                              {post.title}
                              {post.featured && <span className="ml-1">⭐</span>}
                            </div>
                            <div className="text-gray-500 text-xs">
                              /{post.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-1 text-gray-900 truncate">{post.category}</td>
                      <td className="px-2 py-1 text-gray-900 truncate">{post.author}</td>
                      <td className="px-2 py-1">
                        <span className={`inline-flex items-center px-1 py-0.5 rounded text-xs font-medium ${
                          post.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status === 'published' ? '✓' : '○'}
                        </span>
                      </td>
                      <td className="px-2 py-1 text-gray-500">
                        {post.view_count.toLocaleString()}
                      </td>
                      <td className="px-2 py-1 text-gray-500">
                        {new Date(post.datetime).toLocaleDateString()}
                      </td>
                      <td className="px-2 py-1">
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleEdit(post)}
                            className="text-primary hover:text-primary-hover text-xs"
                            title="Edit (Double-click)"
                          >
                            ✏️
                          </button>
                          {post.status === 'draft' ? (
                            <button
                              onClick={() => handlePublish(post.id)}
                              className="text-green-600 hover:text-green-700 text-xs"
                              title="Publish"
                            >
                              ▶️
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUnpublish(post.id)}
                              className="text-orange-600 hover:text-orange-700 text-xs"
                              title="Unpublish"
                            >
                              ⏸️
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="text-red-600 hover:text-red-700 text-xs"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Micro Pagination */}
            {pagination.pages > 1 && (
              <div className="border-t border-gray-200 p-2 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-700">
                    {(pagination.page - 1) * pagination.limit + 1}-{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => fetchPosts(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="px-2 py-1 text-xs border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      ←
                    </button>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => fetchPosts(page)}
                            className={`px-2 py-1 text-xs border rounded ${
                              page === pagination.page
                                ? 'bg-primary border-primary text-white'
                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => fetchPosts(pagination.page + 1)}
                      disabled={pagination.page === pagination.pages}
                      className="px-2 py-1 text-xs border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'stats' && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600">Detailed statistics and analytics coming soon</p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl mb-2">⚙️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Site Settings</h3>
              <p className="text-gray-600">Configuration options coming soon</p>
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl mb-2">📁</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Media Library</h3>
              <p className="text-gray-600">File management coming soon</p>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl mb-2">👥</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
              <p className="text-gray-600">User administration coming soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}