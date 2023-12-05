import { Slug } from '@/@shared/vo/slug.vo';
import { TopicRepository } from '../topic.repository';
import { Result } from '@/@shared/result';
import { TopicEntity } from '@/core/topic/topic.entity';
import { TopicNotFound } from '../error/topic_not_found';
import { Option } from '@/@shared/option';
import { UUID4 } from '@/@shared/vo/UUID4.vo';
import { UserRepository } from '@/application/user/user.repository';
import { UserNotAuthenticatedError } from '@/application/user/error/user_not_authenticated.error';

export interface RateTopicBySlugInput {
  slug: string,
  userId: string,
  value: -1 | 0 | 1
}

export class RateTopicBySlug {
  constructor(private topicRepository: TopicRepository, private userRepository: UserRepository) { }

  async execute(input: RateTopicBySlugInput): Promise<Result<TopicEntity, TopicNotFound>> {
    const user = await this.userRepository.findById(UUID4.of(input.userId).unwrap());

    if (Option.isNone(user)) {
      return Result.fail(new UserNotAuthenticatedError());
    }

    const topicResult = await this.topicRepository.findBySlug(Slug.of(input.slug).unwrap());

    if (Option.isNone(topicResult)) {
      return Result.fail(new TopicNotFound());
    }

    const topic = topicResult.unwrap();

    await this.topicRepository.rateTopic(topic.id, UUID4.of(input.userId).unwrap(), Math.sign(input.value));

    return Result.ok((await this.topicRepository.findById(topic.id)).unwrap());
  }
}