# Sheriff Campaign Website Migration Agent Prompt

## Project Context
You are working on migrating the campaign website for Sheriff Weisburn from its current Next.js implementation to a new, refreshed design based on the "Sheriff Central" prototype. This is a political campaign website for a county sheriff reelection campaign that needs to maintain its current functionality while adopting a more modern and engaging user interface.

### Why This Migration Matters
The campaign website needs a visual refresh to better engage voters and supporters. The Sheriff Central design provides:
- A more impactful and cohesive visual identity with the yellow/black color scheme
- Improved mobile responsiveness for voters accessing on different devices
- Better conversion optimization for donations and volunteer sign-ups
- A more intuitive navigation experience for visitors

### Critical Requirements
- The website must remain fully functional throughout the migration process
- SEO positioning and metadata must be preserved
- API integrations for mailings lists, volunteer sign-ups, and donations must continue to work
- Campaign compliance information and disclaimers must be maintained
- The refresh should be completed in time for upcoming campaign events

## Your Task
As an AI development agent, you are helping implement specific portions of this migration following a detailed roadmap. Your work is part of a larger team effort where different agents may be working on different components.

1. Review the ROADMAP.md file to identify the next uncompleted task.
2. Implement the task according to the specifications provided.
3. Update the ROADMAP.md file to mark your task as completed.

## Instructions

### Step 1: Review the roadmap
- Examine the ROADMAP.md file to find tasks marked with `[ ]` (uncompleted).
- Identify the next logical task to implement based on dependencies.
- Tasks are organized in phases - generally work through them sequentially.

### Step 2: Understand the task
- Note the implementation details, key features, and reference components.
- Review the code snippets and implementation notes provided.
- If needed, examine the referenced files from both the current app and Sheriff Central.

### Step 3: Implement the changes
- Follow the implementation notes precisely.
- Maintain existing functionality while updating the UI.
- Remember to:
  - Keep Next.js App Router conventions (`use client` directives where needed)
  - Adapt React Router patterns to Next.js navigation
  - Preserve metadata and SEO elements
  - Maintain API integrations
  - Ensure campaign message consistency

### Step 4: Update the roadmap
- After completing your task, update ROADMAP.md:
  - Change `[ ]` to `[x]` for your completed task
  - Add any implementation notes or challenges encountered
  - Document any deviations from the original plan (if necessary)
  - Format your update following the example in "Completed Items" section

## Example Roadmap Update
```markdown
### Phase 2.1: Header/Navigation Component
- [x] Replace MainNav with new Header component
  - Location: `/components/Header.tsx`
  - Implementation: Implemented Sheriff Central Header with Next.js routing
  - Key features:
    - Added mobile-responsive hamburger menu
    - Used yellow background (#fcd34b) with black text
    - Implemented active link highlighting based on current path
    - Added "Re-Elect" stars styling as specified
  - Reference: Adapted from Sheriff Central Header.tsx component
  - Additional Notes: Used Next.js Link components and usePathname for navigation
```

## Technical Context
- Current App: Next.js 13.4 with App Router
- Target Design: Sheriff Central (React + Vite)
- Primary Color: Yellow (#fcd34b)
- Secondary Colors: Black, white, gray-100 to gray-800
- Key Dependencies: Tailwind CSS, React, Lucide icons
- Deployment: Vercel

## Design Philosophy
The Sheriff Central design embodies strength, authority, and community service through:
- Bold typography with strong headings and clean body text
- A high-contrast color scheme using yellow and black (county colors)
- Clear call-to-action elements that direct supporters to contribute and volunteer
- Event-focused content organization to encourage community participation
- An approachable yet professional tone that balances authority with community connection