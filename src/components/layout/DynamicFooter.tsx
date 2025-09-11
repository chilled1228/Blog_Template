'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { typography, textSpacing } from '@/lib/typography';
import { getAllCategories, Category } from '@/lib/firebase';

export default function DynamicFooter() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getAllCategories();
        setCategories(fetchedCategories.slice(0, 6)); // Limit to 6 categories for footer
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback categories
        setCategories([
          { name: 'Technology', slug: 'technology' },
          { name: 'Frontend', slug: 'frontend' },
          { name: 'Backend', slug: 'backend' },
          { name: 'CSS', slug: 'css' },
          { name: 'Database', slug: 'database' }
        ] as Category[]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className="mt-16" style={{ background: 'linear-gradient(135deg, #f9f3f2 0%, #f4edec 50%, #efebe9 100%)', borderTop: '1px solid #3d8a8e', color: '#44403D' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <h3 className={`${typography.h4} ${textSpacing.subheading} text-inherit`}>
              behindyourbrain Blog
            </h3>
            <p className={`${typography.bodySmall} text-inherit mb-4 sm:mb-6 max-w-sm`}>
              The official behindyourbrain blog with royalty-free stock images, vectors, trends, design tips, and free resources.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <Link href="https://twitter.com/behindyourbrain" target="_blank" rel="noopener noreferrer" 
                    className="text-inherit hover:text-inherit transition-colors duration-200 p-1">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="https://facebook.com/behindyourbrain" target="_blank" rel="noopener noreferrer" 
                    className="text-inherit hover:text-inherit transition-colors duration-200 p-1">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="https://instagram.com/behindyourbrain" target="_blank" rel="noopener noreferrer" 
                    className="text-inherit hover:text-inherit transition-colors duration-200 p-1">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Dynamic Categories */}
          <div className="space-y-4">
            <h4 className={`${typography.badge} text-inherit relative mb-4`}>
              <span className="inline-block border-b-2 border-inherit pb-1">Categories</span>
            </h4>
            {loading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-300 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              <ul className="space-y-2 sm:space-y-3">
                {categories.map((category) => (
                  <li key={category.id || category.slug}>
                    <Link href={`/category/${category.slug}`} 
                          className={`${typography.link} text-inherit hover:text-inherit flex items-center group`}>
                      <span className="w-1 h-1 bg-inherit rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className={`${typography.badge} text-inherit relative mb-4`}>
              <span className="inline-block border-b-2 border-inherit pb-1">Resources</span>
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/blog" 
                      className={`${typography.link} text-inherit hover:text-inherit flex items-center group`}>
                  <span className="w-1 h-1 bg-inherit rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  All Posts
                </Link>
              </li>
              <li>
                <Link href="/category/ai" 
                      className={`${typography.link} text-inherit hover:text-inherit flex items-center group`}>
                  <span className="w-1 h-1 bg-inherit rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/category/tips-trends" 
                      className={`${typography.link} text-inherit hover:text-inherit flex items-center group`}>
                  <span className="w-1 h-1 bg-inherit rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Tips & Trends
                </Link>
              </li>
              <li>
                <Link href="/category/product-updates" 
                      className={`${typography.link} text-inherit hover:text-inherit flex items-center group`}>
                  <span className="w-1 h-1 bg-inherit rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Product Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className={`${typography.badge} text-inherit relative mb-4`}>
              <span className="inline-block border-b-2 border-inherit pb-1">Company</span>
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="https://behindyourbrain.com" target="_blank" rel="noopener noreferrer" 
                      className={`${typography.link} text-inherit hover:text-inherit flex items-center group`}>
                  <span className="w-1 h-1 bg-inherit rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  behindyourbrain
                </Link>
              </li>
              <li>
                <Link href="/about" 
                      className={`${typography.link} text-inherit hover:text-inherit flex items-center group`}>
                  <span className="w-1 h-1 bg-inherit rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" 
                      className={`${typography.link} text-inherit hover:text-inherit flex items-center group`}>
                  <span className="w-1 h-1 bg-inherit rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" 
                      className={`${typography.link} text-inherit hover:text-inherit flex items-center group`}>
                  <span className="w-1 h-1 bg-inherit rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" 
                      className={`${typography.link} text-inherit hover:text-inherit flex items-center group`}>
                  <span className="w-1 h-1 bg-inherit rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className={`${typography.metaSmall} text-inherit text-center sm:text-left`}>
              © 2025 behindyourbrain Blog. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-4 lg:gap-6">
              <Link href="/terms" 
                    className={`${typography.linkSmall} text-inherit hover:text-inherit transition-colors duration-200`}>
                Terms of Service
              </Link>
              <Link href="/privacy" 
                    className={`${typography.linkSmall} text-inherit hover:text-inherit transition-colors duration-200`}>
                Privacy Policy
              </Link>
              <Link href="/disclaimer" 
                    className={`${typography.linkSmall} text-inherit hover:text-inherit transition-colors duration-200`}>
                Disclaimer
              </Link>
              <Link href="/cookie-policy" 
                    className={`${typography.linkSmall} text-inherit hover:text-inherit transition-colors duration-200`}>
                Cookie Policy
              </Link>
              <Link href="/sitemap.xml" 
                    className={`${typography.linkSmall} text-inherit hover:text-inherit transition-colors duration-200`}>
                Sitemap
              </Link>
              <Link href="/admin" 
                    className="text-inherit hover:text-inherit text-xs sm:text-sm transition-colors duration-200 font-medium">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}