<script setup lang="ts">
const { label, placeholder, disabled, type } = defineProps<{ label?: string, placeholder?: string, disabled?: boolean, type?: string }>()
const inputValue = defineModel<string>("value")
</script>

<template>
  <div>
    <label class="text-base pl-1">{{ label || "Label" }}:</label>
    <UInput v-model="inputValue" :disabled="disabled" full-width :placeholder="placeholder" :type="type" />
  </div>
</template>

<style></style>
