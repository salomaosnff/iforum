import { AppModule } from './types/module';
import {
  Router, createRouter, createWebHistory, 
} from 'vue-router';
import routes from 'virtual:generated-pages';
import { setupLayouts } from 'virtual:generated-layouts';

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