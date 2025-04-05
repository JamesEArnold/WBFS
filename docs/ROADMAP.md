# WBFS App Migration Roadmap

## Overview
This roadmap outlines the migration plan to convert the existing Next.js application (@app) to utilize the UX/UI and components from the Sheriff Central project while maintaining current functionality.

## Technical Context
- **Current App**: Next.js 13.4 with App Router
- **Target Design**: Sheriff Central (React + Vite) 
- **Primary Color**: Yellow (#fcd34b)
- **Secondary Colors**: Black, white, gray-100 to gray-800
- **Key Dependencies**: Tailwind CSS, React, Lucide icons
- **Deployment**: Vercel

## Phase 1: Setup and Configuration

### Phase 1.1: Project Structure Setup
- [x] Create new component directories to match Sheriff Central structure
  - Location: `/components/ui`, `/components/layout`, `/components/sections`, `/components/forms`
  - Implementation: Mirrored the component organization from Sheriff Central
  - Key features:
    - Created consistent folder structure with UI, layout, sections, and forms directories
    - Established component hierarchy with placeholders for future implementation
    - Added base components for buttons, cards, and icons
  - Reference: Sheriff Central src/components structure
  - Additional Notes: Created placeholder components that will be fully implemented in later phases

### Phase 1.2: Tailwind Configuration Update
- [x] Update Tailwind configuration to match Sheriff Central design system
  - Location: `/tailwind.config.js`
  - Implementation: Migrated color schemes, typography, and spacing
  - Key features:
    - Added yellow primary color (#fcd34b) and primary-dark color (#f7c948)
    - Added 'campaign-yellow' color for consistent branding
    - Updated font family to Inter for improved typography
    - Updated borderRadius for consistent component styling
  - Reference: Sheriff Central tailwind.config.js
  - Additional Notes: Maintained existing animation and keyframe configurations while updating the color scheme and typography

### Phase 1.3: Add Required Dependencies
- [x] Add any missing dependencies from Sheriff Central
  - Location: `/package.json`
  - Implementation: Updated package.json with required dependencies
  - Key features:
    - Ensured all UI libraries are consistent
    - Matched versions for compatible functionality
    - Upgraded lucide-react to latest version for new icon components
    - Updated @radix-ui/react-icons to latest version
  - Reference: Sheriff Central package.json
  - Implementation Notes: Upgraded existing dependencies and added missing ones:
    ```bash
    npm install @radix-ui/react-icons@latest lucide-react@latest 
    ```

## Phase 2: Component Migration

### Phase 2.1: Header/Navigation Component
- [x] Replace MainNav with new Header component
  - Location: `/components/main-nav.tsx` → `/components/Header.tsx`
  - Implementation: Implement Sheriff Central Header with Next.js routing
  - Key features:
    - Mobile-responsive design with hamburger menu
    - Yellow background with black text
    - Active link highlighting
    - "Re-Elect" stars styling
  - Reference: Sheriff Central Header.tsx component
  - Implementation Notes:
    ```tsx
    // Convert from React Router to Next.js
    // Change from:
    import { Link, useLocation } from 'react-router-dom';
    
    // To:
    import Link from 'next/link';
    import { usePathname } from 'next/navigation';
    
    // Replace useLocation() with usePathname()
    const pathname = usePathname();
    
    // Replace location.pathname === path with pathname === path
    const isActive = (path: string) => pathname === path;
    ```
    
    - Navigation Structure:
      - Home ('/')
      - About ('/about')
      - Events ('/events')
      - Contribute (styled as CTA button) ('/donate')

### Phase 2.2: Footer Component
- [x] Replace existing Footer with Sheriff Central design
  - Location: `/components/footer.tsx` → `/components/layout/Footer.tsx`
  - Implementation: Updated Footer with new design while preserving links and content
  - Key features:
    - Black background with yellow accents 
    - Three-column layout with responsive design
    - Social media links with yellow circular backgrounds
    - Campaign logo display in yellow background
  - Reference: Sheriff Central Footer.tsx component
  - Implementation Notes:
    - Preserved campaign address and email information
    - Maintained social media links to Facebook and Instagram
    - Added "Paid for by" disclaimer in the bottom section
    - Updated import in app/layout.tsx to use new component
    - Used yellow (#fcd34b) for accent colors to maintain consistency

### Phase 2.3: Home Page Components
- [ ] Implement new Hero component
  - Location: `/components/hero-slide.tsx`
  - Implementation: Replace current hero with new design
  - Key features:
    - Two-column layout
    - Sheriff portrait with stylized border
    - Campaign buttons
  - Reference: Sheriff Central Home.tsx hero section
  - Implementation Notes:
    ```tsx
    // Key HTML structure
    <section className="bg-gradient-to-b from-[#fcd34b] to-[#fcd34b]/70 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text column */}
          {/* Image column with stylized border */}
        </div>
      </div>
    </section>
    ```

- [ ] Implement Priorities section
  - Location: `/components/main-accordion.tsx` → `/components/Priorities.tsx`
  - Implementation: Replace accordion with priorities grid
  - Key features:
    - Three-column grid on desktop
    - Card-based design with yellow accent borders
  - Reference: Sheriff Central Home.tsx priorities section
  - Implementation Notes:
    - Maintain existing priority content but convert from accordion to cards
    - Use existing content descriptions with the new styling
    - Section title should use new typography system (uppercase, bold)

- [ ] Implement Events Preview section
  - Location: New component `/components/EventsPreview.tsx`
  - Implementation: Create new component for homepage events preview
  - Key features:
    - Date display with yellow background
    - Event details with call-to-action
  - Reference: Sheriff Central Home.tsx events section
  - Implementation Notes:
    - Pull data from existing events pages
    - Format date display in the left yellow column with day, month, year
    - Incorporate "SAVE THE DATE" tag as shown in Sheriff Central design

### Phase 2.4: About Page Components
- [ ] Update About page layout and styling
  - Location: `/app/about/page.tsx`
  - Implementation: Migrate to new design while preserving content
  - Key features:
    - Hero section with image
    - Biography section
    - Accomplishments section
  - Reference: Sheriff Central About.tsx
  - Implementation Notes:
    - Ensure 'use client' directive remains at the top of the file
    - Maintain meta tags for SEO
    - Import appropriate components from new UI library
    - Keep all existing bio text content but reformat with new styling

### Phase 2.5: Events Page Components
- [ ] Update Events page with new design
  - Location: `/app/events/page.tsx`
  - Implementation: Implement new events layout
  - Key features:
    - Calendar-style event listings
    - Event cards with date highlighting
    - Event detail expansion
  - Reference: Sheriff Central Events.tsx
  - Implementation Notes:
    - Maintain data structure from existing events
    - Convert to new card-based design with yellow date display
    - Preserve event details (location, time, description) in new format
    - Implement the "SAVE THE DATE" tag for upcoming events

### Phase 2.6: Donate/Contribute Page
- [ ] Update Donate page to match Contribute design
  - Location: `/app/donate/page.tsx`
  - Implementation: Implement contribution form with new styling
  - Key features:
    - Multi-step contribution process
    - Form validation
    - Payment integration
  - Reference: Sheriff Central Contribute.tsx
  - Implementation Notes:
    - Preserve existing payment processor integration
    - Implement multi-step form UI with progress indicator
    - Use consistent form styling (input fields, buttons)
    - Maintain campaign finance compliance disclaimers

## Phase 3: Layout and Routing

### Phase 3.1: Root Layout Update
- [ ] Update Root Layout to incorporate new design system
  - Location: `/app/layout.tsx`
  - Implementation: Update layout structure while preserving metadata
  - Key features:
    - Consistent header/footer integration
    - Maintain SEO metadata
    - Analytics integration
  - Reference: Sheriff Central App.tsx structure
  - Implementation Notes:
    ```tsx
    // Keep the following metadata intact:
    export const metadata: Metadata = {
      title: 'Weisburn for Sheriff',
      description: 'The official site for the Stark County Republican Sheriff Representative Eric Weisburn.',
      verification: { google: '9J5nLPwwmIYa-i-ryNRJ10p0pB0wFeXk9IFXk5Ff1Mw' }
    }
    
    // Update layout with new header/footer components
    // Maintain SpeedInsights and Analytics components
    ```

### Phase 3.2: CSS Global Styles
- [ ] Update global CSS with Sheriff Central styles
  - Location: `/app/globals.css`
  - Implementation: Migrate base styles, utility classes
  - Key features:
    - Typography system
    - Common button styles
    - Section title styling
  - Reference: Sheriff Central index.css
  - Implementation Notes:
    ```css
    /* Add the following utility classes */
    .section-title {
      @apply text-3xl font-bold mb-8 uppercase tracking-wide;
    }
    
    .campaign-button {
      @apply bg-black text-[#fcd34b] font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition duration-200;
    }
    
    /* Update typography base styles */
    h1, h2, h3, h4, h5, h6 {
      @apply font-bold;
    }
    ```

## Phase 4: API Integration and Form Handling

### Phase 4.1: Mailing List Integration
- [ ] Update mailing list forms with new styling
  - Location: `/app/mailingList/route.ts` and form components
  - Implementation: Preserve backend logic while updating UI
  - Key features:
    - Styled form inputs
    - Validation feedback
    - Success/error states
  - Reference: Sheriff Central form styles
  - Implementation Notes:
    - Keep SendGrid API integration (`@sendgrid/mail`) intact
    - Maintain form validation logic but update UI styling
    - Preserve existing route handler implementation
    - Form fields required: First Name, Last Name, Email, Phone (optional), Zip Code

### Phase 4.2: Volunteer Form Update
- [ ] Update volunteer forms with new styling
  - Location: `/app/volunteerList/route.ts` and form components
  - Implementation: Preserve backend logic while updating UI
  - Key features:
    - Consistent form styling
    - Improved mobile experience
    - Clear call-to-action
  - Reference: Sheriff Central form patterns
  - Implementation Notes:
    - Maintain existing volunteer registration fields
    - Update UI with new consistent form styling
    - Keep the categorization of volunteer opportunities
    - Preserve success/error notification system with updated styling

## Phase 5: Testing and Optimization

### Phase 5.1: Cross-browser Testing
- [ ] Test application across browsers
  - Location: All pages
  - Implementation: Verify consistent appearance
  - Key features:
    - Chrome, Firefox, Safari, Edge compatibility
    - Mobile responsiveness
  - Reference: Sheriff Central responsive design
  - Implementation Notes:
    - Test responsive breakpoints: Mobile (<768px), Tablet (768px-1024px), Desktop (>1024px)
    - Verify hamburger menu functionality on mobile
    - Ensure yellow/black contrast meets accessibility standards
    - Test yellow gradient appearance across browsers

### Phase 5.2: Performance Optimization
- [ ] Optimize images and assets
  - Location: `/public` directory
  - Implementation: Convert and compress images
  - Key features:
    - Next-gen formats (WebP)
    - Responsive image sizing
    - Lazy loading
  - Reference: Web performance best practices
  - Implementation Notes:
    - Use Next.js Image component with priority for above-the-fold images
    - Implement lazy loading for below-the-fold images
    - Convert campaign photos to WebP with fallback JPG
    - Set appropriate width and height attributes to prevent layout shifts

### Phase 5.3: Accessibility Improvements
- [ ] Ensure WCAG compliance
  - Location: All components
  - Implementation: Audit and fix accessibility issues
  - Key features:
    - Proper contrast ratios
    - Semantic HTML
    - Screen reader compatibility
  - Reference: WCAG 2.1 AA standards
  - Implementation Notes:
    - Use proper heading hierarchy (h1, h2, h3)
    - Add aria-labels to interactive elements
    - Ensure sufficient color contrast (especially yellow/white text)
    - Implement keyboard navigation for all interactive elements

## Phase 6: Deployment and Monitoring

### Phase 6.1: Staging Deployment
- [ ] Deploy to staging environment
  - Location: Vercel project settings
  - Implementation: Create staging branch deployment
  - Key features:
    - Preview URL for stakeholder review
    - A/B comparison with current site
  - Reference: Vercel deployment settings
  - Implementation Notes:
    - Create a staging branch for testing
    - Configure Vercel preview deployments
    - Set up environment variables for staging
    - Implement password protection if needed for pre-release review

### Phase 6.2: Analytics Setup
- [ ] Ensure analytics properly track new components
  - Location: Analytics configuration
  - Implementation: Update event tracking
  - Key features:
    - Conversion tracking
    - User journey analysis
  - Reference: Current analytics implementation
  - Implementation Notes:
    - Maintain Vercel Analytics integration
    - Track key conversion events (donate clicks, volunteer form submissions)
    - Set up custom event tracking for key user interactions
    - Ensure performance metrics are properly captured

## Completed Items

### Phase 0: Planning
- [x] Assess current app structure and Sheriff Central design
  - Location: `app/` and `Sheriff Central/`
  - Implementation: Comparative analysis of both codebases
  - Key features:
    - Component identification
    - Route mapping
    - Design element comparison
  - Reference: Next.js App Router and Sheriff Central React structure 

#### Phase 1.2: Tailwind Configuration Update
- [x] Update Tailwind configuration to match Sheriff Central design system
  - Location: `tailwind.config.js`
  - Implementation: Migrated color schemes, typography, and spacing
  - Key features:
    - Added yellow primary color (#fcd34b) and primary-dark color (#f7c948)
    - Added 'campaign-yellow' color for consistent branding
    - Updated font family to Inter for improved typography
    - Updated borderRadius for consistent component styling
  - Reference: Sheriff Central tailwind.config.js

### Phase 1.3: Add Required Dependencies
- [x] Add any missing dependencies from Sheriff Central
  - Location: `/package.json`
  - Implementation: Updated package.json with required dependencies
  - Key features:
    - Ensured all UI libraries are consistent
    - Matched versions for compatible functionality
    - Upgraded lucide-react to latest version for new icon components
    - Updated @radix-ui/react-icons to latest version
  - Reference: Sheriff Central package.json

### Phase 2.1: Header/Navigation Component
- [x] Replace MainNav with new Header component
  - Location: `/components/Header.tsx`
  - Implementation: Implemented Sheriff Central Header with Next.js routing
  - Key features:
    - Added mobile-responsive hamburger menu with Lucide icons
    - Used yellow background (#fcd34b) with black text
    - Implemented active link highlighting based on current path
    - Added "Re-Elect" stars styling with the new branding
  - Reference: Adapted from Sheriff Central Header.tsx component
  - Additional Notes: Used Next.js Link components and usePathname for navigation instead of React Router

### Phase 2.2: Footer Component
- [x] Replace existing Footer with Sheriff Central design
  - Location: `/components/footer.tsx` → `/components/layout/Footer.tsx`
  - Implementation: Updated Footer with new design while preserving links and content
  - Key features:
    - Black background with yellow accents 
    - Three-column layout with responsive design
    - Social media links with yellow circular backgrounds
    - Campaign logo display in yellow background
  - Reference: Sheriff Central Footer.tsx component
  - Implementation Notes:
    - Preserved campaign address and email information
    - Maintained social media links to Facebook and Instagram
    - Added "Paid for by" disclaimer in the bottom section
    - Updated import in app/layout.tsx to use new component
    - Used yellow (#fcd34b) for accent colors to maintain consistency

### Additional Enhancements
- [x] Implement Contribution Banner above footer
  - Location: `/components/sections/ContributeBanner.tsx`
  - Implementation: Created a new global contribution call-to-action banner
  - Key features:
    - Black background with yellow CTA button
    - Campaign donation message
    - Responsive text sizing
    - Appears on all pages above the footer
  - Reference: Sheriff Central Home.tsx contribution section
  - Implementation Notes:
    - Added component to the root layout to appear on all pages
    - Used the consistent yellow (#fcd34b) for the CTA button
    - Linked to the existing donation page (/donate)
    - Used responsive typography for better mobile experience
