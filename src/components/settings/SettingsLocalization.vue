<script setup lang="ts">
import { IndianRupee, Languages } from 'lucide-vue-next';
import { SurfaceCard } from '../index';
import { ref } from 'vue';

const currency = ref('INR');
const language = ref('English');

const currencies = ['INR', 'USD', 'EUR'];
const languages = ['English', 'Hindi'];

</script>

<template>
    <section class="space-y-3">
        <div class="flex items-center justify-between px-1">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Localization</h3>
            <span class="text-[9px] font-black text-primary uppercase tracking-widest">Regional</span>
        </div>

        <SurfaceCard variant="low" class="p-0 rounded-4xl overflow-hidden border border-surface-container-high/30">
            <div class="divide-y divide-surface-container-high/30">
                <div class="p-5 space-y-4">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <IndianRupee class="w-5 h-5" />
                        </div>
                        <div>
                            <p class="font-black text-on-surface text-sm">Currency</p>
                            <p class="text-[10px] text-on-surface-variant/45 font-bold mt-0.5">
                                Used across bills, reports, and inventory values
                            </p>
                        </div>
                    </div>
                    <div class="grid grid-cols-3 gap-2">
                        <button v-for="item in currencies" :key="item" @click="currency = item" :class="[
                            'py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all active:scale-95',
                            currency === item ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-container-high text-on-surface-variant'
                        ]">
                            {{ item }}
                        </button>
                    </div>
                </div>

                <div class="p-5 space-y-4">
                    <div class="flex items-center gap-4">
                        <div class="w-11 h-11 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                            <Languages class="w-5 h-5" />
                        </div>
                        <div>
                            <p class="font-black text-on-surface text-sm">Language</p>
                            <p class="text-[10px] text-on-surface-variant/45 font-bold mt-0.5">
                                Dashboard and invoice language
                            </p>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <button v-for="item in languages" :key="item" @click="language = item" :class="[
                            'py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all active:scale-95',
                            language === item ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-container-high text-on-surface-variant'
                        ]">
                            {{ item }}
                        </button>
                    </div>
                </div>
            </div>
        </SurfaceCard>
    </section>
</template>
