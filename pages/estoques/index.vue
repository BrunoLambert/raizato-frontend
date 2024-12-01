<template>
  <div>
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-2xl"><b>Estoques da Plataforma</b></h2>
        <small v-if="!isCommonUser" class="text-xs">Clique no estoque para ajustar</small>
      </div>
      <UButton v-if="!isCommonUser" icon="i-mdi:store-plus" color="blue" size="xl" @click="modelOpen = true">
        Novo
      </UButton>
    </div>
    <div class="mt-5">
      <CommonTable :colsTitle="tableCols" :data="data?.data || []" :loading="loading" @select="handleSelect" />
    </div>
    <div class="flex justify-center mt-5 mb-10">
      <UPagination v-model="page" size="xl" :pageCount="data?.per_page || 15" :total="data?.total || 1" :max="10"
        :disabled="loading" />
    </div>
    <UModal v-if="!isCommonUser" v-model="modelOpen">
      <StockForm :stock="selected" @update="handleUpdate" />
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import type { CommonTableColsTitle } from '~/assets/types/components';
import type { StockModel } from '~/assets/types/stock';
import StockForm from '~/components/Stoks/StockForm.vue';
import { useStockStore } from '~/store/stock';


// Store
const stockStore = useStockStore()

// Hooks
const isCommonUser = useIsCommonUser()

// State
const loading = ref<boolean>()
const page = ref<number>(1)
const selected = ref<StockModel>()
const modelOpen = ref<boolean>(false)
const tableCols: CommonTableColsTitle[] = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'product.name',
    label: 'PRODUTO'
  },
  {
    key: 'quantity',
    label: 'QUANTIDADE'
  },
  {
    key: 'product.minimum_stock',
    label: 'ESTOQUE MÍNIMO'
  },
  {
    key: 'formatted_created_at',
    label: 'CRIADO EM'
  },
  {
    key: 'formatted_updated_at',
    label: 'ÚLTIMO UPDATE'
  }
]

// Async Data
const { data, refresh } = useAsyncData('stocks', () => {
  loading.value = true
  return stockStore.get(page.value)
}, {
  watch: [page],
  transform: (data) => {
    loading.value = false
    return {
      ...data,
      data: data.data.map(stock => ({
        ...stock,
        formatted_created_at: new Date(stock.created_at).toLocaleDateString(),
        formatted_updated_at: new Date(stock.updated_at).toLocaleDateString(),
      }))
    }
  }
})

// Methods 
const handleSelect = (selectedRow: StockModel) => {
  selected.value = selectedRow
  modelOpen.value = true
}
const handleUpdate = () => {
  modelOpen.value = false
  selected.value = undefined;
  refresh()
}
</script>