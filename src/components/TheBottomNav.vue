<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
    LayoutDashboard,
    QrCode,
    Package,
    BarChart3
} from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();

const currentScreen = computed(() => route.name as string || 'dashboard');

const navigateTo = (screen: string) => {
    router.push({ name: screen });
};

const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'HUB' },
    { id: 'bill', icon: QrCode, label: 'SCAN' },
    { id: 'inventory', icon: Package, label: 'STOCK' },
    { id: 'reports', icon: BarChart3, label: 'DATA' }
];
</script>

<template>
    <nav
        class="fixed bottom-0 left-0 right-0 w-full z-50 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+0.5rem)] pt-1 max-w-md mx-auto">
        <div
            class="bg-surface/90 backdrop-blur-3xl rounded-4xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/20 flex justify-between items-center p-1.5">
            <button v-for="item in navItems" :key="item.id" @click="navigateTo(item.id)" :class="[
                'flex-1 flex flex-col items-center justify-center py-2.5 rounded-3xl transition-all duration-300 relative group',
                currentScreen === item.id ? 'text-primary' : 'text-on-surface-variant/40 hover:text-on-surface-variant'
            ]">
                <!-- Active Indicator Pill -->
                <div v-if="currentScreen === item.id"
                    class="absolute inset-0 bg-primary/5 rounded-3xl transition-all duration-500 scale-95"></div>

                <component :is="item.icon"
                    :class="['w-6 h-6 mb-1 transition-transform group-active:scale-90', currentScreen === item.id ? 'stroke-[2.5px]' : 'stroke-[2px]']" />
                <span
                    :class="['text-[9px] font-black uppercase tracking-[0.2em]', currentScreen === item.id ? 'opacity-100' : 'opacity-40']">{{
                        item.label }}</span>

                <!-- Active Dot -->
                <div v-if="currentScreen === item.id" class="w-1 h-1 bg-primary rounded-full mt-1.5 animate-bounce">
                </div>
            </button>
        </div>
    </nav>
</template>
