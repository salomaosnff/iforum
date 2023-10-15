import { FastifyPluginCallback } from 'fastify';
import { KnexUserHashtagsRepository } from '../knex/user_hashtags/user_hashtags.repository';
import { KnexUserRepository } from '../knex/user/user.repository';
import { FollowHashtagInput, FollowHashtagStory } from '@/application/hashtag/stories/follow_hashtag.story';
import { getLoggedUserId } from './util';
import { Result } from '@/@shared/result';

export const HashtagController: FastifyPluginCallback = async (fastify) => {
  const hashtagRepository = new KnexUserHashtagsRepository();
  const userRepository = new KnexUserRepository();

  fastify.post<{ Body: FollowHashtagInput }>('/hashtags/follow', async (request, reply) => {
    const followHashtag = new FollowHashtagStory(userRepository, hashtagRepository);
    const result = await followHashtag.execute({
      ...request.body,
      userId: getLoggedUserId(request),
    });


    if (Result.isFail(result)) {
      return result;
    }

    reply.code(201);
    return Result.ok();
  });
};