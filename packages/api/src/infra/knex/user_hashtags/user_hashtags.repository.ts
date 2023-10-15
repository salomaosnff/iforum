import { Paged } from '@/@shared/paged';
import { HashtagRepository } from '@/application/hashtag/hashtag.repository';
import { UserEntity } from '@/core/user/user.entity';
import { UserHashtagsModel } from './user_hashtags.model';

export class KnexUserHashtagsRepository implements HashtagRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findBySearch(search: string): Promise<Paged<string>> {
    throw new Error('Method not implemented.');
  }

  async follow(hashtag: string, user: UserEntity): Promise<void> {
    await UserHashtagsModel.query().insert({
      user_id: user.id.value,
      hashtag,
    }).returning([
      'user_id',
      'hashtag',
    ]).onConflict([
      'user_id',
      'hashtag',
    ]).ignore();
  }
}