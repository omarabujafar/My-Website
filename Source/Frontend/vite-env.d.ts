/// <reference types="vite/client" />

declare module '*.lottie' {
  const content: string
  export default content
}

declare module '*.svg' {
  const content: string
  export default content
}

// Specific declaration for the Portfolio Logo files
declare module '@Assets/Icons/Portfolio Logo/Static/Static Logo (Dark Mode).svg' {
  const content: string
  export default content
}

declare module '@Assets/Icons/Portfolio Logo/Static/Static Logo (Light Mode).svg' {
  const content: string
  export default content
}
