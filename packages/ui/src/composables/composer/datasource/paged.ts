import { DataSource } from "./datasource"

export interface PageResponse<T> {
  items:T[],
  size: number,
  currentPage: number,
  totalPages: number,
  totalItems: number
}

export interface Paged<T = any> {
  info: {
    size: number,
    totalPages: number,
    currentPage: number,
    totalItems: number
  }

  set(page:PageResponse<T>): void
  concat(page:PageResponse<T>): void
}

export function Paged<T>() {
  return (dataSource: DataSource<T[]>): Paged<T> => {
    const info = reactive({
      size:0,
      totalPages:1,
      currentPage:1,
      totalItems:0
    })
    return {
      info,
      set(page:PageResponse<T>) {
        dataSource.data.value = page.items
        info.size = page.size
        info.currentPage = page.currentPage
        info.totalItems = page.totalItems
        info.totalPages = page.totalPages
      },
      concat(page:PageResponse<T>) {
        if (page.currentPage <= this.info.currentPage){
          return this.set(page)
        }
        dataSource.data.value.push(...page.items)
        info.size = page.size
        info.currentPage = page.currentPage
        info.totalItems = page.totalItems
        info.totalPages = page.totalPages
      }
    }
  }
  
}