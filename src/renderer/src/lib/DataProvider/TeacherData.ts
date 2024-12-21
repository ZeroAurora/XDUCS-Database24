import type { DataTableColumn } from 'naive-ui'

export class TeacherData {
  TeacherID!: string
  Name!: string
  Phone!: string
  University!: string

  static async getAllData(): Promise<TeacherData[]> {
    return await window.db.execute('SELECT * FROM Teacher;') as TeacherData[]
  }

  static async getDataByID(teacherId: string): Promise<TeacherData | null> {
    const result = await window.db.execute('SELECT * FROM Teacher WHERE TeacherID = ?;', [teacherId])
    if (result.length === 0) {
      return null
    }
    return result[0] as TeacherData
  }

  static async updateDataByID(teacherId: string, data: TeacherData): Promise<void> {
    await window.db.execute('UPDATE Teacher SET Name = ?, Phone = ?, University = ? WHERE TeacherID = ?;', [
      data.Name,
      data.Phone,
      data.University,
      teacherId,
    ])
  }

  static async deleteData(teacherID: string) {
    await window.db.execute('DELETE FROM Teacher WHERE TeacherID = ?;', [teacherID])
  }

  static createColumns(): DataTableColumn[] {
    return [
      {
        title: 'Teacher ID',
        key: 'TeacherID',
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
  }
}
