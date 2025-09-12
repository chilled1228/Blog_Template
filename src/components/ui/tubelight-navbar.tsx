"use client"

import React, { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { motion } from "framer-motion"
import Link from "next/link"
import type { Route } from 'next'
import { usePathname } from "next/navigation"
import { Home, Lightbulb, TrendingUp, Sparkles, Newspaper, ChevronDown, Menu, X, Brain } from "lucide-react"
import { cn } from "@/lib/utils"
import { typography } from "@/lib/typography"

interface NavItem {
  name: string
  url: string
  icon: string
}

interface CategoryItem {
  name: string
  slug: string
  url: string
}

interface NavBarProps {
  items: NavItem[]
  categories?: CategoryItem[]
  className?: string
  isSticky?: boolean
  categoriesLoading?: boolean
}

const iconMap = {
  Home: Home,
  Lightbulb: Lightbulb,
  TrendingUp: TrendingUp,
  Sparkles: Sparkles,
  Newspaper: Newspaper,
  Brain: Brain,
}

export function NavBar({ items, categories = [], className, isSticky = false, categoriesLoading = false }: NavBarProps) {
  const [clickedTab, setClickedTab] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0, width: 0 })
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Update button position when dropdown opens and on scroll/resize
  useEffect(() => {
    const updatePosition = () => {
      if (isDropdownOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const isMobile = window.innerWidth < 768;
        
        setButtonPosition({
          top: rect.bottom + 8, // Use viewport-relative position
          left: isMobile ? (window.innerWidth - 192) / 2 : rect.left, // Center on mobile
          width: rect.width,
        });
      }
    };

    // Update position immediately when dropdown opens
    updatePosition();

    if (isDropdownOpen) {
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isDropdownOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

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
        "relative w-full flex justify-center py-2",
        className,
      )}
    >
      <div className={cn(
        "flex items-center backdrop-blur-lg py-1 px-1 rounded-full",
        {
          "border border-border": !isSticky,
          "bg-background/5": !isSticky,
        }
      )}>
        {/* Mobile Layout */}
        <div className="md:hidden flex items-center w-full">
          {/* Left: Brand Name */}
          <div className="flex items-center">
            {items.filter(item => item.name === 'Home').map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap]
              const isActive = isItemActive(item)

              return (
                <Link
                  key={item.name}
                  href={item.url as Route}
                  onClick={() => setClickedTab(item.name)}
                  className={cn(
                    `${typography.nav} relative cursor-pointer px-4 py-2 rounded-full transition-colors flex items-center gap-2`,
                    "text-foreground/80 hover:text-primary",
                    isActive && "bg-muted text-primary",
                  )}
                >
                  <Brain size={18} strokeWidth={2.5} />
                  <span className="text-sm font-semibold">BehindTheBrain</span>
                  {isActive && (
                    <motion.div
                      layoutId="lamp"
                      className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
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

          {/* Right: Hamburger Menu */}
          <div className="flex-1 flex justify-end">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                `${typography.nav} cursor-pointer px-4 py-2 rounded-full transition-colors flex items-center`,
                "text-foreground/80 hover:text-primary",
                isMobileMenuOpen && "bg-muted text-primary",
              )}
            >
              {isMobileMenuOpen ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        {/* Desktop: All Items */}
        <div className="hidden md:flex items-center gap-3">
          {items.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap]
            const isActive = isItemActive(item)
            const displayName = item.name === 'Home' ? 'BehindTheBrain' : item.name

            return (
              <Link
                key={item.name}
                href={item.url as Route}
                onClick={() => setClickedTab(item.name)}
                className={cn(
                  `${typography.nav} relative cursor-pointer px-6 py-2 rounded-full transition-colors flex items-center gap-2`,
                  "text-foreground/80 hover:text-primary",
                  isActive && "bg-muted text-primary",
                )}
              >
                {item.name === 'Home' && <Brain size={18} strokeWidth={2.5} />}
                <span className="inline">{displayName}</span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
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
          
          {/* Desktop: Categories Dropdown */}
          {(categories.length > 0 || categoriesLoading) && (
            <button
              ref={buttonRef}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={cn(
                `${typography.nav} relative cursor-pointer px-6 py-2 rounded-full transition-colors flex items-center gap-1`,
                "text-foreground/80 hover:text-primary",
                isDropdownOpen && "bg-muted text-primary",
              )}
            >
              <span className="inline">
                {categoriesLoading ? "Loading..." : "Categories"}
              </span>
              <ChevronDown size={14} className={cn(
                "transition-transform",
                isDropdownOpen && "rotate-180"
              )} />
            </button>
          )}
        </div>
      </div>
      
      {/* Portal dropdown */}
      {isDropdownOpen && (categories.length > 0 || categoriesLoading) && typeof window !== 'undefined' && 
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-[10000]"
            style={{
              top: buttonPosition.top,
              left: buttonPosition.left,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="min-w-48 max-w-xs bg-background/95 border border-border backdrop-blur-lg rounded-lg shadow-xl py-2 mx-4 md:mx-0"
            >
              {categoriesLoading ? (
                <div className="px-4 py-6 text-center">
                  <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
                  </div>
                </div>
              ) : (
                categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={category.url as Route}
                    onClick={() => setIsDropdownOpen(false)}
                    className={cn(
                      "block px-4 py-2 text-sm hover:bg-muted transition-colors",
                      pathname === category.url && "bg-muted text-primary"
                    )}
                  >
                    {category.name}
                  </Link>
                ))
              )}
            </motion.div>
          </div>,
          document.body
        )
      }

      {/* Mobile Hamburger Menu Portal */}
      {isMobileMenuOpen && typeof window !== 'undefined' && 
        createPortal(
          <div
            ref={mobileMenuRef}
            className="fixed inset-x-0 top-20 z-[10000] px-4 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="bg-background/95 border border-border backdrop-blur-lg rounded-lg shadow-xl py-3 px-2"
            >
              <div className="grid grid-cols-1 gap-1">
                {/* Non-Home Items */}
                {items.filter(item => item.name !== 'Home').map((item) => {
                  const Icon = iconMap[item.icon as keyof typeof iconMap]
                  const isActive = isItemActive(item)

                  return (
                    <Link
                      key={item.name}
                      href={item.url as Route}
                      onClick={() => {
                        setClickedTab(item.name)
                        setIsMobileMenuOpen(false)
                      }}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                        "text-foreground/80 hover:bg-muted hover:text-primary",
                        isActive && "bg-muted text-primary",
                      )}
                    >
                      {Icon && <Icon size={18} strokeWidth={2.5} />}
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  )
                })}

                {/* Categories */}
                {(categories.length > 0 || categoriesLoading) && (
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="px-4 py-2">
                      <span className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                        {categoriesLoading ? "Loading..." : "Categories"}
                      </span>
                    </div>
                    {categoriesLoading ? (
                      <div className="px-4 py-4 space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                      </div>
                    ) : (
                      categories.map((category) => (
                      <Link
                        key={category.slug}
                        href={category.url as Route}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                          "text-foreground/70 hover:bg-muted hover:text-primary text-sm",
                          pathname === category.url && "bg-muted text-primary"
                        )}
                      >
                        <Lightbulb size={16} strokeWidth={2.5} />
                        <span>{category.name}</span>
                      </Link>
                    ))
                  )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>,
          document.body
        )
      }
    </div>
  )
}