<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
    Search,
    Filter,
    ChevronDown,
    Edit3,
    AlertCircle,
    Plus
} from 'lucide-vue-next';
import { cn } from '../lib/utils';
import { SurfaceCard } from '../components';

const emit = defineEmits(['navigate']);

interface StockItem {
    id: string;
    name: string;
    sku: string;
    image: string;
    stock: number;
    maxStock: number;
    category: string;
    status: 'critical' | 'healthy' | 'out' | 'attention';
}

const stockData: StockItem[] = [
    {
        id: '1',
        name: 'Quantum Pulse X1',
        sku: 'QPX-2024-RED',
        image: 'https://picsum.photos/seed/shoe1/200/200',
        stock: 12,
        maxStock: 150,
        category: 'Footwear',
        status: 'critical'
    },
    {
        id: '2',
        name: 'Aura Chronos Smart',
        sku: 'AUR-WCH-SLV',
        image: 'https://picsum.photos/seed/watch1/200/200',
        stock: 412,
        maxStock: 500,
        category: 'Electronics',
        status: 'healthy'
    },
    {
        id: '3',
        name: 'Sonic Boom ANC',
        sku: 'SNB-HD-BLK',
        image: 'https://picsum.photos/seed/audio1/200/200',
        stock: 0,
        maxStock: 200,
        category: 'Audio',
        status: 'out'
    },
    {
        id: '4',
        name: 'Vortex Prime 85mm',
        sku: 'VTX-LNS-85',
        image: 'https://picsum.photos/seed/camera1/200/200',
        stock: 45,
        maxStock: 100,
        category: 'Imaging',
        status: 'attention'
    }
];

const statusConfig = {
    critical: { label: 'CRITICAL STOCK', color: 'text-error', bar: 'bg-error' },
    healthy: { label: 'HEALTHY STOCK', color: 'text-primary', bar: 'bg-primary' },
    out: { label: 'OUT OF STOCK', color: 'text-error', bar: 'bg-error/20' },
    attention: { label: 'ATTENTION REQUIRED', color: 'text-tertiary', bar: 'bg-tertiary' }
};

const getProgress = (stock: number, maxStock: number) => {
    return (stock / maxStock) * 100;
};

// For initial mount animation
const showProgress = ref(false);
onMounted(() => {
    setTimeout(() => {
        showProgress.value = true;
    }, 100);
});

const getFilterClass = (active?: boolean) => {
    return cn(
        "shrink-0 px-5 py-2.5 rounded-2xl font-bold text-xs tracking-tight flex items-center gap-2 transition-all",
        active
            ? "bg-primary text-white shadow-lg shadow-primary/20"
            : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
    );
};
</script>

<template>
    <div class="px-6 pt-6 space-y-6 pb-20">
        <section>
            <h2 class="text-3xl font-extrabold tracking-tight text-on-surface leading-tight">Stock Manager</h2>
        </section>

        <!-- Search Bar -->
        <div class="relative">
            <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search class="w-5 h-5 text-on-surface-variant/40" />
            </div>
            <input type="text" placeholder="Search catalog by name or SKU..."
                class="w-full bg-surface-container-low border-none rounded-2xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
        </div>

        <!-- Filter Chips -->
        <div class="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            <button :class="getFilterClass(true)">
                <Filter class="w-4 h-4" /> All Items
            </button>
            <button :class="getFilterClass(false)">Out of Stock</button>
            <button :class="getFilterClass(false)">Low Stock</button>
            <button :class="getFilterClass(false)">
                <ChevronDown class="w-4 h-4" /> Categories
            </button>
        </div>

        <!-- Stock List -->
        <div class="space-y-4">
            <SurfaceCard v-for="item in stockData" :key="item.id" @click="emit('navigate', 'product-detail')"
                class="p-5 flex flex-col gap-5 hover:scale-[1.02] cursor-pointer">
                <div class="flex gap-4 items-center">
                    <div class="w-16 h-16 rounded-2xl overflow-hidden bg-surface-container shrink-0">
                        <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex-grow">
                        <h3 class="font-bold text-lg text-on-surface leading-tight">{{ item.name }}</h3>
                        <p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">SKU: {{
                            item.sku }}</p>
                    </div>
                </div>

                <div class="space-y-2">
                    <div class="flex justify-between items-end">
                        <span
                            :class="cn('text-[10px] font-bold tracking-widest uppercase', statusConfig[item.status].color)">
                            {{ statusConfig[item.status].label }}
                        </span>
                        <span class="text-xs font-bold text-on-surface">
                            {{ item.stock }} / {{ item.maxStock }}
                        </span>
                    </div>
                    <div class="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                        <div :class="cn('h-full rounded-full transition-all duration-1000 ease-out', statusConfig[item.status].bar)"
                            :style="{ width: showProgress ? `${getProgress(item.stock, item.maxStock)}%` : '0%' }" />
                    </div>
                </div>

                <div class="flex justify-between items-center pt-2 border-t border-surface-container-high">
                    <div>
                        <p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Category</p>
                        <p class="font-bold text-on-surface">{{ item.category }}</p>
                    </div>
                    <button :class="cn(
                        'p-3 rounded-2xl transition-all',
                        item.status === 'out' ? 'bg-error/10 text-error' : 'bg-surface-container-high text-primary hover:bg-primary hover:text-white'
                    )">
                        <AlertCircle v-if="item.status === 'out'" class="w-5 h-5" />
                        <Edit3 v-else class="w-5 h-5" />
                    </button>
                </div>
            </SurfaceCard>
        </div>

        <!-- Floating Action Button -->
        <button @click="emit('navigate', 'add-product')"
            class="fixed bottom-32 right-6 w-16 h-16 rounded-3xl bg-primary text-white shadow-2xl shadow-primary/40 flex items-center justify-center z-50 hover:scale-105 active:scale-95 transition-transform">
            <Plus class="w-8 h-8" />
        </button>
    </div>
</template>
