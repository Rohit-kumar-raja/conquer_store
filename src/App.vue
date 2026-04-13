<script setup lang="ts">
import Toast from 'primevue/toast';
import StoreSwitcher from './components/StoreSwitcher.vue';
</script>

<template>
  <Toast position="top-center" :pt="{ root: { class: 'w-[90%] max-w-sm mt-4' } }" />

  <router-view />

  <StoreSwitcher />
</template>
