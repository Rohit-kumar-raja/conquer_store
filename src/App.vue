<script setup lang="ts">
import { ref } from 'vue';
import Toast from 'primevue/toast';
import Auth from './pages/Auth.vue';
import TheHeader from './components/TheHeader.vue';
import TheBottomNav from './components/TheBottomNav.vue';
import StoreSwitcher from './components/StoreSwitcher.vue';

const isAuthenticated = ref(true); // Default for preview

const handleLogin = () => {
  isAuthenticated.value = true;
};
</script>

<template>
  <Toast position="top-center" :pt="{ root: { class: 'w-[90%] max-w-sm mt-4' } }" />
  <Auth v-if="!isAuthenticated" @login="handleLogin" />

  <div v-else class="min-h-screen bg-surface flex flex-col">
    <TheHeader />

    <!-- Main Content -->
    <main class="grow pb-32 max-w-md mx-auto w-full">
      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <TheBottomNav />
  </div>

  <StoreSwitcher />
</template>

<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
