export interface Pagination<T> {
  results: T,
  currentPage: number,
  pageCount: number,
  pageSize: number,
  totalCount: number
}
export class pagination {
  currentPage: number = 0;
  // pageCount: number = 0;
  pageSize: number = 0;
  totalCount: number = 0;
}