# CLAUDE.md - Project Briefing Document

**Project:** Omar Abu Jafar Personal Portfolio Website (omarabujafar.com)
**Status:** Initial Setup Complete - Ready for Development
**Last Updated:** 2025-11-01

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Philosophy & Principles](#philosophy--principles)
3. [Project Structure](#project-structure)
4. [Naming Conventions & Style Rules](#naming-conventions--style-rules)
5. [Technology Stack](#technology-stack)
6. [Documentation References](#documentation-references)
7. [Current State & Progress](#current-state--progress)
8. [Development Workflow](#development-workflow)
9. [Quick Start for New Claude Instances](#quick-start-for-new-claude-instances)

---

## Project Overview

### What This Is

A **personal developer portfolio website** for Omar Abu Jafar that serves as:
- A single source of truth for identity, work samples, thinking, and contact information
- A showcase of concrete evidence of work through case-study style project pages
- A platform to share technical thinking through blog posts
- A professional hub for hiring managers, collaborators, and potential clients

### Core Purpose

The website exists to:
1. **Explain** - Who Omar is, what he builds, and why
2. **Demonstrate** - Show concrete evidence of work with detailed case studies
3. **Share** - Publish thinking about software engineering and the industry
4. **Connect** - Provide multiple ways to get in touch (email, socials, contact form, resume)

### Target Audience

1. **Recruiters & Hiring Managers** - Quick evaluation of fit, skim outcomes, check testimonials
2. **Potential Clients** - Technical credibility check through case studies
3. **Fellow Developers** - Philosophy alignment through blog essays
4. **Collaborators** - Direct outreach via contact methods

---

## Philosophy & Principles

### Content Philosophy

**Core Themes** (reflected throughout the site):
- **Problem-solving over tool worship** - Focus on solutions, not just technologies
- **Practical impact** - Emphasize speed, reliability, clarity, scalability
- **Discipline and structure** - Showcase frameworks, conventions, stepwise workflows
- **Communication as engineering** - Diagrams, onboarding, stakeholder clarity
- **Curiosity and continuous improvement** - Ongoing learning and growth

### Development Philosophy

**Converting from Framer to Custom React**
- Originally a Framer website, now being rebuilt as a custom React application
- Focus on clean, maintainable code with strong TypeScript typing
- Component-based architecture with clear separation of concerns
- Modern tooling (Vite) for fast development

**Engineering Approach**
- Structure first, then content
- Reusable components in Universal folder
- Page-specific code stays in page folders
- Type safety everywhere (TypeScript)
- Clean imports using path aliases

---

## Project Structure

### Root Directory Layout

```
My-Website/
├── Documentation/          # Product & architecture docs (DO NOT TOUCH CODE FILES)
│   ├── ProductManager/     # Product definition documents
│   └── ChiefArchitect/     # Architecture decision records (ADRs)
│
├── Source/                 # ALL CODE LIVES HERE
│   ├── Frontend/           # React application
│   └── Backend/            # Backend API (placeholder for now)
│
├── Temp/                   # Temporary files, notes, this briefing doc
├── LICENSE.MD
└── README.md
```

### Frontend Structure (Source/Frontend/)

```
Frontend/
├── Pages/                         # ALL page components (Pascal case)
│   ├── Home/                      # Home page
│   │   ├── HomePage.tsx
│   │   └── HomePage.css
│   ├── About/                     # About page
│   ├── Projects/                  # Projects/portfolio page
│   ├── Blog/                      # Blog listing & posts
│   └── Contact/                   # Contact form & info
│
├── Universal/                     # Shared code used across multiple pages
│   ├── Components/                # Reusable components
│   │   ├── Layout/                # Main layout wrapper
│   │   ├── Header/                # Site header
│   │   ├── Footer/                # Site footer
│   │   └── Navigation/            # Navigation menu
│   ├── Hooks/                     # Custom React hooks
│   ├── Utils/                     # Utility functions
│   ├── Types/                     # TypeScript type definitions
│   └── Constants/                 # Application constants (routes, config, etc.)
│
├── Assets/                        # Static assets
│   ├── Images/
│   ├── Fonts/
│   └── Icons/
│
├── App.tsx                        # Main app component with routing
├── Main.tsx                       # Application entry point
├── Index.css                      # Global styles
├── index.html                     # HTML template
├── package.json                   # Dependencies
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript configuration
├── .eslintrc.cjs                  # ESLint configuration
├── .gitignore                     # Git ignore rules
└── README.md                      # Frontend documentation
```

### Path Aliases (Configured in vite.config.ts & tsconfig.json)

```typescript
@Pages/*      → ./Pages/*      // Page components
@Universal/*  → ./Universal/*  // Shared code
@Assets/*     → ./Assets/*     // Static assets
@/*           → ./*             // Root-level imports
```

**Example Usage:**
```typescript
import HomePage from '@Pages/Home/HomePage'
import Layout from '@Universal/Components/Layout/Layout'
import { SITE_CONFIG } from '@Universal/Constants'
import logo from '@Assets/Images/logo.png'
```

---

## Naming Conventions & Style Rules

### Critical Rules (MUST FOLLOW)

1. **Pascal Case for ALL Folders**
   - ✅ `Pages/`, `Home/`, `Universal/`, `Components/`
   - ❌ `pages/`, `home/`, `universal/`, `components/`

2. **Pascal Case for Components**
   - ✅ `HomePage.tsx`, `Layout.tsx`, `Footer.tsx`
   - ❌ `homePage.tsx`, `layout.tsx`, `footer.tsx`

3. **Code Organization**
   - Page-specific code → `Pages/[PageName]/`
   - Shared components → `Universal/Components/`
   - Shared utilities → `Universal/Utils/`
   - Shared types → `Universal/Types/`
   - Shared constants → `Universal/Constants/`

4. **Component Structure**
   - Each component gets its own folder with `.tsx` and `.css` files
   - Example: `Header/` contains `Header.tsx` and `Header.css`

5. **File Extensions**
   - React components: `.tsx` (TypeScript + JSX)
   - Utilities/types: `.ts` (TypeScript)
   - Styles: `.css` (plain CSS, can be upgraded to CSS modules or Tailwind later)

### Import Conventions

**Always use path aliases:**
```typescript
// ✅ Good
import HomePage from '@Pages/Home/HomePage'
import { formatDate } from '@Universal/Utils'

// ❌ Bad
import HomePage from '../../Pages/Home/HomePage'
import { formatDate } from '../../Universal/Utils'
```

### TypeScript Conventions

- Use `React.FC` for functional components
- Define interfaces for props
- Use type imports from `@Universal/Types`
- Strict mode enabled - no `any` types

---

## Technology Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety and better DX
- **Vite** - Build tool and dev server (fast, modern)
- **React Router DOM v6** - Client-side routing
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Component library for UI elements

### Build & Development Tools

- **ESLint** - Code linting
- **TypeScript Compiler** - Type checking
- **Vite Dev Server** - Hot module replacement for fast development
- **PostCSS** - CSS processing with @tailwindcss/postcss plugin

### Design System & Typography

**Font Stack** (located in `Source/Frontend/Assets/Fonts/`):

The typography system uses a three-tier font hierarchy that balances clarity, professionalism, and personality:

1. **Bricolage Grotesque** (Header Font - 700–800 weight)
   - Primary use: Hero sections, main headings (h1, h2)
   - Character: Bold, modern geometric design
   - Purpose: Commands attention, conveys creativity and precision
   - Alignment: Software engineering aesthetics with personality

2. **Figtree** (Subheader & Link Font - 600 weight)
   - Primary use: Secondary headings, navigation links, buttons, callouts
   - Character: Friendly, slightly rounded geometric feel
   - Purpose: Softens intensity, adds warmth and approachability
   - Use cases: Interactive elements, subheadings, CTAs

3. **Inter** (Body Font - 400 weight)
   - Primary use: Body text, descriptions, case studies, blog content
   - Character: Neutral, screen-optimized, highly legible
   - Purpose: Extended reading across all devices and themes
   - Technical fit: Designed specifically for web interfaces

**Fallback Stack:**
```css
font-family: [Primary Font], "system-ui", "Helvetica Neue", Arial, sans-serif;
```

**Design Philosophy:**
- Clean, modern aesthetic reminiscent of Helvetica's neutrality
- Enhanced adaptability and open-source accessibility
- Consistent letter-spacing and generous line-height
- Professional enough for recruiters, modern enough to showcase front-end expertise
- Fully responsive across light and dark themes

### Backend (Planned, Not Yet Implemented)

- **Node.js** with Express/Fastify
- **TypeScript**
- **PostgreSQL/MongoDB** (TBD)
- **Email service integration** for contact form

---

## Documentation References

### Key Documents to Review

1. **Product Definition**
   - Location: `Documentation/ProductManager/Product-Definition-omarabujafar.com.md`
   - Contains: Product purpose, content structure, target audience, use cases, themes
   - Read this to understand: What the site is about, what content it contains, who it's for

2. **Architecture Decision Records (ADRs)**
   - Location: `Documentation/ChiefArchitect/`
   - Files:
     - `ADR_001_React_as_Frontend_Framework.md` - Why React
     - `ADR_002_Vite_as_Build_Tool.md` - Why Vite
     - `ADR_003_TypeScript_for_Type_Safety.md` - Why TypeScript
     - `System-Architecture-Document.md` - Overall system design
     - `Technology-Justification-Document.md` - Tech stack reasoning

3. **Frontend README**
   - Location: `Source/Frontend/README.md`
   - Contains: Setup instructions, project structure, available scripts

---

## Current State & Progress

### ✅ Completed

1. **Project Structure**
   - Frontend and Backend folders created in `Source/`
   - All page folders (Home, About, Projects, Blog, Contact) created inside `Pages/`
   - Universal folder with Components, Hooks, Utils, Types, Constants subfolders
   - Assets folder with Images, Fonts, Icons subfolders
   - Font files added to `Assets/Fonts/` (Bricolage Grotesque, Figtree, Inter)

2. **React Boilerplate**
   - Vite + React + TypeScript setup complete
   - Routing configured for all 5 pages
   - Path aliases configured in both Vite and TypeScript configs
   - ESLint configuration
   - Basic Layout component with Header, Footer, Navigation
   - Tailwind CSS v4 with PostCSS integration
   - shadcn/ui component library integration

3. **Core Components Created**
   - Layout component (wraps all pages)
   - Header component (logo + navigation)
   - Footer component with:
     - Custom SVG shape mask
     - DarkVeil animated background with configurable parameters
     - Responsive copyright and terms positioning
     - Light/dark mode support with glow effects
     - Dynamic text scaling for different viewport sizes
   - Navigation component (active route highlighting)
   - All 5 page components with basic placeholders
   - Plasma and DarkVeil shader components (from shadcn registry)

4. **Type Definitions**
   - Project, BlogPost, Testimonial, ContactFormData interfaces defined
   - Located in `Universal/Types/index.ts`
   - TypeScript declaration files for shader components

5. **Constants & Utils**
   - Site config (name, email, social links)
   - Route constants
   - Navigation items array
   - Utility functions (formatDate, validateEmail, truncateText, calculateReadingTime)

6. **Design System**
   - Typography hierarchy defined (Bricolage Grotesque, Figtree, Inter)
   - Custom background color for dark mode (#05000f)
   - Footer glow/shadow effects for light and dark modes
   - Responsive breakpoints for footer elements

7. **Documentation**
   - Product definition document created
   - Architecture decision records (ADRs) created
   - Frontend README with setup instructions
   - CLAUDE.md briefing document with typography system details

### 🚧 Not Yet Started

1. **Content Implementation**
   - Actual content for Home page (hero, intro, CTAs)
   - About page narrative bio
   - Projects page with case studies
   - Blog page with posts
   - Contact page with working form

2. **Styling**
   - Custom design system
   - Responsive layouts
   - Typography system
   - Color palette
   - Component-specific styles (currently just placeholders)

3. **Backend**
   - Contact form submission endpoint
   - Blog post management
   - Any API integrations

4. **Advanced Features**
   - Blog post markdown rendering
   - Project filtering/search
   - Contact form validation and submission
   - Analytics
   - SEO optimization

---

## Development Workflow

### When Starting a New Task

1. **Read this document** to understand the project
2. **Review product definition** to understand content goals
3. **Check current file structure** to see what exists
4. **Follow naming conventions** strictly (Pascal case!)
5. **Use path aliases** for all imports
6. **Keep page-specific code in page folders**
7. **Move shared code to Universal/**

### When Creating New Components

1. Create folder in appropriate location:
   - Shared component → `Universal/Components/[ComponentName]/`
   - Page-specific → `Pages/[PageName]/Components/[ComponentName]/`

2. Create both `.tsx` and `.css` files:
   ```
   ComponentName/
   ├── ComponentName.tsx
   └── ComponentName.css
   ```

3. Use TypeScript with proper typing:
   ```typescript
   import React from 'react'
   import './ComponentName.css'

   interface ComponentNameProps {
     // Define props
   }

   const ComponentName: React.FC<ComponentNameProps> = ({ props }) => {
     return (
       <div className="component-name">
         {/* Component content */}
       </div>
     )
   }

   export default ComponentName
   ```

4. Import using path alias:
   ```typescript
   import ComponentName from '@Universal/Components/ComponentName/ComponentName'
   ```

### When Adding New Pages

1. Create folder in `Pages/`: `Pages/[PageName]/`
2. Create `[PageName]Page.tsx` and `[PageName]Page.css`
3. Add route to `App.tsx`
4. Add navigation item to `Universal/Components/Navigation/Navigation.tsx`
5. Add route constant to `Universal/Constants/index.ts`

### Git Workflow

- Work on `main` branch for now (no feature branches yet)
- Commit frequently with clear messages
- Follow commit message format: `<type>: <description>`
  - Example: `feat: Add project card component`
  - Example: `fix: Correct navigation active state`
  - Example: `docs: Update README with setup instructions`

---

## Quick Start for New Claude Instances

### When Your Memory Clears, Do This:

1. **Read this document first** (you're doing it now!)

2. **Understand the context:**
   - This is Omar's personal portfolio website (omarabujafar.com)
   - Converting from Framer to custom React
   - All code lives in `Source/Frontend/` (Pascal case folders)
   - Product definition in `Documentation/ProductManager/`

3. **Key things to remember:**
   - **PASCAL CASE FOR EVERYTHING** (folders, components)
   - Use path aliases (`@Pages/*`, `@Universal/*`, `@Assets/*`)
   - Page code goes in `Pages/[PageName]/`
   - Shared code goes in `Universal/`
   - Never touch `Documentation/` for code files

4. **Check what's been done:**
   - Look at git commits: `git log --oneline -20`
   - Check file structure: `ls -R Source/Frontend/`
   - Read Frontend README: `Source/Frontend/README.md`

5. **Before making changes:**
   - Understand Omar's goals (read Product Definition)
   - Follow the established patterns (check existing components)
   - Maintain consistency with existing code style
   - Use TypeScript strictly (no `any`)

6. **Common commands:**
   ```bash
   cd Source/Frontend
   npm install           # Install dependencies
   npm run dev           # Start dev server
   npm run build         # Build for production
   npm run lint          # Run linter
   ```

7. **Core philosophy reminders:**
   - Problem-solving over tool worship
   - Clean, maintainable, well-structured code
   - Strong typing with TypeScript
   - Reusable components
   - Clear separation of concerns

### Questions to Ask Yourself

Before starting any task:
- [ ] Is this page-specific or shared code?
- [ ] Where should this file live in the structure?
- [ ] Am I using Pascal case for folders/components?
- [ ] Am I using path aliases for imports?
- [ ] Have I checked the product definition to understand the content goals?
- [ ] Does this align with the overall philosophy and principles?

---

## Important Reminders

### DO:
✅ Use Pascal case for all folders and components
✅ Put code in `Source/Frontend/`
✅ Use path aliases for imports
✅ Read product definition before implementing content
✅ Follow established patterns
✅ Use TypeScript strictly
✅ Keep shared code in `Universal/`
✅ Keep page code in `Pages/[PageName]/`

### DON'T:
❌ Create code files in `Documentation/`
❌ Use camelCase or snake_case for folders
❌ Use relative imports (`../../`)
❌ Use `any` type in TypeScript
❌ Mix page-specific code into Universal
❌ Create new folder structures without asking
❌ Ignore the established conventions

---

## Contact & Reference

**Website:** omarabujafar.com
**GitHub:** https://github.com/omarabujafar
**LinkedIn:** https://linkedin.com/in/omar-abu-jafar

**Project Owner:** Omar Abu Jafar
**Project Start Date:** November 2025
**Current Phase:** Initial Setup & Boilerplate Complete
**Next Phase:** Content Implementation & Styling

---

*This document should be read by every new Claude instance at the start of a session to ensure continuity and alignment with project goals, structure, and conventions.*
