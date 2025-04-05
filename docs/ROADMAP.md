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
- [x] Implement new Hero component
  - Location: `/components/hero-slide.tsx`
  - Implementation: Replaced current hero with new Sheriff Central design
  - Key features:
    - Two-column layout with yellow gradient background
    - Sheriff portrait with stylized border and rotated black shadow effect
    - Campaign buttons (Learn More and Support Our Campaign)
    - RE-ELECT stars branding
    - Proper column ordering for mobile (image first, then text)
  - Reference: Sheriff Central Home.tsx hero section
  - Implementation Notes:
    - Preserved the event card functionality from the original hero section
    - Used the SheriffStar icon component for branding
    - Maintained the existing sheriff portrait image
    - Added responsive styling for mobile and desktop views
    - Used the yellow/black color scheme from the Tailwind configuration
    - Added the rotation and shadow effect for the sheriff portrait to match Sheriff Central design

- [x] Implement Priorities section
  - Location: `/components/main-accordion.tsx` → `/components/sections/PrioritiesSection.tsx`
  - Implementation: Replaced accordion with priorities grid
  - Key features:
    - Three-column grid on desktop
    - Card-based design with yellow accent borders
    - FontAwesome icons for each priority
    - Interactive elements preserved with button links
  - Reference: Sheriff Central Home.tsx priorities section
  - Implementation Notes:
    - Replaced original content with Sheriff Central's priorities: Public Safety, Fiscal Responsibility, and Community Partnerships
    - Used FontAwesome icons relevant to each priority
    - Implemented proper section title with uppercase, bold styling
    - Added "Learn More" buttons linking to the about page
    - Used consistent yellow/black color scheme for buttons and accents

- [x] Implement Events Preview section
  - Location: New component `/components/sections/EventsPreviewSection.tsx`
  - Implementation: Created component for homepage events preview that uses actual event data
  - Key features:
    - Date display with yellow background featuring month, day, and year
    - "SAVE THE DATE" flag for upcoming events
    - Event details with location and time
    - Call-to-action button for event details
    - Responsive design that works on mobile and desktop
  - Reference: Sheriff Central Home.tsx events section
  - Implementation Notes:
    - Utilized existing event data structure from event components
    - Implemented dynamic filtering to show only non-expired events
    - Added date parsing to properly format event dates in the left yellow column
    - Incorporated Calendar icon from Lucide for consistent styling
    - Added fallback display for when no events are available
    - Used consistent yellow/black color scheme for buttons and "SAVE THE DATE" tag
    - Added proper shadow and spacing for improved visual hierarchy

### Phase 2.4: About Page Components
- [x] Update About page layout and styling
  - Location: `/app/about/page.tsx`
  - Implementation: Migrated to new design while preserving content
  - Key features:
    - Hero section with yellow background and centered title
    - Biography section with stylized image
    - Career timeline with card-based layout
    - Accomplishments and vision sections
    - Personal note with signature
  - Reference: Sheriff Central About.tsx
  - Implementation Notes:
    - Preserved all existing bio text content and career timeline
    - Implemented the black/yellow color scheme consistently
    - Used the rotated shadow effect for images matching Sheriff Central design
    - Added mobile-responsive grid layout for timeline and accomplishments
    - Organized content into clear, distinct sections for better user experience
    - Maintained the "YOU!" styling with the skewed yellow background accent

### Phase 2.5: Events Page Components
- [x] Update Events page with new design
  - Location: `/app/events/page.tsx`
  - Implementation: Implemented new events layout with calendar-style listings
  - Key features:
    - Added hero section with yellow background and centered title
    - Implemented featured event section with prominent display
    - Created calendar-style event listings with date highlighting
    - Added "SAVE THE DATE" tags for upcoming events
    - Included CTA section for calendar subscriptions
  - Reference: Sheriff Central Events.tsx
  - Implementation Notes:
    - Maintained existing event data structure for compatibility
    - Added date parsing functions to properly format event dates
    - Created responsive design that works on mobile and desktop
    - Implemented consistent yellow/black color scheme for buttons and date displays
    - Added Calendar icon from Lucide for date indicators
    - Included proper fallback display for when no events are available
    - Created CTAs for subscribing to updates and volunteering

### Phase 2.6: Donate/Contribute Page
- [x] Update Donate page to match Contribute design
  - Location: `/app/donate/page.tsx`
  - Implementation: Implemented new contribution page design with existing Donorbox integration
  - Key features:
    - Added hero section with campaign yellow background
    - Styled Donorbox iframe for consistent appearance
    - Added "Other Ways to Help" section with volunteer options
    - Maintained necessary campaign finance compliance information
  - Reference: Sheriff Central Contribute.tsx
  - Implementation Notes:
    - Preserved existing Donorbox payment processor integration
    - Added clean container for the donation iframe
    - Used campaign-card component for volunteer opportunities
    - Maintained campaign finance disclaimers and mailing information
    - Added consistent styling with campaign-button and section-title classes

### Phase 2.7: Header Animation Enhancement
- [x] Add scrolling animation effects to Header components
  - Location: `components/Header.tsx`, `components/layout/Header.tsx`
  - Implementation: Added scroll detection and responsive layout changes based on scroll position
  - Key features:
    - Dynamic resizing of header elements on scroll
    - Shadow effect when scrolled for visual depth
    - Smooth transitions between states with CSS duration controls
    - Consistent implementation across both header components
    - Improved mobile responsiveness with proper aria-labels
  - Reference: Sheriff Central Header.tsx scroll animation implementation
  - Implementation Notes:
    - Used useState and useEffect hooks to track scroll position
    - Applied conditional class names based on scroll state
    - Added transition-all and duration-300 classes for smooth animations
    - Reduced logo and text size when scrolled for more compact header
    - Ensured consistent styling between both header implementations

## Phase 3: Layout and Routing

### Phase 3.1: Root Layout Update
- [x] Update Root Layout to incorporate new design system
  - Location: `/app/layout.tsx`
  - Implementation: Updated layout structure while preserving metadata and enhancing the overall structure
  - Key features:
    - Added main tag to properly wrap content
    - Applied flex-column layout for sticky footer
    - Improved font configuration with variable fonts
    - Maintained SEO metadata and analytics integration
    - Preserved existing components (Header, Footer, ContributeBanner)
  - Reference: Sheriff Central App.tsx structure
  - Implementation Notes:
    - Updated the Inter font configuration to use variable fonts
    - Added classNames for better responsiveness and layout structure
    - Wrapped main content in a semantic main tag with flex-grow
    - Maintained all existing SEO metadata and Vercel analytics

### Phase 3.2: CSS Global Styles (Partial)
- [x] Update global CSS with Sheriff Central styles
  - Location: `/app/globals.css`
  - Implementation: Completed typography system and added comprehensive utility classes
  - Key features:
    - Implemented complete typography scale with responsive sizing
    - Added campaign-specific utility classes for consistent styling
    - Enhanced base element styling for improved visual hierarchy
    - Added form element styling for consistent user inputs
  - Reference: Sheriff Central index.css
  - Implementation Notes:
    - Implemented responsive typography scale using Tailwind's responsive prefixes
    - Added utility classes for campaign cards, containers, grids, and links
    - Created consistent styling for form inputs with yellow focus states
    - Added gradient background utility for hero sections
    - Maintained existing color system while enhancing component styling

## Phase 4: API Integration and Form Handling

### Phase 4.1: Mailing List Integration
- [x] Update mailing list forms with new styling
  - Location: `/components/ui/email-signup.tsx`
  - Implementation: Preserved backend logic while updating UI with Sheriff Central styling
  - Key features:
    - Applied consistent campaign-form-input styling for all form inputs
    - Added validation feedback with text-red-500 styling
    - Enhanced focus states with yellow ring focus effect
    - Improved mobile responsiveness with w-full md:w-3/4 pattern
  - Reference: Sheriff Central form styles
  - Implementation Notes:
    - Maintained existing SendGrid API integration intact
    - Preserved form validation logic with zod validation
    - Added consistent yellow (#fcd34b) accents for interactive elements
    - Improved form spacing and typography for better readability

### Phase 4.2: Volunteer Form Update
- [x] Update volunteer forms with new styling
  - Location: `/components/ui/volunteer-signup.tsx`
  - Implementation: Preserved backend logic while updating UI with consistent Sheriff Central styling
  - Key features:
    - Consistent form styling with campaign-form-input class
    - Improved mobile experience with responsive widths
    - Clear call-to-action with campaign-button styling
    - Interactive checkbox styling with hover effects
    - Improved form organization and section headings
  - Reference: Sheriff Central form patterns
  - Implementation Notes:
    - Maintained existing volunteer registration fields and categorization
    - Updated UI with yellow (#fcd34b) accents for branding consistency
    - Enhanced form layout with better spacing and typography
    - Improved validation message styling with text-red-500
    - Preserved success/error notification system with updated styling
    - Added textarea styling for the "Anything else" field

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

### Phase 2.3: Home Page Components
- [x] Implement new Hero component
  - Location: `/components/hero-slide.tsx`
  - Implementation: Replaced current hero with new Sheriff Central design
  - Key features:
    - Two-column layout with yellow gradient background
    - Sheriff portrait with stylized border and rotated black shadow effect
    - Campaign buttons (Learn More and Support Our Campaign)
    - RE-ELECT stars branding
    - Proper column ordering for mobile (image first, then text)
  - Reference: Sheriff Central Home.tsx hero section
  - Implementation Notes:
    - Preserved the event card functionality from the original hero section
    - Used the SheriffStar icon component for branding
    - Maintained the existing sheriff portrait image
    - Added responsive styling for mobile and desktop views
    - Used the yellow/black color scheme from the Tailwind configuration
    - Added the rotation and shadow effect for the sheriff portrait to match Sheriff Central design

- [x] Implement Priorities section
  - Location: `/components/main-accordion.tsx` → `/components/sections/PrioritiesSection.tsx`
  - Implementation: Replaced accordion with priorities grid
  - Key features:
    - Three-column grid on desktop
    - Card-based design with yellow accent borders
    - FontAwesome icons for each priority
    - Interactive elements preserved with button links
  - Reference: Sheriff Central Home.tsx priorities section
  - Implementation Notes:
    - Replaced original content with Sheriff Central's priorities: Public Safety, Fiscal Responsibility, and Community Partnerships
    - Used FontAwesome icons relevant to each priority
    - Implemented proper section title with uppercase, bold styling
    - Added "Learn More" buttons linking to the about page
    - Used consistent yellow/black color scheme for buttons and accents

- [x] Implement Events Preview section
  - Location: New component `/components/sections/EventsPreviewSection.tsx`
  - Implementation: Created component for homepage events preview that uses actual event data
  - Key features:
    - Date display with yellow background featuring month, day, and year
    - "SAVE THE DATE" flag for upcoming events
    - Event details with location and time
    - Call-to-action button for event details
    - Responsive design that works on mobile and desktop
  - Reference: Sheriff Central Home.tsx events section
  - Implementation Notes:
    - Utilized existing event data structure from event components
    - Implemented dynamic filtering to show only non-expired events
    - Added date parsing to properly format event dates in the left yellow column
    - Incorporated Calendar icon from Lucide for consistent styling
    - Added fallback display for when no events are available
    - Used consistent yellow/black color scheme for buttons and "SAVE THE DATE" tag
    - Added proper shadow and spacing for improved visual hierarchy

### Phase 2.4: About Page Components
- [x] Update About page layout and styling
  - Location: `/app/about/page.tsx`
  - Implementation: Migrated to new design while preserving content
  - Key features:
    - Hero section with yellow background and centered title
    - Biography section with stylized image
    - Career timeline with card-based layout
    - Accomplishments and vision sections
    - Personal note with signature
  - Reference: Sheriff Central About.tsx
  - Implementation Notes:
    - Preserved all existing bio text content and career timeline
    - Implemented the black/yellow color scheme consistently
    - Used the rotated shadow effect for images matching Sheriff Central design
    - Added mobile-responsive grid layout for timeline and accomplishments
    - Organized content into clear, distinct sections for better user experience
    - Maintained the "YOU!" styling with the skewed yellow background accent

### Phase 3.1: Root Layout Update
- [x] Update Root Layout to incorporate new design system
  - Location: `/app/layout.tsx`
  - Implementation: Updated layout structure while preserving metadata and enhancing the overall structure
  - Key features:
    - Added main tag to properly wrap content
    - Applied flex-column layout for sticky footer
    - Improved font configuration with variable fonts
    - Maintained SEO metadata and analytics integration
    - Preserved existing components (Header, Footer, ContributeBanner)
  - Reference: Sheriff Central App.tsx structure
  - Implementation Notes:
    - Updated the Inter font configuration to use variable fonts
    - Added classNames for better responsiveness and layout structure
    - Wrapped main content in a semantic main tag with flex-grow
    - Maintained all existing SEO metadata and Vercel analytics

### Phase 3.2: CSS Global Styles
- [x] Update global CSS with Sheriff Central styles
  - Location: `/app/globals.css`
  - Implementation: Completed typography system and added comprehensive utility classes
  - Key features:
    - Implemented complete typography scale with responsive sizing
    - Added campaign-specific utility classes for consistent styling
    - Enhanced base element styling for improved visual hierarchy
    - Added form element styling for consistent user inputs
  - Reference: Sheriff Central index.css
  - Implementation Notes:
    - Implemented responsive typography scale using Tailwind's responsive prefixes
    - Added utility classes for campaign cards, containers, grids, and links
    - Created consistent styling for form inputs with yellow focus states
    - Added gradient background utility for hero sections
    - Maintained existing color system while enhancing component styling

### Phase 4.1: Mailing List Integration
- [x] Update mailing list forms with new styling
  - Location: `/components/ui/email-signup.tsx`
  - Implementation: Preserved backend logic while updating UI with Sheriff Central styling
  - Key features:
    - Applied consistent campaign-form-input styling for all form inputs
    - Added validation feedback with text-red-500 styling
    - Enhanced focus states with yellow ring focus effect
    - Improved mobile responsiveness with w-full md:w-3/4 pattern
  - Reference: Sheriff Central form styles
  - Implementation Notes:
    - Maintained existing SendGrid API integration intact
    - Preserved form validation logic with zod validation
    - Added consistent yellow (#fcd34b) accents for interactive elements
    - Improved form spacing and typography for better readability

### Phase 4.2: Volunteer Form Update
- [x] Update volunteer forms with new styling
  - Location: `/components/ui/volunteer-signup.tsx`
  - Implementation: Preserved backend logic while updating UI with consistent Sheriff Central styling
  - Key features:
    - Consistent form styling with campaign-form-input class
    - Improved mobile experience with responsive widths
    - Clear call-to-action with campaign-button styling
    - Interactive checkbox styling with hover effects
    - Improved form organization and section headings
  - Reference: Sheriff Central form patterns
  - Implementation Notes:
    - Maintained existing volunteer registration fields and categorization
    - Updated UI with yellow (#fcd34b) accents for branding consistency
    - Enhanced form layout with better spacing and typography
    - Improved validation message styling with text-red-500
    - Preserved success/error notification system with updated styling
    - Added textarea styling for the "Anything else" field

### Additional Enhancements
- [x] Create dedicated volunteer page
  - Location: `/app/volunteer/page.tsx`
  - Implementation: Created a dedicated volunteer signup page
  - Key features:
    - Consistent styling with yellow border accent
    - Clean form layout with yellow focus states
    - Reused volunteer form component
  - Reference: Sheriff Central form styling
  - Implementation Notes:
    - Used the existing VolunteerForm component
    - Added proper section title and introduction text
    - Used card-style container with yellow border accent
    - Created clear visual hierarchy for better user experience

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
