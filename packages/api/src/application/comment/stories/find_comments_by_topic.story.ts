import { CommentRepository } from '../comment.repository';
import { Result } from '@/@shared/result';
import { InvalidUUID4Error, UUID4 } from '@/@shared/vo/UUID4.vo';
import { Paged } from '@/@shared/paged';
import { CommentEntity } from '@/core/comment/comment.entity';

export interface FindCommentsByTopicInput {
  topicId: string;
  page?: number
  size?: number
}

export class FindCommentsByTopicStory {
  constructor (
    private readonly commentRepository: CommentRepository,
  ) {}

  async execute(input: FindCommentsByTopicInput): Promise<Result<Paged<CommentEntity>, InvalidUUID4Error>> {
    const topicIdResult = UUID4.of(input.topicId);
    
    if (Result.isFail(topicIdResult)) {
      return Result.fail(topicIdResult.error);
    }

    return this.commentRepository.findByTopicId(topicIdResult.unwrap(), {
      page: input.page ?? 1,
      size: input.size ?? 20,
    });
  }
}






