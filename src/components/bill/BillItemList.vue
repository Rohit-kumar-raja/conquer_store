<script setup lang="ts">
import { ChevronRight, Minus, PackageOpen, Plus, Scan, X } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const router = useRouter();

interface Item {
    id: number;
    name: string;
    sku: string;
    price: number;
    qty: number;
    image: string;
}

defineProps<{
    items: Item[];
    formatCurrency: (val: number) => string;
}>();

const emit = defineEmits(['updateQty', 'removeItem']);
</script>

<template>
    <section class="space-y-3">
        <div class="flex items-center justify-between px-1">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">
                Bill Items
            </h3>
            <span class="text-[9px] font-black text-primary uppercase tracking-widest">{{ items.length }} Items</span>
        </div>

        <div v-if="items.length" class="space-y-3">
            <div v-for="(item, index) in items" :key="item.id" :class="[
                'bg-surface-container-low rounded-3xl border p-2.5 flex items-center gap-2.5 transition-all active:bg-surface-container-high/30 shadow-sm',
                index % 2 === 0 ? 'border-primary/10' : 'border-surface-container-high/70'
            ]">
                <button @click="item.id === 1 ? router.push({ name: 'product-detail', params: { id: item.sku } }) : null"
                    class="w-12 h-12 rounded-2xl bg-white overflow-hidden border border-surface-container-high shrink-0">
                    <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                </button>

                <div class="grow min-w-0">
                    <div class="flex items-start justify-between gap-2">
                        <div class="min-w-0">
                            <h4 class="font-black text-on-surface text-[13px] leading-tight truncate">{{ item.name }}</h4>
                            <p class="text-[8px] font-black text-primary/45 uppercase tracking-wider mt-0.5 leading-none">
                                SKU: {{ item.sku }}
                            </p>
                        </div>
                        <div class="flex items-center gap-1 shrink-0">
                            <div class="flex items-center gap-0.5 bg-surface-container-high rounded-xl p-0.5">
                                <button @click="emit('updateQty', item.id, Math.max(0, item.qty - 1))"
                                    class="w-6 h-6 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary active:scale-90">
                                    <Minus class="w-3 h-3" />
                                </button>
                                <span class="w-5 text-center text-[10px] font-black text-on-surface">{{ item.qty }}</span>
                                <button @click="emit('updateQty', item.id, item.qty + 1)"
                                    class="w-6 h-6 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary active:scale-90">
                                    <Plus class="w-3 h-3" />
                                </button>
                            </div>
                            <button @click="emit('removeItem', item.id)"
                                class="w-7 h-7 rounded-xl bg-error/5 text-error/45 flex items-center justify-center active:scale-90">
                                <X class="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2 mt-2">
                        <div class="min-w-0 bg-surface-container-high/40 rounded-2xl px-3 py-2">
                            <p class="text-[7px] font-black text-on-surface-variant/40 uppercase tracking-wider leading-none">Unit</p>
                            <p class="text-xs font-black text-primary leading-tight truncate mt-1">{{ formatCurrency(item.price) }}</p>
                        </div>

                        <div class="min-w-0 bg-surface-container-high/40 rounded-2xl px-3 py-2 text-right">
                            <p class="text-[7px] font-black text-on-surface-variant/40 uppercase tracking-wider leading-none">Total</p>
                            <p class="text-xs font-black text-on-surface leading-tight truncate mt-1">
                                {{ formatCurrency(item.price * item.qty) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else
            class="bg-surface-container-low rounded-4xl border border-dashed border-surface-container-highest p-8 flex flex-col items-center text-center gap-3">
            <div class="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center">
                <PackageOpen class="w-8 h-8" />
            </div>
            <div>
                <h4 class="text-base font-black text-on-surface">No scanned items</h4>
                <p class="text-[10px] font-bold text-on-surface-variant/45 uppercase tracking-wider mt-1">
                    Scan products to add them to this bill
                </p>
            </div>
        </div>

        <button @click="router.push({ name: 'scanner' })"
            class="w-full bg-surface-container-low border border-dashed border-surface-container-highest rounded-3xl p-4 flex items-center justify-between active:scale-[0.98] transition-all">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <Scan class="w-5 h-5" />
                </div>
                <div class="text-left">
                    <p class="text-sm font-black text-on-surface">Add More Items</p>
                    <p class="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-wider">
                        Scanner or manual
                    </p>
                </div>
            </div>
            <ChevronRight class="w-4 h-4 text-on-surface-variant/30" />
        </button>
    </section>
</template>
