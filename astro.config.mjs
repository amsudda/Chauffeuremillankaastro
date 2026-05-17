import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';
export default defineConfig({
  site: 'https://www.chauffeuremillankatour.com',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    tailwind(),
    react(),
  ],
  vite: {
    ssr: {
      noExternal: [],
    },
  },
});
