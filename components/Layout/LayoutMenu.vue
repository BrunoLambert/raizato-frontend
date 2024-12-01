<template>
  <div>
    <UDropdown :items="items" :ui="{
      item: {
        base: 'min-h-10 hover:bg-primary',
        active: 'dark:bg-primary dark:text-black',
        icon: { active: 'dark:text-black' },
        disabled: 'opacity-1 hover:bg-inherit'
      },
      shadow: 'shadow-lg shadow-primary'
    }">
      <UButton color="primary" label="Meu Perfil" class="bg-primary min-w-20 shadow-md" size="xl"
        trailing-icon="i-heroicons-chevron-down-20-solid" icon="i-mdi:account-details" />
    </UDropdown>
    <UModal v-model="modalOpen">
      <UserForm :user="myUserData" is-self @update="handleUserUpdate" />
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import { type UserModel } from '~/assets/types/user';
import { useApiStore } from '~/store/api';
import { useUserStore } from '~/store/user';
import UserForm from '../Users/UserForm.vue';

// Nuxt
const router = useRouter()

// UI
const toast = useToast()

// Store
const userStore = useUserStore()
const apiStore = useApiStore()

// State
const modalOpen = ref<boolean>(false)
const myUserData = ref<UserModel>()

// Computed
const items = computed(() => [
  [{
    label: userStore.details.fullname,
    icon: 'i-mdi:account-circle',
    disabled: true
  }], [{
    label: 'Editar perfil',
    icon: 'i-mdi:account-edit',
    click: () => {
      myUserData.value = {
        ...userStore.details,
        formatted_created_at: formatDate(userStore.details.created_at),
        formatted_updated_at: formatDate(userStore.details.updated_at),
      }
      modalOpen.value = true
    }
  }], [{
    label: 'Logout',
    icon: 'i-mdi:account-remove',
    click: handleLogout
  }]
])

// Methods
const handleLogout = async () => {
  const success = await apiStore.logout()
  if (success) {
    toast.add({
      title: "Logout feito com sucesso!",
      description: "Esperamos que volte logo."
    })
    router.push("/")
  }
}
const handleUserUpdate = async () => {
  userStore.getUserDetails();
  modalOpen.value = false;
}
</script>