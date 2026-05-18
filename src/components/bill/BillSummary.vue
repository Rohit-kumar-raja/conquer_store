<script setup lang="ts">
import { Banknote, CreditCard, QrCode } from 'lucide-vue-next';
import { Button } from '..';
import type { PaymentMethod } from '../../services/billService';

const props = defineProps<{
    subtotal: number;
    gst: number;
    total: number;
    formatCurrency: (val: number) => string;
}>();

const selectedPaymentMethod = defineModel<PaymentMethod | null>('paymentMethod', { required: true });
const emit = defineEmits(['finalize']);

const paymentOptions: Array<{ id: PaymentMethod; label: string; sub: string; icon: unknown }> = [
    { id: 'qr', label: 'QR Code', sub: 'UPI / wallet', icon: QrCode },
    { id: 'cash', label: 'Cash', sub: 'Counter payment', icon: Banknote }
];
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

        <div class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 p-4 space-y-3">
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="text-sm font-black text-on-surface">Payment Method</h3>
                    <p class="text-[10px] font-bold text-on-surface-variant/40 mt-0.5">Choose before finalizing bill</p>
                </div>
                <span class="text-[9px] font-black text-primary uppercase tracking-widest">
                    {{ selectedPaymentMethod ? 'Selected' : 'Required' }}
                </span>
            </div>

            <div class="grid grid-cols-2 gap-3">
                <button v-for="option in paymentOptions" :key="option.id"
                    @click="selectedPaymentMethod = option.id" :class="[
                        'p-4 rounded-3xl border text-left active:scale-[0.98] transition-all',
                        selectedPaymentMethod === option.id
                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                            : 'bg-surface-container-high/40 text-on-surface border-surface-container-high'
                    ]">
                    <component :is="option.icon" class="w-6 h-6 mb-3" />
                    <p class="text-sm font-black">{{ option.label }}</p>
                    <p :class="['text-[9px] font-bold uppercase tracking-wider mt-0.5', selectedPaymentMethod === option.id ? 'text-white/60' : 'text-on-surface-variant/40']">
                        {{ option.sub }}
                    </p>
                </button>
            </div>

            <div v-if="selectedPaymentMethod === 'qr'" class="space-y-3">
                <div class="rounded-3xl bg-white p-4 flex items-center justify-between border border-surface-container-high">
                    <div class="w-20 h-20 rounded-2xl border-4 border-on-surface/80 grid grid-cols-3 gap-1 p-2">
                        <div v-for="cell in 9" :key="cell" :class="cell % 2 ? 'bg-on-surface' : 'bg-on-surface/20'"></div>
                    </div>
                    <div class="text-right">
                        <p class="text-[9px] font-black text-primary uppercase tracking-widest">Scan & Pay</p>
                        <p class="text-xl font-black text-on-surface mt-1">{{ formatCurrency(total) }}</p>
                        <p class="text-[9px] font-bold text-on-surface-variant/50 mt-1">UPI QR placeholder</p>
                    </div>
                </div>
                <Button class="w-full h-13 rounded-3xl shadow-xl shadow-primary/20 font-black" size="lg"
                    :disabled="total <= 0" @click="emit('finalize')">
                    <template #icon>
                        <QrCode class="w-5 h-5" />
                    </template>
                    Received Payment & Create Bill
                </Button>
            </div>
        </div>

        <Button v-if="selectedPaymentMethod !== 'qr'" class="w-full h-14 rounded-3xl shadow-xl shadow-primary/20 font-black" size="lg"
            :disabled="total <= 0 || !selectedPaymentMethod" @click="emit('finalize')">
            <template #icon>
                <CreditCard v-if="!selectedPaymentMethod" class="w-5 h-5" />
                <Banknote v-else class="w-5 h-5" />
            </template>
            {{ selectedPaymentMethod === 'cash' ? 'Receive Cash & Create Bill' : 'Select Payment Method' }}
        </Button>
    </section>
</template>
