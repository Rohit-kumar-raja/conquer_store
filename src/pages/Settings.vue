<script setup lang="ts">
import SettingsLocalization from '../components/settings/SettingsLocalization.vue';
import SettingsTaxCompliance from '../components/settings/SettingsTaxCompliance.vue';
import SettingsAppearance from '../components/settings/SettingsAppearance.vue';
import SettingsDangerZone from '../components/settings/SettingsDangerZone.vue';
</script>

<template>
    <div class="px-5 pt-2 space-y-8 pb-40 max-w-md mx-auto">
        <!-- Header -->
        <div class="flex items-end justify-between">
            <div>
                <h2 class="text-3xl font-black text-on-surface tracking-tight">Settings</h2>
                <div class="flex items-center gap-2 mt-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    <p class="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest leading-none">
                        Configuration • Synced
                    </p>
                </div>
            </div>
            <div class="text-right">
                <p class="text-[9px] font-black text-primary/50 uppercase tracking-wider mb-0.5">Store ID</p>
                <p class="text-xs font-black text-on-surface font-mono">CNQ-8812</p>
            </div>
        </div>

        <div class="space-y-8">
            <SettingsLocalization />
            <SettingsTaxCompliance />
            <SettingsAppearance />
            <SettingsDangerZone />
        </div>
    </div>
</template>
