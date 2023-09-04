import type { Composite } from '../composer'

const IS_DATA_SOURCE = Symbol('data_source.is')

export interface DataSource<T = any> {
  data: Ref<T>
  [IS_DATA_SOURCE]: true
}

export function DataSource<T>(initialData: T): Composite<DataSource<T>>
export function DataSource<T>(): Composite<DataSource<T>>
export function DataSource<T>(initialData?: T): Composite<DataSource<T>> {
  return () => ({ data: ref(initialData) as Ref<T>, [IS_DATA_SOURCE]:true })
}

export function isDataSource(value: any): value is DataSource {
  return value && typeof value === 'object' && value[IS_DATA_SOURCE] === true  
}