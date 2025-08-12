# SEO SSR Verification - Blog Detail

Steps:
1. Build locally (or run dev) and open a blog post page like `/blog/foundation-repair-warning-signs-minneapolis`.
2. View page source (not DevTools DOM). Ensure the full article HTML (paragraphs/headings/list items) appears in the HTML source without requiring JS.
3. Verify no client-only placeholder is present for the article body.
4. Confirm `<img>` tags within the article have `loading="lazy"` and `decoding="async"`.

Pass criteria:
- Article content is fully present in initial HTML.
- No dependency on client-side rendering to see the main content. 