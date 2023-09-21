import { Result } from "@/@shared/result";
import { CommentEntity } from "@/core/comment/comment.entity";

export interface CommentRepository {
  create(comment: CommentEntity): Promise<Result<CommentEntity, any>>;
}