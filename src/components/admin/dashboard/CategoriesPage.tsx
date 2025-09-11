'use client'

import React, { useState, useEffect } from 'react';
import { 
  createCategory, 
  getAllCategories, 
  updateCategory, 
  deleteCategory, 
  Category 
} from '@/lib/firebase';
import { PlusIcon, PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState<Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'postCount'>>({
    name: '',
    slug: '',
    description: '',
    color: '#3B82F6',
    icon: 'Tag'
  });
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getAllCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) return;

    const categoryToAdd = {
      ...newCategory,
      slug: newCategory.slug || generateSlug(newCategory.name)
    };

    const success = await createCategory(categoryToAdd);
    if (success) {
      await fetchCategories();
      setNewCategory({
        name: '',
        slug: '',
        description: '',
        color: '#3B82F6',
        icon: 'Tag'
      });
      setShowAddForm(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editCategory || !editCategory.id) return;

    const { id, createdAt, updatedAt, postCount, ...updateData } = editCategory;
    const success = await updateCategory(id, updateData);
    if (success) {
      await fetchCategories();
      setEditingId(null);
      setEditCategory(null);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    const success = await deleteCategory(id);
    if (success) {
      await fetchCategories();
    }
  };

  const startEditing = (category: Category) => {
    setEditingId(category.id || '');
    setEditCategory({ ...category });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditCategory(null);
  };

  const iconOptions = [
    'Tag', 'Lightbulb', 'TrendingUp', 'Sparkles', 'Newspaper', 
    'Code', 'Database', 'Smartphone', 'Monitor', 'Globe'
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600">Manage blog categories and organize your content</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Category
        </button>
      </div>

      {/* Add Category Form */}
      {showAddForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({
                  ...newCategory,
                  name: e.target.value,
                  slug: generateSlug(e.target.value)
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Category name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                value={newCategory.slug}
                onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="category-slug"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
              <select
                value={newCategory.icon}
                onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {iconOptions.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <input
                type="color"
                value={newCategory.color}
                onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-10"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Category description"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAddCategory}
              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md"
            >
              <CheckIcon className="w-4 h-4 mr-2" />
              Save Category
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="inline-flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-md"
            >
              <XMarkIcon className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Categories ({categories.length})</h3>
        </div>
        
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No categories found. Create your first category to get started.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {categories.map((category) => (
              <div key={category.id} className="p-6">
                {editingId === category.id ? (
                  // Edit Mode
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={editCategory?.name || ''}
                        onChange={(e) => setEditCategory({
                          ...editCategory!,
                          name: e.target.value,
                          slug: generateSlug(e.target.value)
                        })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                      <input
                        type="text"
                        value={editCategory?.slug || ''}
                        onChange={(e) => setEditCategory({ ...editCategory!, slug: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                      <select
                        value={editCategory?.icon || 'Tag'}
                        onChange={(e) => setEditCategory({ ...editCategory!, icon: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {iconOptions.map(icon => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                      <input
                        type="color"
                        value={editCategory?.color || '#3B82F6'}
                        onChange={(e) => setEditCategory({ ...editCategory!, color: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 h-10"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <input
                        type="text"
                        value={editCategory?.description || ''}
                        onChange={(e) => setEditCategory({ ...editCategory!, description: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="md:col-span-3 flex gap-2">
                      <button
                        onClick={handleUpdateCategory}
                        className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md"
                      >
                        <CheckIcon className="w-4 h-4 mr-2" />
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="inline-flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-md"
                      >
                        <XMarkIcon className="w-4 h-4 mr-2" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-500">/{category.slug}</p>
                        {category.description && (
                          <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        Icon: {category.icon}
                      </div>
                      <div className="text-sm text-gray-500">
                        Posts: {category.postCount || 0}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing(category)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id!)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}