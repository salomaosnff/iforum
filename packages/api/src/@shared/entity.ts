import { ValidationError } from './error/validation.error';
import { Result } from './result';
import { Id } from './vo/Id.vo';
import { UUID4 } from './vo/UUID4.vo';

export interface EntityFields {
  id?: Id;
  createdAt?: Date;
  updatedAt?: Date;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class Entity<T = any> {
  id: Id;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: EntityFields) {
    data.id ??= UUID4.generate();
    data.createdAt ??= new Date();
    data.updatedAt ??= new Date();

    Object.assign(this, data);

    this.validate();
  }

  static create<T extends Entity>(entity: T): Result<T, ValidationError> {

    const validationResult = entity.validate();

    if (Result.isFail(validationResult)) {
      return Result.fail(validationResult.error);
    }

    return Result.ok(entity);
  }

  assign(data: Partial<T>): Result<this, ValidationError>{
    Object.assign(this, data);
    this.updatedAt = new Date();
    const result = this.validate();
    if (Result.isFail(result)) {
      return Result.fail(result.error);
    }
    return Result.ok(this);
  }  

  abstract validate(): Result<void, ValidationError>;
}