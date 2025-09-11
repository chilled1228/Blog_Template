'use client'

import { useState, useEffect } from 'react'
import { Home, Lightbulb, TrendingUp, Sparkles, Newspaper, Tag } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"
import { getAllCategories, Category } from '@/lib/firebase'

const iconMap = {
  Home,
  Lightbulb,
  TrendingUp,
  Sparkles,
  Newspaper,
  Tag
}

type IconName = keyof typeof iconMap

export function DynamicNavBar() {
  const [navItems, setNavItems] = useState([
    { name: 'Home', url: '/', icon: 'Home' as IconName }
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories()
        
        const categoryItems = categories.map((category: Category) => ({
          name: category.name,
          url: `/category/${category.slug}`,
          icon: (category.icon as IconName) || 'Tag'
        }))

        setNavItems([
          { name: 'Home', url: '/', icon: 'Home' as IconName },
          ...categoryItems
        ])
      } catch (error) {
        console.error('Error fetching categories:', error)
        // Fallback to default categories
        setNavItems([
          { name: 'Home', url: '/', icon: 'Home' as IconName },
          { name: 'Technology', url: '/category/technology', icon: 'Lightbulb' as IconName },
          { name: 'Frontend', url: '/category/frontend', icon: 'TrendingUp' as IconName },
          { name: 'Backend', url: '/category/backend', icon: 'Sparkles' as IconName },
          { name: 'CSS', url: '/category/css', icon: 'Newspaper' as IconName }
        ])
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

  return <NavBar items={navItems} />
}