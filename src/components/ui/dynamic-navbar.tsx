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
        const fetchedCategories = await getAllCategories()
        setCategories(fetchedCategories)
      } catch (error) {
        console.error('Error fetching categories:', error)
        // Fallback to default categories
        setCategories([
          { name: 'Personal Growth', slug: 'personal-growth', id: '1' },
          { name: 'Mindfulness', slug: 'mindfulness', id: '2' },
          { name: 'Wellness', slug: 'wellness', id: '3' },
          { name: 'Productivity', slug: 'productivity', id: '4' },
          { name: 'Motivation', slug: 'motivation', id: '5' }
        ] as Category[])
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="animate-pulse bg-gray-200 rounded h-8 w-96"></div>
      </div>
    )
  }

  const categoryItems = categories.map((category: Category) => ({
    name: category.name,
    slug: category.slug,
    url: `/category/${category.slug}`
  }))

  console.log('Categories loaded:', categoryItems.length, categoryItems)

  return <NavBar items={navItems} categories={categoryItems} isSticky={isSticky} />
}