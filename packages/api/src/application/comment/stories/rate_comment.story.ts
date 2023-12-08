import { Slug } from '@/@shared/vo/slug.vo';
import { CommentRepository } from '../comment.repository';
import { Result } from '@/@shared/result';
import { CommentEntity } from '@/core/comment/comment.entity';
import { CommentNotFoundError } from '../error/comment_not_found.error';
import { Option } from '@/@shared/option';
import { UUID4 } from '@/@shared/vo/UUID4.vo';
import { UserRepository } from '@/application/user/user.repository';
import { UserNotAuthenticatedError } from '@/application/user/error/user_not_authenticated.error';
import { TopicRepository } from '@/application/topic/topic.repository';
import { TopicNotFound } from '@/application/topic/error/topic_not_found';

export interface RateCommentBySlugInput {
  slug: string,
  userId: string,
  commentId: string,
  value: -1 | 0 | 1
}

export class RateCommentBySlug {
  constructor(private commentRepository: CommentRepository, private topicRepository: TopicRepository, private userRepository: UserRepository) { }

  async execute(input: RateCommentBySlugInput): Promise<Result<CommentEntity, CommentNotFoundError>> {
    const user = await this.userRepository.findById(UUID4.of(input.userId).unwrap());

    if (Option.isNone(user)) {
      return Result.fail(new UserNotAuthenticatedError());
    }

    const topicResult = await this.topicRepository.findBySlug(Slug.of(input.slug).unwrap());

    if (Option.isNone(topicResult)) {
      return Result.fail(new TopicNotFound());
    }

    const topic = topicResult.unwrap();

    const commentResult = await this.commentRepository.findById(UUID4.of(input.commentId).unwrap());

    if (Option.isNone(commentResult)) {
      return Result.fail(new CommentNotFoundError());
    }

    const comment = commentResult.unwrap();

    await this.commentRepository.rateComment(comment.id, user.unwrap().id, Math.sign(input.value));

    return Result.ok((await this.commentRepository.findById(topic.id)).unwrap());
  }
}