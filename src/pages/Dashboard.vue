<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
    TrendingUp,
    AlertTriangle,
    ArrowRight,
    Zap,
    Plus,
    Activity
} from 'lucide-vue-next';
import { StatCard, StockItem, Button, SurfaceCard } from '../components';

const router = useRouter();
</script>

<template>
    <div class="px-6 pt-8 space-y-10">
        <!-- Hero Header -->
        <section class="space-y-2">
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <p class="text-[10px] font-black uppercase tracking-[0.3em] text-primary/70">System Online</p>
            </div>
            <h2 class="text-4xl font-extrabold tracking-tighter text-on-surface leading-none">
                Intelligence <br /> <span class="text-primary italic">Overview</span>
            </h2>
        </section>

        <!-- Dynamic Bento Stats -->
        <section class="grid grid-cols-2 gap-4">
            <SurfaceCard
                class="col-span-2 p-6 bg-primary-gradient shadow shadow-primary/30 flex flex-col justify-between h-48 rounded-[2.5rem] relative overflow-hidden group">
                <div
                    class="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000">
                </div>
                <div class="relative z-10">
                    <div class="flex items-center gap-2 mb-2">
                        <TrendingUp class="w-4 h-4 opacity-70" />
                        <span class="text-[10px] font-bold uppercase tracking-widest opacity-70">Revenue Growth</span>
                    </div>
                    <h3 class="text-3xl font-black tracking-tight">$42,892.50</h3>
                </div>
                <div class="relative z-10 flex justify-between items-end">
                    <p class="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1.5 rounded-full">
                        +12.4% TODAY</p>
                    <Activity class="w-8 h-8 opacity-30" />
                </div>
            </SurfaceCard>

            <SurfaceCard variant="low" class="p-5 flex flex-col justify-between rounded-3xl h-36">
                <div>
                    <span
                        class="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/50 block mb-1">Total
                        Bills</span>
                    <h4 class="text-xl font-black text-on-surface">1,204</h4>
                </div>
                <div class="w-8 h-8 rounded-xl bg-surface-container-high flex items-center justify-center">
                    <Zap class="w-4 h-4 text-primary" />
                </div>
            </SurfaceCard>

            <SurfaceCard variant="low" class="p-5 flex flex-col justify-between rounded-3xl h-36">
                <div>
                    <span
                        class="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/50 block mb-1">Efficiency</span>
                    <h4 class="text-xl font-black text-on-surface">98.2%</h4>
                </div>
                <div class="w-8 h-8 rounded-xl bg-surface-container-high flex items-center justify-center">
                    <Activity class="w-4 h-4 text-tertiary" />
                </div>
            </SurfaceCard>
        </section>

        <!-- Critical Alerts Area -->
        <section class="space-y-6">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-black tracking-tight text-on-surface flex items-center gap-3">
                    <div class="w-2 h-8 bg-tertiary rounded-full"></div>
                    Inventory Risks
                </h3>
                <button @click="router.push({ name: 'inventory' })"
                    class="text-[10px] font-black uppercase tracking-widest text-primary hover:opacity-70 transition-opacity">View
                    All</button>
            </div>

            <div class="grid grid-cols-1 gap-3">
                <StockItem name="Studio Pro Headphones" sku="SP-202X" :stock="2" :reorder="5"
                    image="https://picsum.photos/seed/headphones/200/200"
                    class="hover:scale-[1.02] transition-transform" />
                <StockItem name="Neural Pulse Watch" sku="NP-WATCH-7" :stock="1" :reorder="10"
                    image="https://picsum.photos/seed/watch/200/200" class="hover:scale-[1.02] transition-transform" />
            </div>
        </section>

        <!-- Floating Action Area (Mobile Optimized) -->
        <section class="pb-8">
            <SurfaceCard variant="glass"
                class="p-6 border-2 border-primary/20 bg-primary/5 rounded-[2.5rem] flex items-center gap-6">
                <div
                    class="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20 shrink-0">
                    <Plus class="w-8 h-8 text-white" />
                </div>
                <div class="grow">
                    <h4 class="font-black text-on-surface text-lg leading-tight mb-1">Expansion Protocol</h4>
                    <p class="text-[11px] font-bold text-on-surface-variant/70">Add a new intelligence node to your
                        inventory system.</p>
                </div>
            </SurfaceCard>
        </section>
    </div>
</template>
