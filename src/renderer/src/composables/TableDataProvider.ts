import type { MaybeRefOrGetter, Ref } from 'vue'
import type { DataProviderName } from '../lib/dataProvider/tables'
import { ref, toValue, watch } from 'vue'
import { createColumns, getDataProvider, getTableData } from '../lib/dataProvider/tables'

export function useTableDataProvider(nameRefOrGetter: MaybeRefOrGetter<DataProviderName>) {
  let provider: ReturnType<typeof getDataProvider>
  const columns: Ref<ReturnType<typeof createColumns>> = ref([])
  const data: Ref<Awaited<ReturnType<typeof getTableData>>> = ref([])
  const schema: Ref<typeof provider.schema> = ref([])

  watch(() => toValue(nameRefOrGetter), async (name) => {
    provider = getDataProvider(name)

    columns.value = createColumns(provider)
    data.value = await getTableData(provider)
    schema.value = provider.schema
  }, { immediate: true })

  async function refresh() {
    data.value = await getTableData(provider)
    schema.value = provider.schema
  }

  return {
    columns,
    data,
    schema,
    refresh,
    getDataByID: async (id: string) => await provider.getDataByID(id),
    createData: async (data: any) => await provider.createData(data),
    updateDataByID: async (id: string, data: any) => await provider.updateDataByID(id, data),
    deleteData: async (id: string) => await provider.deleteData(id),
  }
}
