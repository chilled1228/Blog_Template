import { Home, Lightbulb, TrendingUp, Sparkles, Newspaper } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export function NavBarDemo() {
  const navItems = [
    { name: 'Home', url: '/', icon: 'Home' },
    { name: 'Inspirational', url: '/category/inspirational', icon: 'Lightbulb' },
    { name: 'Tips & Trends', url: '/category/tips-trends', icon: 'TrendingUp' },
    { name: 'AI', url: '/category/ai', icon: 'Sparkles' },
    { name: 'Updates', url: '/category/product-updates', icon: 'Newspaper' }
  ]

  return <NavBar items={navItems} />
}