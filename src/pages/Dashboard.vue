<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
    TrendingUp,
    Zap,
    Plus,
    Activity,
    ShoppingBag,
    Users,
    Package,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    LayoutGrid,
    Search,
    QrCode
} from 'lucide-vue-next';
import { StockItem, SurfaceCard, Button } from '../components';

const router = useRouter();

const topProducts = [
    { name: 'AuraPods Pro', sales: 124, price: '₹4,999', trend: '+12%', image: 'https://picsum.photos/seed/pods/100/100' },
    { name: 'X-Watch series 9', sales: 86, price: '₹24,999', trend: '+8%', image: 'https://picsum.photos/seed/watch3/100/100' },
    { name: 'MagSafe Gen 2', sales: 64, price: '₹3,499', trend: '-2%', image: 'https://picsum.photos/seed/mag/100/100' }
];

const recentActivity = [
    { type: 'sale', id: '#TX-9021', time: '2m ago', amount: '₹14,290' },
    { type: 'stock', id: 'Low Stock: HD-900', time: '15m ago', amount: '2 Units' },
    { type: 'sale', id: '#TX-9020', time: '45m ago', amount: '₹8,500' }
];
</script>

<template>
    <div class="px-5 pt-6 space-y-8 pb-32 max-w-md mx-auto">
        <!-- Intelligence Hub Header -->
        <section class="flex justify-between items-center">
            <div class="space-y-0.5">
                <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    <p class="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60">Live Intelligence</p>
                </div>
                <h2 class="text-2xl font-black tracking-tighter text-on-surface leading-none">Intelligence Hub</h2>
            </div>
            <div class="flex gap-2">
                <button @click="router.push({ name: 'scanner' })"
                    class="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary active:scale-95 transition-all">
                    <Search class="w-5 h-5" />
                </button>
                <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Activity class="w-5 h-5" />
                </div>
            </div>
        </section>

        <!-- Dynamic Performance Stats -->
        <section class="grid grid-cols-2 gap-3">
            <SurfaceCard
                class="col-span-2 p-6 bg-primary-gradient shadow-xl shadow-primary/20  flex flex-col justify-between h-44 rounded-[2.5rem] relative overflow-hidden group">
                <div
                    class="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000">
                </div>

                <div class="relative z-10 flex justify-between items-start">
                    <div class="space-y-1">
                        <span class="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">Cycle Revenue</span>
                        <h3 class="text-3xl font-black tracking-tighter">₹42.89L</h3>
                    </div>
                    <div class="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                        <TrendingUp class="w-4 h-4 text-white" />
                    </div>
                </div>

                <div class="relative z-10 flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                        <span
                            class="text-[9px] font-black bg-white text-primary px-2 py-1 rounded-lg uppercase tracking-widest">+12.4%</span>
                        <span class="text-[9px] font-bold opacity-60">VS LAST RESET</span>
                    </div>
                    <div class="flex -space-x-2">
                        <div v-for="i in 3" :key="i"
                            class="w-6 h-6 rounded-full border-2 border-primary bg-surface-container-high overflow-hidden">
                            <img :src="`https://i.pravatar.cc/100?u=${i}`" alt="" class="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </SurfaceCard>

            <SurfaceCard variant="low"
                class="p-4 flex flex-col justify-between rounded-3xl h-32 border border-surface-container-high/50">
                <div class="flex items-center justify-between">
                    <span class="text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Active
                        Nodes</span>
                    <Zap class="w-3.5 h-3.5 text-primary opacity-40" />
                </div>
                <div class="space-y-1">
                    <h4 class="text-xl font-black text-on-surface leading-none">1,204</h4>
                    <p class="text-[10px] font-bold text-primary flex items-center gap-1">
                        <ArrowUpRight class="w-3 h-3" />
                        2.4%
                    </p>
                </div>
            </SurfaceCard>

            <SurfaceCard variant="low"
                class="p-4 flex flex-col justify-between rounded-3xl h-32 border border-surface-container-high/50">
                <div class="flex items-center justify-between">
                    <span
                        class="text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Engagement</span>
                    <Users class="w-3.5 h-3.5 text-tertiary opacity-40" />
                </div>
                <div class="space-y-1">
                    <h4 class="text-xl font-black text-on-surface leading-none">98.2%</h4>
                    <p class="text-[10px] font-bold text-tertiary flex items-center gap-1">
                        <ArrowDownRight class="w-3 h-3" />
                        0.8%
                    </p>
                </div>
            </SurfaceCard>
        </section>

        <!-- Rapid Actions -->
        <section class="space-y-4">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 px-1">Rapid Access
            </h3>
            <div class="grid grid-cols-4 gap-3">
                <div v-for="action in [
                    { icon: QrCode, label: 'Bill', color: 'bg-primary/10 text-primary', route: 'bill' },
                    { icon: Package, label: 'Stock', color: 'bg-tertiary/10 text-tertiary', route: 'inventory' },
                    { icon: LayoutGrid, label: 'Bento', color: 'bg-secondary/10 text-secondary', route: 'dashboard' },
                    { icon: Plus, label: 'Add', color: 'bg-primary text-white shadow-lg shadow-primary/20', route: 'scanner' }
                ]" :key="action.label" @click="router.push({ name: action.route })"
                    class="flex flex-col items-center gap-2 group cursor-pointer">
                    <div
                        :class="['w-full aspect-square rounded-2xl flex items-center justify-center transition-all group-active:scale-90', action.color]">
                        <component :is="action.icon" class="w-6 h-6" />
                    </div>
                    <span class="text-[9px] font-black uppercase tracking-widest opacity-60">{{ action.label }}</span>
                </div>
            </div>
        </section>

        <!-- High Value Nodes (Top Products) -->
        <section class="space-y-4">
            <div class="flex items-center justify-between px-1">
                <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">High
                    Performance Nodes</h3>
                <button class="text-[9px] font-black text-primary uppercase tracking-widest">In-depth</button>
            </div>
            <div class="space-y-2">
                <div v-for="product in topProducts" :key="product.name"
                    class="bg-surface-container-low p-2 rounded-2xl flex items-center gap-3 border border-surface-container-high/50 hover:bg-surface-container-high transition-colors">
                    <div class="w-12 h-12 rounded-xl bg-surface-container overflow-hidden shrink-0">
                        <img :src="product.image" class="w-full h-full object-cover" />
                    </div>
                    <div class="grow min-w-0">
                        <h4 class="text-xs font-black text-on-surface truncate leading-tight">{{ product.name }}</h4>
                        <div class="flex items-center gap-2 mt-0.5">
                            <span class="text-[9px] font-bold text-on-surface-variant/60">{{ product.sales }}
                                Transactions</span>
                            <span
                                :class="['text-[9px] font-black px-1.5 py-0.5 rounded-md', product.trend.startsWith('+') ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error']">
                                {{ product.trend }}
                            </span>
                        </div>
                    </div>
                    <div class="text-right pr-2">
                        <p class="text-xs font-black text-on-surface leading-none">{{ product.price }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Chronological Ledger (Recent Activity) -->
        <section class="space-y-4">
            <div class="flex items-center justify-between px-1">
                <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Chronological
                    Ledger</h3>
                <Clock class="w-3 h-3 text-on-surface-variant/40" />
            </div>
            <div
                class="bg-surface-container-low rounded-3xl p-4 border border-surface-container-high/50 divide-y divide-surface-container-high">
                <div v-for="log in recentActivity" :key="log.id"
                    class="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                    <div class="flex items-center gap-3">
                        <div
                            :class="['w-8 h-8 rounded-lg flex items-center justify-center', log.type === 'sale' ? 'bg-primary/5 text-primary' : 'bg-error/5 text-error']">
                            <ShoppingBag v-if="log.type === 'sale'" class="w-4 h-4" />
                            <AlertTriangle v-else class="w-4 h-4" />
                        </div>
                        <div class="space-y-0.5">
                            <p class="text-[11px] font-black text-on-surface tracking-tight">{{ log.id }}</p>
                            <p class="text-[9px] font-bold text-on-surface-variant/50 uppercase tracking-widest">{{
                                log.time }}</p>
                        </div>
                    </div>
                    <span :class="['text-[11px] font-black', log.type === 'sale' ? 'text-primary' : 'text-error']">{{
                        log.amount }}</span>
                </div>
            </div>
        </section>

        <!-- Expansion Protocol -->
        <section class="pb-4">
            <div @click="router.push({ name: 'scanner' })"
                class="bg-primary/5 border-2 border-dashed border-primary/20 rounded-[2rem] p-6 flex items-center gap-5 cursor-pointer hover:bg-primary/10 transition-all active:scale-[0.98]">
                <div
                    class="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
                    <Plus class="w-7 h-7 text-white" />
                </div>
                <div>
                    <h4 class="text-xs font-black text-on-surface uppercase tracking-widest">Expansion Protocol</h4>
                    <p class="text-[10px] font-bold text-on-surface-variant/50 mt-0.5 uppercase">Initialize New Hardware
                        Node</p>
                </div>
            </div>
        </section>
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
