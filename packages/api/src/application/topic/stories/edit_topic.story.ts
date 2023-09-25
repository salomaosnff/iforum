import { Result } from '@/@shared/result';
import { UUID4 } from '@/@shared/vo/UUID4.vo';
import { UserRepository } from '@/application/user/user.repository';
import { TopicRepository } from '../topic.repository';
import { Option } from '@/@shared/option';
import { TopicNotFound } from '../error/topic_not_found';
import { UserNotAuthenticatedError } from '@/application/user/error/user_not_authenticated.error';
import { UserIsNotAuthorOfComment } from '@/application/comment/error/user_is_not_author_of_comment.error';

export interface EditTopicInput {
  topicId: string;
  body?: string;
  title?: string;
  tags?: string[];
}

export class EditTopicStory {
  constructor (
    private readonly topicRepository: TopicRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: EditTopicInput) {
    
    const topicIdResult = UUID4.of(input.topicId);
    
    if (Result.isFail(topicIdResult)) {
      return topicIdResult;
    }
    
    const topicResult = await this.topicRepository.findById(topicIdResult.unwrap());

    if (Option.isNone(topicResult)) {
      return Result.fail(new TopicNotFound());
    }

    const userResult = await this.userRepository.findById(topicIdResult.unwrap());

    if (Option.isNone(userResult)) {
      return Result.fail(new UserNotAuthenticatedError());
    }

    const author = userResult.unwrap();
    const topic = topicResult.unwrap();
    if (author.id.value !== topic.author.id.value) {
      return Result.fail(new UserIsNotAuthorOfComment());
    }

    const topicUpdateResult = topic.edit({
      body: input.body,
      title: input.title,
      tags: input.tags,
    });

    if (Result.isFail(topicUpdateResult)) {
      return topicUpdateResult;
    }

    await this.topicRepository.update(topic);

    return Result.ok(topic);

  }
}