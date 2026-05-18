<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
    AlertTriangle,
    BarChart3,
    ChevronRight,
    Download,
    IndianRupee,
    Package,
    Receipt,
    TrendingUp
} from 'lucide-vue-next';
import { SurfaceCard } from '../components';

const router = useRouter();

const showChart = ref(false);

const revenueData = [
    { day: 'Mon', revenue: 32400, orders: 31 },
    { day: 'Tue', revenue: 28800, orders: 26 },
    { day: 'Wed', revenue: 41200, orders: 44 },
    { day: 'Thu', revenue: 37600, orders: 38 },
    { day: 'Fri', revenue: 46800, orders: 51 },
    { day: 'Sat', revenue: 58900, orders: 64 },
    { day: 'Sun', revenue: 42100, orders: 46 }
];

const categoryData = [
    { name: 'Electronics', value: 42, amount: '₹34.6L', color: 'bg-primary' },
    { name: 'Audio', value: 24, amount: '₹19.8L', color: 'bg-secondary' },
    { name: 'Wearables', value: 19, amount: '₹15.7L', color: 'bg-tertiary' },
    { name: 'Groceries', value: 15, amount: '₹12.3L', color: 'bg-error' }
];

const lowStockItems = [
    { name: 'Cloud Router X1', sku: 'NET-CR-X1', stock: 4, min: 20, action: 'Order 60' },
    { name: 'Sonic Boom ANC', sku: 'SNB-HD-BLK', stock: 11, min: 30, action: 'Order 80' },
    { name: 'Organic Almond Milk', sku: 'MLK-ORG-01', stock: 18, min: 40, action: 'Order 72' }
];

const topProducts = [
    { name: 'AuraPods Pro', units: 124, revenue: '₹6.19L', trend: '+12%' },
    { name: 'X-Watch Series 9', units: 86, revenue: '₹21.49L', trend: '+8%' },
    { name: 'MagSafe Gen 2', units: 64, revenue: '₹2.23L', trend: '-2%' }
];

const stockHealth = [
    { label: 'Healthy', value: 68, color: '#24389c' },
    { label: 'Low', value: 21, color: '#805000' },
    { label: 'Out', value: 11, color: '#ba1a1a' }
];

const maxRevenue = Math.max(...revenueData.map(item => item.revenue));
const maxOrders = Math.max(...revenueData.map(item => item.orders));
const maxProductUnits = Math.max(...topProducts.map(item => item.units));
const totalRevenue = computed(() => revenueData.reduce((total, item) => total + item.revenue, 0));
const totalOrders = computed(() => revenueData.reduce((total, item) => total + item.orders, 0));

const formatCurrencyCompact = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
        notation: 'compact'
    }).format(value);
};

const stockHealthGradient = computed(() => {
    let cursor = 0;
    const stops = stockHealth.map(item => {
        const start = cursor;
        cursor += item.value;
        return `${item.color} ${start}% ${cursor}%`;
    });

    return `conic-gradient(${stops.join(', ')})`;
});

const getRevenueHeight = (value: number) => {
    return showChart.value ? `${Math.max(12, (value / maxRevenue) * 100)}%` : '0%';
};

const buildLinePoints = (values: number[], max: number) => {
    const step = values.length > 1 ? 100 / (values.length - 1) : 100;

    return values.map((value, index) => {
        const x = index * step;
        const y = 100 - (value / max) * 72 - 10;

        return {
            x,
            y
        };
    });
};

const revenueLinePoints = computed(() => buildLinePoints(revenueData.map(item => item.revenue), maxRevenue));
const ordersLinePoints = computed(() => buildLinePoints(revenueData.map(item => item.orders), maxOrders));

const toPolyline = (points: { x: number; y: number }[]) => {
    return points.map(point => `${point.x},${point.y}`).join(' ');
};

const getProductWidth = (units: number) => {
    return showChart.value ? `${Math.max(14, (units / maxProductUnits) * 100)}%` : '0%';
};

onMounted(() => {
    setTimeout(() => {
        showChart.value = true;
    }, 80);
});
</script>

<template>
    <div class="px-5 pt-2 space-y-6 pb-40 max-w-md mx-auto">
        <section class="flex items-end justify-between gap-4">
            <div>
                <p class="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">Inventory Analytics</p>
                <h2 class="text-3xl font-black tracking-tighter text-on-surface leading-tight mt-1">Reports</h2>
            </div>
            <button
                class="w-11 h-11 rounded-2xl bg-surface-container-low border border-surface-container-high/40 flex items-center justify-center text-primary active:scale-95 transition-all">
                <Download class="w-5 h-5" />
            </button>
        </section>

        <section class="grid grid-cols-2 gap-3">
            <SurfaceCard class="p-5 rounded-3xl bg-primary-gradient text-white shadow-xl shadow-primary/20">
                <div class="flex items-center justify-between mb-5">
                    <span class="text-[9px] font-black uppercase tracking-widest text-white/60">Revenue</span>
                    <IndianRupee class="w-5 h-5 text-white/70" />
                </div>
                <h3 class="text-3xl font-black tracking-tighter">{{ formatCurrencyCompact(totalRevenue) }}</h3>
                <p class="text-[10px] font-bold text-white/60 mt-1">Last 7 days</p>
            </SurfaceCard>

            <SurfaceCard variant="low" class="p-5 rounded-3xl border border-surface-container-high/30">
                <div class="flex items-center justify-between mb-5">
                    <span class="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/50">Bills</span>
                    <Receipt class="w-5 h-5 text-primary" />
                </div>
                <h3 class="text-3xl font-black tracking-tighter text-on-surface">{{ totalOrders }}</h3>
                <p class="text-[10px] font-bold text-primary mt-1">+9.4% this week</p>
            </SurfaceCard>

            <SurfaceCard variant="low" class="p-5 rounded-3xl border border-surface-container-high/30">
                <div class="flex items-center justify-between mb-5">
                    <span class="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/50">Stock Value</span>
                    <Package class="w-5 h-5 text-secondary" />
                </div>
                <h3 class="text-3xl font-black tracking-tighter text-on-surface">₹82.4L</h3>
                <p class="text-[10px] font-bold text-on-surface-variant/50 mt-1">1,248 units</p>
            </SurfaceCard>

            <SurfaceCard variant="low" class="p-5 rounded-3xl border border-surface-container-high/30">
                <div class="flex items-center justify-between mb-5">
                    <span class="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/50">Low Stock</span>
                    <AlertTriangle class="w-5 h-5 text-error" />
                </div>
                <h3 class="text-3xl font-black tracking-tighter text-error">12</h3>
                <p class="text-[10px] font-bold text-on-surface-variant/50 mt-1">Need reorder</p>
            </SurfaceCard>
        </section>

        <SurfaceCard variant="low" class="p-5 rounded-4xl border border-surface-container-high/30">
            <div class="flex items-center justify-between mb-5">
                <div>
                    <h3 class="text-lg font-black text-on-surface tracking-tight">Revenue Trend</h3>
                    <p class="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider">Daily sales and bill volume</p>
                </div>
                <div class="flex items-center gap-2 text-primary">
                    <TrendingUp class="w-4 h-4" />
                    <span class="text-[10px] font-black">+14.2%</span>
                </div>
            </div>

            <div class="h-56 flex items-end gap-3 border-b border-surface-container-highest/70 pb-3">
                <div v-for="item in revenueData" :key="item.day" class="flex-1 h-full flex flex-col justify-end gap-2 group">
                    <div class="relative flex-1 h-full flex items-end">
                        <div
                            class="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface-container-lowest border border-surface-container-high px-2 py-1 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none min-w-max z-10">
                            <p class="text-[9px] font-black text-on-surface">{{ formatCurrencyCompact(item.revenue) }}</p>
                            <p class="text-[8px] font-bold text-on-surface-variant/50">{{ item.orders }} bills</p>
                        </div>
                        <div class="w-full h-full min-h-[12px] rounded-t-2xl bg-surface-container-highest overflow-hidden flex items-end">
                            <div class="w-full rounded-t-2xl bg-primary transition-all duration-1000"
                                :style="{ height: getRevenueHeight(item.revenue) }"></div>
                        </div>
                    </div>
                    <span class="text-[9px] font-black text-on-surface-variant/50 text-center">{{ item.day }}</span>
                </div>
            </div>
        </SurfaceCard>

        <SurfaceCard variant="low" class="p-5 rounded-4xl border border-surface-container-high/30">
            <div class="flex items-center justify-between mb-5">
                <div>
                    <h3 class="text-lg font-black text-on-surface tracking-tight">Revenue vs Orders</h3>
                    <p class="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider">Two-line weekly trend</p>
                </div>
                <div class="flex items-center gap-2 text-primary">
                    <BarChart3 class="w-4 h-4" />
                    <span class="text-[10px] font-black">Dual axis</span>
                </div>
            </div>

            <div class="space-y-4">
                <div class="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest">
                    <div class="flex items-center gap-2 text-primary">
                        <span class="w-2.5 h-2.5 rounded-full bg-primary"></span>
                        <span>Revenue</span>
                    </div>
                    <div class="flex items-center gap-2 text-secondary">
                        <span class="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                        <span>Orders</span>
                    </div>
                </div>

                <div class="relative h-56 rounded-3xl bg-surface-container-lowest border border-surface-container-highest/60 overflow-hidden">
                    <div class="absolute inset-0 px-3 py-4 flex flex-col justify-between pointer-events-none">
                        <div class="h-px bg-surface-container-highest/60"></div>
                        <div class="h-px bg-surface-container-highest/60"></div>
                        <div class="h-px bg-surface-container-highest/60"></div>
                        <div class="h-px bg-surface-container-highest/60"></div>
                    </div>

                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="relative z-10 w-full h-full">
                        <polyline
                            :points="toPolyline(revenueLinePoints)"
                            fill="none"
                            class="transition-all duration-1000 stroke-primary"
                            :class="showChart ? 'opacity-100' : 'opacity-0'"
                            stroke-width="2.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <polyline
                            :points="toPolyline(ordersLinePoints)"
                            fill="none"
                            class="transition-all duration-1000 stroke-secondary"
                            :class="showChart ? 'opacity-100' : 'opacity-0'"
                            stroke-width="2.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />

                        <g v-for="(point, index) in revenueLinePoints" :key="`revenue-${revenueData[index].day}`"
                            class="transition-all duration-1000"
                            :class="showChart ? 'opacity-100' : 'opacity-0'">
                            <circle :cx="point.x" :cy="point.y" r="1.9" class="fill-primary" />
                            <circle :cx="point.x" :cy="point.y" r="3.6" fill="none" class="stroke-primary" stroke-width="0.8" opacity="0.25" />
                        </g>

                        <g v-for="(point, index) in ordersLinePoints" :key="`orders-${revenueData[index].day}`"
                            class="transition-all duration-1000"
                            :class="showChart ? 'opacity-100' : 'opacity-0'">
                            <circle :cx="point.x" :cy="point.y" r="1.9" class="fill-secondary" />
                            <circle :cx="point.x" :cy="point.y" r="3.6" fill="none" class="stroke-secondary" stroke-width="0.8" opacity="0.25" />
                        </g>
                    </svg>

                    <div class="absolute inset-x-0 bottom-0 flex items-end justify-between px-3 pb-3">
                        <span v-for="item in revenueData" :key="item.day" class="text-[9px] font-black text-on-surface-variant/50">
                            {{ item.day }}
                        </span>
                    </div>
                </div>
            </div>
        </SurfaceCard>

        <section class="grid grid-cols-1 gap-4">
            <SurfaceCard variant="low" class="p-5 rounded-4xl border border-surface-container-high/30">
                <div class="flex items-center justify-between mb-5">
                    <div>
                        <h3 class="text-lg font-black text-on-surface tracking-tight">Stock Health</h3>
                        <p class="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider">Current inventory status</p>
                    </div>
                    <BarChart3 class="w-5 h-5 text-primary" />
                </div>

                <div class="flex items-center gap-6">
                    <div class="w-32 h-32 rounded-full p-4 shrink-0" :style="{ background: stockHealthGradient }">
                        <div class="w-full h-full rounded-full bg-surface-container-low flex flex-col items-center justify-center">
                            <span class="text-3xl font-black text-on-surface">89%</span>
                            <span class="text-[8px] font-black text-on-surface-variant/50 uppercase tracking-widest">Available</span>
                        </div>
                    </div>
                    <div class="grow space-y-3">
                        <div v-for="item in stockHealth" :key="item.label" class="space-y-1">
                            <div class="flex justify-between items-center">
                                <span class="text-xs font-black text-on-surface">{{ item.label }}</span>
                                <span class="text-xs font-black text-on-surface-variant/50">{{ item.value }}%</span>
                            </div>
                            <div class="h-2 rounded-full bg-surface-container-highest overflow-hidden">
                                <div class="h-full rounded-full transition-all duration-1000"
                                    :style="{ width: showChart ? `${item.value}%` : '0%', backgroundColor: item.color }"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </SurfaceCard>

            <SurfaceCard variant="low" class="p-5 rounded-4xl border border-surface-container-high/30">
                <div class="flex items-center justify-between mb-5">
                    <div>
                        <h3 class="text-lg font-black text-on-surface tracking-tight">Category Mix</h3>
                        <p class="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider">Inventory value split</p>
                    </div>
                    <button class="text-[9px] font-black text-primary uppercase tracking-widest">CSV</button>
                </div>

                <div class="space-y-4">
                    <div v-for="category in categoryData" :key="category.name" class="space-y-2">
                        <div class="flex justify-between items-center">
                            <span class="text-sm font-black text-on-surface">{{ category.name }}</span>
                            <div class="text-right">
                                <span class="text-sm font-black text-on-surface">{{ category.amount }}</span>
                                <span class="text-[10px] font-bold text-on-surface-variant/40 ml-2">{{ category.value }}%</span>
                            </div>
                        </div>
                        <div class="h-3 bg-surface-container-highest rounded-full overflow-hidden">
                            <div :class="['h-full rounded-full transition-all duration-1000', category.color]"
                                :style="{ width: showChart ? `${category.value}%` : '0%' }"></div>
                        </div>
                    </div>
                </div>
            </SurfaceCard>
        </section>

        <SurfaceCard variant="low" class="p-5 rounded-4xl border border-surface-container-high/30">
            <div class="flex items-center justify-between mb-5">
                <div>
                    <h3 class="text-lg font-black text-on-surface tracking-tight">Top Products</h3>
                    <p class="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider">Units sold this week</p>
                </div>
                <ChevronRight class="w-5 h-5 text-on-surface-variant/30" />
            </div>

            <div class="space-y-4">
                <div v-for="product in topProducts" :key="product.name" class="space-y-2">
                    <div class="flex justify-between gap-4">
                        <div class="min-w-0">
                            <h4 class="text-sm font-black text-on-surface truncate">{{ product.name }}</h4>
                            <p class="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-wider">
                                {{ product.units }} units • {{ product.revenue }}
                            </p>
                        </div>
                        <span
                            :class="['text-[10px] font-black px-2 py-1 rounded-lg self-start', product.trend.startsWith('+') ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error']">
                            {{ product.trend }}
                        </span>
                    </div>
                    <div class="h-3 bg-surface-container-highest rounded-full overflow-hidden">
                        <div class="h-full rounded-full bg-secondary transition-all duration-1000"
                            :style="{ width: getProductWidth(product.units) }"></div>
                    </div>
                </div>
            </div>
        </SurfaceCard>

        <SurfaceCard variant="low" class="p-5 rounded-4xl border border-surface-container-high/30">
            <div class="flex items-center justify-between mb-5">
                <div>
                    <h3 class="text-lg font-black text-on-surface tracking-tight">Reorder Queue</h3>
                    <p class="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider">Critical stock alerts</p>
                </div>
                <button @click="router.push({ name: 'inventory-low-stock' })"
                    class="text-[9px] font-black text-primary uppercase tracking-widest">Open</button>
            </div>

            <div class="space-y-2">
                <div v-for="item in lowStockItems" :key="item.sku"
                    class="p-4 rounded-3xl bg-surface-container-lowest border border-surface-container-high/40 flex items-center justify-between gap-4">
                    <div class="min-w-0">
                        <h4 class="text-sm font-black text-on-surface truncate">{{ item.name }}</h4>
                        <p class="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-wider mt-0.5">
                            {{ item.sku }} • Min {{ item.min }}
                        </p>
                    </div>
                    <div class="text-right shrink-0">
                        <p class="text-sm font-black text-error">{{ item.stock }} left</p>
                        <p class="text-[9px] font-black text-primary uppercase tracking-wider">{{ item.action }}</p>
                    </div>
                </div>
            </div>
        </SurfaceCard>
    </div>
</template>
