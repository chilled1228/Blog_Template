import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  
  return {
    name: 'behindthebrain - Learn, Code, Create!',
    short_name: 'behindthebrain',
    description: 'behindthebrain - Empowering personal growth through self-help, mindfulness, productivity tips, and life transformation strategies.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en',
    categories: ['education', 'design', 'creativity', 'blog'],
    icons: [
      {
        src: '/logo.svg',
        type: 'image/svg+xml',
        sizes: 'any',
        purpose: 'any',
      },
      {
        src: '/logo.svg',
        type: 'image/svg+xml',
        sizes: 'any',
        purpose: 'maskable',
      },
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
    ],
    shortcuts: [
      {
        name: 'Latest Articles',
        short_name: 'Latest',
        description: 'View the latest blog articles',
        url: '/',
        icons: [{ src: '/logo.svg', type: 'image/svg+xml', sizes: 'any' }],
      },
      {
        name: 'Design Resources',
        short_name: 'Design',
        description: 'Browse design resources',
        url: '/category/design',
        icons: [{ src: '/logo.svg', type: 'image/svg+xml', sizes: 'any' }],
      },
    ],
  };
}