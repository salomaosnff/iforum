export interface Paged<T> {
  items: T[]
  totalItems: number
  totalPages: number
}

export interface PageParams {
  page: number
  size: number
}