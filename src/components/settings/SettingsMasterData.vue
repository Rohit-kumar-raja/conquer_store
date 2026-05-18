<script setup lang="ts">
import { Tags, Award, Truck, Users, ChevronRight } from 'lucide-vue-next';
import { type Component } from 'vue';

interface MasterDataItem {
    icon: Component;
    label: string;
    sub: string;
    count: number;
    color: string;
    badge: string;
}

const masterDataItems: MasterDataItem[] = [
    { icon: Tags, label: 'Category Management', sub: '12 categories', count: 12, color: 'bg-primary/10 text-primary', badge: 'bg-primary/10 text-primary' },
    { icon: Award, label: 'Brand Management', sub: '8 brands registered', count: 8, color: 'bg-tertiary/10 text-tertiary', badge: 'bg-tertiary/10 text-tertiary' },
    { icon: Truck, label: 'Supplier / Vendor', sub: '5 active suppliers', count: 5, color: 'bg-secondary/10 text-secondary', badge: 'bg-secondary/10 text-secondary' },
    { icon: Users, label: 'Customers', sub: '1.2K registered', count: 1200, color: 'bg-primary/10 text-primary', badge: 'bg-primary/10 text-primary' },
];

const formatCount = (count: number) => count >= 1000 ? (count / 1000).toFixed(1) + 'K' : String(count);
</script>

<template>
    <section class="space-y-3">
        <div class="flex items-center justify-between">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 px-1">
                Store Master Data
            </h3>
            <span class="text-[9px] font-black text-primary uppercase tracking-widest">Directory</span>
        </div>

        <div class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 overflow-hidden">
            <div v-for="(item, index) in masterDataItems" :key="item.label" :class="[
                'p-4 px-5 flex items-center justify-between cursor-pointer group transition-all hover:bg-surface-container-high/30 active:scale-[0.98]',
                index !== masterDataItems.length - 1 && 'border-b border-surface-container-high/20'
            ]">
                <div class="flex items-center gap-4">
                    <div
                        :class="['w-11 h-11 rounded-2xl flex items-center justify-center transition-all group-hover:scale-105', item.color]">
                        <component :is="item.icon" class="w-5 h-5" />
                    </div>
                    <div>
                        <h4 class="font-black text-on-surface text-sm">{{ item.label }}</h4>
                        <p class="text-[10px] font-bold text-on-surface-variant/40 mt-0.5">{{ item.sub }}</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <span :class="['text-[9px] font-black px-2.5 py-1 rounded-xl', item.badge]">
                        {{ formatCount(item.count) }}
                    </span>
                    <ChevronRight
                        class="w-4 h-4 text-on-surface-variant/20 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
            </div>
        </div>
    </section>
</template>
