/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        apple: {
          primary: '#0066cc',
          'primary-focus': '#0071e3',
          'primary-on-dark': '#2997ff',
          ink: '#1d1d1f',
          body: '#1d1d1f',
          'body-on-dark': '#ffffff',
          'body-muted': '#cccccc',
          'ink-muted-80': '#333333',
          'ink-muted-48': '#7a7a7a',
          'divider-soft': '#f0f0f0',
          hairline: '#e0e0e0',
          canvas: '#ffffff',
          'canvas-parchment': '#f5f5f7',
          'surface-pearl': '#fafafc',
          'surface-tile-1': '#272729',
          'surface-tile-2': '#2a2a2c',
          'surface-tile-3': '#252527',
          'surface-black': '#000000',
          'chip-translucent': 'rgba(210, 210, 215, 0.64)',
        },
      },
      fontFamily: {
        display: ['"Geist"', '"SF Pro Display"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        text: ['"Geist"', '"SF Pro Text"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        sans: ['"Geist"', '"SF Pro Text"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', '"SF Mono"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'apple-product': '3px 5px 30px 0 rgba(0, 0, 0, 0.22)',
      },
      borderRadius: {
        'apple-card': '18px',
        'apple-sm': '8px',
        'apple-md': '11px',
      },
    },
  },
  plugins: [],
}