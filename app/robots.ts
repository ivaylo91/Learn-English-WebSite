import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/napredak', '/profil'],
      },
    ],
    sitemap: 'https://uchi-angliyski.vercel.app/sitemap.xml',
  };
}
