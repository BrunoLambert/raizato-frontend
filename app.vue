<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useApiStore } from './store/api';

// Store
const ApiStore = useApiStore();

// Actions
onMounted(async () => {
  await ApiStore.getCSRFCookie()
})
</script>
