import { Option } from '@/@shared/option';
import { Result } from '@/@shared/result';
import { TopicRepository } from '@/application/topic/topic.repository';
import { TopicEntity } from '@/core/topic/topic.entity';

export class InMemoryTopicRepository implements TopicRepository {
  db = new Map<string, TopicEntity>();

  async create(topic: TopicEntity): Promise<Result<TopicEntity, any>> {
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