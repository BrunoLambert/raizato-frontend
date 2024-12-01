<template>
  <div>
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-2xl"><b>Categorias da Plataforma</b></h2>
        <small v-if="!isCommonUser" class="text-xs">Clique na categoria para editar</small>
      </div>
      <UButton v-if="!isCommonUser" icon="i-mdi:view-grid-plus" color="blue" size="xl" @click="modelOpen = true">
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
      <CategoryForm :category="selected" @update="handleUpdate" />
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import type { CategoryModel } from '~/assets/types/category';
import type { CommonTableColsTitle } from '~/assets/types/components';
import CategoryForm from '~/components/Categories/CategoryForm.vue';
import { useCategoryStore } from '~/store/category';

// Store
const categoryStore = useCategoryStore()

// Hooks
const isCommonUser = useIsCommonUser()

// State
const loading = ref<boolean>()
const page = ref<number>(1)
const selected = ref<CategoryModel>()
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
    key: 'formatted_created_at',
    label: 'CRIADO EM'
  }
]

// Async Data
const { data, refresh } = useAsyncData('categories', () => {
  loading.value = true
  return categoryStore.get(page.value)
}, {
  watch: [page],
  transform: (data) => {
    loading.value = false
    return {
      ...data,
      data: data.data.map(category => ({
        ...category,
        formatted_created_at: new Date(category.created_at).toLocaleDateString(),
        formatted_updated_at: new Date(category.updated_at).toLocaleDateString(),
      }))
    }
  }
})

// Methods 
const handleSelect = (selectedRow: CategoryModel) => {
  selected.value = selectedRow
  modelOpen.value = true
}
const handleUpdate = () => {
  modelOpen.value = false
  selected.value = undefined;
  refresh()
}
</script>