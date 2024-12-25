<script setup lang="ts">
import type { DataProviderName } from '@renderer/lib/dataProvider/tables'
import type { Ref } from 'vue'
import DataDeleteBox from '@renderer/components/DataDeleteBox.vue'
import DataUpdateBox from '@renderer/components/DataUpdateBox.vue'
import { useTableDataProvider } from '@renderer/composables/TableDataProvider'
import { dataProviderSelectorOptions } from '@renderer/lib/dataProvider/tables'
import { type DataTableRowKey, NButton, NDataTable, NSelect, useMessage } from 'naive-ui'
import { ref } from 'vue'

const naiveMessage = useMessage()

const dataProviderName: Ref<DataProviderName> = ref('AwardCertificate')
const { columns, data, refresh } = useTableDataProvider(dataProviderName)

const selectedId = ref('')
const showCreateBox = ref(false)
const showUpdateBox = ref(false)
const showDeleteBox = ref(false)

async function onImportCsvClick() {
  try {
    if (!await window.db.importCsv(dataProviderName.value)) {
      naiveMessage.info('Please select a CSV.')
    }
    else {
      refresh()
    }
  }
  catch (err: any) {
    naiveMessage.error(err.message)
  }
}

async function handleCheck(rows: DataTableRowKey[]) {
  selectedId.value = String(rows[0])
}

function onUpdateDone() {
  showUpdateBox.value = false
  refresh()
}

function onCreateDone() {
  showCreateBox.value = false
  refresh()
}

function onDeleteDone() {
  showDeleteBox.value = false
  refresh()
}
</script>

<template>
  <div class="flex flex-col gap-4 p-4 w-full">
    <div class="flex gap-4">
      <NSelect v-model:value="dataProviderName" :options="dataProviderSelectorOptions" />
      <NButton class="flex-none" ghost type="primary" @click="refresh">
        Refresh
      </NButton>
    </div>
    <NDataTable class="flex-auto" flex-height :columns :data @update:checked-row-keys="handleCheck" />
    <div class="flex gap-4">
      <NButton class="flex-auto" ghost type="primary" @click="onImportCsvClick">
        Import CSV
      </NButton>
      <NButton class="flex-auto" ghost type="primary" @click="showCreateBox = true">
        Create
      </NButton>
      <NButton class="flex-auto" ghost type="primary" :disabled="selectedId === ''" @click="showUpdateBox = true">
        Update
      </NButton>
      <NButton class="flex-auto" ghost type="error" :disabled="selectedId === ''" @click="showDeleteBox = true">
        Delete
      </NButton>
    </div>
  </div>
  <DataUpdateBox v-model:show="showCreateBox" :data-provider-name @done="onCreateDone" />
  <DataUpdateBox v-model:show="showUpdateBox" :data-provider-name :selected-id @done="onUpdateDone" />
  <DataDeleteBox v-model:show="showDeleteBox" :data-provider-name :selected-id @done="onDeleteDone" />
</template>
