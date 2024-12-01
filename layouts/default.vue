<template>
  <div class="bg-gradient-to-b from-10% from-black via-30% via-black to-70% to-gray">
    <div class="flex justify-between items-center px-10 py-5 border-b-2 rounded-b-2xl border-white bg-gradient-to-tl from-primary to-secondary">
      <h1 class="text-xl text-black font-bold">Bem-vindo, <span class="text-primary text-shadow">{{ userStore.details.fullname }}</span></h1>
      <!-- <ColorScheme>
        <USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']" />
      </ColorScheme> -->
      <LayoutMenu />
    </div>
    <div>
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
import { useUserStore } from '~/store/user';

// Next
const router = useRouter()
const route = useRoute()

// UI
const toast = useToast()

// Store
const userStore = useUserStore()

// Hooks
const noAuthRoutes = useNoAuthRoutes()

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