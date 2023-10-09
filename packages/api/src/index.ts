import * as db from './infra/knex';
import * as api from './infra/fastify';

api.init(db.init);