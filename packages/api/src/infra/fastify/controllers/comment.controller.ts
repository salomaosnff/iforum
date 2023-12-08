import { CreateCommentInput, CreateCommentStory } from '@/application/comment/stories/create_comment.story';
import { FastifyPluginCallback } from 'fastify';
import * as CommentPresenter from '@/application/comment/comment.presenter'; 
import { FindCommentsByTopicStory } from '@/application/comment/stories/find_comments_by_topic.story';
import { getLoggedUserId } from '../util';
import { KnexCommentRepository } from '@/infra/knex/comment/comment.repository';
import { KnexTopicRepository } from '@/infra/knex/topic/topic.repository';
import { KnexUserRepository } from '@/infra/knex/user/user.repository';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RateCommentStory } from '@/application/comment/stories/rate_comment.story';

export const CommentController: FastifyPluginCallback = async (fastify) => {
  const commentRepository = new KnexCommentRepository();
  const topicRepository = new KnexTopicRepository();
  const userRepository = new KnexUserRepository();

  fastify.post<{Params: {
    slug: string;
  }
  Body: CreateCommentInput}>('/topics/:slug/comments', async (request, reply) => {
    const createComment = new CreateCommentStory(commentRepository, topicRepository, userRepository);
    const result = await createComment.execute({
      ...request.body,
      topicSlug: request.params.slug,
      userId: getLoggedUserId(request),
    });

    reply.code(201);
    return result.map(CommentPresenter.publicPresenter);
  });

  fastify.get<{
    Params: {
      slug: string,
    }
    Querystring: {
      page: number,
      size: number
    }  
  }>('/topics/:slug/comments', async (request) => {
    const findComments = new FindCommentsByTopicStory(commentRepository,topicRepository);
    const result = await findComments.execute({
      size: request.query.size,
      page: request.query.page,
      topicSlug: request.params.slug,
    });

    return result.map(paged => {
      return {
        ...paged,
        items: paged.items.map(CommentPresenter.publicPresenter),
      };
    });
  });
};