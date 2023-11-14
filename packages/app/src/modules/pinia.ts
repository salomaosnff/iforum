import { Pinia, createPinia } from 'pinia';
import { AppContext } from './types/module';

declare module './types/module' {
  export interface AppContext {
    store: Pinia
  }
}

export default {
  id: 'pinia',
  install(context: AppContext) {
    context.store = createPinia();
    context.app.use(context.store);
  },
};