<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import {
    Bell,
    History,
    ArrowLeft,
    Share2,
    ChevronDown
} from 'lucide-vue-next';
import { useStoreManager } from '../composables/useStoreManager';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const { selectedStore, toggleStoreSwitcher } = useStoreManager();

const currentScreen = computed(() => route.name as string || 'dashboard');

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
    <header
        class="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-surface-container-high px-6 py-4 flex justify-between items-center max-w-md mx-auto w-full">
        <div class="flex items-center gap-3">
            <button v-if="currentScreen === 'product-detail' || currentScreen === 'scanner'" @click="router.back()"
                class="p-2 -ml-2 hover:bg-surface-container-high rounded-full transition-colors">
                <ArrowLeft class="w-5 h-5 text-primary" />
            </button>
            <div v-else
                class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border border-surface-container-highest">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBif5fpPe2EEqcu1ZbteVYNAjet40-NQX_9ALU7bOEoVni_wOLgEGq_y0CJe3MNfL2hRmEYipcFLWOuMQ0rejCioXBghLEXIihmEqtGwntNvoT5d6g2CXCWpio-h7vlr0bEiYLz4OJ-u6AR8yughIppTKA9RL3VWkkeCINs9vUhzN3x99cxP90I6AKowti-_xTGW6rWtdaNaiRjO6S4HVzcvNTWdz_w7No0jl1r5dHW8APEHcc4HJJv2QLj_u62NoxmmXCCHuwZ"
                    alt="Profile" class="w-full h-full object-cover" />
            </div>

            <div @click="toggleStoreSwitcher" class="flex flex-col cursor-pointer group">
                <div class="flex items-center gap-1">
                    <h1
                        class="text-lg font-extrabold text-on-surface leading-tight group-hover:text-primary transition-colors">
                        {{ selectedStore.name }}</h1>
                    <ChevronDown class="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
                </div>
                <p class="text-[10px] font-medium uppercase tracking-widest text-on-surface-variant">
                    {{ currentScreen === 'dashboard' ? `${selectedStore.branch} • ${selectedStore.location}` :
                    'Intelligent Retail Layer' }}
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
                <span
                    class="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface animate-pulse" />
            </button>
            <button v-if="currentScreen === 'dashboard'"
                class="p-2 hover:bg-surface-container-high rounded-full transition-colors text-primary">
                <History class="w-5 h-5" />
            </button>
        </div>
    </header>
</template>
