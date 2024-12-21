import type { DataTableColumn } from 'naive-ui'

export class TopicAData {
  TopicID!: string
  TopicName!: string
  Company!: string

  static async getAllData(): Promise<TopicAData[]> {
    return await window.db.execute('SELECT * FROM TopicA;') as TopicAData[]
  }

  static async getDataByID(topicId: string): Promise<TopicAData | null> {
    const result = await window.db.execute('SELECT * FROM TopicA WHERE TopicID = ?;', [topicId])
    if (result.length === 0) {
      return null
    }
    return result[0] as TopicAData
  }

  static async updateDataByID(topicId: string, data: TopicAData): Promise<void> {
    await window.db.execute('UPDATE TopicA SET TopicName = ?, Company = ? WHERE TopicID = ?;', [
      data.TopicName,
      data.Company,
      topicId,
    ])
  }

  static async deleteData(topicID: string) {
    await window.db.execute('DELETE FROM TopicA WHERE TopicID = ?;', [topicID])
  }

  static createColumns(): DataTableColumn[] {
    return [
      {
        title: 'Topic ID',
        key: 'TopicID',
      },
      {
        title: 'Topic Name',
        key: 'TopicName',
      },
      {
        title: 'Company',
        key: 'Company',
      },
    ]
  }
}
