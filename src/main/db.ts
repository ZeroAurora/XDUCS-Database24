import type { Connection } from 'mysql2/promise'
import fs from 'node:fs/promises'
import { parse } from 'csv-parse/sync'
import { dialog, ipcMain } from 'electron'
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
  const [result, _fields] = await conn.execute(sql.replace(/\s+/g, ' '), values)
  return result
}

async function importCsv(tableName: string) {
  const openRetVal = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'CSV', extensions: ['csv'] }],
  })
  if (openRetVal.filePaths.length === 0) {
    return false
  }
  const filePath = openRetVal.filePaths[0]
  const result = parse(await fs.readFile(filePath, 'utf8'), { skip_empty_lines: true })
  const columns = result.shift().map((col: string) => `\`${col}\``) as string[]
  for (const row of result) {
    await execute(`INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${row.map(() => '?').join(', ')});`, row)
  }
  return true
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
  ipcMain.handle('db:importCsv', async (_event, args) => {
    return await importCsv(args.tableName)
  })
}
