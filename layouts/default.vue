<template>
  <div>
    <div class="flex justify-between px-10 py-5 border-b-2 border-secondary bg-sky-700">
      <h1 class="text-xl">Bem-vindo, <b class="text-primary">{{ userStore.details.fullname }}</b>!</h1>
      <!-- <ColorScheme>
        <USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']" />
      </ColorScheme> -->
    </div>
    <div class="mt-5 px-10">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user';

// Store
const userStore = useUserStore()

// State
</script>