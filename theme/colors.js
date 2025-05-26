// theme/colors.js
export const colors = {
  primary: {
    main: '#1E3A8A',  // Rich navy blue
    light: '#3B82F6',
    dark: '#1E40AF',
  },
  secondary: {
    main: '#D4AF37',  // Elegant gold
    light: '#F7E5B7',
    dark: '#B7922E',
  },
  accent: {
    main: '#4F46E5',  // Modern indigo
    light: '#818CF8',
    dark: '#4338CA',
  },
  background: {
    primary: '#F8FAFC',
    secondary: '#F1F5F9',
    tertiary: '#E2E8F0',
    card: 'rgba(255, 255, 255, 0.95)',
    elevated: 'rgba(255, 255, 255, 0.98)',
    blur: 'rgba(255, 255, 255, 0.8)',
  },
  text: {
    primary: '#0F172A',
    secondary: '#334155',
    tertiary: '#64748B',
    inverse: '#F8FAFC',
    inverseSecondary: '#E2E8F0',
    accent: '#1E3A8A',
  },
  border: {
    light: 'rgba(15, 23, 42, 0.08)',
    medium: 'rgba(15, 23, 42, 0.12)',
    dark: 'rgba(15, 23, 42, 0.18)',
  },
  overlay: {
    light: 'rgba(15, 23, 42, 0.1)',
    medium: 'rgba(15, 23, 42, 0.3)',
    dark: 'rgba(15, 23, 42, 0.5)',
  },
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  gradients: {
    primary: ['#1E3A8A', '#3B82F6'],
    secondary: ['#D4AF37', '#F7E5B7'],
    accent: ['#4F46E5', '#818CF8'],
  }
};

export const typography = {
  largeTitle: {
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  title1: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  title2: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  title3: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  headline: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.4,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: -0.3,
  },
  callout: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: -0.2,
  },
  subhead: {
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  footnote: {
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0,
  },
  caption1: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  caption2: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  glow: {
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  }
};