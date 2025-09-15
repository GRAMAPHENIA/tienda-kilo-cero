/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'background': '#E5E6E4', // Fondo principal
        'cards': '#FBFBF2', // Fondo de tarjetas
        'header-bg': '#CFD2CD', // Fondo del header
        'header-text': '#5A4A4D', // Texto del header (847577 más oscuro)
        'footer-bg': '#A6A2A2', // Fondo del footer
        'footer-text': '#5A4A4D', // Texto del footer (847577 más oscuro)
        'primary': '#A6A2A2', // Botón primary
        'primary-text': '#2D2D2D', // Texto para botón primary (contraste alto)
        'secondary': '#CFD2CD', // Botón secondary
        'secondary-text': '#2D2D2D', // Texto para botón secondary (contraste alto)
        'neutral': '#f9fafb', // Gris muy claro para fondo
        'text-primary': '#111827', // Gris muy oscuro para texto
        'text-secondary': '#6b7280', // Gris medio para texto secundario
        'success': '#10b981', // Verde para éxito
        'warning': '#f59e0b', // Amarillo para warning
        'error': '#ef4444', // Rojo para error
      },
      fontFamily: {
        'title': ['Inter', 'sans-serif'],
        'body': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}