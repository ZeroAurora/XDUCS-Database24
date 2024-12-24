import type { db, importExcel } from './index'

declare global {
  interface Window {
    db: typeof db,
  }
}
