import { ComposerPlugin } from "../composer"
import { AsyncState } from "./async_state"
import { DataSource } from "./datasource"
import { Paged, PageResponse } from "./paged"

export type RequestFunction<R = any> = (...args: any[]) => Promise<R>

export type RequestsInstance<T = any, R extends Record<string, RequestFunction> = {}> = DataSource<T[]> & {
  page: Paged<T>
  async: AsyncState
  requests: R
}

export type RequestParams<P extends {} = {}> = P & {
  /** Quantidade de itens por página */
  size?: number

  /** Número da página a ser carregada */
  page?: number
}

export interface PagedRequestOptions<P extends {} = {}> {
  mode?: 'infinite' | 'replace'
  params?: RequestParams<P>
}

type DataSourceType<D> = D extends DataSource<infer U> ? U : unknown

export interface Requests {
  <T, R extends Record<string, RequestFunction>>(
    factory: (ds: RequestsInstance<T, any>) => R
  ): ComposerPlugin<DataSource<T[]>, RequestsInstance<T, R>>

  paged<D extends RequestsInstance, P extends {}>(
    ds: D,
    request: (params: RequestParams<P>) => Promise<PageResponse<DataSourceType<D>[number]>>
  ): (options?: PagedRequestOptions<P>) => Promise<PageResponse<DataSourceType<D>[number]>>
}

export const Requests = function (factory) {
  return (composer) => composer.with({
    page: Paged(),
    async: AsyncState(),
    requests: factory as any
  })
} as Requests

Requests.paged = function (ds, request) {
  return async (options = {}) => {
    const { params = {}, mode = 'replace' } = options

    const result = await ds.async.execute(async () => request(params as any))

    if (mode === 'infinite') {
      ds.page.concat(result)
    } else {
      ds.page.set(result)
    }

    return result
  }
}