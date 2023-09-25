import { CommentRepository } from '../comment.repository';
import { CommentEntity } from '@/core/comment/comment.entity';
import { UUID4 } from '@/@shared/vo/UUID4.vo';
import { Result } from '@/@shared/result';
import { TopicRepository } from '@/application/topic/topic.repository';
import { Option } from '@/@shared/option';
import { TopicNotFound } from '@/application/topic/error/topic_not_found';
import { UserRepository } from '@/application/user/user.repository';
import { UserNotAuthenticatedError } from '@/application/user/error/user_not_authenticated.error';

export interface CreateCommentInput {
  body: string;
  topicId: string;
  userId: string;
  replyToId?: string;
}

export class CreateCommentStory {
  constructor (
    private readonly commentRepository: CommentRepository,
    private readonly topicRepository: TopicRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: CreateCommentInput) {
    const topicIdResult = UUID4.of(input.topicId);

    if (Result.isFail(topicIdResult)) {
      return topicIdResult;
    }

    const topicId = topicIdResult.unwrap();

    const userIdResult = UUID4.of(input.userId);

    if (Result.isFail(userIdResult)) {
      return userIdResult;
    }

    const replyToIdResult = input.replyToId ? 
      UUID4.of(input.replyToId).map(id => Option.some(id)) : 
      Result.ok(Option.none<UUID4>());

    if (Result.isFail(replyToIdResult)) {
      return replyToIdResult;
    }

    const userResult = await this.userRepository.findById(userIdResult.unwrap());

    if (Option.isNone(userResult)) {
      return Result.fail(new UserNotAuthenticatedError());
    }

    const author = userResult.unwrap();

    if (Option.isNone(await this.topicRepository.findById(topicId))) {
      return Result.fail(new TopicNotFound());
    }

    const commentResult = CommentEntity.of({
      body: input.body,
      topicId,
      author,
      replyTo: replyToIdResult.unwrap(),
    });

    if (Result.isFail(commentResult)) {
      return commentResult;
    }

    const comment = commentResult.unwrap();

    await this.commentRepository.create(comment);

    return Result.ok(comment);
  }
}