import path from 'path';
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

export default defineConfig(({ mode }) => {
  // 根据当前的 `mode`（development、production）加载对应的环境变量
  console.error('mode=====>', mode)
  const isProduction = mode.includes('production');

  return {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      vue(),
      vueJsx(),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
    ],

    base: isProduction ? './' : '/tmagic-editor/playground/',

    resolve: {
            alias: [
        {
          find: /^@tmagic\/editor\/dist\/style.css/,
          replacement: path.join(__dirname, '../packages/editor/src/theme/index.scss'),
        },
        {
          find: /^@tmagic\/form\/dist\/style.css/,
          replacement: path.join(__dirname, '../packages/form/src/theme/index.scss'),
        },
        {
          find: /^@tmagic\/table\/dist\/style.css/,
          replacement: path.join(__dirname, '../packages/table/dist/style.css'),
        },
        { find: /^@tmagic\/core/, replacement: path.join(__dirname, '../packages/core/src/index.ts') },
        { find: /^@editor/, replacement: path.join(__dirname, '../packages/editor/src/') },
        { find: /^@tmagic\/editor/, replacement: path.join(__dirname, '../packages/editor/src/index.ts') },
        { find: /^@tmagic\/schema/, replacement: path.join(__dirname, '../packages/schema/src/index.ts') },
        { find: /^@tmagic\/form/, replacement: path.join(__dirname, '../packages/form/src/index.ts') },
        {
          find: /^@tmagic\/tmagic-form-runtime/,
          replacement: path.join(__dirname, '../runtime/tmagic-form/src/index.ts'),
        },
        { find: /^@tmagic\/table/, replacement: path.join(__dirname, '../packages/table/src/index.ts') },
        { find: /^@tmagic\/stage/, replacement: path.join(__dirname, '../packages/stage/src/index.ts') },
        { find: /^@tmagic\/utils/, replacement: path.join(__dirname, '../packages/utils/src/index.ts') },
        { find: /^@tmagic\/design/, replacement: path.join(__dirname, '../packages/design/src/index.ts') },
        { find: /^@tmagic\/data-source/, replacement: path.join(__dirname, '../packages/data-source/src/index.ts') },
        { find: /^@tmagic\/dep/, replacement: path.join(__dirname, '../packages/dep/src/index.ts') },
        { find: /^@data-source/, replacement: path.join(__dirname, '../packages/data-source/src') },
        {
          find: /^@tmagic\/element-plus-adapter/,
          replacement: path.join(__dirname, '../packages/element-plus-adapter/src/index.ts'),
        },
      ],
    },

    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
      },
    },

    server: {
      host: '0.0.0.0',
      port: 8098,
      strictPort: true,
      proxy: {
        '^/tmagic-editor/playground/runtime': {
          target: 'http://127.0.0.1:8078',
          changeOrigin: true,
          prependPath: false,
        },
      },
      open: '/tmagic-editor/playground/',
    },
    preview: {
      proxy: {},
    },

    build: {
      sourcemap: true,
    },
  };
});
