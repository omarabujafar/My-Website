import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins for scroll-triggered animations.
gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Props interface for the SplitText component.
 */
interface SplitTextProps {
  /** The text content to split and animate. */
  text: string;
  /** Additional CSS classes to apply to the component. */
  className?: string;
  /** Delay between each character animation in milliseconds. Default is 100ms. */
  delay?: number;
  /** Duration of each character's animation in seconds. Default is 0.6s. */
  duration?: number;
  /** GSAP easing function for the animation. Default is 'power3.out'. */
  ease?: string;
  /** Type of text splitting to apply (currently only 'chars' is supported). */
  splitType?: string;
  /** Initial animation state properties (e.g., opacity, position). */
  from?: Record<string, any>;
  /** Final animation state properties (e.g., opacity, position). */
  to?: Record<string, any>;
  /** Intersection observer threshold for triggering animation (0 to 1). Default is 0.1. */
  threshold?: number;
  /** Root margin offset for scroll trigger. Default is '-100px'. */
  rootMargin?: string;
  /** Text alignment within the container. */
  textAlign?: 'left' | 'center' | 'right';
  /** HTML tag to render for the text element. */
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Callback function executed when all character animations complete. */
  onLetterAnimationComplete?: () => void;
}

/**
 * SplitText component that splits text into individual characters and animates them.
 * Uses GSAP and ScrollTrigger to create staggered character animations on scroll.
 * Waits for fonts to load before animating to prevent layout shifts.
 */
const SplitText = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}: SplitTextProps) => {
  const textElementRef = useRef<HTMLElement>(null);
  const animationCompletedRef = useRef(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Wait for all fonts to load before splitting text to prevent layout shifts and flickering.
  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  // Set up GSAP animations when fonts are loaded and component is ready.
  useGSAP(
    () => {
      if (!textElementRef.current || !text || !fontsLoaded) return;
      const textElement = textElementRef.current as HTMLElement;

      /**
       * Splits text content into individual character spans for animation.
       * Each character is wrapped in a span element with inline-block display.
       * Spaces are converted to non-breaking spaces to preserve layout.
       */
      const splitTextIntoCharacters = (element: HTMLElement) => {
        const textContent = element.textContent || '';
        element.innerHTML = '';

        const characterSpans: HTMLSpanElement[] = [];
        for (let characterIndex = 0; characterIndex < textContent.length; characterIndex++) {
          const character = textContent[characterIndex];
          const characterSpan = document.createElement('span');
          characterSpan.className = 'split-char';
          characterSpan.style.display = 'inline-block';
          // Use non-breaking space for actual spaces to maintain proper spacing during animation.
          characterSpan.textContent = character === ' ' ? '\u00A0' : character;
          element.appendChild(characterSpan);
          characterSpans.push(characterSpan);
        }
        return characterSpans;
      };

      const characterSpans = splitTextIntoCharacters(textElement);

      // Calculate the scroll trigger start position based on threshold and root margin.
      const startPercentage = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const marginSign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const scrollTriggerStart = `top ${startPercentage}%${marginSign}`;

      // Animate each character with a staggered delay for a sequential reveal effect.
      gsap.fromTo(
        characterSpans,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000, // Convert milliseconds to seconds for GSAP.
          scrollTrigger: {
            trigger: textElement,
            start: scrollTriggerStart,
            once: true, // Only trigger animation once when scrolling into view.
            fastScrollEnd: true, // Handle fast scrolling gracefully.
            anticipatePin: 0.4 // Anticipate pinning for smoother scroll experience.
          },
          onComplete: () => {
            animationCompletedRef.current = true;
            onLetterAnimationComplete?.();
          },
          willChange: 'transform, opacity', // Performance hint for browser optimization.
          force3D: true // Force GPU acceleration for smoother animations.
        }
      );

      // Cleanup function to remove scroll triggers when component unmounts.
      return () => {
        ScrollTrigger.getAll().forEach(scrollTrigger => {
          if (scrollTrigger.trigger === textElement) scrollTrigger.kill();
        });
      };
    },
    {
      // Re-run animation setup when any of these dependencies change.
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        onLetterAnimationComplete
      ],
      scope: textElementRef
    }
  );

  /**
   * Renders the appropriate HTML tag based on the 'tag' prop.
   * Applies styling and classes to the element and attaches the ref for GSAP.
   */
  const renderTextElement = () => {
    const elementStyle = {
      textAlign,
      wordWrap: 'break-word' as const,
      willChange: 'transform, opacity'
    };
    const elementClasses = `split-parent overflow-hidden inline-block whitespace-normal ${className}`;

    // Render the appropriate semantic HTML element based on the tag prop.
    switch (tag) {
      case 'h1':
        return (
          <h1 ref={textElementRef as any} style={elementStyle} className={elementClasses}>
            {text}
          </h1>
        );
      case 'h2':
        return (
          <h2 ref={textElementRef as any} style={elementStyle} className={elementClasses}>
            {text}
          </h2>
        );
      case 'h3':
        return (
          <h3 ref={textElementRef as any} style={elementStyle} className={elementClasses}>
            {text}
          </h3>
        );
      case 'h4':
        return (
          <h4 ref={textElementRef as any} style={elementStyle} className={elementClasses}>
            {text}
          </h4>
        );
      case 'h5':
        return (
          <h5 ref={textElementRef as any} style={elementStyle} className={elementClasses}>
            {text}
          </h5>
        );
      case 'h6':
        return (
          <h6 ref={textElementRef as any} style={elementStyle} className={elementClasses}>
            {text}
          </h6>
        );
      default:
        return (
          <p ref={textElementRef as any} style={elementStyle} className={elementClasses}>
            {text}
          </p>
        );
    }
  };

  return renderTextElement();
};

export default SplitText;
