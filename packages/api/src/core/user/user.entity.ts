import { Entity, EntityFields } from '@/@shared/entity';
import { ValidationError } from '@/@shared/error/validation.error';
import { Result } from '@/@shared/result';
import { UserRole } from './user_role.enum';
import { AcademicEmail } from '@/@shared/vo/academic_email.vo';

interface UserFields extends EntityFields {
  name: string;
  password: string;
  email: AcademicEmail;
  role?: unknown;
  score?: number;
}

export class UserEntity extends Entity {
  name: string;
  password: string;
  email: AcademicEmail;
  role: UserRole;
  score: number;

  static of(data: UserFields) {
    data.score ??= 0;
    data.role ??= UserRole.STUDENT;
    return  this.create(new UserEntity(data));
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

    if (typeof this.role !== 'number') {
      return Result.fail(new ValidationError('role is required'));
    }

    if (!(typeof this.score === 'number' && Number.isFinite(this.score))) {
      return Result.fail(new ValidationError('score is invalid'));
    }

    return Result.ok();
  }
}