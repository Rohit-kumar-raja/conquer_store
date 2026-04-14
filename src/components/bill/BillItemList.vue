<script setup lang="ts">
import { Plus, Scan } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import StockItem from '../StockItem.vue';

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
    <div class="grid grid-cols-1 gap-4">
        <StockItem v-for="item in items" :key="item.id" variant="bill" :name="item.name" :sku="item.sku"
            :price="formatCurrency(item.price)" :qty="item.qty" :total="formatCurrency(item.price * item.qty)"
            :image="item.image"
            @click="item.id === 1 ? router.push({ name: 'product-detail', params: { id: item.sku } }) : null"
            @qtyChange="(newQty) => emit('updateQty', item.id, newQty)" @remove="() => emit('removeItem', item.id)" />

        <!-- Scan More Placeholder -->
        <div @click="router.push({ name: 'scanner' })"
            class="bg-surface-container/50 rounded-4xl border-2 border-dashed border-surface-container-highest flex items-center justify-between p-4 px-6 min-h-[90px] transition-all duration-300 cursor-pointer group hover:bg-surface-container-high hover:border-primary active:scale-[0.98]">
            <div class="flex items-center gap-5">
                <div class="flex -space-x-3">
                    <div
                        class="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm group-hover:rotate-12 transition-transform duration-300 border-2 border-surface-container/20">
                        <Plus class="w-6 h-6" />
                    </div>
                    <div
                        class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-sm group-hover:-rotate-12 transition-transform duration-300 backdrop-blur-sm border-2 border-white/5">
                        <Scan class="w-6 h-6" />
                    </div>
                </div>
                <div class="text-left">
                    <span class="font-black text-on-surface text-lg leading-none">Add More Items</span>
                    <p class="text-[10px] text-on-surface-variant mt-1 uppercase tracking-[0.15em] font-black">Quick
                        Scanner or Manual</p>
                </div>
            </div>
            <div
                class="w-10 h-10 rounded-2xl bg-surface-container-highest/20 flex items-center justify-center text-on-surface-variant/40 group-hover:bg-primary group-hover:text-white group-hover:translate-x-1 transition-all">
                <ChevronRight class="w-5 h-5" />
            </div>
        </div>
    </div>
</template>
