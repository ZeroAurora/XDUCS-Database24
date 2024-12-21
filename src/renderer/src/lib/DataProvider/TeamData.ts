import type { DataTableColumn } from 'naive-ui'

export class TeamData {
  TeamID!: string
  TeamName!: string
  University!: string
  TrackType!: 'A' | 'B'
  SelectedTopicID?: string | null

  static async getAllData(): Promise<TeamData[]> {
    return await window.db.execute('SELECT * FROM Team;') as TeamData[]
  }

  static async getDataByID(teamId: string): Promise<TeamData | null> {
    const result = await window.db.execute('SELECT * FROM Team WHERE TeamID = ?;', [teamId])
    if (result.length === 0) {
      return null
    }
    return result[0] as TeamData
  }

  static async updateDataByID(teamId: string, data: TeamData): Promise<void> {
    await window.db.execute('UPDATE Team SET TeamName = ?, University = ?, TrackType = ?, SelectedTopicID = ? WHERE TeamID = ?;', [
      data.TeamName,
      data.University,
      data.TrackType,
      data.SelectedTopicID,
      teamId,
    ])
  }

  static async deleteData(teamID: string) {
    await window.db.execute('DELETE FROM Team WHERE TeamID = ?;', [teamID])
  }

  static createColumns(): DataTableColumn[] {
    return [
      {
        title: 'Team ID',
        key: 'TeamID',
      },
      {
        title: 'Team Name',
        key: 'TeamName',
      },
      {
        title: 'University',
        key: 'University',
      },
      {
        title: 'Track Type',
        key: 'TrackType',
      },
      {
        title: 'Selected Topic ID',
        key: 'SelectedTopicID',
      },
    ]
  }
}
