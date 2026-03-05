// Design System Tokens for LCCAP Application
// Centralized design tokens for consistent styling across the application

export const colors = {
  // Primary Colors
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  
  // Secondary Colors
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  
  // Semantic Colors
  semantic: {
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  
  // Neutral Colors
  neutral: {
    white: '#ffffff',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',
    black: '#000000',
  }
};

export const typography = {
  fontFamily: {
    sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
    serif: ['Georgia', 'serif'],
    mono: ['"SF Mono"', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
  },
  
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
  },
  
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
};

export const spacing = {
  0: '0px',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem',
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

export const animation = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// Component-specific tokens
export const components = {
  button: {
    primary: {
      backgroundColor: colors.primary[600],
      color: colors.neutral.white,
      hoverBackgroundColor: colors.primary[700],
      activeBackgroundColor: colors.primary[800],
      borderRadius: borderRadius.lg,
      padding: `${spacing[3]} ${spacing[4]}`,
      fontSize: typography.fontSize.base[0],
      fontWeight: typography.fontWeight.medium,
      transition: `all ${animation.duration.normal} ${animation.easing.easeInOut}`,
    },
    
    secondary: {
      backgroundColor: colors.neutral.white,
      color: colors.neutral.gray700,
      borderColor: colors.neutral.gray300,
      hoverBackgroundColor: colors.neutral.gray50,
      activeBackgroundColor: colors.neutral.gray100,
      borderRadius: borderRadius.lg,
      padding: `${spacing[3]} ${spacing[4]}`,
      fontSize: typography.fontSize.base[0],
      fontWeight: typography.fontWeight.medium,
      transition: `all ${animation.duration.normal} ${animation.easing.easeInOut}`,
    },
  },
  
  card: {
    backgroundColor: colors.neutral.white,
    borderColor: colors.neutral.gray200,
    borderRadius: borderRadius.lg,
    shadow: shadows.sm,
    padding: spacing[6],
    transition: `all ${animation.duration.normal} ${animation.easing.easeInOut}`,
  },
  
  input: {
    backgroundColor: colors.neutral.white,
    borderColor: colors.neutral.gray300,
    borderRadius: borderRadius.lg,
    padding: `${spacing[3]} ${spacing[4]}`,
    fontSize: typography.fontSize.base[0],
    focusBorderColor: colors.primary[500],
    focusRingColor: `${colors.primary[500]}20`,
    transition: `all ${animation.duration.normal} ${animation.easing.easeInOut}`,
  },
  
  sidebar: {
    backgroundColor: colors.primary[700],
    color: colors.neutral.white,
    width: '16rem',
    borderRadius: borderRadius.none,
    shadow: shadows.lg,
    transition: `all ${animation.duration.normal} ${animation.easing.easeInOut}`,
  },
  
  header: {
    backgroundColor: colors.neutral.white,
    borderColor: colors.neutral.gray200,
    shadow: shadows.sm,
    height: '4rem',
    zIndex: zIndex.sticky,
  },
  
  footer: {
    backgroundColor: colors.primary[700],
    color: colors.neutral.white,
    padding: `${spacing[4]} 0`,
    zIndex: zIndex.docked,
  },
};

// Layout-specific tokens
export const layout = {
  container: {
    maxWidth: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1400px',
    },
    padding: {
      x: spacing[6],
      y: spacing[8],
    },
  },
  
  sidebar: {
    width: '16rem',
    collapsedWidth: '0',
    transition: `all ${animation.duration.normal} ${animation.easing.easeInOut}`,
  },
  
  header: {
    height: '4rem',
    zIndex: zIndex.sticky,
  },
  
  footer: {
    height: 'auto',
    minHeight: '3rem',
    zIndex: zIndex.docked,
  },
};

// Pillar-specific color schemes for consistent theming
export const pillarColors = {
  foodSecurity: {
    name: 'Food Security',
    gradient: 'from-green-50 to-green-100',
    border: 'border-green-300',
    text: 'text-green-700',
    bg: 'bg-green-600',
    icon: 'text-green-600'
  },
  waterSufficiency: {
    name: 'Water Sufficiency',
    gradient: 'from-blue-50 to-blue-100',
    border: 'border-blue-300',
    text: 'text-blue-700',
    bg: 'bg-blue-600',
    icon: 'text-blue-600'
  },
  ecologicalStability: {
    name: 'Ecological Stability',
    gradient: 'from-emerald-50 to-emerald-100',
    border: 'border-emerald-300',
    text: 'text-emerald-700',
    bg: 'bg-emerald-600',
    icon: 'text-emerald-600'
  },
  humanSecurity: {
    name: 'Human Security',
    gradient: 'from-purple-50 to-purple-100',
    border: 'border-purple-300',
    text: 'text-purple-700',
    bg: 'bg-purple-600',
    icon: 'text-purple-600'
  },
  climateSmartIndustries: {
    name: 'Climate-Smart Industries',
    gradient: 'from-indigo-50 to-indigo-100',
    border: 'border-indigo-300',
    text: 'text-indigo-700',
    bg: 'bg-indigo-600',
    icon: 'text-indigo-600'
  },
  sustainableEnergy: {
    name: 'Sustainable Energy',
    gradient: 'from-yellow-50 to-yellow-100',
    border: 'border-yellow-300',
    text: 'text-yellow-700',
    bg: 'bg-yellow-600',
    icon: 'text-yellow-600'
  },
  knowledgeCapacity: {
    name: 'Knowledge & Capacity',
    gradient: 'from-teal-50 to-teal-100',
    border: 'border-teal-300',
    text: 'text-teal-700',
    bg: 'bg-teal-600',
    icon: 'text-teal-600'
  }
};

// Statistics card color variants
export const statisticsCardColors = {
  leadingOffice: {
    gradient: 'from-blue-50 to-blue-100',
    border: 'border-blue-300',
    text: 'text-blue-700',
    bg: 'bg-blue-600'
  },
  accomplishment: {
    gradient: 'from-emerald-50 to-emerald-100',
    border: 'border-emerald-300',
    text: 'text-emerald-700',
    bg: 'bg-emerald-600'
  },
  departments: {
    gradient: 'from-indigo-50 to-indigo-100',
    border: 'border-indigo-300',
    text: 'text-indigo-700',
    bg: 'bg-indigo-600'
  },
  projects: {
    gradient: 'from-teal-50 to-teal-100',
    border: 'border-teal-300',
    text: 'text-teal-700',
    bg: 'bg-teal-600'
  }
};

// Typography hierarchy for consistent text styling
export const textHierarchy = {
  pageTitle: 'text-3xl font-bold text-gray-900',
  sectionTitle: 'text-xl font-semibold text-gray-800',
  cardTitle: 'text-lg font-semibold text-gray-800',
  subtitle: 'text-gray-600',
  label: 'text-sm font-medium text-gray-700',
  body: 'text-sm text-gray-900',
  caption: 'text-xs text-gray-500'
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  zIndex,
  animation,
  components,
  layout,
  pillarColors,
  statisticsCardColors,
  textHierarchy,
};
