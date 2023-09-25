import { Entity, EntityFields } from '@/@shared/entity';
import { ValidationError } from '@/@shared/error/validation.error';
import { Result } from '@/@shared/result';
import { InvalidSlugError, Slug } from '@/@shared/vo/slug.vo';
import { UserEntity } from '../user/user.entity';
import { Option } from '@/@shared/option';

export interface TopicFields extends EntityFields {
  slug?: Slug;
  title: string;
  body: string;
  author: UserEntity;
  rate?: number;
  tags?: string[];
  editedAt?: Option<Date>;
}

export class TopicEntity extends Entity {
  slug: Slug;
  title: string;
  body: string;
  author: UserEntity;
  rate: number;
  tags: string[];
  editedAt: Option<Date>;

  static of(data: TopicFields): Result<TopicEntity, ValidationError | InvalidSlugError> {
    data.rate ??= 0;
    data.tags ??= [];
    data.editedAt ??= Option.none();
    if (!data.slug) {
      const slugResult = Slug.ofText(data.title);

      if (Result.isFail(slugResult)) {
        return Result.fail(slugResult.error);
      }

      data.slug = slugResult.unwrap();
    }

    return this.create(new TopicEntity(data));
  }
  edit(data: Partial<Pick<TopicFields,'body'| 'title' | 'tags'>>) {
    return this.assign({
      body: data.body, 
      title: data.title,
      tags: data.tags,
      editedAt: Option.some(new Date()),
    });
  }
  
  validate(): Result<void, ValidationError> {
    if (!this.slug) {
      return Result.fail(new ValidationError('slug is required'));
    }

    if (!this.title) {
      return Result.fail(new ValidationError('title is required'));
    }

    if (!this.body) {
      return Result.fail(new ValidationError('body is required'));
    }

    if (!this.author) {
      return Result.fail(new ValidationError('author is required'));
    }

    if (!(typeof this.rate == 'number' && Number.isFinite(this.rate))) {
      return Result.fail(new ValidationError('title is required'));
    }

    if (!this.tags) {
      return Result.fail(new ValidationError('tags are required'));
    }

    return Result.ok();
  }
}