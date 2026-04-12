<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';

const router = useRouter();
import {
    Plus,
    Ticket,
    CreditCard,
    Scan
} from 'lucide-vue-next';
import { StockItem, SurfaceCard, Button } from '../components';


const items = ref([
    {
        id: 1,
        name: "Studio Pro Wireless",
        sku: "HD-900",
        price: 12499.00,
        qty: 1,
        image: "https://picsum.photos/seed/audio/200/200"
    },
    {
        id: 2,
        name: "Lunar Edition X",
        sku: "WT-42",
        price: 8950.00,
        qty: 2,
        image: "https://picsum.photos/seed/watch2/200/200"
    },
    {
        id: 3,
        name: 'UltraTab 12.9"',
        sku: "TB-12P",
        price: 44200.00,
        qty: 1,
        image: "https://picsum.photos/seed/tablet/200/200"
    }
]);

const updateQty = (id: number, newQty: number) => {
    const item = items.value.find(i => i.id === id);
    if (item) {
        item.qty = newQty;
    }
};

const removeItem = (id: number) => {
    items.value = items.value.filter(i => i.id !== id);
};

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(val);
};

const subtotal = computed(() => items.value.reduce((acc, item) => acc + item.price * item.qty, 0));
const gst = computed(() => subtotal.value * 0.18);
const total = computed(() => subtotal.value + gst.value);

const getOfferClass = (active: boolean) => {
    return active
        ? "bg-surface-container-highest border-primary/20"
        : "bg-surface-container border-surface-container-highest opacity-60";
};

const getOfferIconClass = (active: boolean) => {
    return active ? "bg-primary text-white" : "bg-surface-container-highest text-secondary";
};

const getOfferBtnClass = (active: boolean) => {
    return active
        ? "bg-primary text-white shadow-lg shadow-primary/10"
        : "border border-secondary text-secondary";
};
</script>

<template>
    <div class="px-6 pt-6 space-y-8 pb-96">
        <section class="flex items-end justify-between">
            <div>
                <h2 class="text-3xl font-extrabold tracking-tight text-on-surface leading-tight">Bill</h2>
                <p class="text-on-surface-variant font-medium">Session ID: <span class="font-mono">TXN-88294</span></p>
            </div>
            <div class="bg-surface-container-high px-4 py-2 rounded-full flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span class="text-[10px] font-bold text-primary uppercase tracking-widest">Scanning...</span>
            </div>
        </section>

        <div class="grid grid-cols-1 gap-4">
            <StockItem v-for="item in items" :key="item.id" variant="bill" :name="item.name" :sku="item.sku"
                :price="formatCurrency(item.price)" :qty="item.qty" :total="formatCurrency(item.price * item.qty)"
                :image="item.image"
                @click="item.id === 1 ? router.push({ name: 'product-detail', params: { id: item.sku } }) : null"
                @qtyChange="(newQty) => updateQty(item.id, newQty)" @remove="() => removeItem(item.id)" />

            <!-- Scan More Placeholder -->
            <div @click="router.push({ name: 'scanner' })"
                class="bg-surface-container rounded-4xl border-2 border-dashed border-surface-container-highest flex flex-col items-center justify-center p-8 text-center min-h-[180px] transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:bg-surface-container-high hover:border-primary active:scale-[0.98]">
                <div class="flex gap-3 mb-3">
                    <div
                        class="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                        <Plus class="w-6 h-6" />
                    </div>
                    <div
                        class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">
                        <Scan class="w-6 h-6" />
                    </div>
                </div>
                <span class="font-bold text-on-surface text-lg">Scan More Items</span>
                <p class="text-[10px] text-on-surface-variant mt-1 uppercase tracking-widest font-bold">Scanner or
                    Manual Entry</p>
            </div>
        </div>

        <!-- Offers Section -->
        <section class="space-y-4">
            <h3 class="text-xl font-bold text-on-surface">Apply Offers</h3>
            <div class="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                <!-- OfferCard 1 -->
                <div
                    :class="['shrink-0 rounded-3xl p-5 w-64 flex flex-col justify-between border transition-all', getOfferClass(true)]">
                    <div>
                        <div class="flex items-center gap-2 mb-2">
                            <div :class="['p-1.5 rounded-lg', getOfferIconClass(true)]">
                                <Ticket class="w-5 h-5" />
                            </div>
                            <span class="font-bold text-sm tracking-tight">FESTIVE20</span>
                        </div>
                        <p class="text-xs text-on-surface-variant font-medium leading-relaxed">20% Off on Lunar Series
                            Accessories</p>
                    </div>
                    <button
                        :class="['mt-4 w-full py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all', getOfferBtnClass(true)]">
                        Applied
                    </button>
                </div>

                <!-- OfferCard 2 -->
                <div
                    :class="['shrink-0 rounded-3xl p-5 w-64 flex flex-col justify-between border transition-all', getOfferClass(false)]">
                    <div>
                        <div class="flex items-center gap-2 mb-2">
                            <div :class="['p-1.5 rounded-lg', getOfferIconClass(false)]">
                                <CreditCard class="w-5 h-5" />
                            </div>
                            <span class="font-bold text-sm tracking-tight">HDFC_INT</span>
                        </div>
                        <p class="text-xs text-on-surface-variant font-medium leading-relaxed">Flat ₹1,500 off on Credit
                            Cards</p>
                    </div>
                    <button
                        :class="['mt-4 w-full py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all', getOfferBtnClass(false)]">
                        Select
                    </button>
                </div>
            </div>
        </section>

        <!-- Summary Footer (Fixed-ish) -->
        <div class="fixed bottom-32 left-0 right-0 w-full px-6 z-40 max-w-md mx-auto">
            <SurfaceCard variant="glass" class="p-6 shadow-2xl border border-surface-container-high">
                <div class="grid grid-cols-2 gap-8 mb-6">
                    <div class="space-y-1">
                        <div class="flex justify-between items-center">
                            <span
                                class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Subtotal</span>
                            <span class="font-bold text-on-surface">{{ formatCurrency(subtotal) }}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">GST
                                (18%)</span>
                            <span class="font-bold text-on-surface">{{ formatCurrency(gst) }}</span>
                        </div>
                    </div>
                    <div class="flex flex-col items-end justify-center border-l border-surface-container-high pl-8">
                        <span class="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Total
                            Payable</span>
                        <span class="text-3xl font-extrabold text-on-surface tracking-tighter">{{ formatCurrency(total)
                        }}</span>
                    </div>
                </div>
                <Button class="w-full" size="xl">
                    <template #icon>
                        <CreditCard class="w-6 h-6" />
                    </template>
                    Finalize Bill
                </Button>
            </SurfaceCard>
        </div>
    </div>
</template>
