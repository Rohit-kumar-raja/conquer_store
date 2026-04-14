<script setup lang="ts">
import { DollarSign, Languages } from 'lucide-vue-next';
import { SurfaceCard } from '../index';
import SelectButton from 'primevue/selectbutton';
import { ref } from 'vue';

const currency = ref('INR');
const language = ref('English');


</script>

<template>
    <section class="space-y-4">
        <div class="flex items-center gap-3">
            <div class="w-1.5 h-6 bg-primary rounded-full"></div>
            <h3 class="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/70">Localization</h3>
        </div>

        <SurfaceCard variant="low" class="p-0 overflow-hidden border border-surface-container-high/50">
            <div class="divide-y divide-surface-container-high">
                <div
                    class="p-6 flex items-center justify-between group hover:bg-surface-container-high/30 transition-colors">
                    <div class="flex items-center gap-5">
                        <div
                            class="w-16 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/5">
                            <DollarSign class="w-6 h-6" />
                        </div>
                        <div>
                            <p class="font-bold text-on-surface text-lg">Currency</p>
                            <p class="text-[10px] text-on-surface-variant font-medium">Used for all inventory and sales
                                reports</p>
                        </div>
                    </div>
                    <SelectButton v-model="currency" :options="['INR', 'USD', 'EUR']" />
                </div>

                <div
                    class="p-6 flex items-center justify-between group hover:bg-surface-container-high/30 transition-colors">
                    <div class="flex items-center gap-5">
                        <div
                            class="w-15 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/5">
                            <Languages class="w-6 h-6" />
                        </div>
                        <div>
                            <p class="font-bold text-on-surface text-lg">Language</p>
                            <p class="text-[10px] text-on-surface-variant font-medium">Language for dashboard and
                                invoices
                            </p>
                        </div>
                    </div>
                    <SelectButton v-model="language" :options="['English', 'Hindi']" />
                </div>
            </div>
        </SurfaceCard>
    </section>
</template>
