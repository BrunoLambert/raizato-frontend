<template>
  <div>
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-2xl"><b>Produtos da Plataforma</b></h2>
        <small v-if="!isCommonUser" class="text-xs">Clique na categoria para editar</small>
      </div>
      <UButton v-if="!isCommonUser" icon="i-mdi:database-plus" color="blue" size="xl" @click="modelOpen = true">
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
      <ProductForm :product="selected" @update="handleUpdate" />
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import type { CommonTableColsTitle } from '~/assets/types/components';
import type { ProductModel } from '~/assets/types/products';
import ProductForm from '~/components/Products/ProductForm.vue';
import { useProductStore } from '~/store/product';


// Store
const productStore = useProductStore()

// Hooks
const isCommonUser = useIsCommonUser()

// State
const loading = ref<boolean>()
const page = ref<number>(1)
const selected = ref<ProductModel>()
const modelOpen = ref<boolean>(false)
const tableCols: CommonTableColsTitle[] = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'name',
    label: 'NOME'
  },
  {
    key: 'code',
    label: 'CÓDIGO'
  },
  // {
  //   key: 'description',
  //   label: 'DESCRIÇÃO'
  // },
  {
    key: 'cost_price',
    label: 'PREÇO DE CUSTO'
  },
  {
    key: 'selling_price',
    label: 'PREÇO DE VENDA'
  },
  {
    key: 'minimum_stock',
    label: 'ESTOQUE MÍNIMO'
  },
  {
    key: 'formatted_expiration_date',
    label: 'DATA DE EXPIRAÇÃO'
  },
  {
    key: 'formatted_created_at',
    label: 'CRIADO EM'
  }
]

// Async Data
const { data, refresh } = useAsyncData('suppliers', () => {
  loading.value = true
  return productStore.get(page.value)
}, {
  watch: [page],
  transform: (data) => {
    loading.value = false
    return {
      ...data,
      data: data.data.map(product => ({
        ...product,
        formatted_created_at: new Date(product.created_at).toLocaleDateString(),
        formatted_updated_at: new Date(product.updated_at).toLocaleDateString(),
        formatted_expiration_date: new Date(product.expiration_date).toLocaleDateString(),
      }))
    }
  }
})

// Methods 
const handleSelect = (selectedRow: ProductModel) => {
  selected.value = selectedRow
  modelOpen.value = true
}
const handleUpdate = () => {
  modelOpen.value = false
  selected.value = undefined;
  refresh()
}
</script>