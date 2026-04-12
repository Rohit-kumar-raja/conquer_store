<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
    Maximize2,
    ShoppingCart,
    TrendingUp,
    History,
    Tag,
    ArrowLeft
} from 'lucide-vue-next';
import { cn } from '../lib/utils';
import { ScannerView, SurfaceCard, Button } from '../components';

const router = useRouter();
const emit = defineEmits(['navigate']);

const getOuterClass = (variant: string) => {
    return cn(
        "p-4 rounded-3xl border transition-all",
        variant === 'tertiary'
            ? "bg-tertiary-container/5 border-tertiary/10"
            : "bg-surface-container-low border-transparent"
    );
};

const getIconClass = (variant: string) => {
    return cn(
        "p-1.5 rounded-lg",
        variant === 'tertiary' ? "bg-tertiary/10 text-tertiary" : "bg-surface-container-highest text-primary"
    );
};
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <!-- Header with Back Button -->
        <div class="px-6 pt-4 flex items-center gap-4">
            <button @click="router.push({ name: 'bill' })"
                class="p-2 -ml-2 hover:bg-surface-container-high rounded-full transition-colors text-primary">
                <ArrowLeft class="w-6 h-6" />
            </button>
            <h2 class="text-xl font-extrabold text-on-surface">Scanner</h2>
        </div>

        <!-- Viewfinder Area -->
        <div class="mx-6 mt-4">
            <ScannerView image="https://picsum.photos/seed/milk/800/1200" :confidence="94" />
        </div>

        <!-- Result Card -->
        <div class="mx-6 -mt-16 relative z-10">
            <SurfaceCard variant="glass" class="p-6 shadow-2xl">
                <div class="flex flex-col gap-6">
                    <div class="flex items-center gap-5">
                        <div
                            class="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary">
                            <Maximize2 class="w-8 h-8" />
                        </div>
                        <div>
                            <p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">
                                Detected Item</p>
                            <h2 class="text-2xl font-extrabold text-on-surface tracking-tight">Organic Almond Milk (1L)
                            </h2>
                            <div class="flex items-center gap-3 mt-1">
                                <span
                                    class="px-2 py-0.5 rounded bg-primary-container/10 text-primary font-bold text-[10px] uppercase tracking-wider">Stock:
                                    24 units</span>
                                <span
                                    class="px-2 py-0.5 rounded bg-tertiary/10 text-tertiary font-bold text-[10px] uppercase tracking-wider">Aisle
                                    4</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between border-t border-surface-container-high pt-6">
                        <div>
                            <p class="text-[11px] font-medium text-on-surface-variant uppercase tracking-widest">Unit
                                Price</p>
                            <p class="text-3xl font-extrabold text-on-surface">$4.50</p>
                        </div>
                        <Button size="lg">
                            <template #icon>
                                <ShoppingCart class="w-5 h-5" />
                            </template>
                            Add to Bill
                        </Button>
                    </div>
                </div>

                <!-- Bento Intelligence Grid -->
                <div class="grid grid-cols-1 gap-3 mt-6">
                    <div :class="getOuterClass('default')">
                        <div class="flex items-center gap-2 mb-2">
                            <div :class="getIconClass('default')">
                                <TrendingUp class="w-4 h-4" />
                            </div>
                            <h3 class="font-bold text-xs text-on-surface">Demand Prediction</h3>
                        </div>
                        <div class="text-xs leading-relaxed text-on-surface-variant">
                            High demand expected. AI suggests ordering <span class="font-bold text-primary">12
                                units</span>.
                        </div>
                    </div>

                    <div :class="getOuterClass('default')">
                        <div class="flex items-center gap-2 mb-2">
                            <div :class="getIconClass('default')">
                                <History class="w-4 h-4" />
                            </div>
                            <h3 class="font-bold text-xs text-on-surface">Batch Integrity</h3>
                        </div>
                        <div class="text-xs leading-relaxed text-on-surface-variant">
                            <div class="flex justify-between items-center w-full">
                                <span class="text-xs">Exp: 12/24</span>
                                <span class="text-[10px] px-2 py-0.5 bg-primary text-white rounded-full">Good
                                    State</span>
                            </div>
                        </div>
                    </div>

                    <div :class="getOuterClass('tertiary')">
                        <div class="flex items-center gap-2 mb-2">
                            <div :class="getIconClass('tertiary')">
                                <Tag class="w-4 h-4" />
                            </div>
                            <h3 class="font-bold text-xs text-tertiary">Price Intelligence</h3>
                        </div>
                        <div class="text-xs leading-relaxed text-tertiary/80">
                            Competitor avg: $4.65. You are <span class="font-bold text-tertiary">3.2% cheaper</span>.
                        </div>
                    </div>
                </div>
            </SurfaceCard>
        </div>
    </div>
</template>
