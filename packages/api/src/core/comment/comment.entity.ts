import { Entity, EntityFields } from '@/@shared/entity';
import { ValidationError } from '@/@shared/error/validation.error';
import { Result } from '@/@shared/result';
import { UserEntity } from '../user/user.entity';
import { TopicEntity } from '../topic/topic.entity';
import { Id } from '@/@shared/vo/Id.vo';

export interface CommentFields extends EntityFields {
  author: UserEntity;
  body: string;
  rate?: number;
  replyTo?: CommentEntity['id'];
  topicId: TopicEntity['id'];
}


export class CommentEntity extends Entity{
  author: UserEntity;
  body: string;
  rate: number;
  replyTo?: CommentEntity['id'];
  topicId: TopicEntity['id'];

  static of(data: CommentFields) {
    return this.create(new CommentEntity(data));
  }

  validate(): Result<void, ValidationError> {
    if (!this.author){
      return Result.fail(new ValidationError('author is required'));
    }
    if (!this.body){
      return Result.fail(new ValidationError('body is required'));
    }
    if (typeof this.rate !== 'number' || !Number.isFinite(this.rate)){
      return Result.fail(new ValidationError('rate is required'));
    }
    if (this.replyTo && this.replyTo instanceof Id){
      return Result.fail(new ValidationError('replyTo is invalid'));
    }
    if (this.topicId instanceof Id){
      return Result.fail(new ValidationError('topicId is invalid'));
    }

    return Result.ok();
  }

}