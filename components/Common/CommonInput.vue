<template>
  <div>
    <label class="text-base pl-1">{{ label || "Label" }}:</label>
    <UInput v-model="inputValue" :disabled="disabled || readonly" full-width :placeholder="placeholder" :type="type"
      :readonly="readonly" />
  </div>
</template>

<script setup lang="ts">
import type { CommonInputProps } from '~/assets/types/components';

// Props
const { label, placeholder, disabled, type, readonly } = defineProps<CommonInputProps>()

// Model
const inputValue = defineModel<string>("value")
</script>