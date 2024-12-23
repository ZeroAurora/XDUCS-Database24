<script setup lang="ts">
import { NButton, NInput, NInputGroup } from 'naive-ui'
import { ref } from 'vue'

const sql = ref('')
const result = ref('')

async function onExecuteClick() {
  try {
    result.value = JSON.stringify(await window.db.execute(sql.value), null, 2)
  }
  catch (error: any) {
    result.value = error.message
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 p-4 w-full">
    <NInputGroup>
      <NInput v-model:value="sql" type="textarea" autosize />
      <NButton type="primary" @click="onExecuteClick">
        Execute
      </NButton>
    </NInputGroup>
    <pre class="whitespace-pre-wrap">{{ result }}</pre>
  </div>
</template>
