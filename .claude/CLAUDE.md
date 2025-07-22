# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a Wix Headless appointment scheduling application built with Astro. The main application is located in the `gardnerconcretesite/` directory with the following structure:

- `src/components/` - Astro components including booking form, date picker, time slots, and UI components
- `src/layouts/` - Base layout template
- `src/pages/` - Route pages (index, schedule, confirmation, blog, 404)
- `src/utils/` - Utility functions for booking service, date handling, DOM manipulation, and event management
- `src/styles/` - Global CSS styles using Tailwind CSS

## Common Development Commands

All commands should be run from the `gardnerconcretesite/` directory:

```bash
# Development server
npm run dev
# or
wix dev

# Build for production
npm run build
# or
wix build

# Preview production build
npm run preview
# or
wix preview

# Deploy to Wix
wix release

# Environment management
wix env

# Code generation
wix generate
```

## Architecture Overview

### Wix Integration
- Uses Wix Headless SDK for bookings, ecommerce, and redirects
- Configured with Wix CLI for deployment and development
- App ID and Site ID stored in `wix.config.json`
- Environment variables managed through `.env.local`

### Booking System
The core booking functionality is built around:
- **Service Types**: Free consultations and premium paid services
- **Availability Management**: Real-time slot availability through Wix Bookings API
- **Dual Booking Flow**: 
  - Free services: Direct booking with form submission
  - Premium services: Redirect to Wix checkout flow
- **Session Management**: Booking data stored in sessionStorage for confirmation page

### Component Architecture
- **Astro Components**: Server-side rendered with client-side hydration for interactive elements
- **UI Components**: Reusable components in `src/components/ui/`
- **Event System**: Custom event handlers for date selection, time slot selection, and session type changes
- **State Management**: Client-side state managed through DOM manipulation utilities

### Key Services
- `booking-service.ts`: Core booking logic, service queries, and availability checks
- `date-utils.ts`: Date formatting and manipulation
- `event-utils.ts`: Custom event system for component communication
- `dom-utils.ts`: DOM manipulation helpers

### Styling
- Uses Tailwind CSS v4 with custom brand colors
- Glass morphism design pattern throughout UI
- Responsive design with mobile-first approach
- Custom animations and transitions

### Build Configuration
- Astro with React integration for interactive components
- Cloudflare adapter for deployment
- TypeScript with strict configuration
- Wix SDK integration through `@wix/astro` plugin

## Development Notes

### Working with Wix APIs
- All Wix API calls are handled through the SDK in `booking-service.ts`
- Error handling is implemented for all API interactions
- Timezone handling uses UTC for consistency

### State Management
- Client-side state is managed through event listeners and DOM manipulation
- No external state management library is used
- Component communication happens through custom events

### Testing
- No specific test framework is currently configured
- Manual testing should focus on booking flow and API integration

### Environment Setup
- Requires Wix CLI for development and deployment
- Environment variables should be configured in `.env.local`
- Wix project configuration is in `wix.config.json`