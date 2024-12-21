import type { Connection } from 'mysql2/promise'
import { ipcMain } from 'electron'
import { createConnection } from 'mysql2/promise'

let conn: Connection | null = null

export async function connected() {
  return !!conn
}

export async function initConn(host: string, port: number, user: string, password: string, database: string) {
  conn = await createConnection({
    host,
    port,
    user,
    password,
    database,
  })
  return true
}

export async function closeConn() {
  if (!conn) {
    throw new Error('Database not initialized')
  }
  await conn.end()
  conn = null
}

export async function execute(sql: string, values: any[] = []) {
  if (!conn) {
    throw new Error('Database not initialized')
  }
  const [result, _fields] = await conn.execute(sql, values)
  return result
}

export function registerDbIpcs() {
  ipcMain.handle('db:connected', async (_event, _args) => {
    return await connected()
  })
  ipcMain.handle('db:init', async (_event, args) => {
    return await initConn(args.host, args.port, args.user, args.password, args.database)
  })
  ipcMain.handle('db:close', async (_event, _args) => {
    return await closeConn()
  })
  ipcMain.handle('db:execute', async (_event, args) => {
    return await execute(args.sql, args.values)
  })
}
