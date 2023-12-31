import { Option } from '@/@shared/option';
import { Paged } from '@/@shared/paged';
import { Result } from '@/@shared/result';
import { Id } from '@/@shared/vo/Id.vo';
import { Slug } from '@/@shared/vo/slug.vo';
import { TopicRepository } from '@/application/topic/topic.repository';
import { TopicEntity } from '@/core/topic/topic.entity';
import { UserEntity } from '@/core/user/user.entity';
import { TopicModel } from './topic.model';
// import { UserModel } from '../user/user.model';
import { RateModel } from './rate.model';

export class KnexTopicRepository implements TopicRepository {
  async create(topic: TopicEntity): Promise<Result<TopicEntity, Error>> {
    const model = TopicModel.fromEntity(topic);

    await TopicModel.query().insert(model);

    return Result.ok(topic);
  }

  async findBySlug(slug: Slug): Promise<Option<TopicEntity>> {
    const topic = await TopicModel
      .query()
      .where('slug', '=', slug.value)
      .withGraphJoined('author')
      .first();

    if (topic) {
      return Option.some(topic.toEntity());
    }

    return Option.none();
  }

  async findById(id: Id<string>): Promise<Option<TopicEntity>> {
    const topic = await TopicModel.query().where('topic.id', '=', id.value).withGraphJoined('author').first();

    if (topic) {
      return Option.some(topic.toEntity());
    }

    return Option.none();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findByUserFeed(user: UserEntity, page: number, size: number): Promise<Paged<TopicEntity>> {
    const result = await TopicModel
      .query()
      // .where('topic.tags', '&&', UserModel.query().select('tags').where('id', '=', user.id.value))
      .withGraphJoined('author')
      .page(page - 1, size)
      .orderBy('created_at', 'desc');

    return {
      items: result.results.map(topic => topic.toEntity()),
      totalItems: result.total,
      totalPages: Math.ceil(result.total / size),
    };
  }

  async delete(topic: TopicEntity): Promise<Result<void, Error>> {
    await TopicModel.query().deleteById(topic.id.value);

    return Result.ok();
  }

  async update(topic: TopicEntity): Promise<Result<TopicEntity, Error>> {
    const model = TopicModel.fromEntity(topic);
    await TopicModel.query().update(model).where('id', '=', model.id);

    return Result.ok(topic);
  }

  async rateTopic(topicId: Id<string>, userId: Id<string>, value: number): Promise<Result<void, Error>> {
    value = Math.sign(value);

    await RateModel.query().insert({
      topic_id: topicId.value,
      user_id: userId.value,
      value,
    }).onConflict([
      'topic_id',
      'user_id',
    ]).merge();

    await TopicModel.query().update({ rate: TopicModel.relatedQuery('rates').sum('value') }).where('id', topicId.value);
    
    return Result.ok();
  }
}