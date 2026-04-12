<script setup lang="ts">
import {
    TrendingUp,
    AlertTriangle,
    ArrowRight,
    Zap
} from 'lucide-vue-next';
import { StatCard, StockItem, Button } from './ui';

const emit = defineEmits(['navigate']);
</script>

<template>
    <div class="px-6 pt-6 space-y-8">
        <section class="flex justify-between items-end">
            <div>
                <h2 class="text-3xl font-extrabold tracking-tight text-on-surface leading-tight">Live Intelligence</h2>
                <p class="text-on-surface-variant">Real-time store performance overview</p>
            </div>
        </section>

        <!-- Stats Bento Grid -->
        <section class="grid grid-cols-1 gap-4">
            <StatCard label="Today's Sales" value="$12,482.00" trendLabel="vs yesterday" variant="primary" />
            <StatCard label="Total Bills" value="142" trendLabel="per bill" />
            <StatCard label="Items Scanned" value="894" trendLabel="" />
        </section>

        <div class="space-y-8">
            <!-- Low Stock Section -->
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <h3 class="text-xl font-bold flex items-center gap-2">
                        <AlertTriangle class="w-5 h-5 text-tertiary" />
                        Low Stock Alert
                    </h3>
                    <span
                        class="text-[10px] font-bold px-3 py-1 bg-error-container/30 text-error rounded-full uppercase tracking-wider">
                        8 Critical Items
                    </span>
                </div>

                <div class="space-y-3">
                    <StockItem name="Premium Wireless Headphones" sku="WH-1000-XM5" :stock="2" :reorder="5"
                        image="https://picsum.photos/seed/headphones/200/200"
                        @click="emit('navigate', 'product-detail')" />
                    <StockItem name="Titanium Sport Watch" sku="SW-TI-44" :stock="1" :reorder="10"
                        image="https://picsum.photos/seed/watch/200/200" />
                    <StockItem name="Universal Fast Charger" sku="PW-65W-GAN" :stock="0" :reorder="15"
                        :isOutOfStock="true" image="https://picsum.photos/seed/charger/200/200" />
                </div>
            </div>

            <!-- AI Insight Panel -->
            <div>
                <div
                    class="bg-surface-container-high rounded-[2.5rem] p-8 relative overflow-hidden flex flex-col justify-between transition-transform hover:scale-[1.02]">
                    <div class="absolute top-0 right-0 p-4 opacity-5">
                        <Zap class="w-32 h-32" />
                    </div>

                    <div>
                        <span class="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary mb-4 block">
                            AI Predictive Insight
                        </span>
                        <h3 class="text-2xl font-extrabold tracking-tight text-on-surface mb-4 leading-tight">
                            Demand surge predicted for weekend electronics.
                        </h3>
                        <p class="text-on-surface-variant text-sm leading-relaxed mb-8">
                            Based on local event data and historical patterns, traffic will likely increase by 22% this
                            Saturday.
                        </p>
                    </div>

                    <Button class="w-full">
                        <template #icon>
                            <ArrowRight class="w-5 h-5" />
                        </template>
                        Optimize Stock
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>
