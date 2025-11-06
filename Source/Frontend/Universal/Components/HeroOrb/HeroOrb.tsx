"use client"

import React, { useMemo, memo } from 'react'
import { cn } from '@Universal/Utils/cn'

/**
 * Props interface for the HeroOrb component.
 */
interface HeroOrbProps {
  /** Size of the orb (e.g., "192px", "100px"). Default is "192px". */
  size?: string
  /** Additional CSS classes to apply to the orb container. */
  className?: string
  /** Custom color palette for the orb's gradient layers. */
  colors?: {
    /** Background color. */
    bg?: string
    /** Primary gradient color (pink). */
    c1?: string
    /** Secondary gradient color (blue). */
    c2?: string
    /** Tertiary gradient color (purple/lavender). */
    c3?: string
  }
  /** Duration of the rotation animation in seconds. Default is 20. */
  animationDuration?: number
}

/**
 * HeroOrb component that renders an animated gradient orb with multiple conic gradients.
 * Features responsive sizing calculations for blur, contrast, and visual effects.
 * Uses CSS custom properties and conic gradients to create a dynamic, rotating orb effect.
 * PERFORMANCE: Memoized to prevent unnecessary re-renders of expensive gradient calculations.
 */
const HeroOrb: React.FC<HeroOrbProps> = ({
  size = "192px",
  className,
  colors,
  animationDuration = 20,
}) => {
  // Default color palette using OKLCH color space for perceptually uniform colors.
  const defaultOrbColors = useMemo(() => ({
    bg: "oklch(95% 0.02 264.695)", // Light neutral background.
    c1: "oklch(75% 0.15 350)", // Pastel pink for accent.
    c2: "oklch(80% 0.12 200)", // Pastel blue for secondary accent.
    c3: "oklch(78% 0.14 280)", // Pastel purple/lavender for tertiary accent.
  }), [])

  // PERFORMANCE: Memoize color merging to avoid recalculation on every render.
  const finalOrbColors = useMemo(() => ({ ...defaultOrbColors, ...colors }), [defaultOrbColors, colors])

  // Extract numeric value from size string for responsive calculations.
  const orbSizeInPixels = parseInt(size.replace("px", ""), 10)

  /**
   * Calculate blur amount based on orb size.
   * Smaller orbs get less blur to maintain detail, larger orbs get more blur for smoothness.
   */
  const blurAmountInPixels =
    orbSizeInPixels < 50
      ? Math.max(orbSizeInPixels * 0.008, 1) // Minimal blur for small orbs.
      : Math.max(orbSizeInPixels * 0.015, 4) // Standard blur for larger orbs.

  /**
   * Calculate contrast amount based on orb size.
   * Maintains visual clarity across different sizes.
   */
  const baseContrastAmount =
    orbSizeInPixels < 50
      ? Math.max(orbSizeInPixels * 0.004, 1.2) // Subtle contrast for small orbs.
      : Math.max(orbSizeInPixels * 0.008, 1.5) // Standard contrast for larger orbs.

  /**
   * Calculate dot size for the textured overlay pattern.
   * Scales proportionally with orb size to maintain visual consistency.
   */
  const dotPatternSizeInPixels =
    orbSizeInPixels < 50
      ? Math.max(orbSizeInPixels * 0.004, 0.05) // Tiny dots for small orbs.
      : Math.max(orbSizeInPixels * 0.008, 0.1) // Standard dots for larger orbs.

  /**
   * Calculate inner shadow spread for depth effect.
   * Provides subtle depth perception scaling with size.
   */
  const shadowSpreadInPixels =
    orbSizeInPixels < 50
      ? Math.max(orbSizeInPixels * 0.004, 0.5) // Minimal shadow for small orbs.
      : Math.max(orbSizeInPixels * 0.008, 2) // Pronounced shadow for larger orbs.

  /**
   * Determine mask radius to control the dark center area.
   * Smaller orbs have no mask to prevent excessive darkness.
   */
  const centerMaskRadiusPercentage =
    orbSizeInPixels < 30
      ? "0%" // No mask for tiny orbs.
      : orbSizeInPixels < 50
        ? "5%" // Small mask for small orbs.
        : orbSizeInPixels < 100
          ? "15%" // Medium mask for medium orbs.
          : "25%" // Full mask for large orbs.

  /**
   * Calculate final contrast value with additional adjustments for very small sizes.
   * Ensures tiny orbs remain visible and aesthetically pleasing.
   */
  const finalContrastMultiplier =
    orbSizeInPixels < 30
      ? 1.1 // Very subtle contrast for tiny orbs to prevent harshness.
      : orbSizeInPixels < 50
        ? Math.max(baseContrastAmount * 1.2, 1.3) // Boosted contrast for small orbs.
        : baseContrastAmount // Use base contrast for standard sizes.

  return (
    <div
      className={cn("hero-orb", className)}
      style={
        {
          width: size,
          height: size,
          // CSS custom properties for dynamic theming and animation.
          "--bg": finalOrbColors.bg,
          "--c1": finalOrbColors.c1,
          "--c2": finalOrbColors.c2,
          "--c3": finalOrbColors.c3,
          "--animation-duration": `${animationDuration}s`,
          "--blur-amount": `${blurAmountInPixels}px`,
          "--contrast-amount": finalContrastMultiplier,
          "--dot-size": `${dotPatternSizeInPixels}px`,
          "--shadow-spread": `${shadowSpreadInPixels}px`,
          "--mask-radius": centerMaskRadiusPercentage,
        } as React.CSSProperties
      }
    >
      <style>{`
        /* Register CSS custom property for angle animation. */
        @property --angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }

        /* Base orb container with circular shape and stacking context. */
        .hero-orb {
          display: grid;
          grid-template-areas: "stack";
          overflow: hidden;
          border-radius: 50%;
          position: relative;
          transform: scale(1.1); /* Slightly enlarge to account for blur overflow. */
        }

        /* Pseudo-elements for gradient and texture layers, stacked on same grid area. */
        .hero-orb::before,
        .hero-orb::after {
          content: "";
          display: block;
          grid-area: stack;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transform: translateZ(0); /* Force GPU acceleration for smoother animations. */
        }

        /* Animated gradient layer with multiple conic gradients creating the orb effect. */
        .hero-orb::before {
          background:
            /* Layer 1: Purple gradient from bottom-left. */
            conic-gradient(
              from calc(var(--angle) * 2) at 25% 70%,
              var(--c3),
              transparent 20% 80%,
              var(--c3)
            ),
            /* Layer 2: Blue gradient from center-bottom. */
            conic-gradient(
              from calc(var(--angle) * 2) at 45% 75%,
              var(--c2),
              transparent 30% 60%,
              var(--c2)
            ),
            /* Layer 3: Pink gradient from top-right (counter-rotating). */
            conic-gradient(
              from calc(var(--angle) * -3) at 80% 20%,
              var(--c1),
              transparent 40% 60%,
              var(--c1)
            ),
            /* Layer 4: Blue gradient from top-left. */
            conic-gradient(
              from calc(var(--angle) * 2) at 15% 5%,
              var(--c2),
              transparent 10% 90%,
              var(--c2)
            ),
            /* Layer 5: Pink gradient from bottom-left. */
            conic-gradient(
              from calc(var(--angle) * 1) at 20% 80%,
              var(--c1),
              transparent 10% 90%,
              var(--c1)
            ),
            /* Layer 6: Purple gradient from top-right (counter-rotating). */
            conic-gradient(
              from calc(var(--angle) * -2) at 85% 10%,
              var(--c3),
              transparent 20% 80%,
              var(--c3)
            );
          /* Inner shadow for depth. */
          box-shadow: inset var(--bg) 0 0 var(--shadow-spread)
            calc(var(--shadow-spread) * 0.2);
          /* Blur and contrast filters create the smooth, glowing effect. */
          filter: blur(var(--blur-amount)) contrast(var(--contrast-amount));
          /* Infinite rotation animation. */
          animation: rotate var(--animation-duration) linear infinite;
        }

        /* Texture overlay layer with dot pattern and backdrop filter. */
        .hero-orb::after {
          /* Radial dot pattern for texture. */
          background-image: radial-gradient(
            circle at center,
            var(--bg) var(--dot-size),
            transparent var(--dot-size)
          );
          background-size: calc(var(--dot-size) * 2) calc(var(--dot-size) * 2);
          /* Additional blur and contrast on the underlying layers. */
          backdrop-filter: blur(calc(var(--blur-amount) * 2))
            contrast(calc(var(--contrast-amount) * 2));
          /* Overlay blend mode for subtle texture integration. */
          mix-blend-mode: overlay;
        }

        /* Disable mask for tiny orbs to maintain visibility. */
        .hero-orb[style*="--mask-radius: 0%"]::after {
          mask-image: none;
        }

        /* Apply radial mask to create darker center for larger orbs. */
        .hero-orb:not([style*="--mask-radius: 0%"])::after {
          mask-image: radial-gradient(
            black var(--mask-radius),
            transparent 75%
          );
        }

        /* Rotation animation that updates the --angle property. */
        @keyframes rotate {
          to {
            --angle: 360deg;
          }
        }

        /* Respect user's motion preferences by disabling animation. */
        @media (prefers-reduced-motion: reduce) {
          .hero-orb::before {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}

/**
 * PERFORMANCE: Export memoized HeroOrb component.
 * Prevents re-renders when props haven't changed, which is critical for expensive gradient calculations.
 */
export default memo(HeroOrb)
