<script setup lang="ts">
import { Globe, DollarSign, Languages, Paintbrush, Percent, Store, Clock, Bell, Shield, ChevronRight } from 'lucide-vue-next';
import { SurfaceCard, Button, Input, IntelligenceBadge } from '../components';
import SelectButton from 'primevue/selectbutton';
import { ref } from 'vue';

const currency = ref('INR');
const language = ref('English');
const taxAutomatic = ref(true);

const visualThemes = [
    { name: 'Aura v4', status: 'Active' },
    { name: 'Nexus Dark', status: 'Beta' },
    { name: 'Crystal', status: 'Premium' }
];

const activeTheme = ref('Aura v4');
</script>

<template>
    <div class="px-6 py-8 space-y-10 pb-40 bg-surface-container-lowest min-h-screen">
        <!-- Header -->
        <div class="flex items-end justify-between">
            <div>
                <h2 class="text-4xl font-black text-on-surface tracking-tight">Settings</h2>
                <div class="flex items-center gap-2 mt-2">
                    <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <p class="text-xs text-on-surface-variant font-bold uppercase tracking-widest leading-none">
                        System Configuration • Synced
                    </p>
                </div>
            </div>
            <div class="text-right hidden sm:block">
                <p class="text-[10px] font-black text-primary uppercase tracking-tighter mb-1">Store ID</p>
                <p class="text-sm font-bold text-on-surface font-mono">CNQ-MS-8812</p>
            </div>
        </div>

        <div class="space-y-8">
            <!-- Localization & Regional -->
            <section class="space-y-4">
                <div class="flex items-center gap-3">
                    <div class="w-1.5 h-6 bg-primary rounded-full"></div>
                    <h3 class="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/70">Localization
                    </h3>
                </div>

                <SurfaceCard variant="low" class="p-0 overflow-hidden border border-surface-container-high/50">
                    <div class="divide-y divide-surface-container-high">
                        <div
                            class="p-6 flex items-center justify-between group hover:bg-surface-container-high/30 transition-colors">
                            <div class="flex items-center gap-5">
                                <div
                                    class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/5">
                                    <DollarSign class="w-6 h-6" />
                                </div>
                                <div>
                                    <p class="font-bold text-on-surface text-lg">Base Currency</p>
                                    <p class="text-xs text-on-surface-variant font-medium">Used for all inventory and
                                        sales reports</p>
                                </div>
                            </div>
                            <SelectButton v-model="currency" :options="['INR', 'USD', 'EUR']" :pt="{
                                button: ({ context }) => ({
                                    class: [
                                        'px-5 py-2.5 text-xs font-black transition-all rounded-xl border-none',
                                        context.active ? 'bg-primary text-white shadow-xl shadow-primary/30 scale-105' : 'bg-surface-container-highest text-on-surface-variant hover:scale-105'
                                    ]
                                }),
                                root: { class: 'flex gap-3' }
                            }" />
                        </div>

                        <div
                            class="p-6 flex items-center justify-between group hover:bg-surface-container-high/30 transition-colors">
                            <div class="flex items-center gap-5">
                                <div
                                    class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/5">
                                    <Languages class="w-6 h-6" />
                                </div>
                                <div>
                                    <p class="font-bold text-on-surface text-lg">System Language</p>
                                    <p class="text-xs text-on-surface-variant font-medium">Language for dashboard and
                                        invoices</p>
                                </div>
                            </div>
                            <SelectButton v-model="language" :options="['English', 'Hindi']" :pt="{
                                button: ({ context }) => ({
                                    class: [
                                        'px-5 py-2.5 text-xs font-black transition-all rounded-xl border-none',
                                        context.active ? 'bg-primary text-white shadow-xl shadow-primary/30 scale-105' : 'bg-surface-container-highest text-on-surface-variant hover:scale-105'
                                    ]
                                }),
                                root: { class: 'flex gap-3' }
                            }" />
                        </div>
                    </div>
                </SurfaceCard>
            </section>

            <!-- Tax & Legal -->
            <section class="space-y-4">
                <div class="flex items-center gap-3">
                    <div class="w-1.5 h-6 bg-primary rounded-full"></div>
                    <h3 class="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/70">Tax &
                        Compliance</h3>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SurfaceCard variant="low" class="p-8 border border-surface-container-high/50">
                        <div class="flex flex-col gap-6">
                            <div class="flex items-start justify-between">
                                <div
                                    class="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                                    <Percent class="w-6 h-6" />
                                </div>
                                <IntelligenceBadge label="Compliant" variant="tertiary" />
                            </div>
                            <Input label="Default GST Rate (%)" value="18" container-class="w-full">
                                <template #icon>
                                    <Percent class="w-5 h-5" />
                                </template>
                            </Input>
                            <p class="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Applied
                                to all new products by
                                default</p>
                        </div>
                    </SurfaceCard>

                    <SurfaceCard variant="low" class="p-8 border border-surface-container-high/50">
                        <div class="flex flex-col gap-6">
                            <div class="flex items-start justify-between">
                                <div
                                    class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Globe class="w-6 h-6" />
                                </div>
                                <div class="flex items-center gap-1">
                                    <div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                    <span class="text-[10px] font-black text-primary uppercase">Automated</span>
                                </div>
                            </div>
                            <Input label="HSN Mandatory" value="Yes (Automated)" container-class="w-full">
                                <template #icon>
                                    <Shield class="w-5 h-5" />
                                </template>
                            </Input>
                            <p class="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Ensures
                                GST filing
                                compatibility</p>
                        </div>
                    </SurfaceCard>
                </div>
            </section>

            <!-- Visual & Experience -->
            <section class="space-y-4">
                <div class="flex items-center gap-3">
                    <div class="w-1.5 h-6 bg-primary rounded-full"></div>
                    <h3 class="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/70">Visual Identity
                    </h3>
                </div>

                <SurfaceCard variant="low" class="p-0 overflow-hidden border border-surface-container-high/50">
                    <div class="p-8 bg-primary/5 border-b border-surface-container-high">
                        <div class="flex items-center gap-6">
                            <div
                                class="w-16 h-16 rounded-3xl bg-white shadow-2xl shadow-primary/20 flex items-center justify-center text-primary ring-4 ring-primary/5">
                                <Paintbrush class="w-8 h-8" />
                            </div>
                            <div>
                                <h4 class="text-xl font-black text-on-surface">Interface Style</h4>
                                <p class="text-sm font-bold text-primary">Personalize your execution environment</p>
                            </div>
                        </div>
                    </div>

                    <div class="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button v-for="theme in visualThemes" :key="theme.name" @click="activeTheme = theme.name"
                            :class="[
                                'p-4 rounded-2xl border-2 transition-all text-left flex flex-col gap-3 group',
                                activeTheme === theme.name
                                    ? 'border-primary bg-primary/5'
                                    : 'border-transparent bg-surface-container-highest hover:border-surface-container-high'
                            ]">
                            <div class="flex items-center justify-between">
                                <div
                                    :class="['w-3 h-3 rounded-full transition-all', activeTheme === theme.name ? 'bg-primary ring-4 ring-primary/20' : 'bg-on-surface-variant/30']">
                                </div>
                                <span class="text-[10px] font-black uppercase tracking-tighter"
                                    :class="activeTheme === theme.name ? 'text-primary' : 'text-on-surface-variant'">{{
                                        theme.status
                                    }}</span>
                            </div>
                            <span class="font-bold text-on-surface">{{ theme.name }}</span>
                        </button>
                    </div>
                </SurfaceCard>
            </section>

            <!-- Danger Zone -->
            <section class="pt-4">
                <SurfaceCard variant="lowest"
                    class="p-6 bg-error/5 border border-error/10 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center text-error">
                            <Clock class="w-5 h-5" />
                        </div>
                        <div>
                            <p class="font-bold text-on-surface">Reset All Preferences</p>
                            <p class="text-xs text-on-surface-variant font-medium">Revert all terminal
                                settings to
                                factory defaults</p>
                        </div>
                    </div>
                    <Button variant="ghost"
                        class="text-error hover:bg-error/10 font-black uppercase text-[10px] tracking-widest px-4 h-10 rounded-xl">Initialize
                        Reset</Button>
                </SurfaceCard>
            </section>
        </div>

        <!-- Float Action -->
        <div class="fixed bottom-10 left-6 right-6 z-50">
            <Button class="w-full shadow-2xl shadow-primary/40 border-4 border-surface" size="xl">
                Deploy Configuration
            </Button>
        </div>
    </div>
</template>
