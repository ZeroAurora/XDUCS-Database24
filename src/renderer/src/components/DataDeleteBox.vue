<script setup lang="ts">
import type { DataProviderName } from '@renderer/lib/dataProvider/tables'
import { useTableDataProvider } from '@renderer/composables/TableDataProvider'
import { NModal } from 'naive-ui'
import { ref } from 'vue';

const props = defineProps<{
  dataProviderName: DataProviderName
  selectedId: string
}>()
const emit = defineEmits(['done'])

const { deleteData } = useTableDataProvider(() => props.dataProviderName)

function onDeleteClick() {
  deleteData(props.selectedId)
  emit('done')
}
</script>

<template>
  <NModal
    class="w-l max-w-90vw"
    preset="dialog"
    type="error"
    size="large"
    aria-modal="true"
    title="Delete"
    content="Are you sure you want to delete this data?"
    positive-text="Yes"
    negative-text="No"
    @positive-click="onDeleteClick"
  />
</template>
