'use client'

import { useState, useEffect } from 'react'
import { Home, User, Mail, Info, Lightbulb, TrendingUp, Sparkles, Newspaper, Tag } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"
import { getAllCategories, Category } from '@/lib/firebase'

const iconMap = {
  Home,
  User,
  Mail,
  Info,
  Lightbulb,
  TrendingUp,
  Sparkles,
  Newspaper,
  Tag
}

type IconName = keyof typeof iconMap

export function DynamicNavBar({ isSticky }: { isSticky: boolean }) {
  const [navItems, setNavItems] = useState([
    { name: 'Home', url: '/', icon: 'Home' as IconName },
    { name: 'About', url: '/about', icon: 'Info' as IconName },
    { name: 'Contact', url: '/contact', icon: 'Mail' as IconName }
  ])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Check cache first
        const cachedCategories = localStorage.getItem('cached-categories')
        const cachedTime = localStorage.getItem('cached-categories-time')
        
        // Use cache if it's less than 1 hour old
        if (cachedCategories && cachedTime) {
          const isCacheValid = (Date.now() - parseInt(cachedTime)) < 3600000 // 1 hour
          if (isCacheValid) {
            setCategories(JSON.parse(cachedCategories))
            setLoading(false)
            return
          }
        }
        
        const fetchedCategories = await getAllCategories()
        setCategories(fetchedCategories)
        
        // Cache the results
        localStorage.setItem('cached-categories', JSON.stringify(fetchedCategories))
        localStorage.setItem('cached-categories-time', Date.now().toString())
      } catch (error) {
        console.error('Error fetching categories:', error)
        // Fallback to default categories
        const defaultCategories = [
          { name: 'Personal Growth', slug: 'personal-growth', id: '1' },
          { name: 'Mindfulness', slug: 'mindfulness', id: '2' },
          { name: 'Wellness', slug: 'wellness', id: '3' },
          { name: 'Productivity', slug: 'productivity', id: '4' },
          { name: 'Motivation', slug: 'motivation', id: '5' }
        ] as Category[]
        
        setCategories(defaultCategories)
        // Cache the default categories
        localStorage.setItem('cached-categories', JSON.stringify(defaultCategories))
        localStorage.setItem('cached-categories-time', Date.now().toString())
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Progressive loading - show navigation immediately, categories load in background
  const categoryItems = loading ? [] : categories.map((category: Category) => ({
    name: category.name,
    slug: category.slug,
    url: `/category/${category.slug}`
  }))

  return <NavBar items={navItems} categories={categoryItems} isSticky={isSticky} categoriesLoading={loading} />
}