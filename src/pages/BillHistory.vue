<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ChevronRight, History, PackageOpen, Receipt, Search, User } from 'lucide-vue-next';
import { SurfaceCard } from '../components';
import { billService, type BillRecord } from '../services/billService';

const router = useRouter();
const bills = ref<BillRecord[]>([]);
const searchQuery = ref('');

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(val);
};

const formatDate = (value: string) => {
    return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(value));
};

const filteredBills = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) return bills.value;

    return bills.value.filter((bill) =>
        bill.invoiceNumber.toLowerCase().includes(query) ||
        bill.customer.name.toLowerCase().includes(query) ||
        bill.customer.phone.toLowerCase().includes(query)
    );
});

const totalRevenue = computed(() => bills.value.reduce((total, bill) => total + bill.total, 0));
const totalItems = computed(() => bills.value.reduce((total, bill) => {
    return total + bill.items.reduce((itemTotal, item) => itemTotal + item.qty, 0);
}, 0));

onMounted(async () => {
    bills.value = await billService.getBillHistory();
});
</script>

<template>
    <div class="px-5 pt-2 space-y-6 pb-40 max-w-md mx-auto">
        <section>
            <SurfaceCard
                class="p-5 rounded-4xl bg-primary-gradient text-white shadow-xl shadow-primary/20 relative overflow-hidden">
                <div class="absolute -right-8 -top-10 w-32 h-32 rounded-full bg-white/10"></div>
                <div class="relative z-10 flex items-start justify-between gap-4">
                    <div>
                        <div class="flex items-center gap-2 text-white/70">
                            <History class="w-4 h-4" />
                            <span class="text-[9px] font-black uppercase tracking-[0.2em]">Sales Ledger</span>
                        </div>
                        <h2 class="text-3xl font-black tracking-tighter leading-tight mt-2">Bill History</h2>
                        <p class="text-[10px] font-bold text-white/55 uppercase tracking-widest mt-1">
                            All finalized customer bills
                        </p>
                    </div>
                    <div class="text-right shrink-0">
                        <p class="text-[9px] font-black text-white/55 uppercase tracking-wider">Bills</p>
                        <p class="text-3xl font-black leading-none mt-1">{{ bills.length }}</p>
                    </div>
                </div>
            </SurfaceCard>
        </section>

        <section class="grid grid-cols-2 gap-3">
            <SurfaceCard variant="low" class="p-4 rounded-3xl border border-surface-container-high/30">
                <Receipt class="w-5 h-5 text-primary mb-3" />
                <h3 class="text-lg font-black text-on-surface leading-tight truncate">{{ formatCurrency(totalRevenue) }}</h3>
                <p class="text-[8px] font-black text-on-surface-variant/45 uppercase tracking-wider mt-1">Revenue</p>
            </SurfaceCard>
            <SurfaceCard variant="low" class="p-4 rounded-3xl border border-surface-container-high/30">
                <PackageOpen class="w-5 h-5 text-secondary mb-3" />
                <h3 class="text-lg font-black text-on-surface leading-tight">{{ totalItems }}</h3>
                <p class="text-[8px] font-black text-on-surface-variant/45 uppercase tracking-wider mt-1">Items Sold</p>
            </SurfaceCard>
        </section>

        <section class="relative">
            <Search class="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/30" />
            <input v-model="searchQuery" type="text" placeholder="Search invoice, customer, phone..."
                class="w-full bg-surface-container-low border border-surface-container-high/30 rounded-3xl py-4 pl-11 pr-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-2 focus:ring-primary/20 font-bold text-sm" />
        </section>

        <section v-if="filteredBills.length" class="space-y-3">
            <div v-for="bill in filteredBills" :key="bill.id"
                class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 p-4 active:scale-[0.98] transition-all">
                <div class="flex items-start justify-between gap-4">
                    <div class="min-w-0">
                        <div class="flex items-center gap-2">
                            <Receipt class="w-4 h-4 text-primary shrink-0" />
                            <h3 class="text-sm font-black text-on-surface truncate">{{ bill.invoiceNumber }}</h3>
                        </div>
                        <div class="flex items-center gap-2 mt-2">
                            <User class="w-3.5 h-3.5 text-on-surface-variant/40 shrink-0" />
                            <p class="text-[10px] font-bold text-on-surface-variant/50 truncate">
                                {{ bill.customer.name }} • {{ bill.customer.phone }}
                            </p>
                        </div>
                    </div>
                    <div class="text-right shrink-0">
                        <p class="text-base font-black text-on-surface">{{ formatCurrency(bill.total) }}</p>
                        <p class="text-[9px] font-black text-primary uppercase tracking-wider">
                            {{ bill.status }} • {{ bill.paymentMethod === 'qr' ? 'QR' : 'Cash' }}
                        </p>
                    </div>
                </div>

                <div class="mt-4 pt-3 border-t border-surface-container-high/30 flex items-center justify-between">
                    <p class="text-[9px] font-black text-on-surface-variant/45 uppercase tracking-wider">
                        {{ bill.items.length }} lines • {{ formatDate(bill.createdAt) }}
                    </p>
                    <ChevronRight class="w-4 h-4 text-on-surface-variant/25" />
                </div>
            </div>
        </section>

        <section v-else
            class="bg-surface-container-low rounded-4xl border border-dashed border-surface-container-highest p-8 text-center space-y-3">
            <PackageOpen class="w-12 h-12 text-on-surface-variant/20 mx-auto" />
            <h3 class="text-base font-black text-on-surface">No bills found</h3>
            <p class="text-[10px] font-bold text-on-surface-variant/45 uppercase tracking-wider">
                Finalized bills will appear here
            </p>
            <button @click="router.push({ name: 'scanner' })" class="text-xs font-black text-primary uppercase tracking-widest">
                Scan products
            </button>
        </section>
    </div>
</template>
