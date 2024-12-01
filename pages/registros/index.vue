<template>
  <div>
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-2xl"><b>Registros da Plataforma</b></h2>
        <small v-if="!isCommonUser" class="text-xs">Clique no registro para editar</small>
      </div>
      <UButton icon="i-mdi:cloud-plus" color="blue" size="xl" @click="modelOpen = true">
        Nova entrada / saída
      </UButton>
    </div>
    <div class="mt-5">
      <CommonTable :colsTitle="tableCols" :data="data?.data || []" :loading="loading" @select="handleSelect" />
    </div>
    <div class="flex justify-center mt-5 mb-10">
      <UPagination v-model="page" size="xl" :pageCount="data?.per_page || 15" :total="data?.total || 1" :max="10"
        :disabled="loading" />
    </div>
    <UModal v-model="modelOpen">
      <StocklogForm :stocklog="selected" @update="handleUpdate" />
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import type { CommonTableColsTitle } from '~/assets/types/components';
import { StocklogTypeNames, type StocklogModel } from '~/assets/types/stocklog';
import { UserRole } from '~/assets/types/user';
import StocklogForm from '~/components/Stocklog/StocklogForm.vue';
import { useStocklogStore } from '~/store/stocklog';
import { useUserStore } from '~/store/user';


// Store
const stocklogStore = useStocklogStore()
const userStore = useUserStore()

// Hooks
const isCommonUser = useIsCommonUser()

// State
const loading = ref<boolean>()
const page = ref<number>(1)
const selected = ref<StocklogModel>()
const modelOpen = ref<boolean>(false)
const tableCols: CommonTableColsTitle[] = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'quantity',
    label: 'QUANTIDADE'
  },
  {
    key: 'formatted_type',
    label: "TIPO"
  },
  {
    key: 'stock.product.name',
    label: 'PRODUTO'
  },
  {
    key: 'stock.product.category.name',
    label: 'CATEGORIA'
  },
  {
    key: 'stock.product.supplier.name',
    label: 'FORNECESOR'
  }
]

// Async Data
const { data, refresh } = useAsyncData('stocklogs', () => {
  loading.value = true
  return stocklogStore.get(page.value)
}, {
  watch: [page],
  transform: (data) => {
    loading.value = false
    return {
      ...data,
      data: data.data.map(stocklog => ({
        ...stocklog,
        formatted_created_at: new Date(stocklog.created_at).toLocaleDateString(),
        formatted_updated_at: new Date(stocklog.updated_at).toLocaleDateString(),
        formatted_type: StocklogTypeNames[stocklog.type],
      }))
    }
  }
})

// Methods 
const handleSelect = (selectedRow: StocklogModel) => {
  if (userStore.details.role === UserRole.COMMON) return;

  selected.value = selectedRow
  modelOpen.value = true
}
const handleUpdate = () => {
  modelOpen.value = false
  selected.value = undefined;
  refresh()
}
</script>