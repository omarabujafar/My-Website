// Application-wide constants

export const SITE_CONFIG = {
  name: 'Omar Abu Jafar',
  title: 'Software Engineer',
  email: 'omar@omarabujafar.com',
  github: 'https://github.com/omarabujafar',
  linkedin: 'https://linkedin.com/in/omarabujafar',
  instagram: 'https://instagram.com/omarabujafar',
} as const

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  BLOG: '/blog',
  CONTACT: '/contact',
} as const

export const NAV_ITEMS = [
  { path: ROUTES.HOME, label: 'Home' },
  { path: ROUTES.ABOUT, label: 'About' },
  { path: ROUTES.PROJECTS, label: 'Projects' },
  { path: ROUTES.BLOG, label: 'Blog' },
  { path: ROUTES.CONTACT, label: 'Contact' },
] as const
