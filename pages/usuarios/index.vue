<template>
  <div>
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-2xl"><b>Usuários da Plataforma</b></h2>
        <small class="text-xs">Clique no usuário para editar</small>
      </div>
      <UButton icon="i-mdi:account-plus" color="blue" size="xl" @click="modelOpen = true">Novo</UButton>
    </div>
    <div class="mt-5">
      <CommonTable :colsTitle="toTableProps.colsTitle" :data="toTableProps.data" :loading="loading"
        @select="handleSelect" />
    </div>
    <div class="flex justify-center mt-5 mb-10">
      <UPagination v-model="page" size="xl" :pageCount="data?.per_page || 15" :total="data?.total || 1" :max="10"
        :disabled="loading" />
    </div>
    <UModal v-model="modelOpen">
      <UserForm :user="selectedUser" @update="handleUserUpdate" />
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import type { CommonTableColsTitle, CommonTableProps } from '~/assets/types/components';
import { UserRoleNames, type UserModel } from '~/assets/types/user';
import UserForm from '~/components/Users/UserForm.vue';
import { useUserStore } from '~/store/user';

// Store
const userStore = useUserStore()

// State
const page = ref<number>(1);
const loading = ref<boolean>(false);
const tableCols: CommonTableColsTitle[] = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'fullname',
    label: 'NOME'
  },
  {
    key: 'email',
    label: 'EMAIL'
  },
  {
    key: 'formatted_phone',
    label: 'TELEFONE'
  },
  {
    key: 'formatted_role',
    label: 'FUNÇÃO'
  },
  {
    key: 'formatted_created_at',
    label: 'CRIADO EM'
  }
]
const selectedUser = ref<UserModel>()
const modelOpen = ref<boolean>(false)

// Async Data
const { data, refresh } = useAsyncData('users', () => {
  loading.value = true
  return userStore.getUsers(page.value)
}, {
  watch: [page],
  transform: (data) => {
    loading.value = false
    return {
      ...data,
      data: data.data.map(user => ({
        ...user,
        formatted_created_at: new Date(user.created_at).toLocaleDateString(),
        formatted_updated_at: new Date(user.updated_at).toLocaleDateString(),
        formatted_role: UserRoleNames[user.role],
        formatted_phone: formatPhone(user.cellphone)
      }))
    }
  }
})

// Methods
const handleSelect = (selectedRow: any) => {
  selectedUser.value = selectedRow
  modelOpen.value = true
}
const handleUserUpdate = (user: UserModel) => {
  modelOpen.value = false
  selectedUser.value = undefined;
  refresh()
}

// Computed
const toTableProps = computed((): CommonTableProps => ({
  colsTitle: tableCols,
  data: data.value?.data || [],
}))

// Watcher
watch(modelOpen, (newValue) => {
  if (!newValue) {
    selectedUser.value = undefined
  }
})
</script>