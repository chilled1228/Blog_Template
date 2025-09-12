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
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
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
        icons: [{ src: '/icon-192x192.png', sizes: '192x192' }],
      },
      {
        name: 'Design Resources',
        short_name: 'Design',
        description: 'Browse design resources',
        url: '/category/design',
        icons: [{ src: '/icon-192x192.png', sizes: '192x192' }],
      },
    ],
  };
}