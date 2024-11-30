<template>
  <div>
    <UTable :columns="colsTitle" :rows="data" :loading="loading"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Carregando...' }"
      :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'Vazio' }"
      class="border-2 border-gray-800/50 bg-sky-700 rounded-xl" :ui="{
        tr: { base: 'hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer' }, td: { base: 'dark:text-white' },
        thead: 'bg-gray-800 hover:bg-gray-800'
      }" @select="onSelect">
      <slot />
    </UTable>
  </div>
</template>

<script lang="ts" setup>
import type { CommonTableProps } from '~/assets/types/components';

// Events
const emit = defineEmits(["select"])

// Props
const { colsTitle, data, loading } = defineProps<CommonTableProps>()

// Methods
const onSelect = (selectedRow: any) => {
  emit("select", selectedRow)
}
</script>