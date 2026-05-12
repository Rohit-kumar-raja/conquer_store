<script setup lang="ts">
import { ref, computed } from 'vue';
import {
    Bell,
    AlertTriangle,
    TrendingUp,
    ShoppingBag,
    CheckCircle2,
    ChevronRight,
    Clock,
    Filter,
    Trash2
} from 'lucide-vue-next';
import { SurfaceCard, IntelligenceBadge } from '../components';
import appIcon from '../assets/icon.png';

const selectedTab = ref('all');

const tabs = [
    { id: 'all', label: 'All Pulses' },
    { id: 'alerts', label: 'Critical' },
    { id: 'sales', label: 'Sales' },
    { id: 'system', label: 'System' }
];

const rawNotifications = [
    {
        id: 1,
        type: 'alerts',
        icon: AlertTriangle,
        title: 'Inventory Critical',
        desc: 'Studio Pro Wireless (White) is below safety stock levels. 4 units remaining in main branch.',
        time: '12 mins ago',
        unread: true,
        color: 'from-error/20 to-error/5',
        iconBg: 'bg-error text-white',
        action: 'Restock Now'
    },
    {
        id: 2,
        type: 'system',
        icon: TrendingUp,
        title: 'AI Market Insight',
        desc: 'Market trends suggest a 20% surge in "Audio Essentials" over the next 48 hours.',
        time: '2 hours ago',
        unread: true,
        color: 'from-primary/20 to-primary/5',
        iconBg: 'bg-primary text-white',
        action: 'View Report'
    },
    {
        id: 3,
        type: 'sales',
        icon: ShoppingBag,
        title: 'Order Confirmed',
        desc: 'Payment received for Order #9402. Customer: Sarah Jenkins (Premium Tier).',
        time: '5 hours ago',
        unread: false,
        color: 'from-secondary/20 to-secondary/5',
        iconBg: 'bg-secondary text-white',
        action: 'Details'
    },
    {
        id: 4,
        type: 'system',
        iconImage: appIcon,
        title: 'Cloud Sync Active',
        desc: 'Universal inventory bridge is operating at 99.9% efficiency across all nodes.',
        time: 'Yesterday',
        unread: false,
        color: 'from-tertiary/20 to-tertiary/5',
        iconBg: 'bg-tertiary text-white'
    },
    {
        id: 5,
        type: 'system',
        icon: CheckCircle2,
        title: 'Daily Audit Pass',
        desc: 'All financial logs for the previous cycle have been verified and sealed.',
        time: '2 days ago',
        unread: false,
        color: 'from-surface-container-highest to-surface-container-low',
        iconBg: 'bg-surface-container-highest text-on-surface-variant'
    }
];

const filteredNotifications = computed(() => {
    if (selectedTab.value === 'all') return rawNotifications;
    return rawNotifications.filter(n => n.type === selectedTab.value);
});
</script>

<template>
    <div class="px-6 py-8 space-y-8 pb-40 min-h-screen bg-surface">
        <!-- Dynamic Header -->
        <div class="space-y-6">
            <div class="flex justify-between items-start">
                <div>
                    <h2 class="text-4xl font-black text-on-surface tracking-tighter">Intelligence</h2>
                    <p
                        class="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.2em] mt-1 opacity-60">
                        Real-time business neural flow</p>
                </div>
                <div class="flex gap-2">
                    <button
                        class="p-3 bg-surface-container-high rounded-2xl hover:bg-primary/10 hover:text-primary transition-all active:scale-90">
                        <Trash2 class="w-5 h-5" />
                    </button>
                    <button
                        class="p-3 bg-surface-container-high rounded-2xl hover:bg-primary/10 hover:text-primary transition-all active:scale-90">
                        <Filter class="w-5 h-5" />
                    </button>
                </div>
            </div>

            <!-- Neumorphic Tabs -->
            <div class="flex gap-2 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
                <button v-for="tab in tabs" :key="tab.id" @click="selectedTab = tab.id" :class="[
                    'px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all duration-500 border-2',
                    selectedTab === tab.id
                        ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105'
                        : 'bg-surface-container-low text-on-surface-variant border-transparent opacity-60'
                ]">
                    {{ tab.label }}
                </button>
            </div>
        </div>

        <!-- Notification List -->
        <div class="space-y-3">
            <div v-for="(notif, idx) in filteredNotifications" :key="notif.id" class="relative group">
                <SurfaceCard
                    class="relative p-3 flex items-start gap-4 bg-surface/90 backdrop-blur-3xl border border-surface-container-highest/50 shadow-sm active:scale-[0.99] transition-all duration-300 rounded-2xl">
                    <!-- Icon Side (Left) -->
                    <div class="relative shrink-0 flex items-center gap-2.5">
                        <div :class="[
                            'w-8 h-8 rounded-xl flex items-center justify-center shadow-sm transition-all group-hover:rotate-6 duration-500',
                            notif.iconBg
                        ]">
                            <img v-if="notif.iconImage" :src="notif.iconImage" alt="" class="w-5 h-5 rounded object-cover" />
                            <component v-else :is="notif.icon" class="w-5 h-5" />
                        </div>
                        <!-- Unread Status Indicator (Top Left near Icon) -->
                        <div v-if="notif.unread"
                            class="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-surface" />

                        <h3
                            :class="['font-black text-lg  tracking-tight truncate flex-1', notif.unread ? 'text-on-surface' : 'text-on-surface-variant/70']">
                            {{ notif.title }}
                        </h3>
                        <div class="flex justify-between items-center gap-3">

                            <span
                                class="text-[8px] font-black uppercase tracking-widest text-on-surface-variant/30 shrink-0">{{
                                    notif.time }}</span>
                        </div>
                    </div>

                    <!-- Content Side (Right) -->
                    <div class="flex-1 min-w-0 flex flex-col gap-1 mt-2">


                        <p class="text-[11px] text-on-surface-variant/70 leading-relaxed font-bold">
                            {{ notif.desc }}
                        </p>

                        <div v-if="notif.action" class="flex pt-1.5">
                            <button
                                class="px-3 py-1 bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest rounded-lg hover:bg-primary hover:text-white transition-all">
                                {{ notif.action }}
                            </button>

                        </div>
                    </div>

                </SurfaceCard>
            </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredNotifications.length === 0"
            class="flex flex-col items-center justify-center py-20 opacity-30 gap-4">
            <div
                class="w-20 h-20 rounded-full border-4 border-dashed border-on-surface-variant flex items-center justify-center">
                <Bell class="w-8 h-8" />
            </div>
            <p class="font-black uppercase tracking-[0.3em] text-[10px]">Neural quiet state</p>
        </div>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
