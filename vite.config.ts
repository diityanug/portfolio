import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const SHORTLINK_SLUGS = [
  'wa',
  'cv',
  'resume',
  'in',
  'linkedin',
  'gh',
  'github',
  'game',
  'lenvry',
  'reka',
]

// Match exact shortlink paths only so static assets (e.g. /reka-cover.png, /lenvry-fitness.svg) are not proxied
const shortlinkProxyPattern = `^/(${SHORTLINK_SLUGS.join('|')})(\\?.*)?$`

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '^/api(/|\\?|$)': 'http://localhost:8080',
      '^/to/': 'http://localhost:8080',
      [shortlinkProxyPattern]: 'http://localhost:8080',
    },
  },
})
