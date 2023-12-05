import { BaseModel } from '../_util/base_model';
import { UserModel } from '../user/user.model';
import { CommentModel } from '../comment/comment.model';
import { TopicModel } from './topic.model';

export class RateModel extends BaseModel {

  static get tableName() {
    return 'rate';
  }

  topic_id?: string;
  comment_id?: string;
  user_id?: string;
  value: number;
  topic?: TopicModel;
  comment?: CommentModel;
  user?: UserModel;

  static get relationMappings() {
    return {
      topic: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: TopicModel,
        join: {
          from: 'rate.topic_id',
          to: 'topic.id',
        },
      }, 
      comment: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: CommentModel,
        join: {
          from: 'rate.topic_id',
          to: 'comment.id',
        },
      }, 
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'rate.user_id',
          to: 'user.id',
        },
      }, 
    };
  }
}