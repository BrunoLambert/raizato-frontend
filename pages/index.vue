<template>
  <UContainer class="h-screen flex justify-center items-center">
    <UCard class="h-fit shadow-[0_0_50vw_0px_rgba(255,255,255,0.3)] min-w-72 border-2 border-secondary rounded-xl">
      <template #header>
        <h1 class="text-center text-2xl font-bold">Raizato Login</h1>
      </template>

      <div class="flex flex-col gap-2">
        <CommonInput v-model:value="email" label="Email" placeholder="Insira email aqui" :disabled="loading" />
        <CommonInput v-model:value="password" label="Senha" placeholder="Insira email aqui" :disabled="loading"
          type="password" />
      </div>

      <template #footer>
        <div class="flex justify-center">
          <UButton label="Login" :loading="loading" class="bg-secondary text-white hover:bg-primary transition-all"
            block @click="onPressLogin" color="primary" />
        </div>
      </template>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useApiStore } from "~/store/api";
import { useUserStore } from "~/store/user";

definePageMeta({
  layout: false,
});

// Store
const ApiStore = useApiStore()
const UserStore = useUserStore()

// State
const email = ref<string>('brunofsclambert@gmail.com')
const password = ref<string>('1324')
const loading = ref<boolean>(false)

// Other Hooks
const router = useRouter()

// Actions
async function onPressLogin(): Promise<void> {
  try {
    if (!email.value || !password.value) return;

    loading.value = true
    const success = await ApiStore.login(email.value, password.value)
    if (success) {
      const userSuccess = await UserStore.getUserDetails()
      if (userSuccess) {
        router.push("home")
      }
    }
    loading.value = false
  } catch (error: any) {
    console.log(error)
  }
}
</script>
