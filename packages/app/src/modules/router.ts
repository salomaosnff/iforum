import { AppModule } from './types/module';
import { Router } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import { routes } from 'vue-router/auto/routes';


declare module './types/module' {
  export interface AppContext {
    router: Router
  }
}

export default {
  id: 'router',
  install(context) {
    const router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes: setupLayouts(routes),
    });

    context.router = router;
    context.app.use(router);
  },

} as AppModule;