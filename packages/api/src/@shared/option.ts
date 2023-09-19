/*eslint-disable @typescript-eslint/no-explicit-any */
import util from 'util';

export class Some<T> {
  constructor(readonly data: T) {}

  isSome() {
    return true;
  }

  isNone() {
    return false;
  }

  unwrap(): T {
    return this.data;
  }

  map<U>(mapper: (data: T) => Option<U>): Option<U>
  map<U>(mapper: (data: T) => U): Option<U>
  map<U>(mapper: (data: T) => U | Option<U>): Option<U> {
    const result = mapper(this.data);

    if (Option.is(result)) {
      return result;
    }

    return Option.some(result);
  }

  [util.inspect.custom](depth: any, options: any) {
    return options.stylize(`Some{${util.inspect(this.data)}}`, 'spetial');
  }
}

export class None{

  isSome() {
    return false;
  }

  isNone() {
    return true;
  }

  unwrap(): void {
    throw new Error('Called Option::unwrap() on a None value');
  }

  map<U>(mapper: (data: unknown) => Option<U>): Option<U>
  map<U>(mapper: (data: unknown) => U): Option<U>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  map<U>(mapper: (data: unknown) => U | Option<U>): Option<U> {
    return this;
  }

  [util.inspect.custom](depth: any, options: any) {
    return options.stylize('None', 'spetial');
  }
}

export type Option<T> = Some<T> | None

/**
 * Cria um resultado de sucesso
 */
function some<T>(data: T): Some<T>{
  return new Some(data);
}

/**
 * Cria um resultado de falha
 */
const _none = new None();

function none() {
  return _none;
}


function isSome<T>(result: Option<T>): result is Some<T>{
  return result instanceof Some;
}

function isNone<T>(result: Option<T>): result is None{
  return result === _none;
}

function is<T>(value: any): value is Option<T> {
  return isSome(value) || isNone(value);
}

export const Option = {
  none,
  some,
  is,
  isSome,
  isNone,
};