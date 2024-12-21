import { AwardCertificateData } from './AwardCertificateData'
import { ExpertData } from './ExpertData'
import { FinalJudgingData } from './FinalJudgingData'
import { PreliminaryJudgingData } from './PreliminaryJudgingData'
import { TeamData } from './TeamData'
import { TeamMemberData } from './TeamMemberData'
import { TopicAData } from './TopicAData'
import { TopicBData } from './TopicBData'
import { UserAwardInfoViewData } from './UserAwardInfoViewData'

const dataProvider = {
  AwardCertificate: AwardCertificateData,
  Expert: ExpertData,
  FinalJudging: FinalJudgingData,
  PreliminaryJudging: PreliminaryJudgingData,
  Team: TeamData,
  TeamMember: TeamMemberData,
  TopicA: TopicAData,
  TopicB: TopicBData,
  UserAwardInfoView: UserAwardInfoViewData,
}

export type DataProviderName = keyof typeof dataProvider

export function getDataProvider<T extends DataProviderName>(name: T): typeof dataProvider[T] {
  return dataProvider[name]
}
