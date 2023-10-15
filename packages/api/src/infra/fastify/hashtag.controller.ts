import { FastifyPluginCallback } from 'fastify';
import { KnexUserHashtagsRepository } from '../knex/hashtags/hashtags.repository';
import { KnexUserRepository } from '../knex/user/user.repository';
import { FollowHashtagInput, FollowHashtagStory } from '@/application/hashtag/stories/follow_hashtag.story';
import { getLoggedUserId } from './util';
import { Result } from '@/@shared/result';
import { UnFollowHashtagStory } from '@/application/hashtag/stories/unfollow_hashtag.story copy';

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

  fastify.delete<{ Querystring: { hashtag: string } }>('/hashtags/unfollow', async (request, reply) => {
    const { hashtag } = request.query;
    const unFollowHashtag = new UnFollowHashtagStory(userRepository, hashtagRepository);

    await unFollowHashtag.execute({
      hashtag,
      userId: getLoggedUserId(request),
    });

    reply.code(204);

    return Result.ok();
  });
};