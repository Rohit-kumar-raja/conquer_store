<script setup lang="ts">
import { ref } from 'vue';
import { Fingerprint, KeyRound, Smartphone, Lock } from 'lucide-vue-next';
import ToggleSwitch from 'primevue/toggleswitch';

const mfa = ref(true);
const sso = ref(false);
const loginAlerts = ref(true);
const appLock = ref(false);

const items = [
    { icon: Fingerprint, label: 'Two-Factor (2FA)', sub: 'TOTP authenticator app', key: 'mfa' },
    { icon: KeyRound, label: 'SSO / SAML', sub: 'Connect identity provider', key: 'sso' },
    { icon: Smartphone, label: 'Login Alerts', sub: 'Notify on new device', key: 'loginAlerts' },
    { icon: Lock, label: 'Auto-Lock', sub: 'Lock after 15m inactivity', key: 'appLock' },
];

const models: Record<string, any> = { mfa, sso, loginAlerts, appLock };
</script>

<template>
    <section class="space-y-3">
        <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 px-1">
            Authentication
        </h3>

        <div class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 overflow-hidden">
            <div v-for="(item, index) in items" :key="item.key" :class="[
                'p-4 px-5 flex items-center justify-between group transition-all',
                index !== items.length - 1 && 'border-b border-surface-container-high/20'
            ]">
                <div class="flex items-center gap-4">
                    <div
                        class="w-11 h-11 rounded-2xl bg-surface-container-high/50 flex items-center justify-center text-on-surface group-hover:text-primary transition-colors">
                        <component :is="item.icon" class="w-5 h-5" />
                    </div>
                    <div>
                        <p class="font-black text-on-surface text-sm">{{ item.label }}</p>
                        <p class="text-[9px] font-bold text-on-surface-variant/40 mt-0.5">{{ item.sub }}</p>
                    </div>
                </div>
                <ToggleSwitch v-model="models[item.key].value" />
            </div>
        </div>
    </section>
</template>
