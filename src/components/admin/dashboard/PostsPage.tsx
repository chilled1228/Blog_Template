'use client';

import { useState, useEffect, useCallback } from 'react';
import { PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { AdminBlogPost } from './types';

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
    <div>
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

export default PostsPage;
