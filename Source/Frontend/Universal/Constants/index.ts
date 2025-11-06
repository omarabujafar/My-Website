/**
 * Application-wide constants and configuration values.
 * This file centralizes all magic numbers, timing values, and configuration settings
 * used throughout the application for easier maintenance and consistency.
 */

/**
 * Site configuration containing personal information and social media links.
 */
export const SITE_CONFIG = {
  name: 'Omar Abu Jafar',
  title: 'Software Engineer',
  email: 'omar@omarabujafar.com',
  github: 'https://github.com/omarabujafar',
  linkedin: 'https://linkedin.com/in/omarabujafar',
  instagram: 'https://instagram.com/omarabujafar',
} as const

/**
 * Application route paths for navigation.
 */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  BLOG: '/blog',
  CONTACT: '/contact',
} as const

/**
 * Navigation items displayed in the header and mobile menu.
 */
export const NAV_ITEMS = [
  { path: ROUTES.HOME, label: 'Home' },
  { path: ROUTES.ABOUT, label: 'About' },
  { path: ROUTES.PROJECTS, label: 'Projects' },
  { path: ROUTES.BLOG, label: 'Blog' },
  { path: ROUTES.CONTACT, label: 'Contact' },
] as const

/**
 * Animation timing constants used throughout the application.
 * Centralized here to maintain consistent timing across components.
 */
export const ANIMATION_TIMINGS = {
  /** Duration for the loading screen display in milliseconds. */
  LOADING_SCREEN_DURATION_MS: 5200,
  /** Fade out duration for loading screen exit animation in milliseconds. */
  LOADING_SCREEN_FADEOUT_MS: 800,
  /** Total loading context duration in milliseconds. */
  LOADING_CONTEXT_DURATION_MS: 6000,
  /** Delay before page transition animations start in milliseconds. */
  PAGE_TRANSITION_DELAY_MS: 250,
  /** Delay between navigation indicator position updates in milliseconds. */
  NAVIGATION_INDICATOR_DELAY_MS: 100,
  /** Smoothing factor for navigation indicator movement (0-1). */
  NAVIGATION_INDICATOR_SMOOTHING: 0.05,
  /** Page transition animation duration in seconds. */
  PAGE_TRANSITION_DURATION_S: 0.4,
} as const

/**
 * Scroll trigger configuration values for animations.
 */
export const SCROLL_TRIGGER_CONFIG = {
  /** Default threshold for intersection observer (0-1). */
  DEFAULT_THRESHOLD: 0.1,
  /** Default root margin offset for scroll triggers. */
  DEFAULT_ROOT_MARGIN: '-100px',
  /** Anticipate pin value for scroll trigger smoothness. */
  ANTICIPATE_PIN: 0.4,
} as const

/**
 * Reading time calculation constants.
 */
export const READING_TIME_CONFIG = {
  /** Average reading speed in words per minute. */
  WORDS_PER_MINUTE: 200,
} as const

/**
 * Progress animation milestone timings for AirDrop component (in milliseconds).
 */
export const AIRDROP_PROGRESS_MILESTONES = {
  MILESTONE_25_PERCENT_MS: 600,
  MILESTONE_50_PERCENT_MS: 1700,
  MILESTONE_75_PERCENT_MS: 2100,
  MILESTONE_100_PERCENT_MS: 2400,
  MILESTONE_COMPLETE_MS: 2700,
} as const
