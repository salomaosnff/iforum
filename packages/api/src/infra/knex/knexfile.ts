import '../dotenv';
import type { Knex } from 'knex';

export default {
  client: 'postgresql',
  connection: {
    host: process.env.KNEX_HOST,
    database: process.env.KNEX_DATABASE,
    user: process.env.KNEX_USER,
    password: process.env.KNEX_PASSWORD,
  },
  pool: {
    min: 1,
    max: 10,
  },
  migrations: {
    directory: './_migrations',
    tableName: 'knex_migrations',
  },
} as Knex.Config;