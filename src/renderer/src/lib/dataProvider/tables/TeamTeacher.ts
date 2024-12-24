import type { DataService } from '.'

export interface TeamTeacherData {
  RelationID: number
  TeamID: string
  TeacherID: string
}

export class TeamTeacherDataService implements DataService<TeamTeacherData> {
  schema = [
    { title: 'Relation ID', key: 'RelationID', primary: true },
    { title: 'Team ID', key: 'TeamID' },
    { title: 'Teacher ID', key: 'TeacherID' },
  ]

  async getAllData(): Promise<TeamTeacherData[]> {
    return await window.db.execute('SELECT * FROM TeamTeacher;') as TeamTeacherData[]
  }

  async getDataByID(id: string): Promise<TeamTeacherData | null> {
    const result = await window.db.execute('SELECT * FROM TeamTeacher WHERE RelationID = ?;', [id])
    if (result.length === 0) {
      return null
    }
    return result[0] as TeamTeacherData
  }

  async createData(data: TeamTeacherData): Promise<void> {
    await window.db.execute('INSERT INTO TeamTeacher (RelationID, TeamID, TeacherID) VALUES (?, ?, ?);', [
      data.RelationID,
      data.TeamID,
      data.TeacherID,
    ])
  }

  async updateDataByID(id: string, data: TeamTeacherData): Promise<void> {
    await window.db.execute('UPDATE TeamTeacher SET TeamID = ?, TeacherID = ? WHERE RelationID = ?;', [
      data.TeamID,
      data.TeacherID,
      id,
    ])
  }

  async deleteData(id: string): Promise<void> {
    await window.db.execute('DELETE FROM TeamTeacher WHERE RelationID = ?;', [id])
  }
}
