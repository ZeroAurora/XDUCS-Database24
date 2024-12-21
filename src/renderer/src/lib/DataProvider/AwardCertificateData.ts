import type { DataTableColumn } from 'naive-ui'

export class AwardCertificateData {
  CertificateID!: string // VARCHAR(20) PRIMARY KEY
  TrackType!: 'A' | 'B' // ENUM('A', 'B') NOT NULL
  AwardRank!: '1' | '2' | '3' // ENUM('1', '2', '3') NOT NULL
  University!: string // VARCHAR(50) NOT NULL
  StudentName!: string // VARCHAR(50) NOT NULL
  StudentUniversity!: string // VARCHAR(50) NOT NULL
  TeacherName!: string // VARCHAR(50) NOT NULL
  TeacherUniversity!: string // VARCHAR(50) NOT NULL

  static async getAllData(): Promise<AwardCertificateData[]> {
    return await window.db.execute('SELECT * FROM AwardCertificate;') as AwardCertificateData[]
  }

  static async getDataByID(certificateId: string): Promise<AwardCertificateData | null> {
    const result = await window.db.execute('SELECT * FROM AwardCertificate WHERE CertificateID = ?;', [certificateId])
    if (result.length === 0) {
      return null
    }
    return result[0] as AwardCertificateData
  }

  static async updateDataByID(certificateId: string, data: AwardCertificateData): Promise<void> {
    await window.db.execute('UPDATE AwardCertificate SET TrackType = ?, AwardRank = ?, University = ?, StudentName = ?, StudentUniversity = ?, TeacherName = ?, TeacherUniversity = ? WHERE CertificateID = ?;', [
      data.TrackType,
      data.AwardRank,
      data.University,
      data.StudentName,
      data.StudentUniversity,
      data.TeacherName,
      data.TeacherUniversity,
      certificateId,
    ])
  }

  static async deleteData(certificateID: number) {
    await window.db.execute('DELETE FROM AwardCertificate WHERE CertificateID = ?;', [certificateID])
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
