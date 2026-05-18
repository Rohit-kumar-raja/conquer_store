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
    <section class="space-y-3">
        <div class="flex items-center justify-between px-1">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Offers</h3>
            <span class="text-[9px] font-black text-primary uppercase tracking-widest">1 Applied</span>
        </div>
        <div class="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
            <!-- OfferCard 1 -->
            <div
                :class="['shrink-0 rounded-3xl p-4 w-52 flex flex-col justify-between border transition-all', getOfferClass(true)]">
                <div>
                    <div class="flex items-center gap-2 mb-2">
                        <div :class="['p-1.5 rounded-lg', getOfferIconClass(true)]">
                            <Ticket class="w-4 h-4" />
                        </div>
                        <span class="font-black text-xs tracking-tight">FESTIVE20</span>
                    </div>
                    <p class="text-[10px] text-on-surface-variant/60 font-bold leading-relaxed">20% Off on Lunar Series
                        Accessories</p>
                </div>
                <button
                    :class="['mt-3 w-full py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all', getOfferBtnClass(true)]">
                    Applied
                </button>
            </div>

            <!-- OfferCard 2 -->
            <div
                :class="['shrink-0 rounded-3xl p-4 w-52 flex flex-col justify-between border transition-all', getOfferClass(false)]">
                <div>
                    <div class="flex items-center gap-2 mb-2">
                        <div :class="['p-1.5 rounded-lg', getOfferIconClass(false)]">
                            <CreditCard class="w-4 h-4" />
                        </div>
                        <span class="font-black text-xs tracking-tight">HDFC_INT</span>
                    </div>
                    <p class="text-[10px] text-on-surface-variant/60 font-bold leading-relaxed">Flat ₹1,500 off on Credit
                        Cards</p>
                </div>
                <button
                    :class="['mt-3 w-full py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all', getOfferBtnClass(false)]">
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
