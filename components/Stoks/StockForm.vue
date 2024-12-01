<template>
  <UCard>
    <template #header>
      <h2 class="text-2xl font-bold">
        {{ stock ? `Estoque ##${stock.id}` : "Estoque Novo" }}
      </h2>
    </template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CommonInput v-model:value="form.quantity" label="Quantidade" placeholder="Insira um valor" :disabled="loading"
        type="number" />
      <div>
        <label class="text-base pl-1">Produto</label>
        <UInputMenu v-model="form.product_id" v-model:query="searchingProduct" :options="productSearch || []" by="id"
          option-attribute="name" :search-attributes="['name']" :disabled="loading" />
      </div>
      <CommonInput v-model:value="form.formatted_created_at" label="Data de Registro" readonly />
      <CommonInput v-model:value="form.formatted_updated_at" label="Última atualização" readonly />
      <UButton v-if="!!stock" label="Excluir Permanentemente" size="sm" class="block h-9 self-end" variant="soft"
        color="red" @click="onDelete" />
    </div>

    <template #footer>
      <div class="flex flex-row gap-2">
        <UButton label="Voltar" size="xl" full-width class="flex-1 justify-center" variant="outline" color="rose"
          @click="emit('update')" />
        <UButton label="Salvar" size="xl" full-width class="flex-1 justify-center" color="primary" :loading="loading"
          @click="onSave" />
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import type { StockFormProps } from '~/assets/types/components';
import type { StockModel } from '~/assets/types/stock';
import { useProductStore } from '~/store/product';
import { useStockStore } from '~/store/stock';

// UI
const toast = useToast()

// Store
const stockStore = useStockStore()
const productStore = useProductStore()

// Props
const { stock } = defineProps<StockFormProps>()

// Emits
const emit = defineEmits(["update"])

// State
const DEFAULT_STOCK = {
  id: 0,
  quantity: 0,
  product_id: 0,
  created_at: 'N/A',
  updated_at: 'N/A',
  formatted_created_at: 'N/A',
  formatted_updated_at: 'N/A'
}
const form = ref<StockModel>(DEFAULT_STOCK)
const loading = ref<boolean>(false)
const searchingProduct = ref<string>("")

// Async Data
const { data: productSearch } = useAsyncData('searchingProduct', () => {
  return productStore.search(searchingProduct.value)
}, {
  watch: [searchingProduct]
})

// Methods
const onSave = async () => {
  loading.value = true
  try {
    const toSaveData = {
      ...form.value,
      product_id: typeof form.value.product_id === 'number' ? form.value.product_id : (form.value.product_id as any).id,
    }

    if (!!stock) {
      const saved = await stockStore.save(toSaveData)
      toast.add({ title: "Produto salvo com sucesso!" })
      emit("update", saved)
    } else {
      const news = await stockStore.create(toSaveData)
      toast.add({
        title: "Estoque cadastrado com sucesso!",
        description: `Agora será possível dar entrada e saída nesse estoque.`
      })
      emit("update", news)
    }
  } catch (error) {
    console.error(error)
    toast.add({ title: "Houve um erro inesperado" })
  }
  loading.value = false
}
const onDelete = async () => {
  loading.value = true
  try {
    const success = await stockStore.delete(form.value)
    if (success) {
      toast.add({ title: "Estoque removido com sucesso!" })
      emit("update", form.value)
    }
  } catch (error) {
    console.error(error)
    toast.add({ title: "Houve um erro inesperado" })
  }
  loading.value = false
}

// Lifecycle
onMounted(() => {
  form.value = {
    ...stock || DEFAULT_STOCK,
  }

  searchingProduct.value = stock?.product?.name || ''
  // searchingSupplier.value = product?.supplier?.name || ''
})
</script>