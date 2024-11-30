<template>
  <UHorizontalNavigation :links="linksToShow" size="h-5">
    <template #icon="{ link }">
      <UIcon :name="link.icon" class="w-4 h-4" />
    </template>
    <template #default="{ link }">
      <span class="group-hover:text-primary relative transition-all text-xl">{{ link.label }}</span>
    </template>
  </UHorizontalNavigation>
</template>

<script lang="ts" setup>
import type { LayoutNavigationLinks } from '~/assets/types/components';
import { useUserStore } from '~/store/user';

// Store
const userStore = useUserStore()

// State
const links: LayoutNavigationLinks[] = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/home',
  },
  {
    label: 'Usuários',
    icon: 'i-heroicons-home',
    to: '/usuarios',
    role: ['admin']
  }
]

// Computed
const linksToShow = computed(() => {
  const role = userStore.details.role

  return links.filter(link => {
    if (!link.role) return true

    return link.role.includes(role)
  })
})
</script>