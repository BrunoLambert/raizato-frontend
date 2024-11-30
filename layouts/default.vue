<template>
  <div>
    <div class="flex justify-between items-center px-10 py-5 border-b-2 border-secondary bg-sky-700">
      <h1 class="text-xl">Bem-vindo, <b class="text-primary">{{ userStore.details.fullname }}</b>!</h1>
      <!-- <ColorScheme>
        <USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']" />
      </ColorScheme> -->
      <UButton label="Logout" icon="i-mdi:account-remove" size="sm" @click="handleLogout" />
    </div>
    <div class="px-10">
      <LayoutNavigation />
    </div>
    <div class="mt-5 px-5 flex justify-center">
      <div class="w-full max-w-6xl">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApiStore } from '~/store/api';
import { useUserStore } from '~/store/user';

// Next
const router = useRouter()
const route = useRoute()

// UI
const toast = useToast()

// Store
const userStore = useUserStore()
const apiStore = useApiStore()

// Hooks
const noAuthRoutes = useNoAuthRoutes()

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

// Lifecycle
onMounted(async () => {
  try {
    if (!userStore.details?.email) {
      const susccess = await userStore.getUserDetails()

      if (!susccess) {
        throw new Error("Login Failed")
      }
    }

    if (noAuthRoutes.value.includes(route.name as string)) {
      router.push("/home")
    }
  } catch (error) {
    toast.add({
      title: "Não foi possível acessar a página!",
      description: "Login automático falhou, por favor faça login novamente.",
      color: 'red'
    })
    router.push("/")
  }
})
</script>