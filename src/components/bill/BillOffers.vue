<script setup lang="ts">
import { Ticket, CreditCard } from 'lucide-vue-next';

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
    <section class="space-y-4">
        <h3 class="text-xl font-bold text-on-surface italic uppercase tracking-tight">Apply Offers</h3>
        <div class="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
            <!-- OfferCard 1 -->
            <div
                :class="['shrink-0 rounded-4xl p-5 w-64 flex flex-col justify-between border transition-all', getOfferClass(true)]">
                <div>
                    <div class="flex items-center gap-2 mb-2">
                        <div :class="['p-1.5 rounded-lg', getOfferIconClass(true)]">
                            <Ticket class="w-5 h-5" />
                        </div>
                        <span class="font-bold text-sm tracking-tight italic">FESTIVE20</span>
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
                :class="['shrink-0 rounded-4xl p-5 w-64 flex flex-col justify-between border transition-all', getOfferClass(false)]">
                <div>
                    <div class="flex items-center gap-2 mb-2">
                        <div :class="['p-1.5 rounded-lg', getOfferIconClass(false)]">
                            <CreditCard class="w-5 h-5" />
                        </div>
                        <span class="font-bold text-sm tracking-tight italic">HDFC_INT</span>
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
