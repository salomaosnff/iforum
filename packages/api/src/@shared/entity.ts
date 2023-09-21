import { ValidationError } from './error/validation.error';
import { Result } from './result';
import { Id } from './vo/Id.vo';
import { UUID4 } from './vo/UUID4.vo';

export interface EntityFields {
  id?: Id;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class Entity {
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
    const validationResult = entity.validate() as Result<T, ValidationError>;

    if (validationResult.isOk()) {
      return Result.ok(entity);
    }

    return validationResult;
  }

  abstract validate(): Result<void, ValidationError>;
}