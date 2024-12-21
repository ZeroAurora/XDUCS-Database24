import type { DataTableColumn } from 'naive-ui'

export class TopicBData {
  TeamID!: string
  TopicName!: string
  University!: string

  static async getAllData(): Promise<TopicBData[]> {
    return await window.db.execute('SELECT * FROM TopicB;') as TopicBData[]
  }

  static async getDataByID(teamId: string): Promise<TopicBData | null> {
    const result = await window.db.execute('SELECT * FROM TopicB WHERE TeamID = ?;', [teamId])
    if (result.length === 0) {
      return null
    }
    return result[0] as TopicBData
  }

  static async updateDataByID(teamId: string, data: TopicBData): Promise<void> {
    await window.db.execute('UPDATE TopicB SET TopicName = ?, University = ? WHERE TeamID = ?;', [
      data.TopicName,
      data.University,
      teamId,
    ])
  }

  static async deleteData(teamID: string) {
    await window.db.execute('DELETE FROM TopicB WHERE TeamID = ?;', [teamID])
  }

  static createColumns(): DataTableColumn[] {
    return [
      {
        title: 'Team ID',
        key: 'TeamID',
      },
      {
        title: 'Topic Name',
        key: 'TopicName',
      },
      {
        title: 'University',
        key: 'University',
      },
    ]
  }
}
