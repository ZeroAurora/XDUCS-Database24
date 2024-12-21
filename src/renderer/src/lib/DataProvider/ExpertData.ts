import type { DataTableColumn } from 'naive-ui'

export class ExpertData {
  ExpertID!: string
  Name!: string
  Phone!: string
  Email!: string
  University!: string
  Title!: string
  ResearchArea!: string

  static async getAllData(): Promise<ExpertData[]> {
    return await window.db.execute('SELECT * FROM Expert;') as ExpertData[]
  }

  static async getDataByID(expertId: string): Promise<ExpertData | null> {
    const result = await window.db.execute('SELECT * FROM Expert WHERE ExpertID = ?;', [expertId])
    if (result.length === 0) {
      return null
    }
    return result[0] as ExpertData
  }

  static async updateDataByID(expertId: string, data: ExpertData): Promise<void> {
    await window.db.execute('UPDATE Expert SET Name = ?, Phone = ?, Email = ?, University = ?, Title = ?, ResearchArea = ? WHERE ExpertID = ?;', [
      data.Name,
      data.Phone,
      data.Email,
      data.University,
      data.Title,
      data.ResearchArea,
      expertId,
    ])
  }

  static async deleteData(expertID: string) {
    await window.db.execute('DELETE FROM Expert WHERE ExpertID = ?;', [expertID])
  }

  static createColumns(): DataTableColumn[] {
    return [
      {
        title: 'Expert ID',
        key: 'ExpertID',
      },
      {
        title: 'Name',
        key: 'Name',
      },
      {
        title: 'Phone',
        key: 'Phone',
      },
      {
        title: 'Email',
        key: 'Email',
      },
      {
        title: 'University',
        key: 'University',
      },
      {
        title: 'Title',
        key: 'Title',
      },
      {
        title: 'Research Area',
        key: 'ResearchArea',
      },
    ]
  }
}
