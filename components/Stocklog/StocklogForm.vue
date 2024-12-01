<template>
  <UCard>
    <template #header>
      <h2 class="text-2xl font-bold">
        {{ stocklog ? `Registro ##${stocklog.id}` : "Registro Novo" }}
      </h2>
    </template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CommonInput v-model:value="form.quantity" label="Quantidade" placeholder="Insira um valor" :disabled="loading" />
      <div>
        <label class="text-base pl-1">Tipo</label>
        <USelect v-model="form.type" :options="stocklogTypesList" :disabled="selectDisabled" />
      </div>
      <div>
        <label class="text-base pl-1">Produto</label>
        <UInputMenu v-model="form.product_id" v-model:query="searchingProduct" :options="categorySearch || []" by="id"
          option-attribute="name" :search-attributes="['name']" :disabled="loading" />
      </div>
      <CommonInput v-model:value="form.formatted_created_at" label="Data de Registro" readonly />
      <CommonInput v-model:value="form.formatted_updated_at" label="Última atualização" readonly />

      <UButton v-if="!!stocklog" label="Excluir Permanentemente" size="sm" class="block h-9 self-end" variant="soft"
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
import type { StocklogFormProps } from '~/assets/types/components';
import { ExtendedStocklogType, StocklogType, StocklogTypeNames, type CompletedStocklogType, type StocklogModel } from '~/assets/types/stocklog';
import { useProductStore } from '~/store/product';
import { useStocklogStore } from '~/store/stocklog';


// UI
const toast = useToast()

// Store
const productStore = useProductStore()
const stocklogStore = useStocklogStore()

// Props
const { stocklog } = defineProps<StocklogFormProps>()

// Emits
const emit = defineEmits(["update"])

// State
const DEFAULT_STOCKLOG = {
  id: 0,
  quantity: 0,
  type: StocklogType.Purchase,
  formatted_type: StocklogTypeNames[StocklogType.Purchase],
  stock_id: 0,
  user_id: 0,
  created_at: 'N/A',
  updated_at: 'N/A',
  formatted_created_at: 'N/A',
  formatted_updated_at: 'N/A'
}
const stocklogTypesList = (Object.keys(StocklogTypeNames) as CompletedStocklogType[]).map((key: CompletedStocklogType) => ({
  value: key,
  label: StocklogTypeNames[key],
  disabled: Object.values(ExtendedStocklogType).includes(key as any)
}))
const form = ref<StocklogModel>({ ...DEFAULT_STOCKLOG })
const loading = ref<boolean>(false)
const searchingProduct = ref<string>("")

// Async Data
const { data: categorySearch } = useAsyncData('searchProduct', () => {
  return productStore.search(searchingProduct.value, true)
}, {
  watch: [searchingProduct]
})

// Computed
const selectDisabled = computed(() => {
  return loading.value || Object.values(ExtendedStocklogType).includes(form.value.type as any)
})

// Methods
const onSave = async () => {
  loading.value = true
  try {
    const toSaveData = {
      ...form.value,
      product_id: typeof form.value.product_id === 'number' ? form.value.product_id : (form.value.product_id as any).id,
    }

    if (!!stocklog) {
      const saved = await stocklogStore.save(toSaveData)
      toast.add({ title: "Registro salvo com sucesso!" })
      emit("update", saved)
    } else {
      const news = await stocklogStore.create(toSaveData)
      toast.add({
        title: "Registro cadastrado com sucesso!",
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
    const success = await stocklogStore.delete(form.value)
    if (success) {
      toast.add({ title: "Registro removido com sucesso!" })
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
    ...stocklog || DEFAULT_STOCKLOG,
    product_id: stocklog?.stock?.product?.id
  }

  searchingProduct.value = stocklog?.stock?.product?.name || ''
})
</script>