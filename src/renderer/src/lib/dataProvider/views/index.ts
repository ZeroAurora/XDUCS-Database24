export interface DataService<T> {
  schema: Record<string, any>[]
  getAllData: () => Promise<T[]>
}
