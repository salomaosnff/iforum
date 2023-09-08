/*eslint-disable @typescript-eslint/no-explicit-any */
import util from 'util';

class Ok<T> {
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

  [util.inspect.custom](depth: any, options: any) {
    return options.stylize(`Result(OK){${util.inspect(this.data)}}`, 'spetial');
  }
}

class Fail<T> {
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

  [util.inspect.custom](depth: any, options: any) {
    return options.stylize(`Result(Fail){${util.inspect(this.error)}}`, 'spetial');
  }
}

export type Result<T, E> = Ok<T> | Fail<E>

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
  return new Fail(error);
}

export const Result = {
  ok,
  fail,
};