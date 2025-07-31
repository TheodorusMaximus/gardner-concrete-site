import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';
import { posts } from '@wix/blog';
import { submissions } from '@wix/forms';
import { contacts } from '@wix/crm';

// Initialize Wix client for server-side operations
export function createWixClient() {
  return createClient({
    modules: {
      items,
      posts,
      submissions,
      contacts
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

// Submit concrete job booking form to Wix Forms
export async function submitConcreteJobForm(formData: ConcreteJobSubmission) {
  const wixClient = createWixClient();
  
  try {
    // Submit to the "Job Inquiry" form using the correct form ID
    const formId = '6a27ca40-701a-425b-8442-5990abe80c7c';
    
    // Prepare submission data in the correct format for Wix Forms API
    const submissionPayload = {
      formId: formId,
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
      },
      status: 'CONFIRMED',
      seen: false
    };

    const result = await wixClient.submissions.createSubmission(submissionPayload);
    
    return {
      success: true,
      submissionId: result.submission._id,
      message: 'Thank you! Your concrete project request has been submitted successfully. We\'ll contact you within 24 hours to discuss your project.'
    };
  } catch (error) {
    console.error('Error submitting concrete job form:', error);
    return {
      success: false,
      message: 'Sorry, there was an error submitting your request. Please try again or call us directly at (612) 825-8779.'
    };
  }
} 