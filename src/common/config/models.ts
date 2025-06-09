export interface PageResult<T> {
    items: T[],
    perPage: number,
    totalItems: number,
    totalPages: number,
    page: number
}