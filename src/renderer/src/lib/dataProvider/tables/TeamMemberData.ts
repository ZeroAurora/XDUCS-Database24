import type { DataService } from '.'

export interface TeamMemberData {
  MemberID: number
  TeamID: string
  Name: string
  Gender: 'Male' | 'Female'
  Phone: string
  University: string
  Role: 'Captain' | 'ViceCaptain' | 'Member'
}

export class TeamMemberDataService implements DataService<TeamMemberData> {
  schema = [
    {
      title: 'Member ID',
      key: 'MemberID',
      primary: true,
    },
    {
      title: 'Team ID',
      key: 'TeamID',
    },
    {
      title: 'Name',
      key: 'Name',
    },
    {
      title: 'Gender',
      key: 'Gender',
    },
    {
      title: 'Phone',
      key: 'Phone',
    },
    {
      title: 'University',
      key: 'University',
    },
    {
      title: 'Role',
      key: 'Role',
    },
  ]

  async getAllData(): Promise<TeamMemberData[]> {
    return await window.db.execute('SELECT * FROM TeamMember;') as TeamMemberData[]
  }

  async getDataByID(id: string): Promise<TeamMemberData | null> {
    const result = await window.db.execute('SELECT * FROM TeamMember WHERE MemberID = ?;', [id])
    if (result.length === 0) {
      return null
    }
    return result[0] as TeamMemberData
  }

  async createData(data: TeamMemberData): Promise<void> {
    await window.db.execute('INSERT INTO TeamMember (TeamID, Name, Gender, Phone, University, Role) VALUES (?, ?, ?, ?, ?, ?);', [
      data.TeamID,
      data.Name,
      data.Gender,
      data.Phone,
      data.University,
      data.Role,
    ])
  }

  async updateDataByID(id: string, data: TeamMemberData): Promise<void> {
    await window.db.execute('UPDATE TeamMember SET TeamID = ?, Name = ?, Gender = ?, Phone = ?, University = ?, Role = ? WHERE MemberID = ?;', [
      data.TeamID,
      data.Name,
      data.Gender,
      data.Phone,
      data.University,
      data.Role,
      id,
    ])
  }

  async deleteData(id: string) {
    await window.db.execute('DELETE FROM TeamMember WHERE MemberID = ?;', [id])
  }
}
