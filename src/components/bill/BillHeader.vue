<script setup lang="ts">
import { History, Receipt, Scan } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const router = useRouter();
defineProps<{ invoiceNumber: string }>();
</script>

<template>
    <section
        class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 p-4 flex items-center justify-between gap-4">
        <div class="flex items-center gap-4 min-w-0">
            <div class="w-11 h-11 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0">
                <Receipt class="w-5 h-5" />
            </div>
            <div class="min-w-0">
                <h2 class="text-xl font-black tracking-tight text-on-surface leading-none">New Bill</h2>
                <div class="flex items-center gap-2 mt-1.5">
                    <div class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                    <p class="text-[9px] text-on-surface-variant/50 font-black uppercase tracking-widest">
                        {{ invoiceNumber }}
                    </p>
                </div>
            </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
            <button @click="router.push({ name: 'bill-history' })"
                class="w-10 h-10 rounded-2xl bg-surface-container-high text-primary flex items-center justify-center active:scale-95 transition-all">
                <History class="w-4 h-4" />
            </button>
            <button @click="router.push({ name: 'scanner' })"
                class="bg-primary px-4 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all">
                <Scan class="w-4 h-4 text-white" />
                <span class="text-[10px] font-black text-white uppercase tracking-widest">Scan</span>
            </button>
        </div>
    </section>
</template>
