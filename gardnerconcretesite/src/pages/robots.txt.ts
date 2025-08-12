import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const origin = `${url.protocol}//${url.host}`;
  const body = `# robots.txt\n# See Google & Moz references for best practices\n\nUser-agent: *\nDisallow:\n\nSitemap: ${origin}/sitemap.xml\n`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}; 