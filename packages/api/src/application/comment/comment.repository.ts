/* eslint-disable @typescript-eslint/no-explicit-any */
import { Option } from '@/@shared/option';
import { PageParams, Paged } from '@/@shared/paged';
import { Result } from '@/@shared/result';
import { CommentEntity } from '@/core/comment/comment.entity';
import { TopicEntity } from '@/core/topic/topic.entity';

export interface CommentRepository {
  create(comment: CommentEntity): Promise<Result<CommentEntity, Error>>;
  findById(commentId: CommentEntity['id']): Promise<Option<CommentEntity>>;
  update(comment: CommentEntity): Promise<Result<CommentEntity, Error>>
  delete(comment: CommentEntity): Promise<Result<void, Error>>
  findByTopicId(topicId: TopicEntity['id'], pageParams: PageParams): Promise<Result<Paged<CommentEntity>, Error>>
}