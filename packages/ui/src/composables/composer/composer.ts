export type Composite<T extends {} = any, O extends {} = any> = (obj: O) => T
export type ComposerPlugin<T extends {}, O extends {}> = (composer: Composer<T>) => Composer<O>

export class Composer<T extends {}> {
  #composites: Set<Composite> = new Set()

  with<C extends {}>(composite: Composite<C, T>): Composer<T & C>
  with<D extends Record<string, Composite<any, T>>>(obj: D): Composer<T & {
    [K in keyof D]: ReturnType<D[K]>
  }>
  with(composite: any): any {
    if (typeof composite === 'function') {
      this.#composites.add(composite)
      return this
    }
    if (typeof composite === 'object' && composite) {
      this.#composites.add((obj) => {
        const result: any = {}
        for (const [key, comp] of Object.entries<any>(composite))
          result[key] = comp(obj)

        return result
      })

      return this
    }

    throw new TypeError('Invalid composite type')
  }

  use<O extends {}>(plugin: ComposerPlugin<T, O>): Composer<O> {
    return plugin(this) ?? this
  }

  build(): T {
    const result: any = {}

    for (const composite of this.#composites)
      Object.assign(result, composite(result))

    return result
  }
}

export function compose<T extends {}>(composite:Composite<T>) {
  return new Composer<T>().with(composite)
}