# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

The main application is in the `gardnerconcretesite/` directory. All commands should be run from this directory.

```bash
cd gardnerconcretesite
```

### Core Commands
- `npm run dev` - Start development server using Wix CLI
- `npm run build` - Build the application for production
- `npm run preview` - Preview the built application
- `npm run release` - Release the application to Wix

### Wix CLI Commands
- `npm run wix` - Access Wix CLI directly
- `npm run generate` - Generate Wix code/types
- `npm run env` - Manage environment variables

## Architecture Overview

This is a **Wix-powered Astro application** for appointment scheduling built with:
- **Astro 5.8** as the main framework
- **Tailwind CSS 4.1** for styling
- **TypeScript** for type safety
- **Wix SDK** for backend services integration
- **Cloudflare** as the deployment adapter

### Key Wix Integrations
The application uses several Wix services:
- `@wix/bookings` - Appointment scheduling and availability
- `@wix/ecom` - Checkout and payment processing
- `@wix/redirects` - Redirect session management
- `@wix/dashboard` - Admin functionality

### Project Structure
```
gardnerconcretesite/
├── src/
│   ├── components/          # Astro components
│   │   ├── ui/             # Reusable UI components
│   │   ├── BookingForm.astro
│   │   ├── DatePicker.astro
│   │   └── TimeSlots.astro
│   ├── layouts/            # Page layouts
│   ├── pages/              # Astro pages/routes
│   ├── styles/             # Global CSS
│   └── utils/              # TypeScript utilities
├── public/                 # Static assets
├── wix.config.json        # Wix app configuration
└── astro.config.mjs       # Astro configuration
```

### Core Services
- **booking-service.ts** - Main service for Wix Bookings API integration
  - Manages appointment creation, availability checking
  - Handles service types (free/premium)
  - Integrates with Wix checkout flow

### Environment Configuration
- Uses `.env` and `.env.local` files for configuration
- Wix app ID and site ID configured in `wix.config.json`
- Environment variables loaded in `astro.config.mjs`

### Key Features
- Two-tier appointment system (free/premium consultations)
- Date/time slot selection with real-time availability
- Wix-powered checkout and payment processing
- Responsive design with Tailwind CSS
- Session-based booking confirmation flow