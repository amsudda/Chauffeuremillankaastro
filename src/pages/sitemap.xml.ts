import type { APIRoute } from 'astro';
import { TOURS } from '../data/tours';

const BASE = 'https://www.chauffeuremillankatour.com';
const NOW  = new Date().toISOString().split('T')[0];

const pages = [
  { url: '/',                                priority: '1.0',  changefreq: 'weekly'  },
  { url: '/tours',                           priority: '0.9',  changefreq: 'weekly'  },
  { url: '/tailor-made',                     priority: '0.9',  changefreq: 'monthly' },
  { url: '/about',                           priority: '0.8',  changefreq: 'monthly' },
  { url: '/contact',                         priority: '0.8',  changefreq: 'monthly' },
  { url: '/blog',                            priority: '0.7',  changefreq: 'weekly'  },
  { url: '/sri-lanka-tours-from-australia',  priority: '0.85', changefreq: 'monthly' },
  { url: '/sri-lanka-tours-from-belgium',    priority: '0.85', changefreq: 'monthly' },
  { url: '/nl/sri-lanka-rondreis',           priority: '0.85', changefreq: 'monthly' },
  { url: '/best-time-to-travel-sri-lanka',   priority: '0.90', changefreq: 'monthly' },
  ...TOURS.map(t => ({
    url:        `/tours/${t.slug}`,
    priority:   '0.85',
    changefreq: 'weekly',
  })),
];

export const GET: APIRoute = () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${BASE}${p.url}</loc>
    <lastmod>${NOW}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
