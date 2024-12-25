import type { DataService } from '.'

export interface TeamData {
  TeamID: string
  TeamName: string
  University: string
  TrackType: 'A' | 'B'
  SelectedTopicID?: string | null
}

export class TeamDataService implements DataService<TeamData> {
  schema = [
    {
      title: 'Team ID',
      key: 'TeamID',
      primary: true,
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

  async getAllData(): Promise<TeamData[]> {
    return await window.db.execute('SELECT * FROM Team;') as TeamData[]
  }

  async getDataByID(id: string): Promise<TeamData | null> {
    const result = await window.db.execute('SELECT * FROM Team WHERE TeamID = ?;', [id])
    if (result.length === 0) {
      return null
    }
    return result[0] as TeamData
  }

  async createData(data: TeamData): Promise<void> {
    await window.db.execute('INSERT INTO Team (TeamID, TeamName, University, TrackType, SelectedTopicID) VALUES (?, ?, ?, ?, ?);', [
      data.TeamID,
      data.TeamName,
      data.University,
      data.TrackType,
      data.SelectedTopicID,
    ])
  }

  async updateDataByID(id: string, data: TeamData): Promise<void> {
    await window.db.execute('UPDATE Team SET TeamName = ?, University = ?, TrackType = ?, SelectedTopicID = ? WHERE TeamID = ?;', [
      data.TeamName,
      data.University,
      data.TrackType,
      data.SelectedTopicID,
      id,
    ])
  }

  async deleteData(id: string) {
    await window.db.execute('DELETE FROM Team WHERE TeamID = ?;', [id])
  }
}
