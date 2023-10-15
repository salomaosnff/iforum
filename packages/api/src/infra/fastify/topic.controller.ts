import { FastifyPluginCallback } from 'fastify';
import { KnexTopicRepository } from '../knex/topic/topic.repository';
import { FindTopicBySlug } from '@/application/topic/stories/find_topic_by_slug';
import * as TopicPresenter from '@/application/topic/topic.presenter';
import { CreateTopicStory, CreateTopicStoryInput } from '@/application/topic/stories/create_topic.story';
import { KnexUserRepository } from '../knex/user/user.repository';
import { getLoggedUserId } from './util';
import { FindTopicsByUserFeed } from '@/application/topic/stories/find_by_user_feed.story';

export const TopicController: FastifyPluginCallback = async (fastify) => {
  const topicRepository = new KnexTopicRepository();
  const userRepository = new KnexUserRepository();

  fastify.post<{
    Body: CreateTopicStoryInput;
  }>('/topics', async (request,reply) => {
    const createTopic = new CreateTopicStory(topicRepository, userRepository);
    const result = await createTopic.execute({
      ...request.body,
      authorId: getLoggedUserId(request), 
    });
    reply.code(201);

    return result.map(TopicPresenter.publicPresenter);
  });

  fastify.get('/topics/:slug', async (request) => {
    const { slug } = request.params as { slug: string };
    const findBySlug = new FindTopicBySlug(topicRepository);

    const result = await findBySlug.execute(slug);

    return result.map(TopicPresenter.publicPresenter);
  });

  fastify.get<{
    Querystring: {
      page: number,
      size: number
    }
  }>('/feed', async (request) => {
    const {
      page, size, 
    } = request.query;
    const findByUserFeed = new FindTopicsByUserFeed(topicRepository, userRepository);

    const result = await findByUserFeed.execute({
      page,
      size,
      userId: getLoggedUserId(request),
    });

    return result.map(paged => {
      return {
        ...paged,
        items: paged.items.map(TopicPresenter.publicPresenter),
      };
    });
  });
};