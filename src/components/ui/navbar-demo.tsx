import { Home, Lightbulb, TrendingUp, Sparkles, Newspaper } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export function NavBarDemo() {
  const navItems = [
    { name: 'Home', url: '/', icon: 'Home' },
    { name: 'Technology', url: '/category/technology', icon: 'Lightbulb' },
    { name: 'Frontend', url: '/category/frontend', icon: 'TrendingUp' },
    { name: 'Backend', url: '/category/backend', icon: 'Sparkles' },
    { name: 'CSS', url: '/category/css', icon: 'Newspaper' }
  ]

  return <NavBar items={navItems} />
}