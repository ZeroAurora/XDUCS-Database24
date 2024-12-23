<script setup lang="ts">
import type { DataProviderName } from '@renderer/lib/dataProvider/tables'
import type { Ref } from 'vue'
import DataDeleteBox from '@renderer/components/DataDeleteBox.vue'
import DataUpdateBox from '@renderer/components/DataUpdateBox.vue'
import { useTableDataProvider } from '@renderer/composables/TableDataProvider'
import { dataProviderSelectorOptions } from '@renderer/lib/dataProvider/tables'
import { NButton, NDataTable, NSelect } from 'naive-ui'
import { ref } from 'vue'

const dataProviderName: Ref<DataProviderName> = ref('AwardCertificate')
const { columns, data, refresh } = useTableDataProvider(dataProviderName)

const selectedId = ref(0)
const showUpdateBox = ref(false)
const showDeleteBox = ref(false)
</script>

<template>
  <div class="flex flex-col gap-4 p-4 w-full">
    <NSelect v-model:value="dataProviderName" class="flex-none" :options="dataProviderSelectorOptions" />
    <NDataTable class="flex-1" :columns="columns" :data="data" />
    <div class="flex gap-4">
      <NButton class="flex-auto" ghost type="primary" @click="showUpdateBox = true">
        Create
      </NButton>
      <NButton class="flex-auto" ghost type="primary" :disabled="selectedId === 0" @click="showUpdateBox = true">
        Update
      </NButton>
      <NButton class="flex-auto" ghost type="error" :disabled="selectedId === 0" @click="showDeleteBox = true">
        Delete
      </NButton>
    </div>
  </div>
  <DataUpdateBox v-model:show="showUpdateBox" :data-provider-name @done="refresh" />
  <DataDeleteBox v-model:show="showDeleteBox" :data-provider-name />
</template>
