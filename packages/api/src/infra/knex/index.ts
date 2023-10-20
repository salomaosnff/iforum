import '../dotenv';
import * as glob from 'glob';
import config from './knexfile';
import Knex from 'knex';
import { Model, ModelClass, initialize } from 'objection';
import { BaseModel } from './_util/base_model';

const connection = Knex(config);

connection.on('query', (query) => {
  // const bindinds =
  //   query.bindings?.length > 0
  //     ? `\x1b[2m-- ${JSON.stringify(query.bindings)}\x1b[0m`
  //     : '';

  // process.stdout.write(
  //   `\x1b[1m[query]\x1b[0m ${query.sql} \x1b[0m${bindinds}\n\n`,
  // );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const q = query.sql.replace(/\$(\d+)/gm, (_: any, m: any) => {
    const value = query.bindings[+m - 1];
    return typeof value === 'string' ? `'${value}'` : value;
  });

  process.stdout.write(`\x1b[1m[query]\x1b[0m ${q}\n\n`);
});

export async function init() {
  const modelfiles: string[] = glob.sync('**/*.model.js', {
    absolute: true,
    cwd: __dirname,
  });

  const models: ModelClass<BaseModel>[] = modelfiles.flatMap((file) =>
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Object.values(require(file)),
  );

  Model.knex(connection);

  return initialize(connection, models);
}
