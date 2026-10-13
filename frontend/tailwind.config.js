/** @type {import('tailwindcss').Config} */
// Compiled at build time (previously the Tailwind CDN script in index.html).
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#003461',
        'primary-container': '#004b87',
        'on-primary': '#ffffff',
        'on-primary-container': '#8abcff',
        'secondary': '#006a68',
        'secondary-container': '#86f4f1',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#00706f',
        'tertiary': '#472f00',
        'tertiary-container': '#644400',
        'on-tertiary-container': '#f5ac07',
        'deep-navy': '#0B3C5D',
        'navy': '#0B3C5D',
        'teal': '#2CA6A4',
        'teal-ink': '#1D7775',
        'mist': '#F5F7FA',
        'ink': '#16252F',
        'line': '#DCE3EA',
        'clinical-green': '#5FCF80',
        'bg-canvas': '#F5F7FA',
        'surface-white': '#FFFFFF',
        'text-primary': '#1E293B',
        'border-subtle': '#E2E8F0',
        'surface': '#f8f9ff',
        'surface-container-low': '#eff4ff',
        'surface-container': '#e5eeff',
        'surface-container-high': '#dce9ff',
        'surface-container-highest': '#d3e4fe',
        'on-surface': '#0b1c30',
        'on-surface-variant': '#424750',
        'outline': '#727781',
        'outline-variant': '#c2c6d1',
        'error': '#ba1a1a',
        'error-container': '#ffdad6',
        'on-error': '#ffffff'
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        display: ['Poppins', 'sans-serif']
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px'
      },
      boxShadow: {
        'card': '0 1px 3px rgba(11, 60, 93, 0.05), 0 1px 2px rgba(11, 60, 93, 0.03)',
        'card-hover': '0 10px 25px -5px rgba(11, 60, 93, 0.08), 0 8px 10px -6px rgba(11, 60, 93, 0.04)',
        'modal': '0 20px 35px -5px rgba(11, 60, 93, 0.14)'
      }
    }
  }
};
