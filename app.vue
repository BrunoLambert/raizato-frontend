<template>
  <div>
    <NuxtLayout>
      <NuxtPage v-if="appCheck" />
    </NuxtLayout>

    <UNotifications />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useApiStore } from './store/api';

// Nuxt
const router = useRouter()
const route = useRoute()

// State
const appCheck = ref<boolean>(false)

// Store
const ApiStore = useApiStore();

// Actions
onMounted(async () => {
  await ApiStore.getCSRFCookie()
  try {
    const success = await ApiStore.fistCheck()
    appCheck.value = true

    if (!success) {
      router.push("/startup")
    }

    if (route.name === "startup") {
      return router.push("/")
    }
  } catch (error) {
    // Do Nothing
  }
})
</script>
