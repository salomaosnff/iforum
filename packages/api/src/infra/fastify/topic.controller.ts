import { FastifyPluginCallback } from 'fastify';
import { KnexTopicRepository } from '../knex/topic/topic.repository';
import { FindTopicBySlug } from '@/application/topic/stories/find_topic_by_slug';

export const TopicController: FastifyPluginCallback = (fastify, opts, done) => {
  const topicRepository = new KnexTopicRepository();
  
  fastify.get('/topics/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const findBySlug = new FindTopicBySlug(topicRepository);

    const result = await findBySlug.execute(slug);

    reply.send(result);
  });

  done();
};