<template>
  <div class="flex items-center flex-col">
    <h2 class="mb-5 text-lg self-start underline">Pagina Inicial</h2>
    <div class="w-full max-w-2xl">
      <UTabs :default-index="0" :items="homeItems" class="w-full">
        <template #item="{ item }">
          <UTable :columns="item.table.colsTitle" :rows="item.table.data" :loading="loading"
            :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Carregando...' }"
            :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'Vazio' }"
            class="border-2 border-gray-800/50 bg-sky-700 rounded-xl" :ui="{
              tr: { base: 'hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer' }, td: { base: 'dark:text-white' }
            }" />
        </template>
      </UTabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { ProductModel } from '~/assets/types/product';
import type { StockModel } from '~/assets/types/stock';

const api = useApi()
// State
const homeItems = ref<any[]>([])
const loading = ref<boolean>(true);

// Lifecycle Functions
onMounted(async () => {
  loading.value = true;
  const lowStockData = await api('/listing/lowstock', "GET") as StockModel[];
  const expirationData = await api('/listing/expiration', "GET") as ProductModel[];

  homeItems.value = [
    {
      key: 'stock',
      label: "Estoque baixo",
      table: {
        colsTitle: [
          { label: "Código", key: "product.code" },
          { label: "Produto", key: "product.name" },
          { label: "Quantidade", key: "quantity" },
          { label: "Qtd Mínima", key: "product.minimum_stock" }
        ],
        data: Object.values(lowStockData)
      }
    },
    {
      key: 'expiration',
      label: 'Data de validade',
      table: {
        colsTitle: [
          { label: "Código", key: "code" },
          { label: "Produto", key: "name" },
          { label: "Quantidade", key: "stock.quantity" },
          { label: "Validade", key: "expiration_date" }
        ],
        data: Object.values(expirationData).map((data) => ({
          ...data,
          expiration_date: new Date(data.expiration_date).toLocaleDateString()
        }))
      }
    }
  ]

  loading.value = false
}) 
</script>