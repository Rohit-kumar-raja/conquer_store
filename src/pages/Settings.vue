<script setup lang="ts">
import { Globe, DollarSign, Languages, Paintbrush, Percent } from 'lucide-vue-next';
import { SurfaceCard, Button, Input } from '../components';
import SelectButton from 'primevue/selectbutton';
import { ref } from 'vue';

const currency = ref('INR');
const language = ref('English');
</script>

<template>
    <div class="px-6 py-8 space-y-8 pb-40">
        <div>
            <h2 class="text-3xl font-black text-on-surface">Settings</h2>
            <p class="text-xs text-on-surface-variant font-bold uppercase tracking-widest mt-1">Application core
                preferences</p>
        </div>

        <div class="space-y-6">
            <div class="space-y-4">
                <h3 class="text-xs font-black uppercase tracking-widest text-primary">Localization</h3>
                <SurfaceCard class="p-6 space-y-6">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center">
                                <DollarSign class="w-5 h-5" />
                            </div>
                            <span class="font-bold text-on-surface">Currency</span>
                        </div>
                        <SelectButton v-model="currency" :options="['INR', 'USD', 'EUR']" :pt="{
                            button: ({ context }) => ({
                                class: [
                                    'px-4 py-2 text-xs font-bold transition-all rounded-xl border-none',
                                    context.active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-container-high text-on-surface-variant'
                                ]
                            }),
                            root: { class: 'flex gap-2' }
                        }" />
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center">
                                <Languages class="w-5 h-5" />
                            </div>
                            <span class="font-bold text-on-surface">Language</span>
                        </div>
                        <SelectButton v-model="language" :options="['English', 'Hindi']" :pt="{
                            button: ({ context }) => ({
                                class: [
                                    'px-4 py-2 text-xs font-bold transition-all rounded-xl border-none',
                                    context.active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-container-high text-on-surface-variant'
                                ]
                            }),
                            root: { class: 'flex gap-2' }
                        }" />
                    </div>
                </SurfaceCard>
            </div>

            <div class="space-y-4">
                <h3 class="text-xs font-black uppercase tracking-widest text-primary">Tax & Compliance</h3>
                <SurfaceCard class="p-6 space-y-6">
                    <Input label="Default GST Rate (%)" value="18">
                        <template #icon>
                            <Percent class="w-5 h-5" />
                        </template>
                    </Input>
                    <Input label="HSN Mandatory" value="Yes (Automated)">
                        <template #icon>
                            <Globe class="w-5 h-5" />
                        </template>
                    </Input>
                </SurfaceCard>
            </div>

            <div class="space-y-4">
                <h3 class="text-xs font-black uppercase tracking-widest text-primary">Visual Theme</h3>
                <SurfaceCard class="p-6 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary">
                            <Paintbrush class="w-5 h-5" />
                        </div>
                        <span class="font-bold text-on-surface">Interface Style</span>
                    </div>
                    <IntelligenceBadge label="Aura v4" variant="primary" />
                </SurfaceCard>
            </div>
        </div>

        <Button class="w-full" size="xl">Save Preferences</Button>
    </div>
</template>
