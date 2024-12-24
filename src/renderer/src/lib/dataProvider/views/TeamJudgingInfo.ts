import type { DataService } from '.'

export interface TeamJudgingInfo {
  TeamID: string
  TeamName: string
  TrackType: 'A' | 'B'
  SelectedTopicID: string
  PreliminaryScore: number
  FinalScore: number
}

export class TeamJudgingInfoService implements DataService<TeamJudgingInfo> {
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
      title: 'Track Type',
      key: 'TrackType',
    },
    {
      title: 'Selected Topic ID',
      key: 'SelectedTopicID',
    },
    {
      title: 'Preliminary Score',
      key: 'PreliminaryScore',
    },
    {
      title: 'Final Score',
      key: 'FinalScore',
    },
  ]

  async getAllData(): Promise<TeamJudgingInfo[]> {
    return await window.db.execute('SELECT * FROM TeamJudgingInfo;') as TeamJudgingInfo[]
  }

  async getDataByID(id: string): Promise<TeamJudgingInfo[] | null> {
    const result = await window.db.execute('SELECT * FROM TeamJudgingInfo WHERE TeamID = ?;', [id])
    if (result.length === 0) {
      return null
    }
    return result as TeamJudgingInfo[]
  }
}
