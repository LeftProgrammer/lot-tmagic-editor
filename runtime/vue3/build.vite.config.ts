import path from 'path';

import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// @ts-ignore
import externalGlobals from 'rollup-plugin-external-globals';

export default defineConfig(({ mode }) => {
  console.error('build.vite.config-mode===>', mode);

  if (['value', 'config', 'event', 'ds:value', 'ds:config', 'ds:event'].includes(mode)) {
    const capitalToken = mode
      .split(':')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join('');

    const fileName = mode.replace(':', '-');

    return {
      publicDir: './.tmagic/public',
      build: {
        cssCodeSplit: false,
        sourcemap: true,
        minify: false,
        target: 'esnext',
        outDir: `../../playground/public/entry/vue3/${fileName}`,
        lib: {
          entry: `.tmagic/${fileName}-entry.ts`,
          name: `magicPreset${capitalToken}s`,
          fileName: 'index',
          formats: ['umd'],
        },
      },
    };
  }

  if (['page', 'playground'].includes(mode)) {
    return {
      plugins: [
        vue(),
        vueJsx(),
        externalGlobals({ 'vue-demi': 'VueDemi', vue: 'Vue' }, { exclude: [`./${mode}/index.html`] }),
        legacy({
          targets: ['defaults', 'not IE 11'],
        }),
      ],

      root: `./${mode}/`,

      publicDir: '../public',

      // base: `/tmagic-editor/playground/runtime/vue3/${mode}`,
      base: './',

      optimizeDeps: {
        exclude: ['vue-demi'],
      },

      build: {
        emptyOutDir: true,
        sourcemap: true,
        outDir: path.resolve(process.cwd(), `../../playground/public/runtime/vue3/${mode}`),
        rollupOptions: {
          external: ['vue', 'vue-demi'],
        },
      },
    };
  }

  return {};
});
