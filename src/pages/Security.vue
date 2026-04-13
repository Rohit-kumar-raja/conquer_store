<script setup lang="ts">
import { ShieldCheck, Fingerprint, Smartphone, Key, History, Lock, ShieldAlert, ChevronRight } from 'lucide-vue-next';
import { SurfaceCard, IntelligenceBadge, Button } from '../components';
import InputSwitch from 'primevue/inputswitch';
import { ref } from 'vue';

const mfa = ref(true);
const loginAlerts = ref(true);
const appLock = ref(false);
</script>

<template>
    <div class="px-6 py-8 space-y-10 pb-40 bg-surface-container-lowest min-h-screen">
        <!-- Header -->
        <div class="flex items-end justify-between">
            <div>
                <h2 class="text-4xl font-black text-on-surface tracking-tight">Sentinel</h2>
                <div class="flex items-center gap-2 mt-2">
                    <span class="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                    <p class="text-xs text-on-surface-variant font-bold uppercase tracking-widest leading-none">
                        Active Protection • Encryption: AES-256
                    </p>
                </div>
            </div>
            <div
                class="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary border border-tertiary/5">
                <Lock class="w-6 h-6" />
            </div>
        </div>

        <div class="space-y-8">
            <!-- Global Status -->
            <SurfaceCard variant="low"
                class="p-8 bg-primary/5 border border-primary/20 relative overflow-hidden group hover:scale-[1.02] transition-all">
                <div
                    class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent">
                </div>
                <div class="relative z-10 flex items-center justify-between">
                    <div class="flex items-center gap-6">
                        <div
                            class="w-16 h-16 rounded-3xl bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/40 ring-4 ring-white/10">
                            <ShieldCheck class="w-8 h-8" />
                        </div>
                        <div>
                            <p class="text-on-surface text-xl font-black">System Integrity</p>
                            <div class="flex items-center gap-2 mt-1">
                                <span class="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Protocol:
                                    Secure</span>
                                <span class="w-px h-2 bg-primary/40"></span>
                                <span
                                    class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Last
                                    scanned: 4m ago</span>
                            </div>
                        </div>
                    </div>
                    <IntelligenceBadge label="100% Secure" variant="primary" pulse />
                </div>
            </SurfaceCard>

            <!-- Authentication -->
            <section class="space-y-4">
                <div class="flex items-center gap-3">
                    <div class="w-1.5 h-6 bg-tertiary rounded-full"></div>
                    <h3 class="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/70">Access Control
                    </h3>
                </div>

                <SurfaceCard variant="low" class="p-2 border border-surface-container-high/50">
                    <div class="divide-y divide-surface-container-high/50">
                        <div v-for="item in [
                            { icon: Key, label: 'Biometric Unlock', sub: 'Use Fingerprint or FaceID', model: mfa },
                            { icon: Smartphone, label: 'Login Notifications', sub: 'Alert on new device access', model: loginAlerts },
                            { icon: Lock, label: 'Session Timeout', sub: 'Auto-lock after 15m inactivity', model: appLock }
                        ]" :key="item.label"
                            class="p-5 flex items-center justify-between group hover:bg-surface-container-high/30 transition-all rounded-xl">
                            <div class="flex items-center gap-5">
                                <div
                                    class="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-surface-container-high">
                                    <component :is="item.icon" class="w-6 h-6 text-on-surface" />
                                </div>
                                <div>
                                    <p
                                        class="font-bold text-on-surface text-base group-hover:text-primary transition-colors">
                                        {{ item.label }}</p>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                                        {{ item.sub }}</p>
                                </div>
                            </div>
                            <InputSwitch v-model="item.model" :pt="{
                                root: { class: 'w-12 h-7' },
                                slider: ({ props }) => ({
                                    class: [
                                        'rounded-full transition-all duration-300',
                                        props.modelValue ? 'bg-tertiary' : 'bg-surface-container-highest'
                                    ]
                                })
                            }" />
                        </div>
                    </div>
                </SurfaceCard>
            </section>

            <!-- Active Sessions -->
            <section class="space-y-4">
                <div class="flex items-center gap-3">
                    <div class="w-1.5 h-6 bg-primary rounded-full"></div>
                    <h3 class="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/70">Session Matrix
                    </h3>
                </div>

                <div class="space-y-4">
                    <SurfaceCard v-for="session in [
                        { os: 'iOS 17.4', device: 'iPhone 15 Pro', loc: 'Mumbai, IN', time: 'Active Now', current: true },
                        { os: 'Windows 11', device: 'Surface Laptop 5', loc: 'Pune, IN', time: '2 hours ago', current: false }
                    ]" :key="session.os" :variant="session.current ? 'low' : 'lowest'"
                        class="p-5 flex items-center justify-between border border-surface-container-high/30 hover:border-primary/20 transition-colors">
                        <div class="flex items-center gap-5">
                            <div
                                :class="['w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-inner', session.current ? 'bg-primary/10 text-primary' : 'bg-surface-container-high text-on-surface-variant']">
                                <Fingerprint class="w-6 h-6" />
                            </div>
                            <div>
                                <p class="text-base font-black text-on-surface">{{ session.device }}</p>
                                <div class="flex items-center gap-2 mt-0.5">
                                    <span
                                        class="text-[10px] font-bold text-on-surface-variant/70 uppercase tracking-tighter">{{
                                            session.os }}</span>
                                    <span class="w-px h-1 bg-on-surface-variant/20"></span>
                                    <span
                                        class="text-[10px] font-bold text-on-surface-variant/70 uppercase tracking-tighter">{{
                                            session.loc }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="text-right">
                            <p
                                :class="['text-[10px] font-black uppercase tracking-widest', session.current ? 'text-primary' : 'text-on-surface-variant/60']">
                                {{ session.time }}
                            </p>
                            <button v-if="!session.current"
                                class="text-[10px] font-bold text-error uppercase hover:underline mt-1">Terminate</button>
                        </div>
                    </SurfaceCard>
                </div>
            </section>
        </div>

        <!-- Float Action -->
        <div class="fixed bottom-10 left-6 right-6 z-50">
            <Button variant="tertiary" class="w-full shadow-2xl shadow-tertiary/30 border-4 border-surface" size="xl">
                <template #icon>
                    <ShieldAlert class="w-6 h-6" />
                </template>
                Lock Global Access
            </Button>
        </div>
    </div>
</template>
