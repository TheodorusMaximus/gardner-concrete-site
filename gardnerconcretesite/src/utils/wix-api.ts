// Utility for fetching CMS data using REST API in Astro
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

// For now, let's use a fallback approach with static data while we set up the proper API integration
// In production, you would fetch from the Wix Data API using proper authentication

export async function getProjects(category?: string): Promise<Project[]> {
  // Fallback data structure that matches our CMS schema
  const projects: Project[] = [
    {
      _id: "e43825b3-c092-4db2-a568-b63fb3a78fea",
      title: "Complete Water Evacuation System",
      description: "Comprehensive basement waterproofing with advanced drainage system and sump pump installation in South Minneapolis home.",
      category: "waterproofing",
      image: "https://pub-023c3e677cc749cd89ec726c78c6178e.r2.dev/water%20evacation%20system.jpg",
      testimonialText: "Shout out to this company and I would recommend them for all water proofing jobs at your home!",
      customerName: "Carter J.",
      customerLocation: "South Minneapolis",
      rating: 5,
      year: 2024,
      featured: true,
      slug: "water-evacuation-system-south-minneapolis",
      _createdDate: "2025-07-23T03:25:34.744Z",
      _updatedDate: "2025-07-23T03:25:34.744Z"
    },
    {
      _id: "21ec5db1-3821-4fdc-8bbe-9f43024166c3",
      title: "Foundation Crack Repair & Stabilization",
      description: "Professional foundation crack injection and structural reinforcement for a residential property in Edina.",
      category: "foundation",
      image: "https://pub-023c3e677cc749cd89ec726c78c6178e.r2.dev/IMG_0561%20(1).jpg",
      testimonialText: "If you're panicking about your foundation like I was call these guys. No selling just solutions.",
      customerName: "John V.",
      customerLocation: "Edina",
      rating: 5,
      year: 2024,
      featured: true,
      slug: "foundation-crack-repair-edina",
      _createdDate: "2025-07-23T03:25:34.743Z",
      _updatedDate: "2025-07-23T03:25:34.743Z"
    },
    {
      _id: "97e02fac-774f-4edc-8731-afa8e9f0f9a2",
      title: "Decorative Concrete Steps & Patio",
      description: "Custom concrete steps and patio installation with decorative finishes that have lasted over 20 years in Plymouth.",
      category: "concrete",
      image: "https://pub-023c3e677cc749cd89ec726c78c6178e.r2.dev/IMG_6380.jpg",
      testimonialText: "They did our steps and they have lasted over 20 years, good quality!",
      customerName: "Elaine R.",
      customerLocation: "Plymouth",
      rating: 5,
      year: 2003,
      featured: true,
      slug: "decorative-concrete-steps-plymouth",
      _createdDate: "2025-07-23T03:25:34.742Z",
      _updatedDate: "2025-07-23T03:25:34.742Z"
    },
    {
      _id: "e208433e-cec2-4cb2-8ef9-1cc73760bf2d",
      title: "Exterior Membrane Waterproofing",
      description: "Complete exterior basement waterproofing with membrane system and French drain installation.",
      category: "waterproofing",
      image: "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?auto=format&fit=crop&w=800&q=80",
      testimonialText: "Finally found a company that actually fixes the problem instead of just treating symptoms!",
      customerName: "Michael T.",
      customerLocation: "Minneapolis",
      rating: 5,
      year: 2024,
      featured: false,
      slug: "exterior-membrane-waterproofing-minneapolis",
      _createdDate: "2025-07-23T03:25:34.741Z",
      _updatedDate: "2025-07-23T03:25:34.741Z"
    },
    {
      _id: "8e48feb7-44d6-4162-ab88-e8c7a9bed219",
      title: "Push Pier Foundation Support",
      description: "Professional push pier installation to stabilize settling foundation in St. Paul residential property.",
      category: "foundation",
      image: "https://images.unsplash.com/photo-1592609931041-40265b692757?auto=format&fit=crop&w=800&q=80",
      testimonialText: "Excellent work, fair pricing, and they explained everything clearly. House feels solid again!",
      customerName: "Sarah L.",
      customerLocation: "St. Paul",
      rating: 5,
      year: 2023,
      featured: false,
      slug: "push-pier-foundation-support-st-paul",
      _createdDate: "2025-07-23T03:25:34.740Z",
      _updatedDate: "2025-07-23T03:25:34.740Z"
    },
    {
      _id: "c814460e-2e25-45e1-82bc-aa8ecabd7a7b",
      title: "Stamped Concrete Driveway",
      description: "Beautiful stamped concrete driveway with decorative border and integral color in Minnetonka home.",
      category: "concrete",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      testimonialText: "The driveway looks amazing and has held up perfectly through multiple harsh winters!",
      customerName: "David K.",
      customerLocation: "Minnetonka",
      rating: 5,
      year: 2022,
      featured: false,
      slug: "stamped-concrete-driveway-minnetonka",
      _createdDate: "2025-07-23T03:25:34.739Z",
      _updatedDate: "2025-07-23T03:25:34.739Z"
    }
  ];

  // Filter by category if provided
  if (category && category !== 'all') {
    const normalized = category === 'hardscapes' ? 'concrete' : category; // backward-compat for callers
    return projects.filter(project => project.category === normalized);
  }

  return projects;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter(project => project.featured === true).slice(0, 3);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find(project => project.slug === slug) || null;
}

// Helper function to get category badge color
export function getCategoryBadgeColor(category: string): string {
  switch (category) {
    case 'waterproofing':
      return 'bg-construction-orange text-white';
    case 'foundation':
      return 'bg-steel-gray text-white';
    case 'concrete':
    case 'hardscapes':
      return 'bg-bright-yellow text-charcoal-black';
    default:
      return 'bg-steel-gray text-white';
  }
}

// Helper function to render star rating
export function renderStarRating(rating: number = 5): string {
  return '⭐'.repeat(Math.min(rating, 5));
} 