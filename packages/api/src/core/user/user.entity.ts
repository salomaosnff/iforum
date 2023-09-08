import { Entity, EntityFields } from '@/@shared/Entity';
import { ValidationError } from '@/@shared/error/validation.error';
import { Result } from '@/@shared/result';

interface UserFields extends EntityFields {
  name: string;
  password: string;
  email: string;
  role: unknown;
  score: number;
}

export class UserEntity extends Entity {
  name: string;
  password: string;
  email: string;
  role: unknown;
  score: number;

  static of(data: UserFields) {
    return new UserEntity(data);
  }

  validate(): Result<void, ValidationError> {
    if (!this.name) {
      return Result.fail(new ValidationError('name is required'));
    }

    if (!this.password) {
      return Result.fail(new ValidationError('password is required'));
    }

    if (!this.email) {
      return Result.fail(new ValidationError('email is required'));
    }

    if (!this.role) {
      return Result.fail(new ValidationError('role is required'));
    }

    if (!(typeof this.score === 'number' && Number.isFinite(this.score))) {
      return Result.fail(new ValidationError('score is invalid'));
    }

    return Result.ok();
  }
}