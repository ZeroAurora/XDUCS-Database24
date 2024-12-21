import type { DataTableColumn } from 'naive-ui'

export class FinalJudgingData {
  RecordID!: number
  TeamID!: string
  ExpertID!: string
  Score!: number

  static async getAllData(): Promise<FinalJudgingData[]> {
    return await window.db.execute('SELECT * FROM FinalJudging;') as FinalJudgingData[]
  }

  static async getDataByID(recordId: number): Promise<FinalJudgingData | null> {
    const result = await window.db.execute('SELECT * FROM FinalJudging WHERE RecordID = ?;', [recordId])
    if (result.length === 0) {
      return null
    }
    return result[0] as FinalJudgingData
  }

  static async updateDataByID(recordId: number, data: FinalJudgingData): Promise<void> {
    await window.db.execute('UPDATE FinalJudging SET TeamID = ?, ExpertID = ?, Score = ? WHERE RecordID = ?;', [
      data.TeamID,
      data.ExpertID,
      data.Score,
      recordId,
    ])
  }

  static async deleteData(recordID: number) {
    await window.db.execute('DELETE FROM FinalJudging WHERE RecordID = ?;', [recordID])
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
