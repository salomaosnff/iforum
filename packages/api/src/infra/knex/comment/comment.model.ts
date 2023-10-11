import { BaseModel } from '../_util/base_model';
import { UserModel } from '../user/user.model';
import { UUID4 } from '@/@shared/vo/UUID4.vo';
import { Option } from '@/@shared/option';
import { assignDefined } from '../_util/assign_defined';
import { CommentEntity } from '@/core/comment/comment.entity';

export class CommentModel extends BaseModel {

  static get tableName() {
    return 'comment';
  }

  author: UserModel;
  body: string;
  rate: number;
  reply_to?: string;
  topic_id: string;
  edited_at?: Date;

  toEntity() {
    return CommentEntity.of({
      id: UUID4.of(this.id).unwrap(),
      author: this.author.toEntity(),
      body: this.body,
      rate: this.rate,
      replyTo: this.reply_to ? Option.some(UUID4.of(this.reply_to).unwrap()) 
        : Option.none(),
      topicId: UUID4.of(this.topic_id).unwrap(),
      editedAt: this.edited_at ? Option.some(this.edited_at) : Option.none(),
    }).unwrap();
  }

  static toPlain(data: Partial<CommentEntity>): Partial<CommentModel> {
    return assignDefined({
      id: data.id?.value,
      author: data.author && UserModel.fromEntity(data.author),
      rate: data.rate,
      replyTo: data.replyTo && Option.isSome(data.replyTo) ? 
        data.replyTo.unwrap().value : undefined,
      topicId: data.topicId?.value,
      editedAt: data.editedAt && Option.isSome(data.editedAt) ? 
        data.editedAt.unwrap() : undefined,
    });
  }

  static fromEntity(data: CommentEntity) {
    return Object.assign(new CommentModel(), CommentModel.toPlain(data));
  }
}