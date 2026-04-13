<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import {
    Bell,
    ArrowLeft,
    Share2,
    ChevronDown,
    MoreVertical
} from 'lucide-vue-next';
import { useShopStore } from '../stores/useShopStore';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const shopStore = useShopStore();

const currentScreen = computed(() => route.name as string || 'dashboard');

const pageTitles: Record<string, string> = {
    'profile': 'Account',
    'subscription': 'Billing',
    'settings': 'Preferences',
    'security': 'Protection',
    'notifications-settings': 'Alert Hub',
    'support': 'Concierge',
    'menu': 'System',
    'notifications': 'Pulses',
    'add-product': 'Inventory',
    'scanner': 'Optic Scan'
};

const isMainScreen = computed(() =>
    ['dashboard', 'bill', 'inventory', 'reports'].includes(currentScreen.value)
);
</script>

<template>
    <header
        class="sticky top-0 z-50 bg-surface/80 backdrop-blur-3xl px-6 py-3 flex justify-between items-center max-w-md mx-auto w-full transition-all duration-500">
        <div class="flex items-center gap-4">
            <!-- Dynamic Left Action -->
            <button v-if="!isMainScreen" @click="router.back()"
                class="w-10 h-10 flex items-center justify-center bg-surface-container-high rounded-2xl active:scale-95 transition-all">
                <ArrowLeft class="w-5 h-5 text-primary" />
            </button>

            <div v-else
                class="w-10 h-10 rounded-2xl bg-primary-container flex items-center justify-center overflow-hidden border-2 border-surface-container-highest shadow-sm">
                <img src="https://lh3.googleusercontent.com/fife/AL65B2LzFwI_W7z1H1I0_VvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvV"
                    alt="Profile" class="w-full h-full object-cover" />
            </div>

            <!-- Contextual Branding -->
            <div @click="shopStore.toggleSwitcher" class="flex flex-col cursor-pointer group">
                <div class="flex items-center gap-1.5">
                    <h1
                        class="text-base font-black text-on-surface leading-tight tracking-tight group-hover:text-primary transition-all">
                        {{ isMainScreen ? shopStore.selectedShop.name : (pageTitles[currentScreen] || 'Layer') }}
                    </h1>
                    <ChevronDown v-if="isMainScreen"
                        class="w-3.5 h-3.5 text-on-surface-variant group-hover:translate-y-0.5 transition-transform" />
                </div>
                <p class="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60">
                    {{ isMainScreen ? shopStore.selectedShop.branch : 'Operational Mode' }}
                </p>
            </div>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center gap-1.5">
            <button v-if="currentScreen === 'product-detail'"
                class="w-10 h-10 flex items-center justify-center bg-surface-container-low rounded-2xl text-on-surface-variant active:scale-95 transition-all">
                <Share2 class="w-5 h-5" />
            </button>
            <button @click="router.push({ name: 'notifications' })"
                class="w-10 h-10 flex items-center justify-center bg-surface-container-low rounded-2xl text-primary relative active:scale-95 transition-all">
                <Bell class="w-5 h-5" />
                <span
                    class="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-surface shadow-sm" />
            </button>
            <button @click="router.push({ name: 'menu' })"
                class="w-10 h-10 flex items-center justify-center bg-surface-container-low rounded-2xl text-on-surface hover:bg-surface-container-high active:scale-95 transition-all">
                <MoreVertical class="w-5 h-5" />
            </button>
        </div>
    </header>
</template>
