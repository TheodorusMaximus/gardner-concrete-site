import type { MiddlewareHandler } from 'astro';

// Cache policy:
// - Blog pages: short browser cache, longer CDN cache, with SWR
// - Text policies (robots.txt, llms.txt): cache moderately
export const onRequest: MiddlewareHandler = async (context, next) => {
  const url = new URL(context.request.url);
  const path = url.pathname;

  const response = await next();

  // Only set on successful responses
  if (response.status === 200) {
    if (path.startsWith('/blog/')) {
      response.headers.set(
        'Cache-Control',
        'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'
      );
    } else if (path === '/robots.txt' || path === '/llms.txt') {
      response.headers.set('Cache-Control', 'public, max-age=3600');
    }
  }

  return response;
}; 