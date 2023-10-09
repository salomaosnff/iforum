/* eslint-disable @typescript-eslint/no-unused-vars */
import { Option } from '@/@shared/option';
import { Paged } from '@/@shared/paged';
import { Result } from '@/@shared/result';
import { Id } from '@/@shared/vo/Id.vo';
import { TopicRepository } from '@/application/topic/topic.repository';
import { TopicEntity } from '@/core/topic/topic.entity';
import { UserEntity } from '@/core/user/user.entity';

export class InMemoryTopicRepository implements TopicRepository {
  findById(_id: Id<string>): Promise<Option<TopicEntity>> {
    throw new Error('Method not implemented.');
  }
  findByUserFeed(_user: UserEntity): Promise<Paged<TopicEntity>> {
    throw new Error('Method not implemented.');
  }
  delete(_topic: TopicEntity): Promise<Result<void, Error>> {
    throw new Error('Method not implemented.');
  }
  update(_topic: TopicEntity): Promise<Result<TopicEntity, Error>> {
    throw new Error('Method not implemented.');
  }
  db = new Map<string, TopicEntity>();

  async create(topic: TopicEntity): Promise<Result<TopicEntity, Error>> {
    this.db.set(topic.id.value, topic);
    return Result.ok(topic);
  }

  async findBySlug(slug: TopicEntity['slug']): Promise<Option<TopicEntity>> {
    for (const topic of this.db.values()){
      if (topic.slug.value === slug.value){
        return Option.some(topic);
      }
    }

    return Option.none();
  }
}