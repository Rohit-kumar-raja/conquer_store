<script setup lang="ts">
import { Bell, Mail, Smartphone, MessageSquare, AlertTriangle, TrendingUp, Shield, Ghost, ChevronRight } from 'lucide-vue-next';
import { SurfaceCard, Button, IntelligenceBadge } from '../components';
import ToggleButton from 'primevue/togglebutton';
import { ref } from 'vue';

const settings = ref({
    instock: true,
    sales: true,
    security: true,
    marketing: false
});

const channels = ref([
    { id: 'push', icon: Smartphone, label: 'Push', active: true, desc: 'Real-time alerts' },
    { id: 'mail', icon: Mail, label: 'Email', active: false, desc: 'Daily digests' },
    { id: 'sms', icon: MessageSquare, label: 'SMS', active: true, desc: 'Critical only' }
]);
</script>

<template>
    <div class="px-6 py-8 space-y-10 pb-40 bg-surface-container-lowest min-h-screen">
        <!-- Header -->
        <div class="flex items-end justify-between">
            <div>
                <h2 class="text-4xl font-black text-on-surface tracking-tight">Alert Hub</h2>
                <div class="flex items-center gap-2 mt-2">
                    <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <p class="text-xs text-on-surface-variant font-bold uppercase tracking-widest leading-none">
                        Intelligence Stream • Monitoring
                    </p>
                </div>
            </div>
            <div
                class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/5">
                <Bell class="w-6 h-6 animate-bounce" />
            </div>
        </div>

        <div class="space-y-10">
            <!-- Channel Selection -->
            <section class="space-y-6">
                <div class="flex items-center gap-3">
                    <div class="w-1.5 h-6 bg-primary rounded-full"></div>
                    <h3 class="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/70">Transmission
                        Channels</h3>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button v-for="channel in channels" :key="channel.id" @click="channel.active = !channel.active"
                        :class="[
                            'relative p-6 rounded-4xl border-2 transition-all text-left flex flex-col gap-4 group overflow-hidden',
                            channel.active
                                ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10'
                                : 'border-surface-container-high bg-surface-container-low grayscale'
                        ]">
                        <div
                            class="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform">
                        </div>

                        <div
                            :class="['w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm', channel.active ? 'bg-primary text-white' : 'bg-surface-container-highest text-on-surface-variant']">
                            <component :is="channel.icon" class="w-6 h-6" />
                        </div>

                        <div>
                            <span class="text-base font-black text-on-surface block">{{ channel.label }}</span>
                            <span class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{{
                                channel.desc }}</span>
                        </div>
                    </button>
                </div>
            </section>

            <!-- Types -->
            <section class="space-y-6">
                <div class="flex items-center gap-3">
                    <div class="w-1.5 h-6 bg-primary rounded-full"></div>
                    <h3 class="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/70">Filter Streams
                    </h3>
                </div>

                <SurfaceCard variant="low" class="p-2 border border-surface-container-high/50">
                    <div class="space-y-1">
                        <div v-for="(val, key) in settings" :key="key"
                            class="flex items-center justify-between p-4 hover:bg-surface-container-high/50 rounded-2xl transition-all group">
                            <div class="flex items-center gap-5">
                                <div
                                    class="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-surface-container-high">
                                    <component
                                        :is="key === 'instock' ? AlertTriangle : key === 'sales' ? TrendingUp : key === 'security' ? Shield : Bell"
                                        class="w-6 h-6 text-on-surface" />
                                </div>
                                <div>
                                    <p class="text-lg font-black capitalize text-on-surface">{{ key.replace('instock',
                                        'Low Stock') }}</p>
                                    <p
                                        class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest leading-none mt-1">
                                        {{ key === 'security' ? 'Maximum Security Priority' : 'Routine optimization' }}
                                    </p>
                                </div>
                            </div>
                            <ToggleButton v-model="settings[key]" :pt="{
                                root: { class: 'w-14 h-8' },
                                slider: ({ props, context }) => ({
                                    class: [
                                        'rounded-full transition-all duration-300',
                                        context.active ? 'bg-primary' : 'bg-surface-container-highest'
                                    ]
                                })
                            }" />
                        </div>
                    </div>
                </SurfaceCard>
            </section>

            <!-- Quiet Mode -->
            <section class="pt-4">
                <SurfaceCard variant="glass"
                    class="p-6 bg-surface-container-low border border-primary/5 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-10 h-10 rounded-xl bg-on-surface-variant/10 flex items-center justify-center text-on-surface-variant">
                            <Ghost class="w-5 h-5 opacity-40" />
                        </div>
                        <div>
                            <p class="font-bold text-on-surface">Stealth Mode</p>
                            <p
                                class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 leading-none mt-1">
                                Mute all transmissions until 08:00 IST</p>
                        </div>
                    </div>
                    <ToggleButton />
                </SurfaceCard>
            </section>
        </div>

        <div class="fixed bottom-10 left-6 right-6 z-50">
            <Button class="w-full shadow-2xl shadow-primary/30 border-4 border-surface" size="xl">
                Commit Protocol
            </Button>
        </div>
    </div>
</template>
