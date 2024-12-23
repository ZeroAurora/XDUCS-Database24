import type { DataService } from '.'

interface ExpertData {
  ExpertID: string
  Name: string
  Phone: string
  Email: string
  University: string
  Title: string
  ResearchArea: string
}

export class ExpertDataService implements DataService<ExpertData> {
  schema = [
    {
      title: 'Expert ID',
      key: 'ExpertID',
      primary: true,
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

  async getAllData(): Promise<ExpertData[]> {
    return await window.db.execute('SELECT * FROM Expert;') as ExpertData[]
  }

  async getDataByID(id: string): Promise<ExpertData | null> {
    const result = await window.db.execute('SELECT * FROM Expert WHERE ExpertID = ?;', [id])
    if (result.length === 0) {
      return null
    }
    return result[0] as ExpertData
  }

  async createData(data: ExpertData): Promise<void> {
    await window.db.execute('INSERT INTO Expert (Name, Phone, Email, University, Title, ResearchArea) VALUES (?, ?, ?, ?, ?, ?);', [
      data.Name,
      data.Phone,
      data.Email,
      data.University,
      data.Title,
      data.ResearchArea,
    ])
  }

  async updateDataByID(id: string, data: ExpertData): Promise<void> {
    await window.db.execute('UPDATE Expert SET Name = ?, Phone = ?, Email = ?, University = ?, Title = ?, ResearchArea = ? WHERE ExpertID = ?;', [
      data.Name,
      data.Phone,
      data.Email,
      data.University,
      data.Title,
      data.ResearchArea,
      id,
    ])
  }

  async deleteData(id: string) {
    await window.db.execute('DELETE FROM Expert WHERE ExpertID = ?;', [id])
  }
}
