/**
 * SATR Design System Tokens
 * Single source of truth for colors, typography, shadows, and glassmorphism.
 */

export const SATR_COLORS = {
  // Brand Anchors
  navy: '#0C4A6E',        // Deep navy (logo, headlines, primary nav button)
  deepSky: '#0369A1',     // Deep sky
  sky: '#0EA5E9',         // Sky blue (main accent, CTAs, highlights)
  lightSky: '#38BDF8',    // Light sky
  softSky: '#7DD3FC',     // Soft sky
  paleSky: '#BAE6FD',     // Pale sky
  skyMist: '#E0F2FE',     // Sky mist (soft section backgrounds)
  
  // Backgrounds & Neutrals
  iceWhite: '#F5FAFF',    // Ice white primary
  iceWhiteAlt: '#F0F9FF', // Ice white alternate
  white: '#FFFFFF',       // Pure white main background
  
  // Text & Borders
  bodyText: '#3F7FA8',    // Body text (muted sky)
  borderMain: '#D6E6F2',  // Primary borders
  borderSoft: '#E0F2FE',  // Soft dividers
  error: '#B42318',       // Error notification text
} as const;

export const SATR_FONTS = {
  sans: 'var(--font-geist-sans), Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  arabic: 'var(--font-ibm-arabic), "IBM Plex Sans Arabic", -apple-system, BlinkMacSystemFont, sans-serif',
  mono: 'var(--font-jetbrains-mono), "JetBrains Mono", monospace',
} as const;

export const SATR_SHADOWS = {
  card: '0 18px 30px -22px rgba(12, 74, 110, 0.45)',
  float: '0 22px 40px -22px rgba(12, 74, 110, 0.55)',
  skyGlow: '0 14px 30px -14px rgba(14, 165, 233, 0.6)',
  glowHover: '0 18px 36px -12px rgba(14, 165, 233, 0.75)',
} as const;

export const SATR_GLASS = {
  background: 'rgba(255, 255, 255, 0.66)',
  border: '0.5px solid rgba(125, 211, 252, 0.85)',
  backdropFilter: 'blur(12px)',
  pillRadius: '999px',
  cardRadius: '16px',
} as const;

export const SATR_RADII = {
  small: '12px',
  card: '16px',
  banner: '24px',
  pill: '999px',
} as const;
