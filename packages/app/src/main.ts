import 'uno.css';
import '@unocss/reset/tailwind.css';
import App from './App.vue';
import { AppContext, AppModule } from './modules/types/module';
import { Services } from 'swagger:iforum';
const auth = new Services.Auth();

auth.login({
  login: 'enio@aluno.ifce.edu.br',
  password: '123456', 
});

const context = { app: createApp(App) } as AppContext;
const modules = import.meta.glob<{default: AppModule}>('./modules/*.ts', { eager: true });

for (const { default: module } of Object.values(modules)) {
  module.install(context);
}
context.app.mount('#app');