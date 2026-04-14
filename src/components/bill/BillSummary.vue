<script setup lang="ts">
import { CreditCard } from 'lucide-vue-next';
import { Button } from '..';

defineProps<{
    subtotal: number;
    gst: number;
    total: number;
    formatCurrency: (val: number) => string;
}>();
</script>

<template>
    <section
        class="pt-8 border-t border-surface-container-high space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div class="grid grid-cols-2 gap-8 items-center">
            <div class="space-y-2">
                <div
                    class="flex justify-between items-center bg-surface-container rounded-xl px-4 py-2 border border-surface-container-highest">
                    <span
                        class="text-[9px] font-black text-on-surface-variant uppercase tracking-widest">Subtotal</span>
                    <span class="font-black text-on-surface text-xs">{{ formatCurrency(subtotal) }}</span>
                </div>
                <div
                    class="flex justify-between items-center bg-surface-container rounded-xl px-4 py-2 border border-surface-container-highest">
                    <span class="text-[9px] font-black text-on-surface-variant uppercase tracking-widest">GST
                        (18%)</span>
                    <span class="font-black text-primary text-xs">{{ formatCurrency(gst) }}</span>
                </div>
            </div>
            <div class="flex flex-col items-end justify-center">
                <span class="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-1">Total
                    Payable</span>
                <span class="text-4xl font-black text-on-surface tracking-tighter leading-none">{{
                    formatCurrency(total) }}</span>
            </div>
        </div>

        <Button class="w-full h-18 rounded-4xl shadow-2xl shadow-primary/20" size="xl">
            <template #icon>
                <CreditCard class="w-6 h-6" />
            </template>
            Finalize Bill
        </Button>
    </section>
</template>
