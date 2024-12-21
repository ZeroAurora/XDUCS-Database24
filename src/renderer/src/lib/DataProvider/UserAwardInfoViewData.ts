import type { DataTableColumn } from 'naive-ui'

export class UserAwardInfoViewData {
  CertificateID!: string
  TrackType!: 'A' | 'B'
  AwardRank!: '1' | '2' | '3'
  University!: string
  StudentName!: string
  StudentUniversity!: string
  TeacherName!: string
  TeacherUniversity!: string

  static async getAllData(): Promise<UserAwardInfoViewData[]> {
    return await window.db.execute('SELECT * FROM UserAwardInfoView;') as UserAwardInfoViewData[]
  }

  static async getDataByID(certificateId: string): Promise<UserAwardInfoViewData | null> {
    const result = await window.db.execute('SELECT * FROM UserAwardInfoView WHERE CertificateID = ?;', [certificateId])
    if (result.length === 0) {
      return null
    }
    return result[0] as UserAwardInfoViewData
  }

  static createColumns(): DataTableColumn[] {
    return [
      {
        title: 'Certificate ID',
        key: 'CertificateID',
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
  }
}
