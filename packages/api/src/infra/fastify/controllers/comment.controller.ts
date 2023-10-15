import { CreateCommentInput, CreateCommentStory } from '@/application/comment/stories/create_comment.story';
import { FastifyPluginCallback } from 'fastify';
import * as CommentPresenter from '@/application/comment/comment.presenter'; 
import { FindCommentsByTopicStory } from '@/application/comment/stories/find_comments_by_topic.story';
import { getLoggedUserId } from '../util';
import { KnexCommentRepository } from '@/infra/knex/comment/comment.repository';
import { KnexTopicRepository } from '@/infra/knex/topic/topic.repository';
import { KnexUserRepository } from '@/infra/knex/user/user.repository';

export const CommentController: FastifyPluginCallback = async (fastify) => {
  const commentRepository = new KnexCommentRepository();
  const topicRepository = new KnexTopicRepository();
  const userRepository = new KnexUserRepository();

  fastify.post<{Params: {
    topic_id: string;
  }
  Body: CreateCommentInput}>('/topics/:topic_id/comments', async (request, reply) => {
    const createComment = new CreateCommentStory(commentRepository, topicRepository, userRepository);
    const result = await createComment.execute({
      ...request.body,
      topicId: request.params.topic_id,
      userId: getLoggedUserId(request),
    });

    reply.code(201);
    return result.map(CommentPresenter.publicPresenter);
  });

  fastify.get<{
    Params: {
      topic_id: string,
    }
    Querystring: {
      page: number,
      size: number
    }  
  }>('/topics/:topic_id/comments', async (request) => {
    const findComments = new FindCommentsByTopicStory(commentRepository);
    const result = await findComments.execute({
      size: request.query.size,
      page: request.query.page,
      topicId: request.params.topic_id,
    });

    return result.map(paged => {
      return {
        ...paged,
        items: paged.items.map(CommentPresenter.publicPresenter),
      };
    });
  });
};