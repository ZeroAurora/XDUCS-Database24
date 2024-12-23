<script setup lang="ts">
import type { DataProviderName } from '@renderer/lib/dataProvider/tables'
import type { Ref } from 'vue'
import { useTableDataProvider } from '@renderer/composables/TableDataProvider'
import { NButton, NForm, NFormItem, NInput, NModal } from 'naive-ui'
import { ref, toRefs, watchEffect } from 'vue'

const props = defineProps<{
  dataProviderName: DataProviderName
  id?: string
}>()
const emit = defineEmits(['done'])

const propsRefs = toRefs(props)

const { schema, getDataByID, updateDataByID, createData } = useTableDataProvider(propsRefs.dataProviderName)

const data: Ref<Record<string, any>> = ref({})

watchEffect(async () => {
  if (props.id) {
    data.value = await getDataByID(props.id) ?? {}
  }
  else {
    data.value = {}
  }
})

function onSaveClick() {
  if (props.id) {
    updateDataByID(props.id, data.value)
  }
  else {
    createData(data.value)
  }
  emit('done')
}
</script>

<template>
  <NModal class="w-xl max-w-90vw" preset="card" title="Create" size="huge" aria-modal="true">
    <div class="flex flex-col gap-4">
      <NForm :model="data" :label-width="80">
        <NFormItem v-for="item in schema" :key="item.key" :label="item.title">
          <NInput v-model:value="data[item.key]" />
        </NFormItem>
        <NFormItem>
          <NButton type="primary" @click="onSaveClick">
            Save
          </NButton>
        </NFormItem>
      </NForm>
    </div>
  </NModal>
</template>
