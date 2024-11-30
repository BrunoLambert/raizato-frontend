<template>
  <div class="flex items-center flex-col mb-10">
    <div class="w-full max-w-2xl">
      <UTabs :default-index="0" :items="homeItems" class="w-full">
        <template #item="{ item }">
          <CommonTable :data="item.table.data" :colsTitle="item.table.colsTitle" :loading="loading" />
        </template>
      </UTabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { HomeTabsType } from '~/assets/types/components';
import type { ProductModel } from '~/assets/types/product';
import type { StockModel } from '~/assets/types/stock';

const api = useApi()
// State
const homeItems = ref<HomeTabsType[]>([])
const loading = ref<boolean>(true)

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