import { Entity, EntityFields } from '@/@shared/entity';
import { ValidationError } from '@/@shared/error/validation.error';
import { Result } from '@/@shared/result';
import { InvalidSlugError, Slug } from '@/@shared/vo/slug.vo';
import { UserEntity } from '../user/user.entity';

export interface TopicFields extends EntityFields {
  slug?: Slug;
  title: string;
  body: string;
  author: UserEntity;
  rate?: number;
  tags?: string[];
}

export class TopicEntity extends Entity {
  slug: Slug;
  title: string;
  body: string;
  author: string;
  rate: number;
  tags: string[];

  static of(data: TopicFields): Result<TopicEntity, ValidationError | InvalidSlugError> {
    data.rate ??= 0;
    data.tags ??= [];

    if (!data.slug) {
      let slugResult = Slug.ofText(data.title);

      if (Result.isFail(slugResult)) {
        return Result.fail(slugResult.error)
      }

      data.slug = slugResult.unwrap();
    }

    return this.create(new TopicEntity(data))
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