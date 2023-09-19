/*eslint-disable @typescript-eslint/no-explicit-any */
import util from 'util';

class Ok<T, E = never> {
  constructor(readonly data: T) {}

  isOk() {
    return true;
  }

  isFail() {
    return false;
  }

  unwrap(): T {
    return this.data;
  }

  map<U, EE>(mapper: (data: T) => Result<U, EE>): Result<U, E | EE>
  map<U>(mapper: (data: T) => U): Result<U, E>
  map<U, EE>(mapper: (data: T) => U | Result<U, EE>): Result<U, E | EE> {
    const result = mapper(this.data);

    if (Result.is(result)) {
      return result;
    }

    return Result.ok(result);
  }

  [util.inspect.custom](depth: any, options: any) {
    return options.stylize(`Result(OK){${util.inspect(this.data)}}`, 'spetial');
  }
}

class Fail<E, T = never> {
  constructor(readonly error: T) {}

  isOk() {
    return false;
  }

  isFail() {
    return true;
  }

  unwrap(): T {
    throw this.error;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  map<U, EE>(mapper: (data: T) => Result<U, EE>) {
    return this as unknown as Result<U, E | EE>;  
  }

  [util.inspect.custom](depth: any, options: any) {
    return options.stylize(`Result(Fail){${util.inspect(this.error)}}`, 'spetial');
  }
}

export type Result<T, E> = Ok<T, E> | Fail<E, T>

/**
 * Cria um resultado de sucesso
 */
function ok<T>(data: T): Ok<T>;
function ok(): Ok<void>;
function ok(data?: any) {
  return new Ok(data);
}

/**
 * Cria um resultado de falha
 */
function fail<E>(error: E) {
  return new Fail<E, any>(error);
}

function isOk<T,E>(result: Result<T,E>): result is Ok<T, E>{
  return result instanceof Ok;
}

function isFail<T,E>(result: Result<T,E>): result is Fail<E, T>{
  return result instanceof Fail;
}

function is<T, E>(value: any): value is Result<T, E> {
  return isOk(value) || isFail(value);
}

export const Result = {
  ok,
  fail,
  is,
  isOk,
  isFail,
};