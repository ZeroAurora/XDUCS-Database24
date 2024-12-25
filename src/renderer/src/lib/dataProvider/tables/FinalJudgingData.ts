import type { DataService } from '.'

export interface FinalJudgingData {
  RecordID: number
  TeamID: string
  ExpertID: string
  Score: number
}

export class FinalJudgingDataService implements DataService<FinalJudgingData> {
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

  async getAllData(): Promise<FinalJudgingData[]> {
    return await window.db.execute('SELECT * FROM FinalJudging;') as FinalJudgingData[]
  }

  async getDataByID(id: string): Promise<FinalJudgingData | null> {
    const result = await window.db.execute('SELECT * FROM FinalJudging WHERE RecordID = ?;', [id])
    if (result.length === 0) {
      return null
    }
    return result[0] as FinalJudgingData
  }

  async getDataByTeamID(teamID: string): Promise<FinalJudgingData[]> {
    return await window.db.execute('SELECT * FROM FinalJudging WHERE TeamID = ?;', [teamID]) as FinalJudgingData[]
  }

  async createData(data: FinalJudgingData): Promise<void> {
    await window.db.execute('INSERT INTO FinalJudging (RecordID, TeamID, ExpertID, Score) VALUES (?, ?, ?, ?);', [
      data.RecordID,
      data.TeamID,
      data.ExpertID,
      data.Score,
    ])
  }

  async updateDataByID(id: string, data: FinalJudgingData): Promise<void> {
    await window.db.execute('UPDATE FinalJudging SET TeamID = ?, ExpertID = ?, Score = ? WHERE RecordID = ?;', [
      data.TeamID,
      data.ExpertID,
      data.Score,
      id,
    ])
  }

  async deleteData(id: string) {
    await window.db.execute('DELETE FROM FinalJudging WHERE RecordID = ?;', [id])
  }
}
