<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
    Search,
    Filter,
    ChevronDown,
    Edit3,
    AlertCircle,
    Plus,
    X,
    PackagePlus,
    PackageMinus,
    History,
    ClipboardList,
    AlertTriangle,
    Repeat
} from 'lucide-vue-next';
import { cn } from '../lib/utils';
import { SurfaceCard } from '../components';

const router = useRouter();

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

const searchQuery = ref('');
const selectedFilter = ref<'all' | 'out' | 'low'>('all');

const inventoryTools = [
    { route: 'inventory-stock-in', label: 'Stock In', icon: PackagePlus, color: 'bg-primary/10 text-primary' },
    { route: 'inventory-stock-out', label: 'Stock Out', icon: PackageMinus, color: 'bg-error/10 text-error' },
    { route: 'inventory-movements', label: 'History', icon: History, color: 'bg-secondary/10 text-secondary' },
    { route: 'inventory-purchase-orders', label: 'PO', icon: ClipboardList, color: 'bg-tertiary/10 text-tertiary' },
    { route: 'inventory-low-stock', label: 'Alerts', icon: AlertTriangle, color: 'bg-error/10 text-error' },
    { route: 'inventory-transfers', label: 'Transfer', icon: Repeat, color: 'bg-primary/10 text-primary' }
];

const filteredStock = computed(() => {
    return stockData.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchQuery.value.toLowerCase());

        const matchesFilter = selectedFilter.value === 'all' ||
            (selectedFilter.value === 'out' && item.status === 'out') ||
            (selectedFilter.value === 'low' && (item.status === 'critical' || item.status === 'attention'));

        return matchesSearch && matchesFilter;
    });
});

const getProgress = (stock: number, maxStock: number) => {
    return (stock / maxStock) * 100;
};

const showProgress = ref(false);
onMounted(() => {
    setTimeout(() => {
        showProgress.value = true;
    }, 100);
});

const getFilterClass = (filter: 'all' | 'out' | 'low') => {
    const active = selectedFilter.value === filter;
    return cn(
        "shrink-0 px-5 py-2.5 rounded-2xl font-bold text-xs tracking-tight flex items-center gap-2 transition-all",
        active
            ? "bg-primary text-white shadow-lg shadow-primary/20"
            : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
    );
};
</script>

<template>
    <div class="px-6 pt-6 space-y-6 pb-40 max-w-md mx-auto">
        <section class="flex items-center justify-between">
            <h2 class="text-3xl font-black tracking-tighter text-on-surface leading-tight">Stock Manager</h2>
            <div class="bg-primary/10 px-3 py-1 rounded-full">
                <p class="text-[9px] font-black text-primary uppercase tracking-widest">{{ filteredStock.length }} Units
                </p>
            </div>
        </section>

        <!-- Search Bar -->
        <div class="relative group">
            <div
                class="absolute inset-y-0 left-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                <Search class="w-5 h-5 text-on-surface-variant/40" />
            </div>
            <input v-model="searchQuery" type="text" placeholder="Search catalog or SKU..."
                class="w-full bg-surface-container-low border-none rounded-[1.5rem] py-4 pl-12 pr-12 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm" />
            <button v-if="searchQuery" @click="searchQuery = ''"
                class="absolute inset-y-0 right-4 flex items-center text-on-surface-variant/40 hover:text-error transition-colors">
                <X class="w-5 h-5" />
            </button>
        </div>

        <!-- Filter Chips -->
        <div class="flex gap-3 overflow-x-auto hide-scrollbar -mx-2 px-2 pb-2">
            <button @click="selectedFilter = 'all'" :class="getFilterClass('all')">
                <Filter class="w-3.5 h-3.5" /> All Items
            </button>
            <button @click="selectedFilter = 'out'" :class="getFilterClass('out')">Out of Stock</button>
            <button @click="selectedFilter = 'low'" :class="getFilterClass('low')">Low Stock</button>
            <button
                class="shrink-0 px-5 py-2.5 rounded-2xl font-bold text-xs tracking-tight flex items-center gap-2 bg-surface-container-high text-on-surface-variant">
                <ChevronDown class="w-3.5 h-3.5" /> More
            </button>
        </div>

        <!-- Inventory Tools -->
        <div class="grid grid-cols-3 gap-3">
            <button v-for="tool in inventoryTools" :key="tool.route" @click="router.push({ name: tool.route })"
                class="bg-surface-container-low border border-surface-container-high/30 rounded-3xl p-3 flex flex-col items-center gap-2 active:scale-[0.98] transition-all">
                <div :class="['w-10 h-10 rounded-2xl flex items-center justify-center', tool.color]">
                    <component :is="tool.icon" class="w-5 h-5" />
                </div>
                <span class="text-[9px] font-black uppercase tracking-wider text-on-surface-variant/60">
                    {{ tool.label }}
                </span>
            </button>
        </div>

        <!-- Stock List -->
        <div v-if="filteredStock.length > 0" class="space-y-4">
            <SurfaceCard v-for="item in filteredStock" :key="item.id"
                @click="router.push({ name: 'product-detail', params: { id: item.id } })"
                class="p-5 flex flex-col gap-5 hover:scale-[1.02] border border-surface-container-high/50 active:scale-[0.98] transition-all cursor-pointer group">
                <div class="flex gap-4 items-center">
                    <div
                        class="w-16 h-16 rounded-2xl overflow-hidden bg-surface-container shrink-0 border border-surface-container-high">
                        <img :src="item.image" :alt="item.name"
                            class="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    </div>
                    <div class="grow space-y-1">
                        <h3 class="font-black text-lg text-on-surface leading-tight tracking-tight">{{ item.name }}</h3>
                        <p class="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.2em]">SKU: {{
                            item.sku }}</p>
                    </div>
                </div>

                <div class="space-y-2.5">
                    <div class="flex justify-between items-end">
                        <span
                            :class="cn('text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-md bg-surface-container-highest', statusConfig[item.status].color)">
                            {{ statusConfig[item.status].label }}
                        </span>
                        <div class="flex items-baseline gap-1">
                            <span class="text-sm font-black text-on-surface">{{ item.stock }}</span>
                            <span class="text-[10px] font-bold text-on-surface-variant/40">/ {{ item.maxStock }}</span>
                        </div>
                    </div>
                    <div class="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                        <div :class="cn('h-full rounded-full transition-all duration-[1500ms] cubiz-bezier(0.34, 1.56, 0.64, 1)', statusConfig[item.status].bar)"
                            :style="{ width: showProgress ? `${getProgress(item.stock, item.maxStock)}%` : '0%' }" />
                    </div>
                </div>

                <div class="flex justify-between items-center pt-3 border-t border-surface-container-high/50">
                    <div class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 rounded-full bg-on-surface-variant/20"></div>
                        <p class="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest">{{
                            item.category }}</p>
                    </div>
                    <div class="flex gap-2">
                        <button @click.stop="router.push({ name: 'edit-product', params: { id: item.id } })"
                            class="p-2.5 rounded-xl bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors">
                            <Edit3 class="w-4 h-4" />
                        </button>
                        <button v-if="item.status === 'out'" @click.stop="router.push({ name: 'inventory-low-stock' })"
                            class="p-2.5 rounded-xl bg-error/10 text-error">
                            <AlertCircle class="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </SurfaceCard>
        </div>

        <!-- Empty State -->
        <div v-else class="py-20 flex flex-col items-center justify-center text-center space-y-4">
            <div class="w-20 h-20 rounded-[2rem] bg-surface-container flex items-center justify-center">
                <Search class="w-8 h-8 text-on-surface-variant/20" />
            </div>
            <div class="space-y-1">
                <h3 class="text-base font-black text-on-surface tracking-tight">No Resources Found</h3>
                <p class="text-xs font-bold text-on-surface-variant/50 max-w-[200px]">Adjust your intelligence filters
                    or search query.</p>
            </div>
            <Button @click="searchQuery = ''; selectedFilter = 'all'" variant="secondary" size="small"
                class="rounded-xl px-6">Reset Ledger</Button>
        </div>

        <!-- Floating Action Button -->
        <button @click="router.push({ name: 'add-product' })"
            class="fixed bottom-32 right-6 w-16 h-16 rounded-3xl bg-primary text-white shadow-2xl shadow-primary/40 flex items-center justify-center z-50 active:scale-95 transition-all">
            <Plus class="w-8 h-8" />
        </button>
    </div>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
