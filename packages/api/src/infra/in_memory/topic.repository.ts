/* eslint-disable @typescript-eslint/no-unused-vars */
import { Option } from '@/@shared/option';
import { Paged } from '@/@shared/paged';
import { Result } from '@/@shared/result';
import { Id } from '@/@shared/vo/Id.vo';
import { TopicRepository } from '@/application/topic/topic.repository';
import { TopicEntity } from '@/core/topic/topic.entity';
import { UserEntity } from '@/core/user/user.entity';

export class InMemoryTopicRepository implements TopicRepository {
  db = new Map<string, TopicEntity>();

  async findById(id: Id<string>): Promise<Option<TopicEntity>> {
    const topic = this.db.get(id.value);

    return topic ? Option.some(topic) : Option.none();
  }
  
  async findByUserFeed(_user: UserEntity): Promise<Paged<TopicEntity>> {
    throw new Error('Method not implemented.');
  }
  
  async delete(topic: TopicEntity): Promise<Result<void, Error>> {
    this.db.delete(topic.id.value);

    return Result.ok();
  }
  
  async update(topic: TopicEntity): Promise<Result<TopicEntity, Error>> {
    this.db.set(topic.id.value, topic);
    return Result.ok(topic);
  }

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