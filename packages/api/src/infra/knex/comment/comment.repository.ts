import { Option } from '@/@shared/option';
import { PageParams, Paged } from '@/@shared/paged';
import { Result } from '@/@shared/result';
import { Id } from '@/@shared/vo/Id.vo';
import { CommentRepository } from '@/application/comment/comment.repository';
import { CommentEntity } from '@/core/comment/comment.entity';
import { CommentModel } from './comment.model';

export class KnexCommentRepository implements CommentRepository {
  async create(comment: CommentEntity): Promise<Result<CommentEntity, Error>> {
    const model = CommentModel.fromEntity(comment);

    await CommentModel.query().insert(model);

    return Result.ok(comment);
  }

  async findById(commentId: Id<string>): Promise<Option<CommentEntity>> {
    const model = await CommentModel.query().findById(commentId.value);

    if (model) {
      return Option.some(model.toEntity());
    }

    return Option.none();
  }

  async update(comment: CommentEntity): Promise<Result<CommentEntity, Error>> {
    const model = CommentModel.fromEntity(comment);
    await CommentModel.query().update(model).where('id', '=', model.id);

    return Result.ok(comment);
  }

  async delete(comment: CommentEntity): Promise<Result<void, Error>> {
    await CommentModel.query().deleteById(comment.id.value);

    return Result.ok();
  }
  async findByTopicId(topicId: Id<string>, pageParams: PageParams): Promise<Result<Paged<CommentEntity>, Error>> {
    const commentsQuery = CommentModel.query().where('topic_id', '=', topicId.value).withGraphJoined('author');

    const [
      totalItems,
      comments,
    ] = await Promise.all([
      commentsQuery.resultSize(),
      commentsQuery.clone().limit(pageParams.size).offset((pageParams.page - 1) * pageParams.size),
    ]);

    return Result.ok({
      items: comments.map(comment => comment.toEntity()),
      totalItems,
      totalPages: Math.ceil(totalItems / pageParams.size),
    });
  }
}