<template>
  <UCard>
    <template #header>
      <h2 class="text-2xl font-bold">
        {{ product ? `Produto ##${product.id}` : "Produto Novo" }}
      </h2>
    </template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CommonInput v-model:value="form.name" label="Nome" placeholder="Insira o nome" :disabled="loading" />
      <CommonInput v-model:value="form.code" label="Código" placeholder="Insira o código" :disabled="loading" />
      <CommonInput v-model:value="form.description" label="Descrição" placeholder="Insira uma descrição"
        :disabled="loading" />
      <CommonInput v-model:value="form.cost_price" label="Preço de custo" placeholder="Insira um preço"
        :disabled="loading" type="number" />
      <CommonInput v-model:value="form.selling_price" label="Preço de venda" placeholder="Insira um preço"
        :disabled="loading" type="number" />
      <CommonInput v-model:value="form.minimum_stock" label="Estoque mínimo" placeholder="Insira um valor"
        :disabled="loading" type="number" />
      <CommonInput v-model:value="form.expiration_date" label="Data de expiração" placeholder="Insira uma data"
        :disabled="loading" />
      <div>
        <label class="text-base pl-1">Categoria</label>
        <UInputMenu v-model="form.category_id" v-model:query="seachingCategory" :options="categorySearch || []" by="id"
          option-attribute="name" :search-attributes="['name']" :disabled="loading" />
      </div>
      <div>
        <label class="text-base pl-1">Fornecedor</label>
        <UInputMenu v-model="form.supplier_id" v-model:query="searchingSupplier" :options="supplierSearch || []" by="id"
          option-attribute="name" :search-attributes="['name']" :disabled="loading" />
      </div>
      <CommonInput v-model:value="form.formatted_created_at" label="Data de Registro" readonly />
      <CommonInput v-model:value="form.formatted_updated_at" label="Última atualização" readonly />
      <UButton v-if="!!product" label="Excluir Permanentemente" size="sm" class="block h-9 self-end" variant="soft"
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
import type { ProductFormProps } from '~/assets/types/components';
import type { ProductModel } from '~/assets/types/products';
import { useCategoryStore } from '~/store/category';
import { useProductStore } from '~/store/product';
import { useSupplierStore } from '~/store/supplier';


// UI
const toast = useToast()

// Store
const productStore = useProductStore()
const categoryStore = useCategoryStore()
const supplierStore = useSupplierStore()

// Props
const { product } = defineProps<ProductFormProps>()

// Emits
const emit = defineEmits(["update"])

// State
const DEFAULT_PRODUCT = {
  id: 0,
  name: '',
  code: '',
  description: '',
  cost_price: 0.00,
  selling_price: 0.00,
  minimum_stock: 0,
  expiration_date: '',
  category_id: 0,
  supplier_id: 0,
  created_at: 'N/A',
  updated_at: 'N/A',
  formatted_created_at: 'N/A',
  formatted_updated_at: 'N/A'
}
const form = ref<ProductModel>(DEFAULT_PRODUCT)
const loading = ref<boolean>(false)
const seachingCategory = ref<string>("")
const searchingSupplier = ref<string>("")

// Async Data
const { data: categorySearch } = useAsyncData('searchCategories', () => {
  return categoryStore.search(seachingCategory.value)
}, {
  watch: [seachingCategory]
})
const { data: supplierSearch } = useAsyncData('searchSuppliers', () => {
  return supplierStore.search(searchingSupplier.value)
}, {
  watch: [searchingSupplier]
})

// Methods
const onSave = async () => {
  loading.value = true
  try {
    const dateSplited = form.value.expiration_date.split('/')
    if (dateSplited.length !== 3) {
      return toast.add({
        title: "Data de expiraçao inválida",
        description: "Use a formatação: DD/MM/YYYY",
        color: 'yellow'
      })
    }
    let preparingExpData = new Date()
    preparingExpData.setDate(+dateSplited[0])
    preparingExpData.setMonth(+dateSplited[1] - 1)
    preparingExpData.setFullYear(+dateSplited[2])

    const toSaveData = {
      ...form.value,
      expiration_date: preparingExpData.toISOString().split("T")[0],
      category_id: typeof form.value.category_id === 'number' ? form.value.category_id : (form.value.category_id as any).id,
      supplier_id: typeof form.value.supplier_id === 'number' ? form.value.supplier_id : (form.value.supplier_id as any).id,
    }

    if (!!product) {
      const savedProduct = await productStore.save(toSaveData)
      toast.add({ title: "Produto salvo com sucesso!" })
      emit("update", savedProduct)
    } else {
      const newProduct = await productStore.create(toSaveData)
      toast.add({
        title: "Produto cadastrado com sucesso!",
        description: `${newProduct.name} já pode ser usado para movimentação no estoque`
      })
      emit("update", newProduct)
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
    const success = await productStore.delete(form.value)
    if (success) {
      toast.add({ title: "Produto removido com sucesso!" })
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
    ...product || DEFAULT_PRODUCT,
    expiration_date: product?.formatted_expiration_date || ''
  }

  seachingCategory.value = product?.category?.name || ''
  searchingSupplier.value = product?.supplier?.name || ''
})
</script>