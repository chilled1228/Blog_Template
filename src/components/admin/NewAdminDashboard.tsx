'use client';

import { useState, useEffect, useCallback } from 'react';
import { BlogPost, publishPost, unpublishPost, calculateReadingTime } from '@/lib/blogService';
import SimpleEditor from './SimpleEditor';
import MediaLibrary, { MediaFile } from './MediaLibrary';
import {
  PencilSquareIcon,
  TrashIcon,
  ArrowUpOnSquareIcon,
  ArrowDownOnSquareIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  CheckIcon,
  EyeIcon,
  UserPlusIcon,
  ShieldCheckIcon,
  ArrowUturnLeftIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  PhotoIcon,
  UsersIcon,
  ShieldExclamationIcon,
  HomeIcon,
  ListBulletIcon
} from '@heroicons/react/24/outline';

// Types from the original component
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

type PageType = 'dashboard' | 'posts' | 'media' | 'users' | 'admins' | 'stats' | 'settings';

const PostEditor = ({ post, onSave, onCancel, user }) => {
  const [formData, setFormData] = useState(post || {
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    image: '',
    author: 'Freepik Team',
    category: 'Technology',
    status: 'draft',
    meta_title: '',
    meta_description: '',
    featured: false,
  });
  const [activeTab, setActiveTab] = useState('write');
  const [authors, setAuthors] = useState<UserProfile[]>([]);
  const [categories] = useState([
    { name: 'Technology' },
    { name: 'Frontend' },
    { name: 'Backend' },
    { name: 'CSS' },
    { name: 'Design' },
  ]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const response = await fetch('/api/admin/all-users', {
        headers: { 'Authorization': `Bearer ${user.email}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAuthors(data.users || []);
      }
    };
    fetchAuthors();
  }, [user.email]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const tabs = [
    { id: 'write', label: 'Write' },
    { id: 'details', label: 'Details' },
    { id: 'seo', label: 'SEO & Publishing' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-8 border-b flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{post ? 'Edit Post' : 'Create New Post'}</h1>
        <div className="flex items-center space-x-4">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">
            Save Post
          </button>
        </div>
      </div>
      <div className="border-b">
        <nav className="-mb-px flex space-x-8 px-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {activeTab === 'write' && (
            <SimpleEditor
              value={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
            />
          )}
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Author</label>
                <select
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option>Freepik Team</option>
                  {authors.map(author => (
                    <option key={author.uid} value={author.displayName || author.email}>
                      {author.displayName || author.email}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {categories.map(category => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Meta Title</label>
                <input
                  type="text"
                  value={formData.meta_title}
                  onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                <textarea
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Featured Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex items-center">
                <input
                  id="featured"
                  name="featured"
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                  Featured Post
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// New Component: PostsPage
const PostsPage = ({ onEditPost, onAddNewPost }) => {
  const [posts, setPosts] = useState<AdminBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      ...(statusFilter !== 'all' && { status: statusFilter }),
      ...(searchQuery && { search: searchQuery })
    });
    const response = await fetch(`/api/admin/posts?${params}`);
    const data = await response.json();
    if (data.posts) {
      setPosts(data.posts);
    }
    setLoading(false);
  }, [statusFilter, searchQuery]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
      fetchPosts();
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
        <button onClick={onAddNewPost} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">
          <PlusIcon className="w-5 h-5 mr-2" />
          New Post
        </button>
      </div>
      {/* Add search and filter UI here */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map(post => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button onClick={() => onEditPost(post)} className="text-indigo-600 hover:text-indigo-900"><PencilSquareIcon className="w-5 h-5" /></button>
                  <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-900"><TrashIcon className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// New Component: MediaPage
const MediaPage = () => {
    // State to control the MediaLibrary's visibility is no longer needed
    // as it will be embedded directly.
    // A dummy onSelect function is provided as it's a required prop.
    const handleSelect = (media: MediaFile) => {
        console.log('Selected media:', media);
        // In a real scenario, you might want to do something with the selected file,
        // but for a general-purpose media page, this might not be necessary.
    };

    return (
        <div className="h-full flex flex-col">
            <div className="p-8 border-b">
                <h1 className="text-2xl font-bold text-gray-900">Media</h1>
            </div>
            <div className="flex-1 overflow-hidden">
                <MediaLibrary
                    isOpen={true} // Always open when MediaPage is rendered
                    onClose={() => {}} // Dummy close function
                    onSelect={handleSelect}
                    isEmbedded={true} // New prop to control styling
                />
            </div>
        </div>
    );
};

// New Component: UsersPage
const UsersPage = ({ user: currentUser }) => {
    const [users, setUsers] = useState<UserProfile[]>([]);

    const fetchUsers = useCallback(async () => {
        const response = await fetch('/api/admin/all-users', {
            headers: { 'Authorization': `Bearer ${currentUser.email}` }
        });
        if (response.ok) {
            const data = await response.json();
            setUsers(data.users || []);
        }
    }, [currentUser.email]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Users</h1>
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => (
                            <tr key={user.uid}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// New Component: AdminsPage
const AdminsPage = ({ user }) => {
    const [admins, setAdmins] = useState<AdminUser[]>([]);

    const fetchAdmins = useCallback(async () => {
        const response = await fetch('/api/admin/users', {
            headers: { 'Authorization': `Bearer ${user.email}` }
        });
        if (response.ok) {
            const data = await response.json();
            setAdmins(data.adminUsers || []);
        }
    }, [user.email]);

    useEffect(() => {
        fetchAdmins();
    }, [fetchAdmins]);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Admins</h1>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">
                    <UserPlusIcon className="w-5 h-5 mr-2" />
                    Add Admin
                </button>
            </div>
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added By</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added At</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {admins.map(admin => (
                            <tr key={admin.email}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{admin.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.addedBy}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(admin.addedAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const PlaceholderPage = ({ title }) => (
    <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="mt-4 text-gray-500">This section is under construction.</p>
    </div>
);

// New Main Component: NewAdminDashboard
export default function NewAdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [currentPage, setCurrentPage] = useState<PageType>('posts');
  const [editingPost, setEditingPost] = useState(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const handleSavePost = async (postData) => {
    const url = postData.id ? `/api/admin/posts/${postData.id}` : '/api/admin/posts';
    const method = postData.id ? 'PUT' : 'POST';
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });

    setEditingPost(null);
    setIsCreatingPost(false);
    setCurrentPage('posts'); // Switch back to posts list
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setIsCreatingPost(true);
  };

  const handleAddNewPost = () => {
    setEditingPost(null);
    setIsCreatingPost(true);
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setIsCreatingPost(false);
  };

  const renderPage = () => {
    if (isCreatingPost || editingPost) {
      return <PostEditor post={editingPost} onSave={handleSavePost} onCancel={handleCancelEdit} user={user} />;
    }

    switch (currentPage) {
      case 'posts':
        return <PostsPage onEditPost={handleEditPost} onAddNewPost={handleAddNewPost} />;
      case 'users':
        return <UsersPage user={user} />;
      case 'admins':
        return <AdminsPage user={user} />;
      case 'media':
        return <MediaPage />;
      case 'stats':
        return <PlaceholderPage title="Stats" />;
      case 'settings':
        return <PlaceholderPage title="Settings" />;
      default:
        return <PlaceholderPage title="Dashboard" />;
    }
  };

  const navigation = [
    { name: 'Posts', href: '#', icon: ListBulletIcon, page: 'posts' },
    { name: 'Media', href: '#', icon: PhotoIcon, page: 'media' },
    { name: 'Users', href: '#', icon: UsersIcon, page: 'users' },
    { name: 'Admins', href: '#', icon: ShieldExclamationIcon, page: 'admins' },
    { name: 'Stats', href: '#', icon: ChartBarIcon, page: 'stats' },
    { name: 'Settings', href: '#', icon: Cog6ToothIcon, page: 'settings' },
  ];

  return (
    <div className="h-screen flex bg-gray-100">
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex-shrink-0 px-6 flex items-center border-b">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => {
                setCurrentPage(item.page as PageType);
                setIsCreatingPost(false);
                setEditingPost(null);
              }}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                currentPage === item.page ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-6 h-6 mr-3" />
              {item.name}
            </a>
          ))}
        </nav>
        <div className="p-4 border-t">
            <button onClick={onLogout} className="w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900">
                Logout
            </button>
        </div>
      </div>
      <main className="flex-1">
        {renderPage()}
      </main>
    </div>
  );
}
