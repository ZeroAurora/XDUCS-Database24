<script setup lang="ts">
import type { AwardCertificateData } from '@renderer/lib/dataProvider/tables/AwardCertificateData'
import type { FinalJudgingData } from '@renderer/lib/dataProvider/tables/FinalJudgingData'
import type { TeamData } from '@renderer/lib/dataProvider/tables/TeamData'
import type { Ref } from 'vue'
import { AwardCertificateService } from '@renderer/lib/dataProvider/tables/AwardCertificateData'
import { FinalJudgingDataService } from '@renderer/lib/dataProvider/tables/FinalJudgingData'
import { TeamDataService } from '@renderer/lib/dataProvider/tables/TeamData'
import { type UserTeamInfo, UserTeamInfoService } from '@renderer/lib/dataProvider/views/UserTeamInfo'
import { NButton, NCard, NH4, NInputGroup, NSelect } from 'naive-ui'
import { computed, onMounted, ref, watchEffect } from 'vue'

const awardCertificateService = new AwardCertificateService()
const teamDataService = new TeamDataService()
const finalJudgingService = new FinalJudgingDataService()
const userTeamInfoService = new UserTeamInfoService()

const teamDataSet: Ref<TeamData[]> = ref([])
const teamDataSelectorOptions = computed(() => teamDataSet.value.map(team => ({
  label: `${team.TeamName} (${team.University})`,
  value: team.TeamID,
})))

const finalJudging: Ref<FinalJudgingData[] | null> = ref(null)
const averageJudgingScore = computed(() => {
  if (!finalJudging.value) {
    return 0
  }
  const scores = finalJudging.value.map(judging => Number(judging.Score))
  const sum = scores.reduce((acc, cur) => acc + cur, 0)
  const max = Math.max(...scores)
  const min = Math.min(...scores)
  return (sum - max - min) / (scores.length - 2)
})

const awardCertificate: Ref<AwardCertificateData | null> = ref(null)

const userTeamInfo: Ref<UserTeamInfo[] | null> = ref(null)
const members = computed(() => userTeamInfo.value?.map(info => info.MemberName).join(', '))

const selectedTeamID = ref('')
const selectedTeam = computed(() => teamDataSet.value.find(team => team.TeamID === selectedTeamID.value))

const selectedAwardRank = ref('')
const awardOptions = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
  {
    label: '0',
    value: '0',
  },
]

onMounted(async () => {
  teamDataSet.value = await teamDataService.getAllData()
})

watchEffect(async () => {
  if (selectedTeamID.value === '') {
    return
  }
  finalJudging.value = await finalJudgingService.getDataByTeamID(selectedTeamID.value)
  awardCertificate.value = await awardCertificateService.getDataByTeamID(selectedTeamID.value)
  userTeamInfo.value = await userTeamInfoService.getDataByID(selectedTeamID.value)
})

async function refreshTeam() {
  finalJudging.value = await finalJudgingService.getDataByTeamID(selectedTeamID.value)
  awardCertificate.value = await awardCertificateService.getDataByTeamID(selectedTeamID.value)
  userTeamInfo.value = await userTeamInfoService.getDataByID(selectedTeamID.value)
}

async function onUpdateAwardRankClick() {
  if (awardCertificate.value) {
    awardCertificate.value.AwardRank = selectedAwardRank.value as AwardCertificateData['AwardRank']
    await awardCertificateService.updateDataByID(awardCertificate.value.CertificateID, awardCertificate.value)
    await refreshTeam()
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 p-4 w-full">
    <NSelect v-model:value="selectedTeamID" class="flex-none" :options="teamDataSelectorOptions" placeholder="Select Team" />
    <NCard class="flex-auto" title="Team Info">
      <NH4>Team Name: {{ selectedTeam?.TeamName }}</NH4>
      <NH4>University: {{ selectedTeam?.University }}</NH4>
      <NH4>Track Type: {{ selectedTeam?.TrackType }}</NH4>
      <NH4>Selected Topic ID: {{ selectedTeam?.SelectedTopicID }}</NH4>
      <NH4>Average Final Score: {{ averageJudgingScore }}</NH4>
      <NH4>Members: {{ members }}</NH4>
    </NCard>
    <NCard class="flex-1">
      <NH3>Award Rank: {{ awardCertificate?.AwardRank }}</NH3>
      <NInputGroup>
        <NSelect v-model:value="selectedAwardRank" :options="awardOptions" placeholder="Select Award for Team" />
        <NButton type="primary" @click="onUpdateAwardRankClick">
          Submit
        </NButton>
      </NInputGroup>
    </NCard>
  </div>
</template>
