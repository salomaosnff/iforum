import 'uno.css';
import App from './App.vue';
import { AppContext, AppModule } from './modules/types/module';
import '@unocss/reset/tailwind.css';

const context = { app: createApp(App) } as AppContext;
const modules = import.meta.glob<{default: AppModule}>('./modules/*.ts', { eager: true });

for (const { default: module } of Object.values(modules)) {
  console.log(module);
  module.install(context);
}
const x:{id: number} = { id: 1 };
console.log(x);
context.app.mount('#app');
