<script setup lang="ts">
import { Search, X } from 'lucide-vue-next';

defineProps<{ modelValue: string; placeholder?: string }>();
defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<template>
    <label class="relative block">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40" />
        <input :value="modelValue" type="search" :placeholder="placeholder || 'Search records'"
            class="w-full bg-surface-container-high rounded-2xl py-3.5 pl-11 pr-11 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
        <button v-if="modelValue" type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-surface-container-highest"
            @click="$emit('update:modelValue', '')">
            <X class="w-3.5 h-3.5 mx-auto" />
        </button>
    </label>
</template>
