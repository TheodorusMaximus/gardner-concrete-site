import { createClient, OAuthStrategy } from '@wix/sdk';
import { posts } from '@wix/blog';

// Initialize Wix client for blog operations only
export function createWixBlogClient() {
  return createClient({
    modules: {
      posts
    },
    auth: OAuthStrategy({
      clientId: process.env.WIX_CLIENT_ID || '',
      tokens: {
        accessToken: {
          value: process.env.WIX_ACCESS_TOKEN || '',
          expiresAt: Date.now() + 3600000 // 1 hour from now
        }
      }
    })
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