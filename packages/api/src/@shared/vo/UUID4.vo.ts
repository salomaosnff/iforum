import { randomUUID } from 'crypto';
import { Id } from './Id.vo';
import { Result } from '../result';

export class InvalidUUID4Error extends Error {
  name = 'InvalidUUID4Error';
  message = 'Invalid UUID4';
}

export class UUID4 extends Id<string>{
  static of(id: string): Result<UUID4, InvalidUUID4Error> {
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
      return Result.fail(new InvalidUUID4Error());
    }

    return Result.ok(new UUID4(id));
  }

  static generate() {
    return this.of(randomUUID()).unwrap();
  }
}