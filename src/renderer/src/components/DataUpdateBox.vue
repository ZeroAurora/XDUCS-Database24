<script setup lang="ts">
import type { DataProviderName } from '@renderer/lib/dataProvider/tables'
import type { Ref } from 'vue'
import { useTableDataProvider } from '@renderer/composables/TableDataProvider'
import { NAlert, NButton, NForm, NFormItem, NFormItemGi, NGrid, NInput, NModal } from 'naive-ui'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  dataProviderName: DataProviderName
  selectedId?: string
}>()
const emit = defineEmits(['done'])

const { schema, getDataByID, updateDataByID, createData } = useTableDataProvider(() => props.dataProviderName)

const data: Ref<Record<string, any>> = ref({})
const error = ref('')

watchEffect(async () => {
  if (props.selectedId) {
    data.value = await getDataByID(props.selectedId) ?? {}
  }
  else {
    data.value = {}
  }
})

async function onSaveClick() {
  try {
    if (props.selectedId) {
      await updateDataByID(props.selectedId, data.value)
    }
    else {
      await createData(data.value)
    }
    emit('done')
  }
  catch (err: any) {
    error.value = err.message
    console.error(error)
  }
}
</script>

<template>
  <NModal class="max-w-90vw w-800px" preset="card" title="Create" size="huge" aria-modal="true">
    <div class="flex flex-col gap-4">
      <NAlert v-if="error" type="error" title="Error">
        {{ error }}
      </NAlert>
      <NForm :model="data" :label-width="80">
        <NGrid :cols="2" :x-gap="8" :y-gap="8">
          <NFormItemGi v-for="item in schema" :key="item.key" :label="item.title">
            <NInput type="text" v-model:value="data[item.key]" :disabled="item.primary && !!selectedId" />
          </NFormItemGi>
          <NFormItem />
        </NGrid>
        <NButton type="primary" @click="onSaveClick">
          Save
        </NButton>
      </NForm>
    </div>
  </NModal>
</template>
