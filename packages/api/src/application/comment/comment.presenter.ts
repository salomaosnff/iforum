import { CommentEntity } from '@/core/comment/comment.entity';
import * as UserPresenter from '@/application/user/user.presenter';

export function publicPresenter(comment: CommentEntity){
  return {
    id: comment.id.value,
    body: comment.body,
    author: UserPresenter.publicPresenter(comment.author),
    created_at: comment.createdAt,
    edited_at: comment.editedAt,
    rate: comment.rate,
  };
}