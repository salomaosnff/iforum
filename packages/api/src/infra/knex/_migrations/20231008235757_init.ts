import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.schema.withSchema('public')
    .createTable('user', table => {
      table.uuid('id').primary().notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));

      table.timestamps(true, true);

      table.string('name', 80).notNullable();

      table.string('password', 80).notNullable();

      table.string('email', 320).notNullable();

      table.integer('role').notNullable();

      table.integer('score').notNullable()
        .defaultTo(0);
    })
    .createTable('topic', table => {
      table.uuid('id').primary().notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));

      table.timestamps(true, true);

      table.string('slug', 255).notNullable();

      table.string('title', 255).notNullable();

      table.text('body').notNullable();

      table.uuid('author_id').references('id')
        .inTable('user').notNullable();

      table.integer('rate').notNullable()
        .defaultTo(0);

      table.specificType('tags', 'TEXT[]').notNullable()
        .defaultTo('{}');

      table.dateTime('edited_at').nullable();
    })
    .createTable('comment', table => {
      table.uuid('id').primary().notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));

      table.timestamps(true, true);

      table.uuid('author_id').references('id')
        .inTable('user').notNullable();

      table.text('body').notNullable();

      table.integer('rate').notNullable()
        .defaultTo(0);

      table.uuid('reply_to').references('id')
        .inTable('comment')
        .nullable();
    });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public')
    .dropTableIfExists('comment')
    .dropTableIfExists('topic')
    .dropTableIfExists('user');
}

