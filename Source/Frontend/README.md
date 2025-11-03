# Omar Abu Jafar - Portfolio Frontend

Personal portfolio website showcasing projects, blog posts, and professional information.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing

## Project Structure

```
Frontend/
├── Pages/             # All page components
│   ├── Home/          # Home page
│   ├── About/         # About page
│   ├── Projects/      # Projects page
│   ├── Blog/          # Blog page
│   └── Contact/       # Contact page
├── Universal/         # Shared code across pages
│   ├── Components/    # Reusable components (Layout, Header, Footer, Navigation)
│   ├── Hooks/         # Custom React hooks
│   ├── Utils/         # Utility functions
│   ├── Types/         # TypeScript type definitions
│   └── Constants/     # Application constants
├── Assets/            # Static assets
│   ├── Images/        # Image files
│   ├── Fonts/         # Font files
│   └── Icons/         # Icon files
├── App.tsx            # Main app component with routing
├── Main.tsx           # Application entry point
└── Index.css          # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development

The application uses:
- **TypeScript** for type safety
- **CSS Modules** or plain CSS for styling (can be upgraded to Tailwind/Styled Components)
- **React Router** for navigation between pages
- **Path aliases** for cleaner imports (@Universal, @Assets, @Home, etc.)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Path Aliases

The project uses path aliases for cleaner imports:

```typescript
import Layout from '@Universal/Components/Layout/Layout'
import { SITE_CONFIG } from '@Universal/Constants'
import HomePage from '@Pages/Home/HomePage'
```

## Pages

- **Home** - Landing page with introduction
- **About** - Detailed bio and background
- **Projects** - Portfolio of work with case studies
- **Blog** - Technical writing and thoughts
- **Contact** - Contact form and social links
