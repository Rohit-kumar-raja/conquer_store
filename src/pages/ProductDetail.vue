<script setup lang="ts">
import {
    Zap,
    Factory,
    Calendar,
    Barcode,
    Edit3,
    QrCode,
    TrendingUp,
    IndianRupee
} from 'lucide-vue-next';
import { SurfaceCard, IntelligenceBadge, Button } from '../components';
import { cn } from '../lib/utils';

const emit = defineEmits(['navigate']);

const getRowIconClass = (variant: string) => {
    return cn(
        "w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-surface-container-high shadow-sm",
        variant === 'tertiary' ? "text-tertiary" : "text-primary"
    );
};
</script>

<template>
    <div class="space-y-8">
        <!-- Hero Carousel Area -->
        <div class="relative w-full h-[400px] bg-white overflow-hidden">
            <div class="flex h-full">
                <div class="w-full h-full flex items-center justify-center p-12">
                    <img src="https://picsum.photos/seed/watch-hero/800/800" alt="Product"
                        class="max-h-full object-contain" />
                </div>
            </div>

            <!-- Indicators -->
            <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                <div class="w-8 h-1.5 rounded-full bg-primary shadow-sm" />
                <div class="w-1.5 h-1.5 rounded-full bg-surface-container-highest" />
                <div class="w-1.5 h-1.5 rounded-full bg-surface-container-highest" />
            </div>

            <!-- AI Tag Overlay -->
            <div class="absolute top-6 left-6">
                <IntelligenceBadge label="High Velocity Item" variant="primary"
                    class="bg-surface-container-lowest/80 backdrop-blur-md shadow-lg border border-white/20">
                    <template #icon>
                        <Zap class="w-4 h-4" />
                    </template>
                </IntelligenceBadge>
            </div>
        </div>

        <!-- Product Core Info -->
        <div class="px-6 -mt-12 relative z-10">
            <SurfaceCard variant="lowest" class="p-8 shadow-2xl border border-surface-container-high">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2">
                            Wearables /
                            Electronics</p>
                        <h2 class="text-3xl font-extrabold tracking-tight text-on-surface leading-tight">Precision Pro
                            SmartWatch X1</h2>
                    </div>
                    <IntelligenceBadge label="Healthy" variant="primary" pulse />
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-surface-container-low p-5 rounded-3xl">
                        <p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Stock
                            Level</p>
                        <div class="flex items-end gap-2">
                            <span class="text-4xl font-extrabold text-primary">142</span>
                            <span class="text-xs font-bold text-on-surface-variant pb-1.5">Units</span>
                        </div>
                    </div>
                    <div class="bg-surface-container-low p-5 rounded-3xl">
                        <p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Selling
                            Price
                        </p>
                        <div class="flex flex-col">
                            <span class="text-4xl font-extrabold text-on-surface flex items-center tracking-tight">
                                <IndianRupee class="w-8 h-8 -ml-1 mr-0.5" stroke-width="3" />249.00
                            </span>
                            <span class="text-xs font-bold text-error line-through opacity-40">MRP ₹319.00</span>
                        </div>
                    </div>
                </div>
            </SurfaceCard>
        </div>

        <!-- Details Bento -->
        <div class="px-6 grid grid-cols-1 gap-4">
            <SurfaceCard variant="low" class="p-6 space-y-6">
                <p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Identification</p>
                <div class="space-y-4">
                    <div class="flex justify-between items-center py-2 border-b border-surface-container-high">
                        <span class="text-sm font-medium text-on-surface-variant">SKU Number</span>
                        <span class="font-bold text-on-surface">PRC-SW-X1-2024</span>
                    </div>
                    <div class="space-y-3">
                        <p class="text-sm font-medium text-on-surface-variant">Barcode (GS1-128)</p>
                        <div
                            class="bg-white p-4 rounded-2xl flex flex-col items-center border border-surface-container-high">
                            <Barcode class="w-full h-12 text-on-surface opacity-80" />
                            <span
                                class="text-[10px] font-bold tracking-[0.4em] text-on-surface mt-2">7501031311309</span>
                        </div>
                    </div>
                </div>
            </SurfaceCard>

            <SurfaceCard variant="low" class="p-6 space-y-6">
                <p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Supply Chain</p>
                <div class="space-y-4">
                    <div class="flex items-center gap-4">
                        <div :class="getRowIconClass('default')">
                            <Factory class="w-5 h-5" />
                        </div>
                        <div>
                            <p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Primary
                                Supplier
                            </p>
                            <p class="font-bold text-on-surface">Lumina Tech Logistics</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-4">
                        <div :class="getRowIconClass('tertiary')">
                            <Calendar class="w-5 h-5" />
                        </div>
                        <div>
                            <p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Next
                                Expiry Batch
                            </p>
                            <p class="font-bold text-on-surface">Oct 24, 2026</p>
                        </div>
                    </div>
                </div>
            </SurfaceCard>
        </div>

        <!-- AI Insight -->
        <div class="px-6">
            <SurfaceCard class="primary-gradient p-8 text-white shadow-2xl relative overflow-hidden">
                <div class="absolute top-0 right-0 p-4 opacity-10">
                    <Zap class="w-32 h-32" />
                </div>
                <div class="flex items-center gap-3 mb-4">
                    <Zap class="w-6 h-6 text-tertiary-container" fill="currentColor" />
                    <h3 class="text-xl font-extrabold">AI Predictive Insight</h3>
                </div>
                <p class="text-sm leading-relaxed mb-8 opacity-90">
                    Based on local trend data, demand is expected to surge by <span class="font-bold">22%</span> next
                    month.
                    Consider increasing stock by <span class="font-bold">45 units</span> to prevent stockouts.
                </p>
                <Button variant="secondary" class="w-full bg-white text-primary hover:bg-white/90" size="lg">
                    <template #icon>
                        <TrendingUp class="w-5 h-5" />
                    </template>
                    Optimized Restock
                </Button>
            </SurfaceCard>
        </div>

        <!-- Action Bar -->
        <div
            class="fixed bottom-0 left-0 right-0 w-full bg-surface/80 backdrop-blur-2xl border-t border-surface-container-high px-6 pb-10 pt-4 z-50 flex gap-4 max-w-md mx-auto">
            <Button variant="secondary" class="flex-1">
                <template #icon>
                    <Edit3 class="w-5 h-5" />
                </template>
                Edit Item
            </Button>
            <Button class="flex-1">
                <template #icon>
                    <QrCode class="w-5 h-5" />
                </template>
                Scan In/Out
            </Button>
        </div>
    </div>
</template>
