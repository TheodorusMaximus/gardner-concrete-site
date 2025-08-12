import type { APIRoute } from 'astro';
import services from '../utils/services-data';
import { getBlogPosts } from '../utils/blog-api';

function xmlEscape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const origin = `${url.protocol}//${url.host}`;

  // Static top-level routes
  const staticPaths = [
    '/',
    '/blog',
    '/our-work',
    '/services',
    '/about-us',
    '/contact-us',
    '/gallery',
    '/privacy-policy',
    '/faq',
    '/service-areas',
    '/schedule',
    '/waterproofing',
    '/foundation-and-block-repair',
  ];

  // Services dynamic routes from data
  const servicePaths = services.map((s) => `/services/${s.slug}`);

  // Blog posts (fallback to static data if API key missing)
  let blogPaths: { loc: string; lastmod?: string }[] = [];
  try {
    const posts = await getBlogPosts();
    blogPaths = posts.map((p) => ({
      loc: `/blog/${p.slug}`,
      lastmod: p.publishDate ? new Date(p.publishDate).toISOString() : undefined,
    }));
  } catch {
    blogPaths = [];
  }

  const urls: { loc: string; lastmod?: string; priority?: number }[] = [
    ...staticPaths.map((p) => ({ loc: p })),
    ...servicePaths.map((p) => ({ loc: p })),
    ...blogPaths,
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(({ loc, lastmod }) => {
        const full = origin + loc;
        return [
          '  <url>',
          `    <loc>${xmlEscape(full)}</loc>`,
          lastmod ? `    <lastmod>${xmlEscape(lastmod)}</lastmod>` : '',
          '  </url>',
        ]
          .filter(Boolean)
          .join('\n');
      })
      .join('\n') +
    `\n</urlset>\n`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}; 