import type { DataService } from '.'

interface PreliminaryJudgingData {
  RecordID: number
  TeamID: string
  ExpertID: string
  Score: number
}

export class PreliminaryJudgingDataService implements DataService<PreliminaryJudgingData> {
  schema = [
    {
      title: 'Record ID',
      key: 'RecordID',
      primary: true,
    },
    {
      title: 'Team ID',
      key: 'TeamID',
    },
    {
      title: 'Expert ID',
      key: 'ExpertID',
    },
    {
      title: 'Score',
      key: 'Score',
    },
  ]

  async getAllData(): Promise<PreliminaryJudgingData[]> {
    return await window.db.execute('SELECT * FROM PreliminaryJudging;') as PreliminaryJudgingData[]
  }

  async getDataByID(id: string): Promise<PreliminaryJudgingData | null> {
    const result = await window.db.execute('SELECT * FROM PreliminaryJudging WHERE RecordID = ?;', [id])
    if (result.length === 0) {
      return null
    }
    return result[0] as PreliminaryJudgingData
  }

  async createData(data: PreliminaryJudgingData): Promise<void> {
    await window.db.execute('INSERT INTO PreliminaryJudging (TeamID, ExpertID, Score) VALUES (?, ?, ?);', [
      data.TeamID,
      data.ExpertID,
      data.Score,
    ])
  }

  async updateDataByID(id: string, data: PreliminaryJudgingData): Promise<void> {
    await window.db.execute('UPDATE PreliminaryJudging SET TeamID = ?, ExpertID = ?, Score = ? WHERE RecordID = ?;', [
      data.TeamID,
      data.ExpertID,
      data.Score,
      id,
    ])
  }

  async deleteData(id: string) {
    await window.db.execute('DELETE FROM PreliminaryJudging WHERE RecordID = ?;', [id])
  }
}
