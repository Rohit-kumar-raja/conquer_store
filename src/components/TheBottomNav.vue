<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
    LayoutDashboard,
    QrCode,
    Package,
    BarChart3,
    Menu
} from 'lucide-vue-next';
import { billService } from '../services/billService';

const route = useRoute();
const router = useRouter();

const currentScreen = computed(() => route.name as string || 'dashboard');

const navigateTo = async (screen: string) => {
    if (screen === 'bill') {
        const draftItems = await billService.getDraftItems();
        router.push({ name: draftItems.length ? 'bill' : 'scanner' });
        return;
    }

    router.push({ name: screen });
};

const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'HUB' },
    { id: 'inventory', icon: Package, label: 'STOCK' },
    { id: 'bill', icon: QrCode, label: 'SCAN', isMain: true },
    { id: 'reports', icon: BarChart3, label: 'REPORT' },
    { id: 'menu', icon: Menu, label: 'MENU' }
];
</script>

<template>
    <nav
        class="fixed bottom-0 left-0 right-0 w-full z-50 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+1rem)] pt-1 max-w-md mx-auto">
        <div
            class="bg-surface/90 backdrop-blur-3xl rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/20 flex justify-between items-end p-2 relative">

            <template v-for="(item, index) in navItems" :key="item.id">
                <!-- Main Center Action (SCAN) -->
                <div v-if="item.isMain" class="flex-1 flex flex-col items-center justify-end pb-1 relative z-10">
                    <button @click="navigateTo(item.id)" :class="[
                        'w-16 h-16 rounded-full flex flex-col items-center justify-center transition-all duration-500 shadow-2xl relative',
                        currentScreen === item.id
                            ? 'bg-primary text-white scale-110 -translate-y-4 shadow-primary/40'
                            : 'bg-surface-container-high text-primary -translate-y-2'
                    ]">
                        <component :is="item.icon" class="w-7 h-7" />
                        <span class="text-[8px] font-black uppercase tracking-widest mt-0.5">{{ item.label }}</span>

                        <!-- Floating Ring -->
                        <div v-if="currentScreen === item.id"
                            class="absolute -inset-1 rounded-full border-2 border-primary/20 animate-ping"></div>
                    </button>
                </div>

                <!-- Regular Nav Items -->
                <button v-else @click="navigateTo(item.id)" :class="[
                    'flex-1 flex flex-col items-center justify-center py-3 rounded-2xl transition-all duration-300 relative group',
                    currentScreen === item.id ? 'text-primary' : 'text-on-surface-variant/40 hover:text-on-surface-variant'
                ]">
                    <component :is="item.icon"
                        :class="['w-5 h-5 mb-1.5 transition-transform group-active:scale-90', currentScreen === item.id ? 'stroke-[2.5px]' : 'stroke-[2px]']" />
                    <span
                        :class="['text-[8px] font-black uppercase tracking-tighter', currentScreen === item.id ? 'opacity-100' : 'opacity-40']">{{
                            item.label }}</span>

                    <!-- Active Dot -->
                    <div v-if="currentScreen === item.id" class="w-1 h-1 bg-primary rounded-full mt-1.5 animate-pulse">
                    </div>
                </button>
            </template>
        </div>
    </nav>
</template>
