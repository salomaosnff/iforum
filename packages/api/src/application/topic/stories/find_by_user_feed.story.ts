import { Result } from '@/@shared/result';
import { TopicRepository } from '../topic.repository';
import { ValidationError } from '@/@shared/error/validation.error';
import { UserRepository } from '@/application/user/user.repository';
import { Paged } from '@/@shared/paged';
import { TopicEntity } from '@/core/topic/topic.entity';
import { TopicNotFound } from '../error/topic_not_found';
import { UUID4 } from '@/@shared/vo/UUID4.vo';
import { Option } from '@/@shared/option';
import { UserNotAuthenticatedError } from '@/application/user/error/user_not_authenticated.error';

export interface FindTopicsByUserFeedInput {
  userId: string
  page?: number
  size?: number
}

export class FindTopicsByUserFeed {
  constructor(private topicRepository: TopicRepository, private userRepository: UserRepository) { }

  async execute(input: FindTopicsByUserFeedInput): Promise<Result<Paged<TopicEntity>, TopicNotFound>> {
    if (!input) {
      return Result.fail(new ValidationError('missing input'));
    }

    const userIdResult = UUID4.of(input.userId);

    if (Result.isFail(userIdResult)) {
      return Result.fail(userIdResult.error);
    }

    const userResult = await this.userRepository.findById(userIdResult.unwrap());

    if (Option.isNone(userResult)) {
      return Result.fail(new UserNotAuthenticatedError());
    }

    const result = await this.topicRepository.findByUserFeed(userResult.unwrap(), input.page ?? 1, input.size ?? 20);

    return Result.ok(result);
  }
}