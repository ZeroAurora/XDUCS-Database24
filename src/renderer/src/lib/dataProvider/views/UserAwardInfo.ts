import type { DataService } from '.'

export interface UserAwardInfo {
  CertificateID: string
  TrackType: 'A' | 'B'
  AwardRank: '1' | '2' | '3'
  University: string
  StudentName: string
  StudentUniversity: string
  TeacherName: string
  TeacherUniversity: string
}

export class UserAwardInfoService implements DataService<UserAwardInfo> {
  schema = [
    {
      title: 'Certificate ID',
      key: 'CertificateID',
      primary: true,
    },
    {
      title: 'Track Type',
      key: 'TrackType',
    },
    {
      title: 'Award Rank',
      key: 'AwardRank',
    },
    {
      title: 'University',
      key: 'University',
    },
    {
      title: 'Student Name',
      key: 'StudentName',
    },
    {
      title: 'Student University',
      key: 'StudentUniversity',
    },
    {
      title: 'Teacher Name',
      key: 'TeacherName',
    },
    {
      title: 'Teacher University',
      key: 'TeacherUniversity',
    },
  ]

  async getAllData(): Promise<UserAwardInfo[]> {
    return await window.db.execute('SELECT * FROM UserAwardInfo;') as UserAwardInfo[]
  }

  async getDataByID(id: string): Promise<UserAwardInfo | null> {
    const result = await window.db.execute('SELECT * FROM UserAwardInfo WHERE CertificateID = ?;', [id])
    if (result.length === 0) {
      return null
    }
    return result[0] as UserAwardInfo
  }
}
