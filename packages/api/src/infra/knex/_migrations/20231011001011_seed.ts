import { Knex } from 'knex';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';


export async function up(knex: Knex): Promise<void> {
  const user_id = randomUUID();
  const topic_id = randomUUID();

  await knex('user').insert({
    id: user_id,
    name: 'Ênio Carlos',
    email: 'enio@aluno.ifce.edu.br',
    role: 0,
    password: bcrypt.hashSync('123456', 10),
  });

  await knex('topic').insert({
    id: topic_id,
    slug: 'hello-world',
    title: 'Hello World!',
    body: 'Este é o primeiro tópico do ifórum, espero que gostem!',
    author_id: user_id,
    rate: 0,
    tags: [
      'hello',
      'world',
    ],
  });

  await knex('comment').insert({
    author_id: user_id,
    body: 'Presta não!',
    rate: 0,
    topic_id: topic_id,
    reply_to: null,
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex('comment').del();
  await knex('topic').del();
  await knex('user').del();
}

