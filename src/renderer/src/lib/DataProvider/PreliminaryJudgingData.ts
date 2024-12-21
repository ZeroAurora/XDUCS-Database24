import type { DataTableColumn } from 'naive-ui'

export class PreliminaryJudgingData {
  RecordID!: number
  TeamID!: string
  ExpertID!: string
  Score!: number

  static async getAllData(): Promise<PreliminaryJudgingData[]> {
    return await window.db.execute('SELECT * FROM PreliminaryJudging;') as PreliminaryJudgingData[]
  }

  static async getDataByID(recordId: number): Promise<PreliminaryJudgingData | null> {
    const result = await window.db.execute('SELECT * FROM PreliminaryJudging WHERE RecordID = ?;', [recordId])
    if (result.length === 0) {
      return null
    }
    return result[0] as PreliminaryJudgingData
  }

  static async updateDataByID(recordId: number, data: PreliminaryJudgingData): Promise<void> {
    await window.db.execute('UPDATE PreliminaryJudging SET TeamID = ?, ExpertID = ?, Score = ? WHERE RecordID = ?;', [
      data.TeamID,
      data.ExpertID,
      data.Score,
      recordId,
    ])
  }

  static async deleteData(recordID: number) {
    await window.db.execute('DELETE FROM PreliminaryJudging WHERE RecordID = ?;', [recordID])
  }

  static createColumns(): DataTableColumn[] {
    return [
      {
        title: 'Record ID',
        key: 'RecordID',
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
  }
}
