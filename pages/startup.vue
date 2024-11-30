<template>
  <UContainer class="h-screen flex justify-center items-center">
    <UCard class="h-fit shadow-[0_0_50vw_0px_rgba(255,255,255,0.3)] min-w-72 border-2 border-secondary rounded-xl">
      <template #header>
        <div class="text-center">
          <h1 class="text-center text-2xl font-bold">Raizato Admin</h1>
          <small class="text-sm">Faça o registro do Administrador do sistema</small>
        </div>
      </template>

      <div class="flex flex-col gap-2">
        <UsersUserForm :user="DEFAULT_USER" lockRole @update="handleUserSubmit" />
      </div>
    </UCard>
  </UContainer>
</template>

<script lang="ts" setup>
import { UserRole, type UserModel } from '~/assets/types/user';
import { useApiStore } from '~/store/api';

// Nuxt
definePageMeta({
  layout: false,
});
const router = useRouter()

// UI
const toast = useToast()

// Store
const apiStore = useApiStore()

// State
const DEFAULT_USER: UserModel = {
  cellphone: '',
  email: '',
  fullname: '',
  id: 1,
  role: UserRole.ADMIM,
  password: '',
  created_at: '',
  updated_at: ''
}

// Methods
const handleUserSubmit = async (user: UserModel) => {
  try {
    const success = await apiStore.firstRegister(user)
    if (success) {
      toast.add({
        title: "Primeiro acesso configurado",
        description: "Você já foi logado automáticamente.",
      })
      router.push('/home')
    }
  } catch (error) {
    toast.add({
      title: "As informações não são válidas",
      description: "Cheque os campos e tente novamente",
      color: "red"
    })
  }
}

// Lifecycle
onMounted(() => {
  const checkCookie = useCookie('app_check')
  if (checkCookie.value) {
    router.push("/")
  }
})
</script>