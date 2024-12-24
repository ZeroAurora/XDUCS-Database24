import type { DataTableColumn } from 'naive-ui'
import { AwardCertificateService } from './AwardCertificateData'
import { ExpertDataService } from './ExpertData'
import { FinalJudgingDataService } from './FinalJudgingData'
import { PreliminaryJudgingDataService } from './PreliminaryJudgingData'
import { TeacherDataService } from './TeacherData'
import { TeamDataService } from './TeamData'
import { TeamMemberDataService } from './TeamMemberData'
import { TeamTeacherDataService } from './TeamTeacher'
import { TopicADataService } from './TopicAData'
import { TopicBDataService } from './TopicBData'

export interface DataService<T> {
  schema: Record<string, any>[]
  getAllData: () => Promise<T[]>
  getDataByID: (id: string) => Promise<T | null>
  createData: (data: T) => Promise<void>
  updateDataByID: (id: string, data: T) => Promise<void>
  deleteData: (id: string) => Promise<void>
}

export const dataProviders = {
  AwardCertificate: new AwardCertificateService(),
  Expert: new ExpertDataService(),
  FinalJudging: new FinalJudgingDataService(),
  PreliminaryJudging: new PreliminaryJudgingDataService(),
  Teacher: new TeacherDataService(),
  Team: new TeamDataService(),
  TeamMember: new TeamMemberDataService(),
  TeamTeacher: new TeamTeacherDataService(),
  TopicA: new TopicADataService(),
  TopicB: new TopicBDataService(),
}

export const dataProviderSelectorOptions = Object.keys(dataProviders).map(key => ({
  label: key,
  value: key,
}))

export type DataProviderName = keyof typeof dataProviders

export function createColumns(provider: DataService<any>): DataTableColumn[] {
  return [
    {
      type: 'selection',
      multiple: false,
    },
    ...provider.schema.map((column: any) => ({
      title: column.title,
      key: column.key,
      sorter: 'default' as const,
      defaultSortOrder: column.primary ? 'ascend' as const : false as const,
    })),
  ]
}

export async function getTableData(provider: DataService<any>) {
  const allData = await provider.getAllData()
  const primaryKey = provider.schema.find((column: any) => column.primary)?.key
  return allData.map((data: any) => ({
    ...data,
    key: primaryKey ? data[primaryKey] : undefined,
  }))
}
