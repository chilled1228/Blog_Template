'use client';

import { useState } from 'react';
import {
  Cog6ToothIcon,
  ChartBarIcon,
  PhotoIcon,
  UsersIcon,
  ShieldExclamationIcon,
  ListBulletIcon
} from '@heroicons/react/24/outline';
import PostEditor from './dashboard/PostEditor';
import PostsPage from './dashboard/PostsPage';
import MediaPage from './dashboard/MediaPage';
import UsersPage from './dashboard/UsersPage';
import AdminsPage from './dashboard/AdminsPage';
import PlaceholderPage from './dashboard/PlaceholderPage';
import { AdminDashboardProps, PageType } from './dashboard/types';

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
    setCurrentPage('posts');
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
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        <div className="h-16 px-6 flex items-center border-b">
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
      <main className="flex-1 overflow-y-auto p-8">
        {renderPage()}
      </main>
    </div>
  );
}