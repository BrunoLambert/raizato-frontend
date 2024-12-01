<template>
  <UCard>
    <template #header>
      <h2 class="text-2xl font-bold">
        <span v-if="isSelf">Editar Perfil</span>
        <span v-else>
          {{ user ? `Usurário ##${user?.id}` : "Usuário Novo" }}
        </span>
      </h2>
    </template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CommonInput v-model:value="form.fullname" label="Nome Completo" placeholder="Insira o nome completo"
        :disabled="loading" />
      <CommonInput v-model:value="form.email" label="E-mail" placeholder="Insira o e-mail" :disabled="loading" />
      <CommonInput v-model:value="form.cellphone" label="Telefone" placeholder="Insira telefone" type="number"
        :disabled="loading" />
      <div>
        <label class="text-base pl-1">Função</label>
        <USelect v-model="form.role" :options="roleOptions" option-attribute="name"
          :disabled="loading || lockRole || isSelf" />
      </div>
      <CommonInput v-model:value="form.formatted_created_at" label="Data de Registro" readonly />
      <CommonInput v-model:value="form.formatted_updated_at" label="Última atualização" readonly />
      <CommonInput v-model:value="form.password" label="Senha" placeholder="Insira a senha" type="password"
        :disabled="loading" />
      <UButton v-if="!!user && !lockRole && !isSelf" label="Excluir Permanentemente" size="sm"
        class="block h-9 self-end" variant="soft" color="red" @click="onDeleteUser" />
    </div>

    <template #footer>
      <div class="flex flex-row gap-2">
        <UButton label="Voltar" size="xl" full-width class="flex-1 justify-center" variant="outline" color="rose"
          @click="emit('update')" />
        <UButton label="Salvar" size="xl" full-width class="flex-1 justify-center" color="primary" :loading="loading"
          @click="onSaveUser" />
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import { type UserFormProps } from '~/assets/types/components';
import { UserRole, UserRoleNames, type UserModel } from '~/assets/types/user';
import { useUserStore } from '~/store/user';

// UI
const toast = useToast()

// Store
const userStore = useUserStore()

// Props
const { user, lockRole, isSelf } = defineProps<UserFormProps>()

// Emits
const emit = defineEmits(["update"])

// State
const DEFAULT_USER = {
  fullname: '',
  email: '',
  cellphone: '',
  role: UserRole.COMMON,
  id: 0,
  created_at: 'N/A',
  updated_at: 'N/A'
}
const form = ref<UserModel>(DEFAULT_USER)
const roleOptions = Object.values(UserRole).map((role) => ({
  name: UserRoleNames[role],
  value: role
}))
const loading = ref<boolean>(false)

// Methods
const onSaveUser = async () => {
  if (lockRole) return emit("update", form.value)

  loading.value = true
  try {
    if (!!user) {
      let savedUser: UserModel
      if (isSelf) {
        savedUser = await userStore.updateMyUser(form.value)
      } else {
        savedUser = await userStore.saveUser(form.value)
      }
      toast.add({ title: "Usuário atualizado com sucesso!" })
      emit("update", savedUser)
    } else {
      const newUser = await userStore.createUser(form.value)
      toast.add({
        title: "Usuário cadastrado com sucesso!",
        description: `${newUser.fullname} já pode acessar o sistema.`
      })
      emit("update", newUser)
    }
  } catch (error) {
    console.error(error)
    toast.add({ title: "Houve um erro inesperado" })
  }
  loading.value = false
}
const onDeleteUser = async () => {
  loading.value = true
  try {
    const success = await userStore.deleteUser(form.value)
    if (success) {
      toast.add({ title: "Usuário removido com sucesso!" })
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
    ...user || DEFAULT_USER,
    password: user ? '*****' : '',
  }
})
</script>