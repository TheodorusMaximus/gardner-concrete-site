import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';
import { posts } from '@wix/blog';

// Initialize Wix client for server-side operations
export function createWixClient() {
  return createClient({
    modules: {
      items,
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

// Query projects from the CMS
export async function getProjects(category?: string) {
  const wixClient = createWixClient();
  
  try {
    let query = wixClient.items.query('projects-portfolio')
      .descending('_createdDate');
    
    // Filter by category if provided
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }
    
    const results = await query.find();
    return results.items.map(item => mapWixItemToProject(item));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// Get featured projects for the homepage carousel
export async function getFeaturedProjects() {
  const wixClient = createWixClient();
  
  try {
    const results = await wixClient.items.query('projects-portfolio')
      .eq('featured', true)
      .descending('year')
      .limit(3)
      .find();
    
    return results.items.map(item => mapWixItemToProject(item));
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}

// Get a single project by slug
export async function getProjectBySlug(slug: string) {
  const wixClient = createWixClient();
  
  try {
    const results = await wixClient.items.query('projects-portfolio')
      .eq('slug', slug)
      .limit(1)
      .find();
    
    return results.items[0] ? mapWixItemToProject(results.items[0]) : null;
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return null;
  }
}

// Project type definition for TypeScript
export interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  testimonialText?: string;
  customerName?: string;
  customerLocation?: string;
  rating?: number;
  year: number;
  featured?: boolean;
  slug?: string;
  _createdDate: string;
  _updatedDate: string;
}

// Map Wix data item to Project interface
function mapWixItemToProject(item: any): Project {
  return {
    _id: item._id,
    title: item.data?.title || '',
    description: item.data?.description || '',
    category: item.data?.category || '',
    image: item.data?.image || '',
    testimonialText: item.data?.testimonialText,
    customerName: item.data?.customerName,
    customerLocation: item.data?.customerLocation,
    rating: item.data?.rating,
    year: item.data?.year || new Date().getFullYear(),
    featured: item.data?.featured || false,
    slug: item.data?.slug,
    _createdDate: item._createdDate,
    _updatedDate: item._updatedDate
  };
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
  const wixClient = createWixClient();
  
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
  const wixClient = createWixClient();
  
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