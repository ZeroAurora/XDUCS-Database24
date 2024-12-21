<script setup lang="ts">
import type { Ref } from 'vue'
import type { DataProviderName } from '../../lib/DataProvider'
import { NDataTable } from 'naive-ui'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getDataProvider } from '../../lib/DataProvider'

const route = useRoute()
const providerName = route.params.provider as DataProviderName

const dataProvider = getDataProvider(providerName)
const columns = dataProvider.createColumns()

const data: Ref<any[]> = ref([])

watch(() => route.params.provider, async () => {
  data.value = await dataProvider.getAllData()
  console.debug(data.value) // eslint-disable-line no-console
}, { immediate: true })
</script>

<template>
  <NDataTable :columns="columns" :data="data" />
</template>
