'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Brain, Send, MessageCircle, Github, Mail } from 'lucide-react';
import { getAllCategories, Category } from '@/lib/firebase';

export default function DynamicFooter() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getAllCategories();
        // Fetching top 4 categories for a cleaner look
        setCategories(fetchedCategories.slice(0, 4)); 
      } catch (error)
      {
        console.error('Error fetching categories:', error);
        // Fallback data in case of an error
        setCategories([
          { name: 'Personal Growth', slug: 'personal-growth' },
          { name: 'Mindfulness', slug: 'mindfulness' },
          { name: 'Wellness', slug: 'wellness' },
          { name: 'Productivity', slug: 'productivity' },
        ] as Category[]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className="mt-16 bg-stone-100/50 border-t border-stone-200/60 text-stone-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-3">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-teal-600" />
              <span className="font-extrabold text-xl text-stone-800">behindthebrain</span>
            </Link>
            <p className="text-sm text-stone-600 max-w-xs">
              Your daily source for personal growth, mindfulness, and practical life guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-stone-800 mb-4 uppercase tracking-wider text-sm">Navigation</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-stone-600 hover:text-teal-600 transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-sm text-stone-600 hover:text-teal-600 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-stone-600 hover:text-teal-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Pages Section */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-stone-800 mb-4 uppercase tracking-wider text-sm">Legal Pages</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-stone-600 hover:text-teal-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-stone-600 hover:text-teal-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="text-sm text-stone-600 hover:text-teal-600 transition-colors">Cookie Policy</Link></li>
              <li><Link href="/disclaimer" className="text-sm text-stone-600 hover:text-teal-600 transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-stone-800 mb-4 uppercase tracking-wider text-sm">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/authors" className="text-sm text-stone-600 hover:text-teal-600 transition-colors">Our Authors</Link></li>
              <li><Link href="/archive" className="text-sm text-stone-600 hover:text-teal-600 transition-colors">Archive</Link></li>
              <li><Link href="/sitemap.xml" className="text-sm text-stone-600 hover:text-teal-600 transition-colors">Sitemap</Link></li>
              <li><Link href="/rss.xml" className="text-sm text-stone-600 hover:text-teal-600 transition-colors">RSS Feed</Link></li>
            </ul>
          </div>

          {/* Categories Section */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-stone-800 mb-4 uppercase tracking-wider text-sm">Topics</h3>
            {loading ? (
              <div className="space-y-3 animate-pulse">
                {[...Array(4)].map((_, i) => <div key={i} className="h-4 bg-stone-300 rounded w-3/4"></div>)}
              </div>
            ) : (
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category.id || category.slug}>
                    <Link href={`/category/${category.slug}`} className="text-sm text-stone-600 hover:text-teal-600 transition-colors">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Newsletter Section */}
          <div className="md:col-span-3">
            <h3 className="font-semibold text-stone-800 mb-4 uppercase tracking-wider text-sm">Subscribe to our Newsletter</h3>
            <p className="text-sm text-stone-600 mb-4">
              Get the latest articles and resources delivered to your inbox weekly.
            </p>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 text-sm border border-stone-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
              <button
                type="submit"
                className="bg-teal-600 text-white p-2 rounded-r-lg hover:bg-teal-700 transition-colors"
                aria-label="Subscribe"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-stone-200/60">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-sm text-stone-500">
                &copy; {new Date().getFullYear()} behindthebrain. All Rights Reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs">
                <Link href="/privacy" className="text-stone-500 hover:text-teal-600 transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-stone-500 hover:text-teal-600 transition-colors">Terms of Service</Link>
                <Link href="/cookie-policy" className="text-stone-500 hover:text-teal-600 transition-colors">Cookie Policy</Link>
                <Link href="/disclaimer" className="text-stone-500 hover:text-teal-600 transition-colors">Disclaimer</Link>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="text-stone-500 hover:text-teal-600 transition-colors" aria-label="Contact us"><MessageCircle className="h-5 w-5" /></Link>
              <Link href="#" className="text-stone-500 hover:text-teal-600 transition-colors" aria-label="GitHub"><Github className="h-5 w-5" /></Link>
              <Link href="#" className="text-stone-500 hover:text-teal-600 transition-colors" aria-label="Email us"><Mail className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}