import type { DataService } from '.'

export interface AwardCertificateData {
  CertificateID: string // VARCHAR(20) PRIMARY KEY
  AwardRank: '0' | '1' | '2' | '3' // ENUM('0', '1', '2', '3') NOT NULL
  TeamID: string // VARCHAR(7) NOT NULL
}

export class AwardCertificateService implements DataService<AwardCertificateData> {
  schema = [
    {
      title: 'Certificate ID',
      key: 'CertificateID',
      primary: true,
    },
    {
      title: 'Award Rank',
      key: 'AwardRank',
    },
    {
      title: 'Team ID',
      key: 'TeamID',
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

  async getDataByTeamID(teamID: string): Promise<AwardCertificateData | null> {
    const result = await window.db.execute('SELECT * FROM AwardCertificate WHERE TeamID = ?;', [teamID])
    if (result.length === 0) {
      return null
    }
    return result[0] as AwardCertificateData
  }

  async createData(data: AwardCertificateData): Promise<void> {
    await window.db.execute('INSERT INTO AwardCertificate (CertificateID, AwardRank, TeamID) VALUES (?, ?, ?);', [
      data.CertificateID,
      data.AwardRank,
      data.TeamID,
    ])
  }

  async updateDataByID(id: string, data: AwardCertificateData): Promise<void> {
    await window.db.execute('UPDATE AwardCertificate SET AwardRank = ?, TeamID = ? WHERE CertificateID = ?;', [
      data.AwardRank,
      data.TeamID,
      id,
    ])
  }

  async deleteData(id: string) {
    await window.db.execute('DELETE FROM AwardCertificate WHERE CertificateID = ?;', [id])
  }
}
