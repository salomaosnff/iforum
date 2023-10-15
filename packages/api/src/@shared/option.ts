/*eslint-disable @typescript-eslint/no-explicit-any */
import util from 'util';

export abstract class Option<T> {
  abstract unwrap(): T;

  static isSome<T>(value: Option<T>): boolean {
    return value instanceof Some;
  }

  static isNone<T>(value: Option<T>): boolean {
    return value === _None;
  }

  static some<T>(data: T): Option<T> {
    return new Some(data);
  }

  static is<T>(value: any): value is Option<T> {
    return value instanceof Option;
  }

  static from<T>(value: T | null | undefined): Option<T> {
    if ((value ?? null) === null) {
      return Option.none();
    }

    return Option.some(value as T);
  }

  static none<T>(): Option<T> {
    return _None;
  }

  /**
   * Maps an Option<T> to Option<U> by applying a function to a contained value.
   * @param fn The function to apply
   * @returns Option<U>
   */
  map<U>(fn: (data: T) => Option<U>): Option<U>;
  map<U>(fn: (data: T) => U): Option<U>;
  map<U>(fn: (data: T) => U | Option<U>): Option<U> {
    if (Option.isNone(this)) {
      return this as any;
    }

    const result = fn(this.unwrap());

    if (Option.is(result)) {
      return result;
    }

    return Option.some(result);
  }
}

class Some extends Option<any> {
  constructor(readonly data: any) {
    super();
  }

  [util.inspect.custom](depth: any, options: any) {
    return options.stylize(`Some{${util.inspect(this.data)}}`, 'spetial');
  }
  
  unwrap() {
    return this.data;
  }
}

const _None = new (class None extends Option<any> {
  unwrap(): any {
    throw new Error('Cannot unwrap None');
  }
});