<script setup lang="ts">
import { CreditCard } from 'lucide-vue-next';
import { Button } from '..';

defineProps<{
    subtotal: number;
    gst: number;
    total: number;
    formatCurrency: (val: number) => string;
}>();

const emit = defineEmits(['finalize']);
</script>

<template>
    <section class="space-y-3">
        <div class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 p-4 space-y-3">
            <div class="space-y-2">
                <div class="flex justify-between items-center">
                    <span
                        class="text-[10px] font-black text-on-surface-variant/45 uppercase tracking-widest">Subtotal</span>
                    <span class="font-black text-on-surface text-sm">{{ formatCurrency(subtotal) }}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-[10px] font-black text-on-surface-variant/45 uppercase tracking-widest">GST
                        (18%)</span>
                    <span class="font-black text-primary text-sm">{{ formatCurrency(gst) }}</span>
                </div>
            </div>

            <div class="pt-3 border-t border-surface-container-high/40 flex items-end justify-between gap-4">
                <div>
                    <span class="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Total Payable</span>
                    <p class="text-[10px] font-bold text-on-surface-variant/40 mt-0.5">Inclusive of GST</p>
                </div>
                <span class="text-3xl font-black text-on-surface tracking-tighter leading-none text-right">
                    {{ formatCurrency(total) }}
                </span>
            </div>
        </div>

        <Button class="w-full h-14 rounded-3xl shadow-xl shadow-primary/20 font-black" size="lg"
            :disabled="total <= 0" @click="emit('finalize')">
            <template #icon>
                <CreditCard class="w-5 h-5" />
            </template>
            Finalize Bill
        </Button>
    </section>
</template>
