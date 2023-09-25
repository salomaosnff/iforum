import { Option } from '@/@shared/option';
import { Result } from '@/@shared/result';
import { UUID4 } from '@/@shared/vo/UUID4.vo';
import { UserNotAuthenticatedError } from '@/application/user/error/user_not_authenticated.error';
import { UserRepository } from '@/application/user/user.repository';
import { TopicNotFound } from '../error/topic_not_found';
import { TopicRepository } from '../topic.repository';

export interface DeleteTopicInput {
  topicId: string;
  userId: string;
}

export class DeleteCommentStory {
  constructor (
    private readonly topicRepository: TopicRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: DeleteTopicInput) {

    const topicId = UUID4.of(input.topicId);

    if (Result.isFail(topicId)) {
      return topicId;
    }

    const userId = UUID4.of(input.userId);

    if (Result.isFail(userId)) {
      return userId;
    }

    const userResult = await this.userRepository.findById(userId.unwrap());

    if (Option.isNone(userResult)) {
      return Result.fail(new UserNotAuthenticatedError());
    }

    const topicResult = await this.topicRepository.findById(topicId.unwrap());

    if (Option.isNone(topicId)) {
      return Result.fail(new TopicNotFound());
    }
    
    const deleteResult = await this.topicRepository.delete(topicResult.unwrap());

    if (Result.isFail(deleteResult)) {
      return deleteResult;
    }

    return Result.ok();

  }
}