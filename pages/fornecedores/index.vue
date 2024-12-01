<template>
  <div>
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-2xl"><b>Fornecedores da Plataforma</b></h2>
        <small v-if="!isCommonUser" class="text-xs">Clique na categoria para editar</small>
      </div>
      <UButton v-if="!isCommonUser" icon="i-mdi:truck-plus" color="blue" size="xl" @click="modelOpen = true">
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
      <SupplierForm :supplier="selected" @update="handleUpdate" />
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import type { CommonTableColsTitle } from '~/assets/types/components';
import type { SupplierModel } from '~/assets/types/suppliers';
import SupplierForm from '~/components/Suppliers/SupplierForm.vue';
import { useSupplierStore } from '~/store/supplier';


// Store
const supplierStore = useSupplierStore()

// Hooks
const isCommonUser = useIsCommonUser()

// State
const loading = ref<boolean>()
const page = ref<number>(1)
const selected = ref<SupplierModel>()
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
    key: 'cnpj',
    label: 'CNPJ'
  },
  {
    key: 'contact',
    label: 'CONTATO'
  },
  {
    key: 'formatted_created_at',
    label: 'CRIADO EM'
  }
]

// Async Data
const { data, refresh } = useAsyncData('suppliers', () => {
  loading.value = true
  return supplierStore.get(page.value)
}, {
  watch: [page],
  transform: (data) => {
    loading.value = false
    return {
      ...data,
      data: data.data.map(supplier => ({
        ...supplier,
        formatted_created_at: new Date(supplier.created_at).toLocaleDateString(),
        formatted_updated_at: new Date(supplier.updated_at).toLocaleDateString(),
      }))
    }
  }
})

// Methods 
const handleSelect = (selectedRow: SupplierModel) => {
  selected.value = selectedRow
  modelOpen.value = true
}
const handleUpdate = () => {
  modelOpen.value = false
  selected.value = undefined;
  refresh()
}
</script>