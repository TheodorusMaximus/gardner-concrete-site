import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';
import { posts } from '@wix/blog';
import { submissions } from '@wix/forms';

// Initialize Wix client for server-side operations
export function createWixClient() {
  return createClient({
    modules: {
      items,
      posts,
      submissions
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


// Form Submission Interface
export interface ConcreteJobSubmission {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  projectDescription: string;
  propertyAddress: string;
  timeframe: string;
  budget: string;
  preferredContact: 'phone' | 'email';
  heardAboutUs?: string;
}

// Submit concrete job booking form to Wix
export async function submitConcreteJobForm(formData: ConcreteJobSubmission) {
  const wixClient = createWixClient();
  
  try {
    // For now, we'll use a generic form ID - this would need to be set up in Wix Dashboard
    // In a real implementation, you'd get this from your Wix Forms app
    const CONCRETE_FORM_ID = 'concrete-booking-form'; // This needs to be replaced with actual form ID from Wix
    
    const submission = await wixClient.submissions.createSubmission({
      formId: CONCRETE_FORM_ID,
      status: 'PENDING',
      submissions: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType,
        projectDescription: formData.projectDescription,
        propertyAddress: formData.propertyAddress,
        timeframe: formData.timeframe,
        budget: formData.budget,
        preferredContact: formData.preferredContact,
        heardAboutUs: formData.heardAboutUs || ''
      }
    });
    
    return {
      success: true,
      submissionId: submission._id,
      message: 'Thank you! Your concrete project request has been submitted successfully. We\'ll contact you within 24 hours to discuss your project.'
    };
  } catch (error) {
    console.error('Error submitting concrete job form:', error);
    return {
      success: false,
      message: 'Sorry, there was an error submitting your request. Please try again or call us directly at [your phone number].'
    };
  }
} 