import type { DataService } from '.'

export interface TopicBData {
  TeamID: string
  TopicName: string
  University: string
}

export class TopicBDataService implements DataService<TopicBData> {
  schema = [
    {
      title: 'Team ID',
      key: 'TeamID',
      primary: true,
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

  async getAllData(): Promise<TopicBData[]> {
    return await window.db.execute('SELECT * FROM TopicB;') as TopicBData[]
  }

  async getDataByID(id: string): Promise<TopicBData | null> {
    const result = await window.db.execute('SELECT * FROM TopicB WHERE TeamID = ?;', [id])
    if (result.length === 0) {
      return null
    }
    return result[0] as TopicBData
  }

  async createData(data: TopicBData): Promise<void> {
    await window.db.execute('INSERT INTO TopicB (TeamID, TopicName, University) VALUES (?, ?, ?);', [
      data.TeamID,
      data.TopicName,
      data.University,
    ])
  }

  async updateDataByID(id: string, data: TopicBData): Promise<void> {
    await window.db.execute('UPDATE TopicB SET TopicName = ?, University = ? WHERE TeamID = ?;', [
      data.TopicName,
      data.University,
      id,
    ])
  }

  async deleteData(id: string) {
    await window.db.execute('DELETE FROM TopicB WHERE TeamID = ?;', [id])
  }
}
