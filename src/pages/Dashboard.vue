<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
    AlertTriangle,
    BarChart3,
    ChevronRight,
    IndianRupee,
    Package,
    PackagePlus,
    Plus,
    QrCode,
    Receipt,
    Sparkles,
    TrendingUp,
    Users
} from 'lucide-vue-next';
import { SurfaceCard } from '../components';
import { useShopStore } from '../stores/useShopStore';
import { billService, type BillRecord } from '../services/billService';

const router = useRouter();
const shopStore = useShopStore();
const showChart = ref(false);
const allBills = ref<BillRecord[]>([]);
const recentBills = computed(() => allBills.value.slice(0, 5));

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
};

const formatDate = (value: string) => {
    return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(value));
};

const revenueTrend = [
    { label: '8a', value: 28 },
    { label: '10a', value: 42 },
    { label: '12p', value: 74 },
    { label: '2p', value: 58 },
    { label: '4p', value: 86 },
    { label: '6p', value: 64 },
    { label: '8p', value: 92 }
];

const quickActions = [
    { icon: QrCode, label: 'New Bill', route: 'bill', color: 'bg-primary text-white shadow-lg shadow-primary/25' },
    { icon: Package, label: 'Instock', route: 'inventory-stock-in', color: 'bg-surface-container-high text-secondary' },
    { icon: PackagePlus, label: 'Add Product', route: 'add-product', color: 'bg-surface-container-high text-primary' },
    { icon: BarChart3, label: 'Report', route: 'reports', color: 'bg-surface-container-high text-on-surface' }
];

const stockAlerts = [
    { name: 'Cloud Router X1', sku: 'NET-CR-X1', stock: 4, min: 20, fill: 20 },
    { name: 'Sonic Boom ANC', sku: 'SNB-HD-BLK', stock: 11, min: 30, fill: 37 },
    { name: 'Organic Almond Milk', sku: 'MLK-ORG-01', stock: 18, min: 40, fill: 45 }
];

const topProducts = [
    { name: 'AuraPods Pro', sales: 124, revenue: '₹6.19L', trend: '+12%', image: 'https://picsum.photos/seed/pods/100/100' },
    { name: 'X-Watch Series 9', sales: 86, revenue: '₹21.49L', trend: '+8%', image: 'https://picsum.photos/seed/watch3/100/100' },
    { name: 'MagSafe Gen 2', sales: 64, revenue: '₹2.23L', trend: '-2%', image: 'https://picsum.photos/seed/mag/100/100' }
];



const branchHealth = [
    { label: 'Sell-through', value: '68%', tone: 'text-primary', icon: TrendingUp },
    { label: 'Margin', value: '28.3%', tone: 'text-secondary', icon: IndianRupee },
    { label: 'Stock Risk', value: '12', tone: 'text-error', icon: AlertTriangle }
];

onMounted(async () => {
    setTimeout(() => {
        showChart.value = true;
    }, 80);
    allBills.value = await billService.getBillHistory();
});
</script>

<template>
    <div class="px-5 pt-2 space-y-6 pb-40 max-w-md mx-auto">
        <section class="space-y-4">
            <SurfaceCard
                class="p-6 rounded-4xl bg-primary-gradient text-white shadow-xl shadow-primary/20 relative overflow-hidden">
                <div class="absolute right-0 top-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-16"></div>
                <div class="absolute right-10 bottom-0 w-24 h-24 bg-white/10 rounded-full translate-y-14"></div>

                <div class="relative z-10 space-y-6">
                    <div class="flex items-start justify-between gap-4">
                        <div>
                            <div class="flex items-center gap-2 text-white/70">
                                <Sparkles class="w-4 h-4" />
                                <span class="text-[9px] font-black uppercase tracking-[0.2em]">Live Store Command</span>
                            </div>
                            <h2 class="text-3xl font-black tracking-tighter leading-tight mt-2">
                                {{ shopStore.selectedShop.name }}
                            </h2>
                            <p class="text-[10px] font-bold text-white/55 uppercase tracking-widest mt-1">
                                {{ shopStore.selectedShop.branch }} • {{ shopStore.selectedShop.location }}
                            </p>
                        </div>
                        <button @click="router.push({ name: 'reports' })"
                            class="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center active:scale-95 transition-all">
                            <BarChart3 class="w-5 h-5" />
                        </button>
                    </div>

                    <div>
                        <p class="text-[9px] font-black uppercase tracking-widest text-white/55">Today's Revenue</p>
                        <div class="flex items-end justify-between gap-3 mt-1">
                            <h3 class="text-5xl font-black tracking-tighter leading-none">₹42.89L</h3>
                            <div class="text-right pb-1">
                                <span class="text-[10px] font-black bg-white text-primary px-2.5 py-1 rounded-xl">+12.4%</span>
                                <p class="text-[9px] font-bold text-white/50 mt-1">vs yesterday</p>
                            </div>
                        </div>
                    </div>

                    <div class="h-20 flex items-end gap-2">
                        <div v-for="point in revenueTrend" :key="point.label" class="flex-1 h-full flex flex-col justify-end gap-1">
                            <div class="w-full bg-white/15 rounded-t-xl overflow-hidden flex items-end">
                                <div class="w-full bg-white rounded-t-xl transition-all duration-1000"
                                    :style="{ height: showChart ? `${point.value}%` : '0%' }"></div>
                            </div>
                            <span class="text-[8px] font-black text-white/45 text-center">{{ point.label }}</span>
                        </div>
                    </div>
                </div>
            </SurfaceCard>
        </section>

        <section class="grid grid-cols-3 gap-3">
            <SurfaceCard v-for="item in branchHealth" :key="item.label" variant="low"
                class="p-4 rounded-3xl border border-surface-container-high/30">
                <div class="w-9 h-9 rounded-2xl bg-surface-container-high flex items-center justify-center mb-3">
                    <component :is="item.icon" :class="['w-4 h-4', item.tone]" />
                </div>
                <h4 :class="['text-xl font-black leading-none', item.tone]">{{ item.value }}</h4>
                <p class="text-[8px] font-black text-on-surface-variant/45 uppercase tracking-wider mt-1">
                    {{ item.label }}
                </p>
            </SurfaceCard>
        </section>

        <section class="grid grid-cols-4 gap-3">
            <button v-for="action in quickActions" :key="action.label" @click="router.push({ name: action.route })"
                class="flex flex-col items-center gap-2 group active:scale-95 transition-all">
                <div :class="['w-full aspect-square rounded-3xl flex items-center justify-center', action.color]">
                    <component :is="action.icon" class="w-6 h-6" />
                </div>
                <span class="text-[8px] font-black uppercase tracking-wider text-on-surface-variant/55 text-center">
                    {{ action.label }}
                </span>
            </button>
        </section>

        <section class="grid grid-cols-2 gap-3">
            <SurfaceCard variant="low" class="p-5 rounded-4xl border border-surface-container-high/30">
                <div class="flex items-center justify-between mb-5">
                    <Receipt class="w-5 h-5 text-primary" />
                    <span class="text-[9px] font-black text-primary">+9.4%</span>
                </div>
                <h3 class="text-3xl font-black text-on-surface leading-none">48</h3>
                <p class="text-[9px] font-black text-on-surface-variant/45 uppercase tracking-wider mt-2">Bills Today</p>
            </SurfaceCard>

            <SurfaceCard variant="low" class="p-5 rounded-4xl border border-surface-container-high/30">
                <div class="flex items-center justify-between mb-5">
                    <Users class="w-5 h-5 text-tertiary" />
                    <span class="text-[9px] font-black text-tertiary">32</span>
                </div>
                <h3 class="text-3xl font-black text-on-surface leading-none">1.2K</h3>
                <p class="text-[9px] font-black text-on-surface-variant/45 uppercase tracking-wider mt-2">Units In Stock</p>
            </SurfaceCard>
        </section>

        <SurfaceCard variant="low" class="p-5 rounded-4xl border border-surface-container-high/30">
            <div class="flex items-center justify-between mb-5">
                <div>
                    <h3 class="text-lg font-black text-on-surface tracking-tight">Stock Alerts</h3>
                    <p class="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider">Products below reorder level</p>
                </div>
                <button @click="router.push({ name: 'inventory-low-stock' })"
                    class="text-[9px] font-black text-primary uppercase tracking-widest flex items-center gap-1">
                    Open
                    <ChevronRight class="w-3 h-3" />
                </button>
            </div>

            <div class="space-y-4">
                <div v-for="item in stockAlerts" :key="item.sku" class="space-y-2">
                    <div class="flex justify-between items-center gap-4">
                        <div class="min-w-0">
                            <h4 class="text-sm font-black text-on-surface truncate">{{ item.name }}</h4>
                            <p class="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-wider">
                                {{ item.sku }} • Min {{ item.min }}
                            </p>
                        </div>
                        <span class="text-sm font-black text-error shrink-0">{{ item.stock }} left</span>
                    </div>
                    <div class="h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div class="h-full bg-error rounded-full transition-all duration-1000"
                            :style="{ width: showChart ? `${item.fill}%` : '0%' }"></div>
                    </div>
                </div>
            </div>
        </SurfaceCard>

        <section class="space-y-3">
            <div class="flex items-center justify-between px-1">
                <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Top Products</h3>
                <button @click="router.push({ name: 'reports' })"
                    class="text-[9px] font-black text-primary uppercase tracking-widest">View Report</button>
            </div>

            <div class="space-y-2">
                <div v-for="product in topProducts" :key="product.name"
                    class="bg-surface-container-low p-3 rounded-3xl flex items-center gap-4 border border-surface-container-high/30 active:scale-[0.98] transition-all">
                    <div class="w-14 h-14 rounded-2xl bg-white overflow-hidden shrink-0 border border-surface-container-high">
                        <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
                    </div>
                    <div class="grow min-w-0">
                        <h4 class="text-sm font-black text-on-surface truncate leading-tight">{{ product.name }}</h4>
                        <p class="text-[9px] font-bold text-on-surface-variant/45 mt-1">
                            {{ product.sales }} sales • {{ product.revenue }}
                        </p>
                    </div>
                    <span
                        :class="['text-[9px] font-black px-2 py-1 rounded-lg shrink-0', product.trend.startsWith('+') ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error']">
                        {{ product.trend }}
                    </span>
                </div>
            </div>
        </section>

        <SurfaceCard variant="low" class="p-5 rounded-4xl border border-surface-container-high/30">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h3 class="text-lg font-black text-on-surface tracking-tight">Recent Bills</h3>
                    <p class="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider">Latest finalized invoices</p>
                </div>
                <button @click="router.push({ name: 'bill-history' })"
                    class="text-[9px] font-black text-primary uppercase tracking-widest flex items-center gap-1">
                    View All
                    <ChevronRight class="w-3 h-3" />
                </button>
            </div>

            <div v-if="recentBills.length" class="space-y-1">
                <div v-for="(bill, index) in recentBills" :key="bill.id" :class="[
                    'flex items-center justify-between gap-4 py-3.5',
                    index !== recentBills.length - 1 && 'border-b border-surface-container-high/30'
                ]">
                    <div class="flex items-center gap-4 min-w-0">
                        <div class="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                            <Receipt class="w-5 h-5" />
                        </div>
                        <div class="min-w-0">
                            <p class="text-xs font-black text-on-surface truncate">{{ bill.invoiceNumber }}</p>
                            <p class="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-widest mt-0.5">
                                {{ bill.customer.name }} • {{ formatDate(bill.createdAt) }}
                            </p>
                        </div>
                    </div>
                    <div class="text-right shrink-0">
                        <span class="text-sm font-black text-on-surface">{{ formatCurrency(bill.total) }}</span>
                        <p class="text-[8px] font-black uppercase tracking-wider mt-0.5"
                            :class="bill.paymentMethod === 'qr' ? 'text-primary' : 'text-secondary'">
                            {{ bill.paymentMethod === 'qr' ? 'QR' : 'Cash' }}
                        </p>
                    </div>
                </div>
            </div>

            <div v-else class="py-8 text-center space-y-2">
                <Receipt class="w-10 h-10 text-on-surface-variant/15 mx-auto" />
                <p class="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider">
                    No bills yet — create your first bill
                </p>
            </div>
        </SurfaceCard>

        <section>
            <button @click="router.push({ name: 'add-product' })"
                class="w-full bg-surface-container-low border-2 border-dashed border-surface-container-highest/40 rounded-4xl p-5 flex items-center justify-between active:scale-[0.98] transition-all group">
                <div class="flex items-center gap-4 min-w-0">
                    <div class="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
                        <Plus class="w-7 h-7 text-white" />
                    </div>
                    <div class="text-left min-w-0">
                        <h4 class="text-sm font-black text-on-surface">Add New Product</h4>
                        <p class="text-[10px] font-bold text-on-surface-variant/40 mt-0.5 uppercase tracking-wider">
                            Scan barcode or enter manually
                        </p>
                    </div>
                </div>
                <ChevronRight class="w-5 h-5 text-on-surface-variant/30 group-hover:text-primary shrink-0" />
            </button>
        </section>
    </div>
</template>
