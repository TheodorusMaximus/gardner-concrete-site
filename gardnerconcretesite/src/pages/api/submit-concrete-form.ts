import type { APIRoute } from 'astro';
import { submitConcreteJobForm, type ConcreteJobSubmission } from '../../utils/wix-client';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse the request body
    const formData: ConcreteJobSubmission = await request.json();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.projectType || !formData.projectDescription || !formData.propertyAddress || !formData.preferredContact) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Please fill in all required fields.'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Please enter a valid email address.'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // Submit to Wix
    const result = await submitConcreteJobForm(formData);
    
    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'An internal server error occurred. Please try again later.'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};