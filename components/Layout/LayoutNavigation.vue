<template>
  <UHorizontalNavigation :links="linksToShow" :ui="{
    container: 'w-full justify-evenly grow', wrapper: 'flex-1',
    inner: 'grow flex justify-center', base: 'justify-center h-15 py-5'
  }">
    <template #icon="{ link }">
      <UIcon :name="link.icon" class="w-5 h-5" />
    </template>
    <template #default="{ link }">
      <span class="group-hover:text-primary relative transition-all text-xl">{{ link.label }}</span>
    </template>
  </UHorizontalNavigation>
</template>

<script lang="ts" setup>
import type { LayoutNavigationLinks } from '~/assets/types/components';
import { UserRole } from '~/assets/types/user';
import { useUserStore } from '~/store/user';

// Store
const userStore = useUserStore()

// State
const links: LayoutNavigationLinks[] = [
  {
    label: 'Home',
    icon: 'i-mdi:home',
    to: '/home',
  },
  {
    label: "Estoque",
    icon: "i-mdi:store",
    to: "/estoques",
    role: [UserRole.MANAGER, UserRole.ADMIM]
  },
  {
    label: "Registros",
    icon: "i-mdi:cloud-print",
    to: "/registros",
  },
  {
    label: "Produtos",
    icon: "i-mdi:database",
    to: "/produtos",
  },
  {
    label: "Categorias",
    icon: "i-mdi:view-dashboard",
    to: "/categorias",
  },
  {
    label: "Fornecedores",
    icon: "i-mdi:truck",
    to: "/fornecedores",
  },
  {
    label: 'Usuários',
    icon: 'i-mdi:account-multiple',
    to: '/usuarios',
    role: [UserRole.ADMIM]
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