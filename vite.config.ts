import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: 'esbuild',
  },
  plugins: [
    react(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        author: 'yuanci222',
        match: ['https://www.bilibili.com/*'],
        icon: undefined,
        version: '0.0.1'
      },
      build: {
        externalGlobals: {
          react: cdn.jsdelivr('React', 'umd/react.production.min.js'),
          'react-dom': cdn.jsdelivr(
            'ReactDOM',
            'umd/react-dom.production.min.js',
          ),
        },
      },
    }),
  ],
});
