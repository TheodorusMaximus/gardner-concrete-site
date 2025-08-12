import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { posts } from '@wix/blog';

// Initialize Wix client for blog operations only
export function createWixBlogClient() {
  const API_KEY = import.meta.env.WIX_API_KEY || process.env.WIX_API_KEY || '';
  const SITE_ID = import.meta.env.WIX_SITE_ID || process.env.WIX_SITE_ID || 'f34d08e6-ac9c-4e3c-b006-b77d3bf798e6';
  return createClient({
    modules: {
      posts
    },
    auth: ApiKeyStrategy({ apiKey: API_KEY, siteId: SITE_ID })
  });
}

// Blog post interface
export interface BlogPost {
  _id: string;
  title: string;
  excerpt?: string;
  slug: string;
  url: string;
  firstPublishedDate: string;
  lastPublishedDate: string;
  tags?: string[];
  categoryIds?: string[];
  featured?: boolean;
}

// Get blog posts related to a service
export async function getBlogPosts(tags?: string[], limit: number = 5): Promise<BlogPost[]> {
  const wixClient = createWixBlogClient();
  
  try {
    let query = wixClient.posts.queryPosts().limit(limit);
    
    // Filter by tags if provided
    if (tags && tags.length > 0) {
      query = query.hasSome('hashtags', tags);
    }
    
    const results = await query.find();
    return results.items.map(mapWixPostToBlogPost);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Get featured blog posts
export async function getFeaturedBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  const wixClient = createWixBlogClient();
  
  try {
    const results = await wixClient.posts.queryPosts()
      .eq('featured', true)
      .limit(limit)
      .find();
    
    return results.items.map(mapWixPostToBlogPost);
  } catch (error) {
    console.error('Error fetching featured blog posts:', error);
    return [];
  }
}

// Map Wix blog post to BlogPost interface
function mapWixPostToBlogPost(post: any): BlogPost {
  return {
    _id: post._id,
    title: post.title || '',
    excerpt: post.excerpt,
    slug: post.slug || '',
    url: `/blog/${post.slug}`,
    firstPublishedDate: post.firstPublishedDate,
    lastPublishedDate: post.lastPublishedDate,
    tags: post.hashtags || [],
    categoryIds: post.categoryIds || [],
    featured: post.featured || false
  };
}