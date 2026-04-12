<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
    User,
    Settings,
    Shield,
    HelpCircle,
    LogOut,
    ChevronRight,
    Store,
    CreditCard,
    Bell
} from 'lucide-vue-next';
import { SurfaceCard } from '../components';

const router = useRouter();

const menuItems = [
    { id: 'profile', icon: User, label: 'Owner Profile', sub: 'Raaj & Co. • Premium Member', route: 'profile' },
    { id: 'billing', icon: CreditCard, label: 'Subscription & Credits', sub: 'Plan expires in 24 days', route: 'subscription' },
    { id: 'settings', icon: Settings, label: 'Store Settings', sub: 'Taxes, currency, and branding', route: 'settings' },
    { id: 'security', icon: Shield, label: 'Security & Access', sub: 'Staff permissions and login activity', route: 'security' },
    { id: 'notifications', icon: Bell, label: 'Notifications', sub: 'Inventory alerts and sales reports', route: 'notifications-settings' },
    { id: 'support', icon: HelpCircle, label: 'Help & Support', sub: 'Documentation and live chat', route: 'support' },
];

const navigateTo = (routeName: string) => {
    router.push({ name: routeName });
};

const handleLogout = () => {
    // Logic for logout
    router.push({ name: 'auth' });
};
</script>

<template>
    <div class="px-6 py-8 space-y-8 pb-40">
        <div>
            <h2 class="text-3xl font-black text-on-surface">Management</h2>
            <p class="text-xs text-on-surface-variant font-bold uppercase tracking-widest mt-1">Configure your business
                layer</p>
        </div>

        <div class="space-y-4">
            <SurfaceCard v-for="item in menuItems" :key="item.id" @click="navigateTo(item.route)"
                class="hover:bg-surface-container-high transition-all cursor-pointer group p-4 border border-transparent active:scale-[0.98]">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                            <component :is="item.icon" class="w-6 h-6" />
                        </div>
                        <div>
                            <h3 class="font-bold text-on-surface text-base">{{ item.label }}</h3>
                            <p class="text-xs text-on-surface-variant font-medium mt-0.5">{{ item.sub }}</p>
                        </div>
                    </div>
                    <ChevronRight class="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                </div>
            </SurfaceCard>
        </div>

        <button @click="handleLogout"
            class="w-full p-5 rounded-3xl bg-error/5 border border-error/10 flex items-center justify-between group hover:bg-error transition-all active:scale-[0.98]">
            <div class="flex items-center gap-4">
                <div
                    class="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center text-error group-hover:bg-white/20 group-hover:text-white transition-all">
                    <LogOut class="w-5 h-5" />
                </div>
                <span class="font-bold text-error group-hover:text-white transition-all">Relinquish Access</span>
            </div>
            <span
                class="text-[10px] font-black uppercase tracking-widest text-error group-hover:text-white transition-all">Logout</span>
        </button>

        <div class="flex flex-col items-center gap-1 opacity-40 py-4">
            <Store class="w-8 h-8 text-on-surface-variant" />
            <span class="text-[10px] font-bold uppercase tracking-tighter">Conquer OS • v2.4.0-pro</span>
        </div>
    </div>
</template>
