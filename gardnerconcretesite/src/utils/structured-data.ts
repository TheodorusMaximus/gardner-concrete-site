/**
 * SEO Structured Data (JSON-LD) utilities for Gardner Concrete
 * Following schema.org standards and Google best practices
 */

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface LocalBusinessSchema {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness';
  name: string;
  '@id': string;
  url: string;
  telephone: string;
  email: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  openingHours: string[];
  sameAs: string[];
  serviceArea: Array<{
    '@type': 'City';
    name: string;
  }>;
  areaServed: Array<{
    '@type': 'City';
    name: string;
  }>;
  hasOfferCatalog: {
    '@type': 'OfferCatalog';
    name: string;
    itemListElement: Array<{
      '@type': 'Offer';
      itemOffered: {
        '@type': 'Service';
        name: string;
        serviceType: string;
      };
    }>;
  };
}

interface WebsiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  potentialAction: {
    '@type': 'SearchAction';
    target: {
      '@type': 'EntryPoint';
      urlTemplate: string;
    };
    'query-input': string;
  };
}

interface BreadcrumbListSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

/**
 * Generate BreadcrumbList JSON-LD schema
 */
export function generateBreadcrumbSchema(breadcrumbs: BreadcrumbItem[], baseUrl: string): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      // Last item (current page) should not have an item property
      ...(index < breadcrumbs.length - 1 && {
        item: baseUrl.replace(/\/$/, '') + breadcrumb.url
      })
    }))
  };
}

/**
 * Generate LocalBusiness JSON-LD schema for Gardner Concrete
 */
export function generateLocalBusinessSchema(baseUrl: string): LocalBusinessSchema {
  const serviceAreas = [
    'Minneapolis', 'Saint Paul', 'Bloomington', 'Plymouth', 'Minnetonka',
    'Eden Prairie', 'Edina', 'Burnsville', 'Eagan', 'Apple Valley',
    'Lakeville', 'Woodbury', 'Maple Grove', 'Brooklyn Park', 'Blaine'
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Gardner Concrete',
    '@id': baseUrl + '#business',
    url: baseUrl,
    telephone: '+1-612-555-0123',
    email: 'info@gardnerconcrete.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1234 Concrete Way',
      addressLocality: 'Minneapolis',
      addressRegion: 'MN',
      postalCode: '55401',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.9778,
      longitude: -93.2650
    },
    openingHours: [
      'Mo-Fr 07:00-17:00',
      'Sa 08:00-16:00'
    ],
    sameAs: [
      'https://www.facebook.com/gardnerconcrete',
      'https://www.instagram.com/gardnerconcrete',
      'https://www.linkedin.com/company/gardnerconcrete'
    ],
    serviceArea: serviceAreas.map(city => ({
      '@type': 'City',
      name: city
    })),
    areaServed: serviceAreas.map(city => ({
      '@type': 'City',
      name: city
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Concrete Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Concrete Driveways',
            serviceType: 'Concrete Installation'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Basement Waterproofing',
            serviceType: 'Waterproofing'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Foundation Repair',
            serviceType: 'Foundation Services'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Concrete Patios',
            serviceType: 'Concrete Installation'
          }
        }
      ]
    }
  };
}

/**
 * Generate Website JSON-LD schema with SearchAction
 */
export function generateWebsiteSchema(baseUrl: string): WebsiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Gardner Concrete',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: baseUrl.replace(/\/$/, '') + '/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Safely stringify JSON-LD data for HTML insertion
 */
export function safeJsonLd(data: any): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/'/g, '\\u0027');
}