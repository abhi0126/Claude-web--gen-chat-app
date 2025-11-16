/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        dark: {
          bg: {
            primary: '#1a1a1a',
            secondary: '#2a2a2a',
            tertiary: '#363636',
            hover: '#2d2d2d',
          },
          text: {
            primary: '#e3e3e3',
            secondary: '#a0a0a0',
            tertiary: '#666666',
          },
          border: '#404040',
          code: '#1e1e1e',
        },
        // Light theme colors
        light: {
          bg: {
            primary: '#ffffff',
            secondary: '#f8f8f8',
            tertiary: '#ebebeb',
            hover: '#f5f5f5',
          },
          text: {
            primary: '#1a1a1a',
            secondary: '#666666',
            tertiary: '#999999',
          },
          border: '#e0e0e0',
          code: '#f5f5f5',
        },
        // Accent colors
        accent: {
          primary: '#f97316',
          hover: '#fb923c',
          dark: '#ea580c',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': '0.75rem',    // 12px
        'sm': '0.875rem',   // 14px
        'base': '0.875rem', // 14px (base size for Claude Code)
        'lg': '1rem',       // 16px
        'xl': '1.125rem',   // 18px
        '2xl': '1.25rem',   // 20px
      },
      spacing: {
        '0.5': '0.125rem',  // 2px
        '1': '0.25rem',     // 4px
        '2': '0.5rem',      // 8px
        '3': '0.75rem',     // 12px
        '4': '1rem',        // 16px
        '5': '1.25rem',     // 20px
        '6': '1.5rem',      // 24px
        '8': '2rem',        // 32px
        '10': '2.5rem',     // 40px
        '12': '3rem',       // 48px
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.15)',
      },
      maxWidth: {
        'chat': '800px',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
