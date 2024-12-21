import type { DataTableColumn } from 'naive-ui'

export class TeamMemberData {
  MemberID!: number
  TeamID!: string
  Name!: string
  Gender!: 'Male' | 'Female'
  Phone!: string
  University!: string
  Role!: 'Captain' | 'ViceCaptain' | 'Member'

  static async getAllData(): Promise<TeamMemberData[]> {
    return await window.db.execute('SELECT * FROM TeamMember;') as TeamMemberData[]
  }

  static async getDataByID(memberId: number): Promise<TeamMemberData | null> {
    const result = await window.db.execute('SELECT * FROM TeamMember WHERE MemberID = ?;', [memberId])
    if (result.length === 0) {
      return null
    }
    return result[0] as TeamMemberData
  }

  static async updateDataByID(memberId: number, data: TeamMemberData): Promise<void> {
    await window.db.execute('UPDATE TeamMember SET TeamID = ?, Name = ?, Gender = ?, Phone = ?, University = ?, Role = ? WHERE MemberID = ?;', [
      data.TeamID,
      data.Name,
      data.Gender,
      data.Phone,
      data.University,
      data.Role,
      memberId,
    ])
  }

  static async deleteData(memberID: number) {
    await window.db.execute('DELETE FROM TeamMember WHERE MemberID = ?;', [memberID])
  }

  static createColumns(): DataTableColumn[] {
    return [
      {
        title: 'Member ID',
        key: 'MemberID',
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
  }
}
