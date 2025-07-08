# Guilherme & Carolina Love Story Website

## Overview

This is a romantic, personal website celebrating the love story between Guilherme and Carolina. The application is a single-page love story showcase featuring interactive elements like countdown timers, photo carousels, memory timelines, and romantic quotes. It's built as a full-stack TypeScript application with a React frontend and Express backend, though currently the backend functionality is minimal.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server code:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js with TypeScript, minimal API functionality
- **Database**: Configured for PostgreSQL with Drizzle ORM (using Neon serverless)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Deployment**: Production build setup with ESBuild

## Key Components

### Frontend Architecture
- **Component Library**: shadcn/ui components for consistent UI elements
- **Styling System**: Tailwind CSS with custom romantic theme colors and CSS variables
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state
- **Animations**: Custom CSS animations with romantic particle effects

### Backend Architecture
- **Server**: Express.js with middleware for logging and error handling
- **Database**: PostgreSQL with Drizzle ORM for persistent data storage
- **Storage**: Abstract storage interface with PostgreSQL implementation
- **Development**: Hot reloading with Vite integration in development mode

### UI Components Structure
The application uses a comprehensive set of reusable UI components:
- Interactive elements (buttons, forms, dialogs)
- Display components (cards, carousels, accordions)
- Layout components (grids, separators, sheets)
- Feedback components (toasts, tooltips, progress bars)

## Data Flow

### Current Implementation
1. **Dynamic Content**: All site content stored in PostgreSQL database with admin panel management
2. **Theme Management**: Local storage persistence for user theme preferences
3. **Countdown Logic**: Real-time calculations based on relationship start date stored in database
4. **Image Carousel**: Customizable through admin panel with persistent storage
5. **Content Management**: Full CRUD operations for texts, images, quotes, memories, and music

### Database Schema
- **Users Table**: Basic user authentication schema with username/password fields
- **Site Content Table**: Comprehensive content storage including:
  - General information (title, subtitle, start date, WhatsApp number)
  - Media content (images with captions, music details)
  - Romantic content (love quotes, memory timeline)
  - JSON fields for complex data structures
- **Drizzle ORM**: Type-safe database operations with Zod validation

## External Dependencies

### Core Technologies
- **React 18**: Frontend framework with hooks and modern patterns
- **TypeScript**: Type safety across the entire application
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast development server and build tool

### UI and Styling
- **Radix UI**: Accessible component primitives
- **shadcn/ui**: Pre-built component library
- **Lucide React**: Icon library
- **Font Awesome**: Additional icons via CDN

### Backend Services
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database operations

### Development Tools
- **ESBuild**: Fast production bundling
- **PostCSS**: CSS processing with Tailwind
- **Replit Integration**: Development environment support

## Deployment Strategy

### Development
- Vite dev server with HMR (Hot Module Replacement)
- Express server with middleware integration
- Real-time error overlay for debugging
- Cartographer integration for Replit environment

### Production Build
1. **Frontend**: Vite builds optimized React bundle to `dist/public`
2. **Backend**: ESBuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations system for schema management
4. **Static Assets**: Served directly by Express in production

### Environment Configuration
- Database URL required via environment variable
- Production/development mode switching
- Replit-specific optimizations and banner integration

### Key Architectural Decisions

**Why React + Express**: 
- Provides full-stack TypeScript development
- Easy integration between frontend and backend
- Familiar development patterns

**Why Tailwind + shadcn/ui**:
- Rapid UI development with consistent design system
- Romantic theme customization through CSS variables
- Accessible components out of the box

**Why Drizzle + PostgreSQL**:
- Type-safe database operations
- Modern ORM with excellent TypeScript support
- Scalable for future feature additions

**Why Vite**:
- Fast development experience
- Optimized production builds
- Excellent TypeScript and React support

The application prioritizes user experience with smooth animations, responsive design, and romantic visual elements while maintaining a clean, maintainable codebase for future enhancements.