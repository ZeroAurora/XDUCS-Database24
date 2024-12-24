import type { DataService } from '.'

export interface UserTeamInfo {
  TeamID: string
  TeamName: string
  TeamUniversity: string
  MemberName: string
  MemberRole: 'Captain' | 'ViceCaptain' | 'Member'
  MemberGender: 'Male' | 'Female'
  MemberPhone: string
  MemberUniversity: string
}

export class UserTeamInfoService implements DataService<UserTeamInfo> {
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
      title: 'Team University',
      key: 'TeamUniversity',
    },
    {
      title: 'Member Name',
      key: 'MemberName',
    },
    {
      title: 'Member Role',
      key: 'MemberRole',
    },
    {
      title: 'Member Gender',
      key: 'MemberGender',
    },
    {
      title: 'Member Phone',
      key: 'MemberPhone',
    },
    {
      title: 'Member University',
      key: 'MemberUniversity',
    },
  ]

  async getAllData(): Promise<UserTeamInfo[]> {
    return await window.db.execute('SELECT * FROM UserTeamInfo;') as UserTeamInfo[]
  }

  async getDataByID(id: string): Promise<UserTeamInfo[] | null> {
    const result = await window.db.execute('SELECT * FROM UserTeamInfo WHERE TeamID = ?;', [id])
    if (result.length === 0) {
      return null
    }
    return result as UserTeamInfo[]
  }
}
