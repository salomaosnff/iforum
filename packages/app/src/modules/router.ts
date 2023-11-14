import { AppModule } from './types/module';
import { Router } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import { routes } from 'vue-router/auto/routes';
import { useUserStore } from '@/store/user';


declare module './types/module' {
  export interface AppContext {
    router: Router
  }
}

export default {
  id: 'router',
  install(context) {
    const userStore = useUserStore();
    const router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes: setupLayouts(routes),
    });

    router.beforeEach(async (to) => {
      const isPublic = to.meta.public === true;           

      if (await userStore.isLogged() || isPublic){
        return;
      }

      return {
        name: '/signin',
        query: { redirect: to.fullPath }, 
      };
    });

    context.router = router;
    context.app.use(router);
  },

} as AppModule;