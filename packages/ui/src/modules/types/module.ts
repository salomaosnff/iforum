import { App } from 'vue';

export interface AppContext {
  app:App
}

export interface AppModule {
  id:string,
  install( context:AppContext): void
}