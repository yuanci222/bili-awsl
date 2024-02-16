import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  build: {
    minify: 'esbuild',
  },
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        author: 'yuanci222',
        match: ['https://www.bilibili.com/*'],
        icon: undefined,
      },
      server: { mountGmApi: true },
    }),
  ],
});
