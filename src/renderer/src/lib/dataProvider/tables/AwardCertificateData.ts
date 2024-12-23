import type { DataService } from '.'

interface AwardCertificateData {
  CertificateID: string // VARCHAR(20) PRIMARY KEY
  TrackType: 'A' | 'B' // ENUM('A', 'B') NOT NULL
  AwardRank: '1' | '2' | '3' // ENUM('1', '2', '3') NOT NULL
  University: string // VARCHAR(50) NOT NULL
  StudentName: string // VARCHAR(50) NOT NULL
  StudentUniversity: string // VARCHAR(50) NOT NULL
  TeacherName: string // VARCHAR(50) NOT NULL
  TeacherUniversity: string // VARCHAR(50) NOT NULL
}

export class AwardCertificateDataService implements DataService<AwardCertificateData> {
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

  async getAllData(): Promise<AwardCertificateData[]> {
    return await window.db.execute('SELECT * FROM AwardCertificate;') as AwardCertificateData[]
  }

  async getDataByID(id: string): Promise<AwardCertificateData | null> {
    const result = await window.db.execute('SELECT * FROM AwardCertificate WHERE CertificateID = ?;', [id])
    if (result.length === 0) {
      return null
    }
    return result[0] as AwardCertificateData
  }

  async createData(data: AwardCertificateData): Promise<void> {
    await window.db.execute('INSERT INTO AwardCertificate (TrackType, AwardRank, University, StudentName, StudentUniversity, TeacherName, TeacherUniversity) VALUES (?, ?, ?, ?, ?, ?, ?);', [
      data.TrackType,
      data.AwardRank,
      data.University,
      data.StudentName,
      data.StudentUniversity,
      data.TeacherName,
      data.TeacherUniversity,
    ])
  }

  async updateDataByID(id: string, data: AwardCertificateData): Promise<void> {
    await window.db.execute('UPDATE AwardCertificate SET TrackType = ?, AwardRank = ?, University = ?, StudentName = ?, StudentUniversity = ?, TeacherName = ?, TeacherUniversity = ? WHERE CertificateID = ?;', [
      data.TrackType,
      data.AwardRank,
      data.University,
      data.StudentName,
      data.StudentUniversity,
      data.TeacherName,
      data.TeacherUniversity,
      id,
    ])
  }

  async deleteData(id: string) {
    await window.db.execute('DELETE FROM AwardCertificate WHERE CertificateID = ?;', [id])
  }
}
