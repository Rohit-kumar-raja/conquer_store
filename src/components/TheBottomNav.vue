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
</script>

<template>
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
</template>
