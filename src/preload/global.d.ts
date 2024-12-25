import type { db } from './index'

declare global {
  interface Window {
    db: typeof db
  }
}
