<script setup lang="ts">
import type { DataTableColumn } from 'naive-ui'
import type { Ref } from 'vue'
import { NButton, NDataTable, NInput, NInputGroup, NSelect, useMessage } from 'naive-ui'
import { computed, ref } from 'vue'

const naiveMessage = useMessage()

const exampleOption = [
  {
    label: '查询西安电子科技大学团队报名信息',
    value: `SELECT * FROM Team WHERE University = '西安电子科技大学';`,
  },
  {
    label: '查询各高校团队报名数量',
    value: `SELECT University, COUNT(*) AS Count FROM Team GROUP BY University;`,
  },
  {
    label: '查询西安电子科技大学姓王的指导教师指导的团队信息（团队号、团队成员姓名、指导教师姓名）',
    value: `SELECT 
              t.TeamID AS TeamID,
              tm.Name AS MemberName,
              te.Name AS TeacherName
            FROM 
              TeamMember tm
            JOIN 
              Team t ON tm.TeamID = t.TeamID
            JOIN 
              TeamTeacher tt ON t.TeamID = tt.TeamID
            JOIN 
              Teacher te ON tt.TeacherID = te.TeacherID
            WHERE 
              te.University = '西安电子科技大学' 
            AND te.Name LIKE '王%';`,
  },
  {
    label: '查询西安电子科技大学团队获奖情况（团队号、获奖成员姓名、指导教师姓名、获奖）',
    value: `SELECT
              t.TeamID AS TeamID,
              tm.Name AS MemberName,
              te.Name AS TeacherName,
              ac.AwardRank AS AwardRank
            FROM
              Team t
            JOIN
                TeamMember tm ON t.TeamID = tm.TeamID
            JOIN
                TeamTeacher tt ON t.TeamID = tt.TeamID
            JOIN
                Teacher te ON tt.TeacherID = te.TeacherID
            JOIN
                AwardCertificate ac ON t.TeamID = ac.TeamID
            WHERE
                t.University = '西安电子科技大学' AND ac.AwardRank <> '0'
            ORDER BY
                t.TeamID, tm.MemberID;`,
  },
  {
    label: '给团队成员表增加一列，列名为所在学院',
    value: `ALTER TABLE TeamMember ADD COLUMN University VARCHAR(50) NOT NULL DEFAULT '';`,
  },
]

const sql = ref('')
const result: Ref<Record<string, any>[]> = ref([])

const columns = computed(() => {
  const keys = result.value.length > 0 ? Object.keys(result.value[0]) : []
  return keys.map(key => ({
    title: key,
    key,
  }))
})

const data = computed(() => result.value.map((row: Record<string, any>, idx: number) => ({
  key: idx,
  ...row,
})))

function onExampleValueUpdate(value: string) {
  sql.value = value.replace(/\s+/g, ' ')
}

async function onExecuteClick() {
  try {
    result.value = await window.db.execute(sql.value) as Record<string, any>[]
    naiveMessage.success('Executed successfully')
  }
  catch (error: any) {
    naiveMessage.error(error.message)
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 p-4 w-full">
    <NInputGroup>
      <NInput v-model:value="sql" type="text" />
      <NButton type="primary" @click="onExecuteClick">
        Execute
      </NButton>
    </NInputGroup>
    <NSelect class="flex-none" :options="exampleOption" @update:value="onExampleValueUpdate" />
    <NDataTable class="flex-auto" flex-height :columns :data />
  </div>
</template>
