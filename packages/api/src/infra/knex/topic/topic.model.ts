import { TopicEntity } from '@/core/topic/topic.entity';
import { BaseModel } from '../_util/base_model';
import { UserModel } from '../user/user.model';
import { UUID4 } from '@/@shared/vo/UUID4.vo';
import { Slug } from '@/@shared/vo/slug.vo';
import { Option } from '@/@shared/option';
import { assignDefined } from '../_util/assign_defined';

export class TopicModel extends BaseModel {

  static get tableName() {
    return 'topic';
  }

  slug?: string;
  title: string;
  body: string;
  author: UserModel;
  rate?: number;
  tags?: string[];
  edited_at?: Date;

  static get relationMappings() {
    return {
      author: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'topic.author_id',
          to: 'user.id',
        },
      }, 
    };
  }

  toEntity() {
    return TopicEntity.of({
      id: UUID4.of(this.id).unwrap(),
      author: this.author.toEntity(),
      body: this.body,
      title: this.title,
      rate: this.rate,
      slug: (this.slug && Slug.of(this.slug).unwrap()) as Slug,
      tags: this.tags,
      editedAt: this.edited_at ? Option.some(this.edited_at) : Option.none(),
      updatedAt: this.updated_at,
      createdAt: this.created_at,
    }).unwrap();
  }

  static toPlain(data: Partial<TopicEntity>): Partial<TopicModel> {
    return assignDefined({
      id: data.id?.value,
      author: data.author && UserModel.fromEntity(data.author) ,
      body: data.body,
      title: data.title,
      rate: data.rate,
      slug: data.slug?.value,
      tags: data.tags,
      edited_at: data.editedAt && Option.isSome(data.editedAt) ? 
        data.editedAt.unwrap() : undefined,
      updated_at: data.updatedAt,
      created_at: data.updatedAt,
    });
  }

  static fromEntity(data: TopicEntity) {
    return Object.assign(new TopicModel(), TopicModel.toPlain(data));
  }
}