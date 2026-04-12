<script setup lang="ts">
import { ShieldCheck, Fingerprint, Smartphone, Key, History } from 'lucide-vue-next';
import { SurfaceCard, IntelligenceBadge } from '../components';
import InputSwitch from 'primevue/inputswitch';
import { ref } from 'vue';

const mfa = ref(true);
const loginAlerts = ref(true);
</script>

<template>
    <div class="px-6 py-8 space-y-8 pb-40">
        <div>
            <h2 class="text-3xl font-black text-on-surface">Security</h2>
            <p class="text-xs text-on-surface-variant font-bold uppercase tracking-widest mt-1">Protect your digital
                assets</p>
        </div>

        <div class="space-y-6">
            <SurfaceCard class="p-6 bg-primary/5 border border-primary/20 flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div
                        class="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                        <ShieldCheck class="w-6 h-6" />
                    </div>
                    <div>
                        <p class="text-on-surface font-bold">Account Integrity</p>
                        <p class="text-[10px] font-black uppercase tracking-widest text-primary">Status: Secure</p>
                    </div>
                </div>
                <IntelligenceBadge label="100%" variant="primary" />
            </SurfaceCard>

            <div class="space-y-4">
                <h3 class="text-xs font-black uppercase tracking-widest text-on-surface-variant">Authentication</h3>
                <SurfaceCard class="p-4 space-y-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center">
                                <Key class="w-5 h-5 text-on-surface" />
                            </div>
                            <span class="font-bold text-on-surface">Biometric Unlock</span>
                        </div>
                        <InputSwitch v-model="mfa" :pt="{
                            root: { class: 'w-12 h-7' },
                            slider: ({ props }) => ({
                                class: [
                                    'rounded-full transition-all duration-300',
                                    mfa ? 'bg-primary' : 'bg-surface-container-highest'
                                ]
                            })
                        }" />
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center">
                                <Smartphone class="w-5 h-5 text-on-surface" />
                            </div>
                            <span class="font-bold text-on-surface">Login Notifications</span>
                        </div>
                        <InputSwitch v-model="loginAlerts" :pt="{
                            root: { class: 'w-12 h-7' },
                            slider: ({ props }) => ({
                                class: [
                                    'rounded-full transition-all duration-300',
                                    loginAlerts ? 'bg-primary' : 'bg-surface-container-highest'
                                ]
                            })
                        }" />
                    </div>
                </SurfaceCard>
            </div>

            <div class="space-y-4">
                <h3 class="text-xs font-black uppercase tracking-widest text-on-surface-variant">Active Sessions</h3>
                <div class="space-y-3">
                    <SurfaceCard v-for="session in [
                        { os: 'iOS 17.4', device: 'iPhone 15 Pro', loc: 'Mumbai', time: 'Active now' },
                        { os: 'Windows 11', device: 'Surface Laptop 5', loc: 'Pune', time: '2 hours ago' }
                    ]" :key="session.os" class="p-4 flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center">
                                <Fingerprint class="w-5 h-5" />
                            </div>
                            <div>
                                <p class="text-sm font-bold text-on-surface">{{ session.device }}</p>
                                <p class="text-[10px] font-medium text-on-surface-variant uppercase">{{ session.os }} •
                                    {{ session.loc }}</p>
                            </div>
                        </div>
                        <span class="text-[10px] font-black uppercase tracking-widest"
                            :class="session.time === 'Active now' ? 'text-primary' : 'text-on-surface-variant'">{{
                            session.time }}</span>
                    </SurfaceCard>
                </div>
            </div>
        </div>
    </div>
</template>
