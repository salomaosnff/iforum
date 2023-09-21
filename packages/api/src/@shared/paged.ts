export interface Paged<T> {
  items: T[]
  totalItems: number
  totalPages: number
}