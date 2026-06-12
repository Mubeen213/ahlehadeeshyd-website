import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import themePlugin from '@replit/vite-plugin-shadcn-theme-json'
import path, { dirname } from 'path'
import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal'
import { fileURLToPath } from 'url'
import { viteSocialApiPlugin } from './src/plugins/vite-social-api'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    viteSocialApiPlugin(),
  ],
  server: {
    proxy: {
      '/api/social/twitter-syndication': {
        target: 'https://cdn.syndication.twimg.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/social\/twitter-syndication/, ''),
      },
      '/api/social/instagram-embed': {
        target: 'https://www.instagram.com',
        changeOrigin: true,
        rewrite: () => '/jamiatahlehadees/embed',
      },
      '/api/social/youtube-rss': {
        target: 'https://www.youtube.com',
        changeOrigin: true,
        rewrite: () =>
          '/feeds/videos.xml?channel_id=UCLCwuh7UrEksmg448MlY_zw',
      },
      '/api/social/facebook-page': {
        target: 'https://www.facebook.com',
        changeOrigin: true,
        rewrite: () => '/JamiatAhlehadeesOfficialHydSec/',
      },
      '/api/social/facebook-mobile': {
        target: 'https://m.facebook.com',
        changeOrigin: true,
        rewrite: () => '/JamiatAhlehadeesOfficialHydSec/',
      },
      '/api/social/facebook-videos': {
        target: 'https://www.facebook.com',
        changeOrigin: true,
        rewrite: () => '/JamiatAhlehadeesOfficialHydSec/videos/',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
