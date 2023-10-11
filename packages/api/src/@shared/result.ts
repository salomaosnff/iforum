/*eslint-disable @typescript-eslint/no-explicit-any */
import util from 'util';

export abstract class Result<T, E> {
  abstract isOk(): boolean;
  abstract isFail(): boolean;
  abstract unwrap(): T;

  static isOk<T, E>(value: Result<T, E>): value is Ok<T, E> {
    return value instanceof Ok;
  }

  static isFail<T, E>(value: Result<T, E>): value is Fail<E, T> {
    return value instanceof Fail;
  }

  static is<T, E>(value: any): value is Result<T, E> {
    return value instanceof Result;
  }

  static ok<T>(data: T): Ok<T>;
  static ok(): Ok<void>;
  static ok(data?: any) {
    return new Ok(data);
  }

  static fail<E>(error: E): Result<any, E> {
    return new Fail(error);
  }

  map<U>(fn: (data: T) => Result<U, E>): Result<U, E>;
  map<U>(fn: (data: T) => U): Result<U, E>;
  map<U>(fn: (data: T) => U | Result<U, E>): Result<U, E> {
    if (Result.isFail(this)) {
      return this as any;
    }

    const result = fn(this.unwrap());

    if (Result.is(result)) {
      return result;
    }

    return Result.ok(result);
  }

  static try<T, E>(fn: () => Promise<Result<T, E>>): Promise<Result<T, E>>
  static try<T, E>(fn: () => Promise<T>): Promise<Result<T, E>>
  static try<T, E>(fn: () => Result<T, E>): Result<T, E>
  static try<T, E>(fn: () => T): Result<T, E>
  static try(fn: any): any {
    try {
      const result = fn();

      if (result instanceof Promise) {
        return result.then(Result.ok).catch(Result.fail);
      }

      if (Result.is(result)) {
        return result;
      }

      return Result.ok(result);
    }
    catch (err) {
      return Result.fail(err);
    }
  }
}

class Ok<T, E = any> extends Result<T, E> {
  constructor(readonly data: T) {
    super();
  }

  [util.inspect.custom](depth: any, options: any) {
    return options.stylize(`Ok{${util.inspect(this.data)}}`, 'special');
  }

  isOk() {
    return true;
  }

  isFail() {
    return false;
  }

  unwrap() {
    return this.data;
  }
}

class Fail<E, T = any> extends Result<T, E> {
  constructor(readonly error: E) {
    super();
  }

  [util.inspect.custom](depth: any, options: any) {
    return options.stylize(`Fail{${util.inspect(this.error)}}`, 'special');
  }

  isOk() {
    return false;
  }

  isFail() {
    return true;
  }

  unwrap(): T {
    throw this.error;
  }
}
