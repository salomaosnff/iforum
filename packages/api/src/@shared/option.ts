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

export const Option = {
  none,
  some,
  isSome,
  isNone,
};