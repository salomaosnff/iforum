import { Paged } from '@/@shared/paged';
import { HashtagRepository } from '@/application/hashtag/hashtag.repository';
import { UserEntity } from '@/core/user/user.entity';
import { UserModel } from '../user/user.model';

export class KnexUserHashtagsRepository implements HashtagRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findBySearch(search: string): Promise<Paged<string>> {
    throw new Error('Method not implemented.');
  }

  async follow(hashtag: string, user: UserEntity): Promise<void> {
    await UserModel
      .query()
      .update({ tags: UserModel.knex().raw('array_append(tags, ?)', [hashtag]) })
      .where('id', user.id.value)
      .andWhereNot('tags', '@>', [hashtag]);
  }

  async unfollow(hashtag: string, user: UserEntity): Promise<void> {
    await UserModel
      .query()
      .update({ tags: UserModel.knex().raw('array_remove(tags, ?)', [hashtag]) })
      .where('id', user.id.value)
      .andWhere('tags', '@>', [hashtag]);
  }
}