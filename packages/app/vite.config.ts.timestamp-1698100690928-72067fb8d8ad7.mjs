// vite.config.ts
import { defineConfig } from "file:///home/sallon/Documentos/iforum/node_modules/.pnpm/vite@4.4.5_@types+node@20.4.7_sass@1.65.1/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import { fileURLToPath } from "url";
import vue from "file:///home/sallon/Documentos/iforum/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3_vite@4.4.5_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///home/sallon/Documentos/iforum/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.0.1_vite@4.4.5_vue@3.3.4/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import VueMacros from "file:///home/sallon/Documentos/iforum/node_modules/.pnpm/unplugin-vue-macros@2.4.5_@vueuse+core@10.3.0_vite@4.4.5_vue@3.3.4/node_modules/unplugin-vue-macros/dist/vite.mjs";
import Components from "file:///home/sallon/Documentos/iforum/node_modules/.pnpm/unplugin-vue-components@0.25.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import AutoImport from "file:///home/sallon/Documentos/iforum/node_modules/.pnpm/unplugin-auto-import@0.16.6_@vueuse+core@10.3.0/node_modules/unplugin-auto-import/dist/vite.js";
import unocss from "file:///home/sallon/Documentos/iforum/node_modules/.pnpm/unocss@0.55.0_postcss@8.4.31_vite@4.4.5/node_modules/unocss/dist/vite.mjs";
import pages from "file:///home/sallon/Documentos/iforum/node_modules/.pnpm/vite-plugin-pages@0.31.0_vite@4.4.5/node_modules/vite-plugin-pages/dist/index.mjs";
import layout from "file:///home/sallon/Documentos/iforum/node_modules/.pnpm/vite-plugin-vue-layouts@0.8.0_vite@4.4.5_vue-router@4.2.4_vue@3.3.4/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///home/sallon/Documentos/iforum/packages/app/vite.config.ts";
var UI_ROOT = resolve(fileURLToPath(__vite_injected_original_import_meta_url), "../../ui");
var vite_config_default = defineConfig({
  resolve: {
    "alias": {
      "@iforum/ui": resolve(UI_ROOT, "src"),
      "@": resolve(fileURLToPath(__vite_injected_original_import_meta_url), "./src")
    }
  },
  plugins: [
    VueMacros({
      plugins: {
        vue: vue(),
        vueJsx: vueJsx()
      }
    }),
    Components({
      dts: "./src/components.d.ts",
      dirs: [
        "./src/components",
        resolve(UI_ROOT, "src/components/*")
      ]
    }),
    AutoImport({
      imports: [
        "@vueuse/core",
        "vue",
        "vue-router"
      ],
      dirs: ["src/composables"],
      vueTemplate: true,
      eslintrc: { enabled: true },
      dts: "./src/auto-imports.d.ts"
    }),
    unocss(),
    pages(),
    layout()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9zYWxsb24vRG9jdW1lbnRvcy9pZm9ydW0vcGFja2FnZXMvYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9zYWxsb24vRG9jdW1lbnRvcy9pZm9ydW0vcGFja2FnZXMvYXBwL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3NhbGxvbi9Eb2N1bWVudG9zL2lmb3J1bS9wYWNrYWdlcy9hcHAvdml0ZS5jb25maWcudHNcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnO1xuaW1wb3J0IFZ1ZU1hY3JvcyBmcm9tICd1bnBsdWdpbi12dWUtbWFjcm9zL3ZpdGUnO1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcbmltcG9ydCB1bm9jc3MgZnJvbSAndW5vY3NzL3ZpdGUnO1xuaW1wb3J0IHBhZ2VzIGZyb20gJ3ZpdGUtcGx1Z2luLXBhZ2VzJztcbmltcG9ydCBsYXlvdXQgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWxheW91dHMnO1xuXG5jb25zdCBVSV9ST09UID0gcmVzb2x2ZShmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCksICcuLi8uLi91aScpO1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgICdhbGlhcyc6IHtcbiAgICAgICdAaWZvcnVtL3VpJzogcmVzb2x2ZShVSV9ST09ULCAnc3JjJyksXG4gICAgICAnQCc6IHJlc29sdmUoZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpLCAnLi9zcmMnKSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgVnVlTWFjcm9zKHtcbiAgICAgIHBsdWdpbnM6IHtcbiAgICAgICAgdnVlOiB2dWUoKSxcbiAgICAgICAgdnVlSnN4OiB2dWVKc3goKSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICBkdHM6ICcuL3NyYy9jb21wb25lbnRzLmQudHMnLFxuICAgICAgZGlyczogW1xuICAgICAgICAnLi9zcmMvY29tcG9uZW50cycsXG4gICAgICAgIHJlc29sdmUoVUlfUk9PVCwgJ3NyYy9jb21wb25lbnRzLyonKSxcbiAgICAgIF0sIFxuICAgIH0pLFxuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgaW1wb3J0czogW1xuICAgICAgICAnQHZ1ZXVzZS9jb3JlJyxcbiAgICAgICAgJ3Z1ZScsXG4gICAgICAgICd2dWUtcm91dGVyJyxcbiAgICAgIF0sXG4gICAgICBkaXJzOiBbJ3NyYy9jb21wb3NhYmxlcycgXSxcbiAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxuICAgICAgZXNsaW50cmM6IHsgZW5hYmxlZDogdHJ1ZSB9LFxuICAgICAgZHRzOiAnLi9zcmMvYXV0by1pbXBvcnRzLmQudHMnLFxuXG4gICAgfSksXG4gICAgdW5vY3NzKCksXG4gICAgcGFnZXMoKSxcbiAgICBsYXlvdXQoKSxcbiAgXSxcblxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsZUFBZTtBQUN4QixTQUFTLHFCQUFxQjtBQUM5QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sZUFBZTtBQUN0QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLFlBQVk7QUFDbkIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sWUFBWTtBQVgySyxJQUFNLDJDQUEyQztBQWEvTyxJQUFNLFVBQVUsUUFBUSxjQUFjLHdDQUFlLEdBQUcsVUFBVTtBQUNsRSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxTQUFTO0FBQUEsTUFDUCxjQUFjLFFBQVEsU0FBUyxLQUFLO0FBQUEsTUFDcEMsS0FBSyxRQUFRLGNBQWMsd0NBQWUsR0FBRyxPQUFPO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxVQUFVO0FBQUEsTUFDUixTQUFTO0FBQUEsUUFDUCxLQUFLLElBQUk7QUFBQSxRQUNULFFBQVEsT0FBTztBQUFBLE1BQ2pCO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxLQUFLO0FBQUEsTUFDTCxNQUFNO0FBQUEsUUFDSjtBQUFBLFFBQ0EsUUFBUSxTQUFTLGtCQUFrQjtBQUFBLE1BQ3JDO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxTQUFTO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsTUFBTSxDQUFDLGlCQUFrQjtBQUFBLE1BQ3pCLGFBQWE7QUFBQSxNQUNiLFVBQVUsRUFBRSxTQUFTLEtBQUs7QUFBQSxNQUMxQixLQUFLO0FBQUEsSUFFUCxDQUFDO0FBQUEsSUFDRCxPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsRUFDVDtBQUVGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
