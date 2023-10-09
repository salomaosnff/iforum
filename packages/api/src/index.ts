import { init } from './infra/knex';

init().then(() => console.log('conectou'));
