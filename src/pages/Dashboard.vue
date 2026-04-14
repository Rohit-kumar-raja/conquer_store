<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
    TrendingUp,
    ShoppingBag,
    Users,
    Package,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    QrCode,
    Plus,
    ChevronRight,
    IndianRupee,
    Receipt,
    BarChart3
} from 'lucide-vue-next';
import { SurfaceCard } from '../components';

const router = useRouter();

const topProducts = [
    { name: 'AuraPods Pro', sales: 124, price: '₹4,999', trend: '+12%', image: 'https://picsum.photos/seed/pods/100/100' },
    { name: 'X-Watch Series 9', sales: 86, price: '₹24,999', trend: '+8%', image: 'https://picsum.photos/seed/watch3/100/100' },
    { name: 'MagSafe Gen 2', sales: 64, price: '₹3,499', trend: '-2%', image: 'https://picsum.photos/seed/mag/100/100' }
];

const recentActivity = [
    { type: 'sale', id: '#TX-9021', time: '2m ago', amount: '₹14,290' },
    { type: 'stock', id: 'Low Stock: HD-900', time: '15m ago', amount: '2 Units' },
    { type: 'sale', id: '#TX-9020', time: '45m ago', amount: '₹8,500' }
];

const quickActions = [
    { icon: QrCode, label: 'New Bill', route: 'bill', color: 'bg-primary text-white shadow-lg shadow-primary/30' },
    { icon: Package, label: 'Stock', route: 'inventory', color: 'bg-surface-container-high text-on-surface' },
    { icon: BarChart3, label: 'Reports', route: 'reports', color: 'bg-surface-container-high text-on-surface' },
    { icon: Plus, label: 'Add Item', route: 'scanner', color: 'bg-surface-container-high text-on-surface' },
];
</script>

<template>
    <div class="px-5 pt-2 space-y-6 pb-32 max-w-md mx-auto">

        <!-- Revenue Card -->
        <section>
            <SurfaceCard
                class="col-span-2 p-6 bg-primary-gradient shadow-xl shadow-primary/20 flex flex-col justify-between h-44 rounded-4xl relative overflow-hidden group">
                <div
                    class="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000">
                </div>

                <div class="relative z-10 flex justify-between items-start">
                    <div class="space-y-1">
                        <span class="text-[9px] font-black uppercase tracking-[0.2em] text-white/60">Today's
                            Revenue</span>
                        <h3 class="text-4xl font-black tracking-tighter text-white">₹42.89L</h3>
                    </div>
                    <div class="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md">
                        <TrendingUp class="w-5 h-5 text-white" />
                    </div>
                </div>

                <div class="relative z-10 flex items-center gap-3">
                    <span
                        class="text-[10px] font-black bg-white text-primary px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-sm">+12.4%</span>
                    <span class="text-[10px] font-bold text-white/50 uppercase tracking-wider">vs Yesterday</span>
                </div>
            </SurfaceCard>
        </section>

        <!-- Stats Row -->
        <section class="grid grid-cols-3 gap-3">
            <SurfaceCard variant="low"
                class="p-4 flex flex-col gap-3 rounded-3xl! border border-surface-container-high/30">
                <div class="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Receipt class="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h4 class="text-xl font-black text-on-surface leading-none">48</h4>
                    <p class="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-wider mt-1">Bills
                    </p>
                </div>
            </SurfaceCard>

            <SurfaceCard variant="low"
                class="p-4 flex flex-col gap-3 rounded-3xl! border border-surface-container-high/30">
                <div class="w-10 h-10 rounded-2xl bg-tertiary/10 flex items-center justify-center">
                    <Users class="w-5 h-5 text-tertiary" />
                </div>
                <div>
                    <h4 class="text-xl font-black text-on-surface leading-none">32</h4>
                    <p class="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-wider mt-1">
                        Customers</p>
                </div>
            </SurfaceCard>

            <SurfaceCard variant="low"
                class="p-4 flex flex-col gap-3 rounded-3xl! border border-surface-container-high/30">
                <div class="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center">
                    <Package class="w-5 h-5 text-secondary" />
                </div>
                <div>
                    <h4 class="text-xl font-black text-on-surface leading-none">1.2K</h4>
                    <p class="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-wider mt-1">In Stock
                    </p>
                </div>
            </SurfaceCard>
        </section>

        <!-- Quick Actions -->
        <section class="space-y-4">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 px-1">Quick
                Actions</h3>
            <div class="grid grid-cols-4 gap-3">
                <div v-for="action in quickActions" :key="action.label" @click="router.push({ name: action.route })"
                    class="flex flex-col items-center gap-2.5 group cursor-pointer">
                    <div
                        :class="['w-full aspect-square rounded-3xl flex items-center justify-center transition-all group-active:scale-90', action.color]">
                        <component :is="action.icon" class="w-6 h-6" />
                    </div>
                    <span class="text-[9px] font-black uppercase tracking-wider text-on-surface-variant/50">{{
                        action.label }}</span>
                </div>
            </div>
        </section>

        <!-- Top Products -->
        <section class="space-y-4">
            <div class="flex items-center justify-between px-1">
                <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Top
                    Products</h3>
                <button @click="router.push({ name: 'reports' })"
                    class="text-[9px] font-black text-primary uppercase tracking-widest flex items-center gap-1">
                    View All
                    <ChevronRight class="w-3 h-3" />
                </button>
            </div>
            <div class="space-y-2">
                <div v-for="product in topProducts" :key="product.name"
                    class="bg-surface-container-low p-3 rounded-3xl flex items-center gap-4 border border-surface-container-high/30 hover:bg-surface-container-high transition-all active:scale-[0.98] cursor-pointer">
                    <div class="w-14 h-14 rounded-2xl bg-surface-container overflow-hidden shrink-0">
                        <img :src="product.image" class="w-full h-full object-cover" />
                    </div>
                    <div class="grow min-w-0">
                        <h4 class="text-sm font-black text-on-surface truncate leading-tight">{{ product.name }}</h4>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-[9px] font-bold text-on-surface-variant/50">{{ product.sales }}
                                sales</span>
                            <span
                                :class="['text-[9px] font-black px-2 py-0.5 rounded-lg', product.trend.startsWith('+') ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error']">
                                {{ product.trend }}
                            </span>
                        </div>
                    </div>
                    <div class="text-right pr-1">
                        <p class="text-sm font-black text-on-surface leading-none">{{ product.price }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Recent Activity -->
        <section class="space-y-4">
            <div class="flex items-center justify-between px-1">
                <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Recent
                    Activity</h3>
                <Clock class="w-3.5 h-3.5 text-on-surface-variant/30" />
            </div>
            <div class="bg-surface-container-low rounded-4xl p-5 border border-surface-container-high/30 space-y-1">
                <div v-for="(log, index) in recentActivity" :key="log.id"
                    class="flex items-center justify-between py-3.5"
                    :class="index !== recentActivity.length - 1 && 'border-b border-surface-container-high/30'">
                    <div class="flex items-center gap-4">
                        <div
                            :class="['w-10 h-10 rounded-2xl flex items-center justify-center', log.type === 'sale' ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error']">
                            <ShoppingBag v-if="log.type === 'sale'" class="w-5 h-5" />
                            <Package v-else class="w-5 h-5" />
                        </div>
                        <div>
                            <p class="text-xs font-black text-on-surface tracking-tight">{{ log.id }}</p>
                            <p class="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-widest mt-0.5">
                                {{ log.time }}</p>
                        </div>
                    </div>
                    <span :class="['text-sm font-black', log.type === 'sale' ? 'text-primary' : 'text-error']">{{
                        log.amount }}</span>
                </div>
            </div>
        </section>

        <!-- Add Product CTA -->
        <section class="pb-4">
            <div @click="router.push({ name: 'add-product' })"
                class="bg-surface-container-low border-2 border-dashed border-surface-container-highest/30 rounded-4xl p-5 flex items-center justify-between cursor-pointer hover:bg-surface-container-high transition-all active:scale-[0.98] group">
                <div class="flex items-center gap-5">
                    <div
                        class="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 shrink-0 group-hover:scale-105 transition-transform">
                        <Plus class="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h4 class="text-sm font-black text-on-surface">Add New Product</h4>
                        <p class="text-[10px] font-bold text-on-surface-variant/40 mt-0.5 uppercase tracking-wider">
                            Scan or Enter Manually</p>
                    </div>
                </div>
                <div
                    class="w-10 h-10 rounded-2xl bg-surface-container-highest/20 flex items-center justify-center text-on-surface-variant/30 group-hover:bg-primary group-hover:text-white transition-all">
                    <ChevronRight class="w-5 h-5" />
                </div>
            </div>
        </section>
    </div>
</template>
