<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import {
  LayoutDashboard,
  QrCode,
  Package,
  BarChart3,
  Bell,
  History,
  ArrowLeft,
  Share2,
} from 'lucide-vue-next';

import Auth from './pages/Auth.vue';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const currentScreen = computed(() => route.name as string || 'dashboard');
const isAuthenticated = ref(true); // Default for preview

const navigateTo = (screen: string) => {
  router.push({ name: screen });
};

const handleLogin = () => {
  isAuthenticated.value = true;
};

const showNotification = () => {
  toast.add({
    severity: 'info',
    summary: 'Predictive Alert',
    detail: 'Studio Pro Wireless demand is expected to surge by 15% this weekend.',
    life: 4000
  });
};
</script>

<template>
  <Toast position="top-center" :pt="{ root: { class: 'w-[90%] max-w-sm mt-4' } }" />
  <Auth v-if="!isAuthenticated" @login="handleLogin" />

  <div v-else class="min-h-screen bg-surface flex flex-col">
    <!-- Top Bar -->
    <header
      class="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-surface-container-high px-6 py-4 flex justify-between items-center max-w-md mx-auto w-full">
      <div class="flex items-center gap-3">
        <button v-if="currentScreen === 'product-detail' || currentScreen === 'scanner'" @click="router.back()"
          class="p-2 -ml-2 hover:bg-surface-container-high rounded-full transition-colors">
          <ArrowLeft class="w-5 h-5 text-primary" />
        </button>
        <div v-else
          class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border border-surface-container-highest">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBif5fpPe2EEqcu1ZbteVYNAjet40-NQX_9ALU7bOEoVni_wOLgEGq_y0CJe3MNfL2hRmEYipcFLWOuMQ0rejCioXBghLEXIihmEqtGwntNvoT5d6g2CXCWpio-h7vlr0bEiYLz4OJ-u6AR8yughIppTKA9RL3VWkkeCINs9vUhzN3x99cxP90I6AKowti-_xTGW6rWtdaNaiRjO6S4HVzcvNTWdz_w7No0jl1r5dHW8APEHcc4HJJv2QLj_u62NoxmmXCCHuwZ"
            alt="Profile" class="w-full h-full object-cover" />
        </div>

        <div>
          <h1 class="text-lg font-extrabold text-on-surface leading-tight">Predictive Surface</h1>
          <p class="text-[10px] font-medium uppercase tracking-widest text-on-surface-variant">
            {{ currentScreen === 'dashboard' ? 'Indigo Nexus • Store #402' : 'Intelligent Retail Layer' }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button v-if="currentScreen === 'product-detail'"
          class="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant">
          <Share2 class="w-5 h-5" />
        </button>
        <button @click="showNotification"
          class="p-2 hover:bg-surface-container-high rounded-full transition-colors text-primary relative">
          <Bell class="w-5 h-5" />
          <span class="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface animate-pulse" />
        </button>
        <button v-if="currentScreen === 'dashboard'"
          class="p-2 hover:bg-surface-container-high rounded-full transition-colors text-primary">
          <History class="w-5 h-5" />
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="grow pb-32 max-w-md mx-auto w-full">
      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Bottom Navigation -->
    <nav
      class="fixed bottom-0 left-0 right-0 w-full z-50 px-4 sm:px-6 pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] pt-4 max-w-md mx-auto">
      <div class="glass-panel rounded-3xl shadow-2xl shadow-on-surface/5 flex justify-between items-center p-1.5">
        <button @click="navigateTo('dashboard')" :class="[
          'flex-1 flex flex-col items-center justify-center py-2.5 rounded-2xl transition-all duration-300',
          currentScreen === 'dashboard' ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'text-on-surface-variant hover:text-primary'
        ]">
          <LayoutDashboard class="w-5 h-5" />
          <span class="text-[10px] font-bold uppercase tracking-wider mt-1">Dashboard</span>
        </button>

        <button @click="navigateTo('bill')" :class="[
          'flex-1 flex flex-col items-center justify-center py-2.5 rounded-2xl transition-all duration-300',
          currentScreen === 'bill' ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'text-on-surface-variant hover:text-primary'
        ]">
          <QrCode class="w-5 h-5" />
          <span class="text-[10px] font-bold uppercase tracking-wider mt-1">Bill</span>
        </button>

        <button @click="navigateTo('inventory')" :class="[
          'flex-1 flex flex-col items-center justify-center py-2.5 rounded-2xl transition-all duration-300',
          currentScreen === 'inventory' ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'text-on-surface-variant hover:text-primary'
        ]">
          <Package class="w-5 h-5" />
          <span class="text-[10px] font-bold uppercase tracking-wider mt-1">Stock</span>
        </button>

        <button @click="navigateTo('reports')" :class="[
          'flex-1 flex flex-col items-center justify-center py-2.5 rounded-2xl transition-all duration-300',
          currentScreen === 'reports' ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'text-on-surface-variant hover:text-primary'
        ]">
          <BarChart3 class="w-5 h-5" />
          <span class="text-[10px] font-bold uppercase tracking-wider mt-1">Reports</span>
        </button>
      </div>
    </nav>
  </div>
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
