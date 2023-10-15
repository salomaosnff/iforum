import { Model } from 'objection';
import { UserModel } from '../user/user.model';

export class UserHashtagsModel extends Model {

  static get tableName() {
    return 'user_hashtags';
  }

  user_id: string;
  hashtag: string;

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'user_hashtags.user_id',
          to: 'user.id',
        },
      },
    };
  }
}