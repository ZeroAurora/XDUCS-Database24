import type { DataService } from '.'

export interface TeacherData {
  TeacherID: string
  Name: string
  Phone: string
  University: string
}

export class TeacherDataService implements DataService<TeacherData> {
  schema = [
    {
      title: 'Teacher ID',
      key: 'TeacherID',
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
      title: 'University',
      key: 'University',
    },
  ]

  async getAllData(): Promise<TeacherData[]> {
    return await window.db.execute('SELECT * FROM Teacher;') as TeacherData[]
  }

  async getDataByID(id: string): Promise<TeacherData | null> {
    const result = await window.db.execute('SELECT * FROM Teacher WHERE TeacherID = ?;', [id])
    if (result.length === 0) {
      return null
    }
    return result[0] as TeacherData
  }

  async createData(data: TeacherData): Promise<void> {
    await window.db.execute('INSERT INTO Teacher (Name, Phone, University) VALUES (?, ?, ?);', [
      data.Name,
      data.Phone,
      data.University,
    ])
  }

  async updateDataByID(id: string, data: TeacherData): Promise<void> {
    await window.db.execute('UPDATE Teacher SET Name = ?, Phone = ?, University = ? WHERE TeacherID = ?;', [
      data.Name,
      data.Phone,
      data.University,
      id,
    ])
  }

  async deleteData(id: string) {
    await window.db.execute('DELETE FROM Teacher WHERE TeacherID = ?;', [id])
  }
}
