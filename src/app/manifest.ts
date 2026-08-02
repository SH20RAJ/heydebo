import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'heydebo Life Operating System',
    short_name: 'heydebo',
    description: 'The world’s best CS student life operating system & second brain.',
    start_url: '/',
    display: 'standalone',
    background_color: '#090a0f',
    theme_color: '#00F0FF',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
