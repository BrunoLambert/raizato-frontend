<template>
  <UCard>
    <template #header>
      <h2 class="text-2xl font-bold">
        {{ category ? `Categoria ##${category.id}` : "Categoria Nova" }}
      </h2>
    </template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CommonInput v-model:value="form.name" label="Nome" placeholder="Insira o nome" :disabled="loading" />
      <CommonInput v-model:value="form.formatted_created_at" label="Data de Registro" readonly />
      <CommonInput v-model:value="form.formatted_updated_at" label="Última atualização" readonly />
      <UButton v-if="!!category" label="Excluir Permanentemente" size="sm" class="block h-9 self-end" variant="soft"
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
import type { CategoryModel } from '~/assets/types/category';
import { type CategoryFormProps } from '~/assets/types/components';
import { useCategoryStore } from '~/store/category';

// UI
const toast = useToast()

// Store
const categoryStore = useCategoryStore()

// Props
const { category } = defineProps<CategoryFormProps>()

// Emits
const emit = defineEmits(["update"])

// State
const DEFAULT_CATEGORY = {
  id: 0,
  name: '',
  created_at: 'N/A',
  updated_at: 'N/A',
  formatted_created_at: 'N/A',
  formatted_updated_at: 'N/A'
}
const form = ref<CategoryModel>(DEFAULT_CATEGORY)
const loading = ref<boolean>(false)

// Methods
const onSave = async () => {
  loading.value = true
  try {
    if (!!category) {
      const savedCategory = await categoryStore.save(form.value)
      toast.add({ title: "Categoria salva com sucesso!" })
      emit("update", savedCategory)
    } else {
      const newCategory = await categoryStore.create(form.value)
      toast.add({
        title: "Categoria cadastrada com sucesso!",
        description: `${newCategory.name} já pode ser usada no cadastro de produtos.`
      })
      emit("update", newCategory)
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
    const success = await categoryStore.delete(form.value)
    if (success) {
      toast.add({ title: "Categoria removida com sucesso!" })
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
    ...category || DEFAULT_CATEGORY
  }
})
</script>