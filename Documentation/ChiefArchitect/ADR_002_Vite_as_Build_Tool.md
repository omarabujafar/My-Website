# ADR 002: Vite as Build Tool

**Status:** Accepted
**Date:** 2025-11-01
**Decision Makers:** Chief Architect
**Tags:** #frontend #tooling #build #performance

---

## Context

The omarabujafar.com frontend requires a build tool for:
- Fast development server with hot module replacement (HMR)
- Optimized production builds
- TypeScript compilation
- CSS processing (modules, PostCSS)
- Asset bundling and optimization
- Modern developer experience

Traditional tools like Webpack and Create React App have slow dev servers and build times. Modern alternatives prioritize speed and developer experience.

---

## Decision

**We will use Vite as the build tool and development server.**

---

## Options Considered

### Option 1: Vite
**Pros:**
- Near-instant dev server startup (native ES modules)
- Lightning-fast HMR (updates in <50ms)
- esbuild-powered builds (10-100x faster than Webpack)
- Out-of-box TypeScript, CSS Modules, asset handling
- Simple configuration
- Modern, actively developed
- Excellent plugin ecosystem

**Cons:**
- Smaller ecosystem than Webpack (but sufficient)
- No built-in SSR/SSG (not needed initially)
- Relatively newer (less mature than Webpack)

**Estimated Impact:**
- Dev Server Startup: <1s
- HMR Speed: <50ms
- Production Build Time: ~10-30s (for portfolio size)
- Learning Curve: Low

---

### Option 2: Create React App (CRA)
**Pros:**
- Officially supported by React team
- Zero-config setup
- Widely documented
- Known by most React developers

**Cons:**
- Slow dev server (Webpack-based)
- Slow builds (5-10x slower than Vite)
- Limited customization without ejecting
- Ejecting is one-way, complex
- Maintenance concerns (less active development)
- Outdated tooling (Webpack 5, older Babel)

**Estimated Impact:**
- Dev Server Startup: 10-30s
- HMR Speed: 1-3s
- Production Build Time: 60-120s
- Learning Curve: Low

---

### Option 3: Next.js
**Pros:**
- SSR/SSG built-in (excellent SEO)
- Image optimization
- API routes (backend integration)
- File-based routing
- Excellent documentation
- Vercel deployment optimization

**Cons:**
- Over-engineered for static portfolio
- Framework lock-in (opinionated structure)
- Larger learning surface
- Slower dev server than Vite
- SSR complexity not needed initially
- Vercel-centric (though works elsewhere)

**Estimated Impact:**
- Dev Server Startup: 5-15s
- HMR Speed: 500ms-2s
- Production Build Time: 30-60s
- Learning Curve: Medium-High

---

### Option 4: Manual Webpack Configuration
**Pros:**
- Maximum control
- Highly customizable
- Mature, proven at scale
- Extensive plugin ecosystem

**Cons:**
- Complex configuration (webpack.config.js)
- Slow builds (Babel + Webpack overhead)
- Slow dev server
- High maintenance burden
- Steep learning curve
- Time-consuming setup

**Estimated Impact:**
- Dev Server Startup: 15-45s
- HMR Speed: 1-5s
- Production Build Time: 60-180s
- Learning Curve: High

---

### Option 5: Parcel
**Pros:**
- Zero-config
- Fast builds
- Simple to use
- Multi-core compilation

**Cons:**
- Less ecosystem maturity than Vite
- Fewer plugin options
- Less control than Vite
- Smaller community

**Estimated Impact:**
- Dev Server Startup: 3-8s
- HMR Speed: 500ms-1s
- Production Build Time: 20-40s
- Learning Curve: Low

---

## Decision Rationale

**Vite chosen for the following reasons:**

1. **Development Speed**: Near-instant dev server startup and HMR dramatically improve developer productivity. Waiting 10-30s for CRA to start vs <1s for Vite compounds over hundreds of restarts.

2. **Build Performance**: esbuild-powered production builds are 10-100x faster than Webpack. For a portfolio site, this means 10-30s builds vs 60-120s, enabling rapid iteration.

3. **Modern Defaults**: Out-of-box support for TypeScript, CSS Modules, PostCSS, and modern JavaScript. No configuration required for common use cases.

4. **Future-Proof**: Vite is built on web standards (native ES modules) and represents the future of frontend tooling. Learning Vite is a better time investment than legacy Webpack.

5. **Simplicity**: Simple configuration file (vite.config.ts) with sensible defaults. Customization is straightforward when needed.

6. **No SSR Lock-In**: Unlike Next.js, Vite doesn't impose SSR/SSG. If SSR becomes necessary, Vite supports it via plugins (vite-plugin-ssr) without full framework migration.

**Trade-offs Accepted:**
- Smaller ecosystem than Webpack (but growing rapidly and sufficient for this project)
- No built-in SSR/SSG (acceptable; can add later if needed)
- Relatively newer tool (but stable and actively maintained by Evan You, creator of Vue)

**Rejected Alternatives:**
- **CRA**: Legacy tool with slow performance. Vite is the modern successor.
- **Next.js**: Over-engineered for a static portfolio. SSR not required initially.
- **Webpack**: Manual configuration not worth the time investment when Vite provides better DX.
- **Parcel**: Vite offers better balance of simplicity and power.

---

## Consequences

### Positive
- Instant dev server startup (<1s vs 10-30s for CRA)
- Near-instant HMR (<50ms vs 1-3s for CRA)
- Fast production builds (10-30s vs 60-120s for CRA)
- Modern tooling aligned with web standards evolution
- Simple configuration with sensible defaults
- Excellent plugin ecosystem for future needs

### Negative
- Smaller community than Webpack/CRA (though growing rapidly)
- Some Webpack-specific plugins not compatible (rare edge case)
- Potential issues with legacy libraries expecting Webpack (unlikely for modern React ecosystem)

### Neutral
- Requires learning Vite-specific configuration (minimal, much simpler than Webpack)
- Plugin ecosystem still maturing (but already robust for common use cases)

---

## Implementation Notes

- Install Vite with React template: `npm create vite@latest`
- Configure `vite.config.ts` for:
  - Path aliases (`@/` for `src/`)
  - Port configuration
  - Proxy for backend API (if needed)
  - Build optimizations (chunk splitting, minification)
- Enable TypeScript mode
- Configure CSS Modules support (built-in)
- Set up environment variable handling (`.env` files)

**Sample vite.config.ts:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
```

---

## Performance Targets

With Vite, we expect:
- **Dev Server Startup**: <1s (vs 10-30s for CRA)
- **HMR Speed**: <50ms (vs 1-3s for CRA)
- **Production Build**: 10-30s for portfolio size
- **Bundle Size**: <200KB initial load (gzipped)

---

## Review Date

**Next Review:** 2026-05-01 (6 months)

**Review Triggers:**
- Build times exceed 60s
- Dev server performance degrades
- Major Vite version with breaking changes
- SSR requirement emerges (evaluate Vite SSR plugins or Next.js migration)

---

## Related Decisions

- ADR 001: React as Frontend Framework
- ADR 003: TypeScript for Type Safety
- ADR 004: CSS Modules for Styling
- ADR 010: Netlify for Hosting (deployment integration)

---

**Status History:**
- 2025-11-01: Accepted
