import type { DataService } from '.'

export interface TopicAData {
  TopicID: string
  TopicName: string
  Company: string
}

export class TopicADataService implements DataService<TopicAData> {
  schema = [
    {
      title: 'Topic ID',
      key: 'TopicID',
      primary: true,
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

  async getAllData(): Promise<TopicAData[]> {
    return await window.db.execute('SELECT * FROM TopicA;') as TopicAData[]
  }

  async getDataByID(id: string): Promise<TopicAData | null> {
    const result = await window.db.execute('SELECT * FROM TopicA WHERE TopicID = ?;', [id])
    if (result.length === 0) {
      return null
    }
    return result[0] as TopicAData
  }

  async createData(data: TopicAData): Promise<void> {
    await window.db.execute('INSERT INTO TopicA (TopicName, Company) VALUES (?, ?);', [
      data.TopicName,
      data.Company,
    ])
  }

  async updateDataByID(id: string, data: TopicAData): Promise<void> {
    await window.db.execute('UPDATE TopicA SET TopicName = ?, Company = ? WHERE TopicID = ?;', [
      data.TopicName,
      data.Company,
      id,
    ])
  }

  async deleteData(id: string) {
    await window.db.execute('DELETE FROM TopicA WHERE TopicID = ?;', [id])
  }
}
