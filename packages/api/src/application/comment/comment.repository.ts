/* eslint-disable @typescript-eslint/no-explicit-any */
import { Option } from '@/@shared/option';
import { PageParams, Paged } from '@/@shared/paged';
import { Result } from '@/@shared/result';
import { CommentEntity } from '@/core/comment/comment.entity';
import { TopicEntity } from '@/core/topic/topic.entity';

export interface CommentRepository {
  create(comment: CommentEntity): Promise<Result<CommentEntity, any>>;
  findById(commentId: CommentEntity['id']): Promise<Option<CommentEntity>>;
  update(comment: CommentEntity): Promise<Result<CommentEntity, any>>
  delete(comment: CommentEntity): Promise<Result<void, any>>
  findByTopicId(topicId: TopicEntity['id'], pageParams: PageParams): Promise<Result<Paged<CommentEntity>, any>>
}