// Common types used across the application

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  imageUrl?: string
  liveUrl?: string
  githubUrl?: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  publishedDate: string
  readingTime: number
  tags: string[]
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  imageUrl?: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}
