
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueMacros from 'unplugin-vue-macros/vite';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import unocss from 'unocss/vite';
import pages from 'vite-plugin-pages';
import layout from 'vite-plugin-vue-layouts';


export default defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: vue(),
        vueJsx: vueJsx(),
      },
    }),
    Components({ dts: './src/components.d.ts' }),
    AutoImport({
      imports: [
        '@vueuse/core',
        'vue',
        'vue-router',
      ],
      dirs: ['src/composables'],
      vueTemplate: true,
      eslintrc: { enabled: true },
      dts: './src/auto-imports.d.ts',

    }),
    unocss(),
    pages(),
    layout(),
  ],

});