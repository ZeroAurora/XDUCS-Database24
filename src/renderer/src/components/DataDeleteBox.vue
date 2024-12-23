<script setup lang="ts">
import type { DataProviderName } from '@renderer/lib/dataProvider/tables'
import { useTableDataProvider } from '@renderer/composables/TableDataProvider'
import { NModal } from 'naive-ui'
import { ref } from 'vue';

const props = defineProps<{
  dataProviderName: DataProviderName
}>()

const dataProvider = useTableDataProvider(props.dataProviderName)


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
  />
</template>
