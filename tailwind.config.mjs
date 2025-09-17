/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'background': '#E5E6E4',
        'cards': '#FBFBF2',
        'header-bg': '#CFD2CD',
        'header-text': '#5A4A4D',
        'footer-bg': '#A6A2A2',
        'footer-text': '#5A4A4D',
        'primary': '#A6A2A2',
        'primary-text': '#2D2D2D',
        'secondary': '#CFD2CD',
        'secondary-text': '#2D2D2D',
        'neutral': '#f9fafb',
        'text-primary': '#111827',
        'text-secondary': '#6b7280',
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444',
      },
      fontFamily: {
        'title': ['Inter', 'sans-serif'],
        'body': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
  // Optimizaciones de rendimiento
  corePlugins: {
    // Deshabilitar plugins no utilizados para reducir el bundle
    preflight: true,
  },
  // Optimizar el purging
  safelist: [
    // Clases que podrían no detectarse automáticamente
    'aspect-square',
    'object-cover',
    'transition-transform',
    'group-hover:scale-105',
  ],
}