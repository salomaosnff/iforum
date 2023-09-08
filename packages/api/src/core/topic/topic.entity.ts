import { Entity } from '@/@shared/Entity';
import { ValidationError } from '@/@shared/error/validation.error';
import { Result } from '@/@shared/result';

export interface TopicFields extends Entity{
  slug: string;
  title: string;
  body: string;
  author: string;
  rate: number;
  tags: string[];
}

export class TopicEntity extends Entity{
  slug: string;
  title: string;
  body: string;
  author: string;
  rate: number;
  tags: string[];


  validate(): Result<void, ValidationError> {
    if (!this.slug){
      return Result.fail(new ValidationError('slug is required'));
    }

    if (!this.title){
      return Result.fail(new ValidationError('title is required'));
    }

    if (!this.body){
      return Result.fail(new ValidationError('body is required'));
    }
    if (!this.author){
      return Result.fail(new ValidationError('author is required'));
    }

    if (!(typeof this.rate == 'number' && Number.isFinite(this.rate))){
      return Result.fail(new ValidationError('title is required'));
    }

    if (!this.tags){
      return Result.fail(new ValidationError('tags are required'));
    }

    return Result.ok();
  }
}