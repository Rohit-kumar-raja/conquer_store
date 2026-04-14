<script setup lang="ts">
import { Scan } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const router = useRouter();
defineProps<{ invoiceNumber: string }>();
</script>

<template>
    <section class="flex items-center justify-between">
        <div>
            <h2 class="text-3xl font-extrabold tracking-tight text-on-surface leading-tight italic">Bill</h2>
            <div class="flex items-center gap-2 mt-1">
                <div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <p class="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">{{ invoiceNumber }}
                </p>
            </div>
        </div>
        <button @click="router.push({ name: 'scanner' })"
            class="bg-primary px-5 py-3 rounded-2xl flex items-center gap-3 shadow-2xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all group">
            <Scan class="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
            <span class="text-[11px] font-black text-white uppercase tracking-widest">Scan Product</span>
        </button>
    </section>
</template>
