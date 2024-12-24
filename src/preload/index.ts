import { contextBridge, ipcRenderer } from 'electron'

export const db = {
  connected: async (): Promise<boolean> => {
    return await ipcRenderer.invoke('db:connected')
  },
  init: async (host: string, port: number, user: string, password: string, database: string): Promise<boolean> => {
    return await ipcRenderer.invoke('db:init', { host, port, user, password, database })
  },
  close: async (): Promise<void> => {
    return await ipcRenderer.invoke('db:close')
  },
  execute: async (sql: string, values: any[] = []): Promise<unknown[]> => {
    return await ipcRenderer.invoke('db:execute', { sql, values })
  },
  importCsv: async (tableName: string): Promise<boolean> => {
    return await ipcRenderer.invoke('db:importCsv', { tableName })
  },
}

contextBridge.exposeInMainWorld('db', db)
