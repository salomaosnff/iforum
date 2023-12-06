import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').createTable('rate', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('topic_id').references('id').inTable('topic');
    table.uuid('comment_id').references('id').inTable('comment');
    table.uuid('user_id').references('id').inTable('user');
    table.integer('value').defaultTo(0);
    table.timestamps(true, true);
    table.unique([
      'topic_id',
      'user_id',
    ], { indexName: 'UQ_rate_topic_user' });
    table.unique([
      'comment_id',
      'user_id',
    ], { indexName: 'UQ_rate_comment_user' });
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').dropTable('rate');
}

