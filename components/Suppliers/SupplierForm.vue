<template>
  <UCard>
    <template #header>
      <h2 class="text-2xl font-bold">
        {{ supplier ? `Fornecedor ##${supplier.id}` : "Fornecedor Novo" }}
      </h2>
    </template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CommonInput v-model:value="form.name" label="Nome" placeholder="Insira o nome" :disabled="loading" />
      <CommonInput v-model:value="form.cnpj" label="CNPJ" placeholder="Insira o CNPJ" :disabled="loading" />
      <CommonInput v-model:value="form.contact" label="Contato" placeholder="Insira a informção de contato"
        :disabled="loading" />
      <CommonInput v-model:value="form.formatted_created_at" label="Data de Registro" readonly />
      <CommonInput v-model:value="form.formatted_updated_at" label="Última atualização" readonly />
      <UButton v-if="!!supplier" label="Excluir Permanentemente" size="sm" class="block h-9 self-end" variant="soft"
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
import type { SupplierFormProps } from '~/assets/types/components';
import type { SupplierModel } from '~/assets/types/suppliers';
import { useSupplierStore } from '~/store/supplier';


// UI
const toast = useToast()

// Store
const supplierStore = useSupplierStore()

// Props
const { supplier } = defineProps<SupplierFormProps>()

// Emits
const emit = defineEmits(["update"])

// State
const DEFAULT_SUPPLIER = {
  id: 0,
  name: '',
  cnpj: '',
  contact: '',
  created_at: 'N/A',
  updated_at: 'N/A',
  formatted_created_at: 'N/A',
  formatted_updated_at: 'N/A'
}
const form = ref<SupplierModel>(DEFAULT_SUPPLIER)
const loading = ref<boolean>(false)

// Methods
const onSave = async () => {
  loading.value = true
  try {
    if (!!supplier) {
      const savedSupplier = await supplierStore.save(form.value)
      toast.add({ title: "Fornecedor salvo com sucesso!" })
      emit("update", savedSupplier)
    } else {
      const newSupplier = await supplierStore.create(form.value)
      toast.add({
        title: "Fornecedor cadastrado com sucesso!",
        description: `${newSupplier.name} já pode ser usada no cadastro de produtos.`
      })
      emit("update", newSupplier)
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
    const success = await supplierStore.delete(form.value)
    if (success) {
      toast.add({ title: "Fornecedor removido com sucesso!" })
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
    ...supplier || DEFAULT_SUPPLIER
  }
})
</script>