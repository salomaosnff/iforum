import { FastifyInstance } from 'fastify';
import { CommentController } from './comment.controller';
import { HashtagController } from './hashtag.controller';
import { TopicController } from './topic.controller';
import { UserController } from './user.controller';

export default function setupControllers(fastify: FastifyInstance) {
  fastify.register(TopicController);
  fastify.register(UserController);
  fastify.register(CommentController);
  fastify.register(HashtagController);
}