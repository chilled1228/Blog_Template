"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import type { Route } from 'next'
import { usePathname } from "next/navigation"
import { Home, Lightbulb, TrendingUp, Sparkles, Newspaper } from "lucide-react"
import { cn } from "@/lib/utils"
import { typography } from "@/lib/typography"

interface NavItem {
  name: string
  url: string
  icon: string
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

const iconMap = {
  Home: Home,
  Lightbulb: Lightbulb,
  TrendingUp: TrendingUp,
  Sparkles: Sparkles,
  Newspaper: Newspaper,
}

export function NavBar({ items, className }: NavBarProps) {
  const [clickedTab, setClickedTab] = useState<string | null>(null)
  const pathname = usePathname()

  // Function to determine if a nav item is active based on current pathname
  const isItemActive = (item: NavItem) => {
    // Handle exact match for home page
    if (item.url === '/' && pathname === '/') {
      return true
    }
    
    // Handle exact matches for other static pages
    if (item.url !== '/' && pathname === item.url) {
      return true
    }
    
    // Handle category pages - check if we're on a category page that matches
    if (item.url.includes('/category/')) {
      const categorySlug = item.url.split('/category/')[1]
      // Check if current pathname is exactly the category page or starts with it
      return pathname === item.url || pathname.startsWith(`/category/${categorySlug}`)
    }
    
    // Handle dynamic routes - if pathname starts with the item URL (but not for home)
    if (item.url !== '/' && pathname.startsWith(item.url + '/')) {
      return true
    }
    
    return false
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-[9999] mb-4 sm:mb-6 sm:pt-6",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap]
          const isActive = isItemActive(item)

          return (
            <Link
              key={item.name}
              href={item.url as Route}
              onClick={() => setClickedTab(item.name)}
              className={cn(
                `${typography.nav} relative cursor-pointer px-6 py-2 rounded-full transition-colors`,
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                {Icon && <Icon size={18} strokeWidth={2.5} />}
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}