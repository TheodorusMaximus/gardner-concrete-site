// Blog API utilities for fetching from Wix Blog CMS
import { createClient, ApiKeyStrategy } from "@wix/sdk";
import * as blogModule from "@wix/blog";

const API_KEY = import.meta.env.WIX_API_KEY;
const SITE_ID = "f34d08e6-ac9c-4e3c-b006-b77d3bf798e6";

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags?: string;
  metaTitle?: string;
  metaDescription?: string;
  author?: string;
  readTime?: number;
  published: boolean;
  featured?: boolean;
  publishDate: string;
  _createdDate: string;
  _updatedDate: string;
}

// Fetch blog posts from Wix Blog CMS
export async function getBlogPosts(category?: string, featured?: boolean): Promise<BlogPost[]> {
  if (!API_KEY) {
    console.error("WIX_API_KEY not found, falling back to static data");
    return getStaticBlogPosts(category, featured);
  }

  try {
    const wixClient = createClient({
      modules: { blog: blogModule },
      auth: ApiKeyStrategy({ apiKey: API_KEY, siteId: SITE_ID }),
    });

    const { posts } = await wixClient.blog.posts.listPosts({ 
      fieldsets: ['RICH_CONTENT', 'SEO', 'URL'],
      paging: { limit: 50 }
    });

    if (!posts || posts.length === 0) {
      console.log("No blog posts found in Wix CMS, falling back to static data");
      return getStaticBlogPosts(category, featured);
    }

    // Transform Wix blog posts to our BlogPost interface
    const transformedPosts: BlogPost[] = posts.map((post: any) => ({
      _id: post.id || '',
      title: post.title || '',
      slug: post.slug || '',
      excerpt: post.excerpt || '',
      content: post.excerpt || '',
      featuredImage: post.media?.wixMedia?.image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      category: (post.categoryIds && post.categoryIds[0]) || 'General',
      tags: post.hashtags?.join(', ') || '',
      metaTitle: post.seoData?.tags?.find((tag: any) => tag.type === 'title')?.children || post.title,
      metaDescription: post.seoData?.tags?.find((tag: any) => tag.type === 'meta' && tag.props?.name === 'description')?.props?.content || post.excerpt,
      author: 'G. Gardner Concrete & Waterproofing, Inc Team',
      readTime: Math.ceil(((post.excerpt?.length || 500)) / 200),
      published: true,
      featured: post.featured || false,
      publishDate: post.firstPublishedDate || new Date().toISOString(),
      _createdDate: post.firstPublishedDate || new Date().toISOString(),
      _updatedDate: post.firstPublishedDate || new Date().toISOString()
    }));

    // Filter by category if provided
    let filteredPosts = transformedPosts;
    if (category && category !== 'all') {
      const cat = category.toLowerCase();
      const normalized = (cat === 'hardscapes' || cat === 'concrete work' || cat === 'concrete-work') ? 'concrete work' : category;
      filteredPosts = transformedPosts.filter(post => 
        post.category.toLowerCase().includes(normalized.toLowerCase())
      );
    }

    // Filter by featured status if provided
    if (featured !== undefined) {
      filteredPosts = filteredPosts.filter(post => post.featured === featured);
    }

    // Sort by publish date (newest first)
    filteredPosts.sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );

    return filteredPosts;

  } catch (error) {
    console.error("Error fetching from Wix Blog CMS:", error);
    return getStaticBlogPosts(category, featured);
  }
}

// Fallback static data when CMS is not available
function getStaticBlogPosts(category?: string, featured?: boolean): BlogPost[] {
  const posts: BlogPost[] = [
    {
      _id: "6471612a-afca-457a-9e5f-9f5a3a3eed1b",
      title: "5 Warning Signs Your Foundation Needs Immediate Repair",
      slug: "foundation-repair-warning-signs-minneapolis",
      excerpt: "Don't ignore these critical foundation warning signs that could save you thousands in repairs. Learn what Minneapolis homeowners need to watch for.",
      content: "Foundation problems don't happen overnight – they develop gradually and give you warning signs along the way. As Minneapolis area homeowners, we deal with unique challenges including freeze-thaw cycles, clay soil expansion, and heavy spring rains that can wreak havoc on home foundations. Recognizing these warning signs early can save you thousands of dollars and prevent major structural damage.",
      featuredImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      category: "Foundation Repair",
      tags: "foundation repair, Minneapolis, home maintenance, structural damage, foundation cracks",
      metaTitle: "Foundation Repair Warning Signs Minneapolis | G. Gardner Concrete & Waterproofing, Inc",
      metaDescription: "Don't ignore these 5 critical foundation warning signs. Minneapolis homeowners trust G. Gardner Concrete & Waterproofing, Inc for expert foundation repair. Free inspection available.",
      author: "G. Gardner Concrete & Waterproofing, Inc Team",
      readTime: 4,
      published: true,
      featured: true,
      publishDate: "2025-01-15T10:00:00.000Z",
      _createdDate: "2025-07-23T03:33:22.915Z",
      _updatedDate: "2025-07-23T03:33:22.915Z"
    },
    {
      _id: "08902e5e-8ac7-4d99-8fa3-399121cfe115",
      title: "Complete Guide to Basement Waterproofing in Minnesota",
      slug: "basement-waterproofing-guide-minnesota",
      excerpt: "Everything Minnesota homeowners need to know about basement waterproofing methods, costs, and when to call the professionals.",
      content: "Minnesota's unique climate makes basement waterproofing essential for protecting your home's value and your family's health. Between spring snowmelt, summer storms, and freeze-thaw cycles, Minnesota basements face constant moisture challenges. Here's your complete guide to basement waterproofing solutions that actually work in our climate.",
      featuredImage: "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?auto=format&fit=crop&w=800&q=80",
      category: "Waterproofing",
      tags: "basement waterproofing, Minnesota, French drain, sump pump, foundation waterproofing",
      metaTitle: "Basement Waterproofing Minnesota | Complete Guide | G. Gardner Concrete & Waterproofing, Inc",
      metaDescription: "Complete basement waterproofing guide for Minnesota homeowners. Expert solutions for French drains, sump pumps, and exterior waterproofing. 75+ years experience.",
      author: "G. Gardner Concrete & Waterproofing, Inc Team",
      readTime: 6,
      published: true,
      featured: true,
      publishDate: "2025-01-10T09:00:00.000Z",
      _createdDate: "2025-07-23T03:33:22.914Z",
      _updatedDate: "2025-07-23T03:33:22.914Z"
    },
    {
      _id: "48f6be32-cef2-4713-b1ff-3dc0672c3b5c",
      title: "Stamped Concrete vs Pavers: Which is Right for Your Minnesota Home?",
      slug: "stamped-concrete-vs-pavers-minnesota-comparison",
      excerpt: "Comparing stamped concrete and pavers for Minnesota driveways, patios, and walkways. Cost, durability, and maintenance considerations.",
      content: "Choosing between stamped concrete and pavers for your Minnesota outdoor project? Here's everything you need to know. Both stamped concrete and pavers can create beautiful outdoor spaces, but Minnesota's harsh winters and temperature swings require special consideration. Let's compare these options for driveways, patios, and walkways.",
      featuredImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      category: "Concrete Work",
      tags: "stamped concrete, pavers, Minnesota, driveways, patios, hardscaping, concrete comparison",
      metaTitle: "Stamped Concrete vs Pavers Minnesota | G. Gardner Concrete & Waterproofing, Inc Comparison",
      metaDescription: "Compare stamped concrete vs pavers for Minnesota homes. Expert analysis of costs, durability, and maintenance. Get your free consultation with G. Gardner Concrete & Waterproofing, Inc.",
      author: "G. Gardner Concrete & Waterproofing, Inc Team",
      readTime: 5,
      published: true,
      featured: true,
      publishDate: "2025-01-08T11:00:00.000Z",
      _createdDate: "2025-07-23T03:33:22.913Z",
      _updatedDate: "2025-07-23T03:33:22.913Z"
    },
    {
      _id: "683ce801-9796-43db-a7e7-2b44bd047dad",
      title: "How to Prevent Ice Dams and Foundation Damage This Winter",
      slug: "prevent-ice-dams-foundation-damage-winter-minnesota",
      excerpt: "Ice dams don't just damage roofs – they can cause serious foundation problems. Learn how to protect your Minnesota home this winter.",
      content: "Ice dams create a cascade of problems that can seriously damage your foundation and basement. While most homeowners know ice dams can damage roofs and gutters, few realize they can also cause foundation problems that cost thousands to repair. Here's how to protect your Minnesota home.",
      featuredImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
      category: "Foundation Repair",
      tags: "ice dams, foundation damage, winter maintenance, Minnesota, foundation repair, waterproofing",
      metaTitle: "Prevent Ice Dam Foundation Damage Minnesota | G. Gardner Concrete & Waterproofing, Inc",
      metaDescription: "Ice dams can cause serious foundation damage. Learn prevention strategies from Minnesota's foundation experts. Free foundation assessment available.",
      author: "G. Gardner Concrete & Waterproofing, Inc Team",
      readTime: 4,
      published: true,
      featured: false,
      publishDate: "2025-01-05T14:00:00.000Z",
      _createdDate: "2025-07-23T03:33:22.912Z",
      _updatedDate: "2025-07-23T03:33:22.912Z"
    },
    {
      _id: "144fdc3c-a787-4c0b-9259-cc564bb8bcf0",
      title: "The Ultimate Guide to Concrete Driveway Maintenance in Minnesota",
      slug: "concrete-driveway-maintenance-guide-minnesota",
      excerpt: "Keep your concrete driveway looking great and lasting longer with these Minnesota-specific maintenance tips from the concrete experts.",
      content: "Proper maintenance can extend your concrete driveway's life from 20 years to 30+ years, even in Minnesota's harsh climate. Minnesota's freeze-thaw cycles, road salt, and temperature extremes are tough on concrete driveways. But with the right maintenance approach, you can protect your investment and keep your driveway looking great for decades.",
      featuredImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      category: "Concrete Work",
      tags: "concrete driveway, maintenance, Minnesota, sealing, crack repair, winter protection",
      metaTitle: "Concrete Driveway Maintenance Minnesota | G. Gardner Concrete & Waterproofing, Inc Guide",
      metaDescription: "Complete concrete driveway maintenance guide for Minnesota homeowners. Expert tips for sealing, crack repair, and winter protection. Professional services available.",
      author: "G. Gardner Concrete & Waterproofing, Inc Team",
      readTime: 7,
      published: true,
      featured: false,
      publishDate: "2025-01-03T08:00:00.000Z",
      _createdDate: "2025-07-23T03:33:22.911Z",
      _updatedDate: "2025-07-23T03:33:22.911Z"
    }
  ];

  // Filter by published status
  let filteredPosts = posts.filter(post => post.published);

  // Filter by category if provided
  if (category && category !== 'all') {
    const cat = category.toLowerCase();
    const normalized = (cat === 'hardscapes' || cat === 'concrete-work') ? 'concrete work' : category;
    filteredPosts = filteredPosts.filter(post => 
      post.category.toLowerCase() === normalized.toLowerCase()
    );
  }

  // Filter by featured status if provided
  if (featured !== undefined) {
    filteredPosts = filteredPosts.filter(post => post.featured === featured);
  }

  // Sort by publish date (newest first)
  filteredPosts.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  return filteredPosts;
}

// Get featured blog posts for homepage or sidebar
export async function getFeaturedBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  const posts = await getBlogPosts(undefined, true);
  return posts.slice(0, limit);
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}

// Get related blog posts based on category or tags
export async function getRelatedBlogPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  
  // Filter out the current post and find related posts
  const relatedPosts = posts
    .filter(post => post._id !== currentPost._id)
    .filter(post => 
      post.category === currentPost.category || 
      (currentPost.tags && post.tags && hasCommonTags(currentPost.tags, post.tags))
    );

  return relatedPosts.slice(0, limit);
}

// Helper function to check for common tags
function hasCommonTags(tags1: string, tags2: string): boolean {
  const tagsArray1 = tags1.split(',').map(tag => tag.trim().toLowerCase());
  const tagsArray2 = tags2.split(',').map(tag => tag.trim().toLowerCase());
  
  return tagsArray1.some(tag => tagsArray2.includes(tag));
}

// Get all unique categories for filtering
export async function getBlogCategories(): Promise<string[]> {
  const posts = await getBlogPosts();
  const categories = [...new Set(posts.map(post => post.category))];
  return categories.sort();
}

// Helper function to format publish date
export function formatPublishDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Helper function to get category badge color
export function getCategoryBadgeColor(category: string): string {
  switch (category.toLowerCase()) {
    case 'foundation repair':
      return 'bg-steel-gray text-white';
    case 'waterproofing':
      return 'bg-construction-orange text-white';
    case 'concrete work':
      return 'bg-bright-yellow text-charcoal-black';
    default:
      return 'bg-steel-gray text-white';
  }
}

// Helper function to truncate content for excerpts
export function truncateContent(content: string, maxLength: number = 150): string {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength).trim() + '...';
} 