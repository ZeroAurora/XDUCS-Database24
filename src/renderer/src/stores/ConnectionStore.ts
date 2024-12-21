import { defineStore } from 'pinia'

export const useConnectionStore = defineStore('connection', {
  state: () => ({
    host: 'localhost',
    port: 3306,
    user: 'admin_user',
    password: 'admin_password',
    database: 'wfwwb',
    connected: false,
    role: '',
  }),

  actions: {
    async init() {
      const success = await window.db.init(this.host, this.port, this.user, this.password, this.database)
      if (!success) {
        return false
      }
      this.connected = true

      await this.getRole()
      return true
    },

    async close() {
      await window.db.close()
      this.connected = false
      this.role = ''
    },

    async getRole() {
      const role = (await this.execute('SELECT CURRENT_ROLE() AS role;'))[0].role
      if (role === '`Admin`@`%`') {
        this.role = 'Admin'
      }
      else if (role === '`User`@`%`') {
        this.role = 'User'
      }
      else {
        this.role = 'Unknown'
      }
    },

    async execute(sql: string, values: any[] = []) {
      if (!this.connected) {
        throw new Error('Not connected')
      }
      return await window.db.execute(sql, values)
    },
  },
})
