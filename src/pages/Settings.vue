<script setup lang="ts">
import { CheckCircle2, Database, IndianRupee, ReceiptText, Settings as SettingsIcon, Store } from 'lucide-vue-next';
import SettingsLocalization from '../components/settings/SettingsLocalization.vue';
import SettingsTaxCompliance from '../components/settings/SettingsTaxCompliance.vue';
import SettingsAppearance from '../components/settings/SettingsAppearance.vue';
import SettingsMasterData from '../components/settings/SettingsMasterData.vue';
import SettingsDangerZone from '../components/settings/SettingsDangerZone.vue';
import SettingsPurchaseWorkflow from '../components/settings/SettingsPurchaseWorkflow.vue';
import { SurfaceCard } from '../components';

const statusCards = [
    { label: 'Store ID', value: 'CNQ-8812', icon: Store, tone: 'text-primary', bg: 'bg-primary/10' },
    { label: 'GST Rate', value: '18%', icon: ReceiptText, tone: 'text-tertiary', bg: 'bg-tertiary/10' },
    { label: 'Currency', value: 'INR', icon: IndianRupee, tone: 'text-secondary', bg: 'bg-secondary/10' },
];
</script>

<template>
    <div class="px-5 pt-2 space-y-6 pb-40 max-w-md mx-auto">
        <section>
            <SurfaceCard
                class="p-5 rounded-4xl bg-primary-gradient text-white shadow-xl shadow-primary/20 relative overflow-hidden">
                <div class="absolute -right-8 -top-10 w-32 h-32 rounded-full bg-white/10"></div>
                <div class="relative z-10 flex items-start justify-between gap-4">
                    <div>
                        <div class="flex items-center gap-2 text-white/70">
                            <SettingsIcon class="w-4 h-4" />
                            <span class="text-[9px] font-black uppercase tracking-[0.2em]">Store Configuration</span>
                        </div>
                        <h2 class="text-3xl font-black tracking-tighter leading-tight mt-2">Settings</h2>
                        <p class="text-[10px] font-bold text-white/55 uppercase tracking-widest mt-1">
                            Taxes, master data, app behavior
                        </p>
                    </div>
                    <div class="flex items-center gap-1.5 bg-white text-primary px-3 py-2 rounded-2xl shrink-0">
                        <CheckCircle2 class="w-4 h-4" />
                        <span class="text-[9px] font-black uppercase tracking-wider">Synced</span>
                    </div>
                </div>
            </SurfaceCard>
        </section>

        <section class="grid grid-cols-3 gap-3">
            <SurfaceCard v-for="item in statusCards" :key="item.label" variant="low"
                class="p-4 rounded-3xl border border-surface-container-high/30">
                <div :class="['w-9 h-9 rounded-2xl flex items-center justify-center mb-3', item.bg]">
                    <component :is="item.icon" :class="['w-4 h-4', item.tone]" />
                </div>
                <h3 class="text-sm font-black text-on-surface leading-none truncate">{{ item.value }}</h3>
                <p class="text-[8px] font-black text-on-surface-variant/45 uppercase tracking-wider mt-1">
                    {{ item.label }}
                </p>
            </SurfaceCard>
        </section>

        <div class="space-y-6">
            <SettingsMasterData />
            <SettingsLocalization />
            <SettingsTaxCompliance />
            <SettingsAppearance />
            <SettingsPurchaseWorkflow />
            <section class="grid grid-cols-1 gap-3">
                <SurfaceCard variant="low"
                    class="p-5 rounded-4xl border border-surface-container-high/30 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-11 h-11 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                            <Database class="w-5 h-5" />
                        </div>
                        <div>
                            <h3 class="text-sm font-black text-on-surface">Backup & Sync</h3>
                            <p class="text-[10px] font-bold text-on-surface-variant/40 mt-0.5">
                                Last cloud sync completed 2 minutes ago
                            </p>
                        </div>
                    </div>
                    <span class="text-[9px] font-black text-primary uppercase tracking-widest">Auto</span>
                </SurfaceCard>
            </section>
            <SettingsDangerZone />
        </div>
    </div>
</template>
