<script setup lang="ts">
import { computed, ref } from 'vue';
import {
    AlertTriangle,
    Bell,
    Ghost,
    Mail,
    MessageSquare,
    Shield,
    Smartphone,
    Sparkles,
    TrendingUp,
    Clock3,
    Save
} from 'lucide-vue-next';
import { SurfaceCard, Button } from '../components';

const preferences = ref({
    instock: true,
    sales: true,
    security: true,
    marketing: false,
    quietMode: true
});

const channels = [
    { id: 'push', icon: Smartphone, label: 'Push', desc: 'Instant device alerts' },
    { id: 'mail', icon: Mail, label: 'Email', desc: 'Daily summary digest' },
    { id: 'sms', icon: MessageSquare, label: 'SMS', desc: 'Critical only' }
];

const alertStreams = [
    {
        key: 'instock',
        icon: AlertTriangle,
        title: 'Inventory alerts',
        desc: 'Low stock, out of stock, and replenishment prompts.'
    },
    {
        key: 'sales',
        icon: TrendingUp,
        title: 'Sales alerts',
        desc: 'Orders, payments, and sudden demand spikes.'
    },
    {
        key: 'security',
        icon: Shield,
        title: 'Security alerts',
        desc: 'Logins, permission changes, and access events.'
    },
    {
        key: 'marketing',
        icon: Sparkles,
        title: 'Marketing alerts',
        desc: 'Campaigns, announcements, and promotional updates.'
    }
] as const;

const enabledCount = computed(
    () => Object.values(preferences.value).filter(Boolean).length
);
</script>

<template>
    <div class="px-5 pt-2 space-y-6 pb-40 max-w-md mx-auto">
        <section class="grid grid-cols-3 gap-3">
            <SurfaceCard variant="low" class="p-4 rounded-3xl border border-surface-container-high/30">
                <Bell class="w-5 h-5 text-primary mb-3" />
                <h3 class="text-sm font-black text-on-surface">{{ enabledCount }}</h3>
                <p class="text-[8px] font-black text-on-surface-variant/45 uppercase tracking-wider mt-1">Enabled</p>
            </SurfaceCard>
            <SurfaceCard variant="low" class="p-4 rounded-3xl border border-surface-container-high/30">
                <Clock3 class="w-5 h-5 text-tertiary mb-3" />
                <h3 class="text-sm font-black text-on-surface">08:00</h3>
                <p class="text-[8px] font-black text-on-surface-variant/45 uppercase tracking-wider mt-1">Quiet till</p>
            </SurfaceCard>
            <SurfaceCard variant="low" class="p-4 rounded-3xl border border-surface-container-high/30">
                <Shield class="w-5 h-5 text-secondary mb-3" />
                <h3 class="text-sm font-black text-on-surface">High</h3>
                <p class="text-[8px] font-black text-on-surface-variant/45 uppercase tracking-wider mt-1">Priority</p>
            </SurfaceCard>
        </section>

        <section class="space-y-3">
            <div class="flex items-center justify-between px-1">
                <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Delivery
                    Channels</h3>
                <span class="text-[9px] font-black uppercase tracking-widest text-primary">Active routing</span>
            </div>

            <div class="grid grid-cols-1 gap-3">
                <button v-for="channel in channels" :key="channel.id"
                    class="bg-surface-container-low rounded-[1.75rem] border border-surface-container-high/30 p-4 flex items-center justify-between gap-4 active:scale-[0.99] transition-all">
                    <div class="flex items-center gap-4 min-w-0">
                        <div class="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <component :is="channel.icon" class="w-5 h-5" />
                        </div>
                        <div class="min-w-0">
                            <h4 class="text-sm font-black text-on-surface">{{ channel.label }}</h4>
                            <p class="text-[10px] font-bold text-on-surface-variant/45 mt-0.5 truncate">{{ channel.desc }}</p>
                        </div>
                    </div>
                    <span class="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl"
                        :class="channel.id === 'mail' ? 'bg-surface-container-high text-on-surface-variant/50' : 'bg-primary text-white'">
                        {{ channel.id === 'mail' ? 'Off' : 'On' }}
                    </span>
                </button>
            </div>
        </section>

        <section class="space-y-3">
            <div class="flex items-center justify-between px-1">
                <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Alert
                    Streams</h3>
                <span class="text-[9px] font-black uppercase tracking-widest text-primary">Filters</span>
            </div>

            <SurfaceCard variant="low" class="rounded-[1.75rem] border border-surface-container-high/30 overflow-hidden">
                <div v-for="(stream, index) in alertStreams" :key="stream.key" :class="[
                    'p-4 flex items-start justify-between gap-4',
                    index !== alertStreams.length - 1 && 'border-b border-surface-container-high/20'
                ]">
                    <div class="flex items-start gap-4 min-w-0">
                        <div class="w-11 h-11 rounded-2xl bg-surface-container-high flex items-center justify-center text-on-surface-variant shrink-0">
                            <component :is="stream.icon" class="w-5 h-5" />
                        </div>
                        <div class="min-w-0">
                            <h4 class="text-sm font-black text-on-surface">{{ stream.title }}</h4>
                            <p class="text-[10px] font-bold text-on-surface-variant/45 mt-0.5 leading-snug">
                                {{ stream.desc }}
                            </p>
                        </div>
                    </div>
                    <button @click="preferences[stream.key] = !preferences[stream.key]"
                        class="w-12 h-7 rounded-full p-1 transition-colors shrink-0"
                        :class="preferences[stream.key] ? 'bg-primary' : 'bg-surface-container-high'">
                        <span class="block w-5 h-5 rounded-full bg-white transition-transform"
                            :class="preferences[stream.key] ? 'translate-x-5' : 'translate-x-0'" />
                    </button>
                </div>
            </SurfaceCard>
        </section>

        <section class="space-y-3">
            <div class="flex items-center justify-between px-1">
                <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Quiet Mode
                </h3>
                <span class="text-[9px] font-black uppercase tracking-widest text-primary">Window</span>
            </div>

            <SurfaceCard variant="glass"
                class="p-5 rounded-[1.75rem] border border-primary/5 bg-surface-container-low grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <div class="flex items-center gap-4 min-w-0">
                    <div class="w-11 h-11 rounded-2xl bg-on-surface-variant/10 flex items-center justify-center text-on-surface-variant shrink-0">
                        <Ghost class="w-5 h-5 opacity-40" />
                    </div>
                    <div class="min-w-0">
                        <p class="text-sm font-black text-on-surface">Stealth Mode</p>
                        <p class="text-[10px] font-bold text-on-surface-variant/45 mt-0.5 leading-snug">
                            Mute non-critical alerts until 08:00 IST
                        </p>
                    </div>
                </div>
                <button @click="preferences.quietMode = !preferences.quietMode"
                    class="w-12 h-7 rounded-full p-1 transition-colors shrink-0 self-center"
                    :class="preferences.quietMode ? 'bg-primary' : 'bg-surface-container-high'">
                    <span class="block w-5 h-5 rounded-full bg-white transition-transform"
                        :class="preferences.quietMode ? 'translate-x-5' : 'translate-x-0'" />
                </button>
            </SurfaceCard>
        </section>

        <div class="fixed bottom-0 left-0 right-0 w-full bg-surface/80 backdrop-blur-2xl border-t border-surface-container-high px-5 pb-10 pt-4 z-50 max-w-md mx-auto">
            <Button class="w-full rounded-2xl font-black">
                <template #icon>
                    <Save class="w-5 h-5" />
                </template>
                Save Alert Hub
            </Button>
        </div>
    </div>
</template>
