// Typography System for consistent design across the blog

// Text Sizes
export const textSizes = {
  xs: 'text-xs',      // 12px - For meta information, small labels
  sm: 'text-sm',      // 14px - For body text, captions
  base: 'text-base',  // 16px - Default text size
  lg: 'text-lg',      // 18px - For subheadings
  xl: 'text-xl',      // 20px - For medium headings
  '2xl': 'text-2xl',  // 24px - For large headings
  '3xl': 'text-3xl',  // 30px - For page titles
  '4xl': 'text-4xl',  // 36px - For hero titles
} as const;

// Font Weights
export const fontWeights = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
} as const;

// Line Heights
export const lineHeights = {
  none: 'leading-none',
  tight: 'leading-tight',
  snug: 'leading-snug',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose',
} as const;

// Colors
export const colors = {
  primary: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',   // Primary brand color
    600: '#0d9488',
    700: '#0f766e',
    800: '#134e4a',
    900: '#0c4a42',
  },
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',   // Default text
    600: '#52525b',   // Secondary text
    700: '#3f3f46',   // Headings
    800: '#27272a',   // Important text
    900: '#18181b',   // Important headings
  },
} as const;

// Typography Components
export const typography = {
  // Heading styles
  h1: 'text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight',
  h2: 'text-2xl sm:text-3xl font-bold leading-tight',
  h3: 'text-xl sm:text-2xl font-semibold leading-snug',
  h4: 'text-lg sm:text-xl font-semibold leading-snug',
  h5: 'text-base sm:text-lg font-semibold leading-normal',
  h6: 'text-sm sm:text-base font-semibold leading-normal',
  
  // Body text styles
  body: 'text-base leading-relaxed',
  bodySmall: 'text-sm leading-relaxed',
  bodyLarge: 'text-lg leading-relaxed',
  
  // Meta text styles
  meta: 'text-sm leading-normal',
  metaSmall: 'text-xs leading-normal',
  
  // Link styles
  link: 'font-medium transition-colors duration-200',
  linkSmall: 'text-sm font-medium transition-colors duration-200',
  
  // Navigation styles
  nav: 'text-sm font-semibold',
  navMobile: 'text-xs font-medium',
  
  // Button styles
  button: 'text-sm font-medium',
  buttonLarge: 'text-base font-semibold',
  
  // Label styles
  label: 'text-sm font-medium',
  labelSmall: 'text-xs font-medium',
  
  // Badge styles
  badge: 'text-xs font-semibold uppercase tracking-wider',
  
  // Hero specific styles
  heroTitle: 'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight',
} as const;

// Responsive text utilities
export const responsiveText = {
  heading: 'text-xl sm:text-2xl lg:text-3xl',
  subheading: 'text-lg sm:text-xl lg:text-2xl',
  title: 'text-base sm:text-lg lg:text-xl',
  body: 'text-sm sm:text-base',
  caption: 'text-xs sm:text-sm',
} as const;

// Color utilities
export const textColors = {
  primary: 'text-teal-600',
  primaryHover: 'hover:text-teal-700',
  secondary: 'text-gray-600',
  secondaryHover: 'hover:text-gray-700',
  muted: 'text-gray-500',
  mutedHover: 'hover:text-gray-600',
  heading: 'text-gray-900',
  headingHover: 'hover:text-gray-800',
  body: 'text-gray-700',
  bodyHover: 'hover:text-gray-800',
  inverse: 'text-white',
  inverseHover: 'hover:text-gray-100',
} as const;

// Spacing utilities for typography
export const textSpacing = {
  heading: 'mb-4 sm:mb-6',
  subheading: 'mb-3 sm:mb-4',
  title: 'mb-2 sm:mb-3',
  body: 'mb-4',
  meta: 'mb-1',
  tight: 'mb-1',
  normal: 'mb-2',
  relaxed: 'mb-3',
} as const;