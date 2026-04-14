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
    Bell,
    Sun,
    Moon,
    Sparkles,
    Crown,
    Tags,
    Award,
    Truck,
    Users
} from 'lucide-vue-next';
import { SurfaceCard } from '../components';
import { useShopStore } from '../stores/useShopStore';
import { useThemeStore } from '../stores/useThemeStore';

const router = useRouter();
const shopStore = useShopStore();
const themeStore = useThemeStore();

const menuItems = [
    { id: 'profile', icon: User, label: 'Owner Profile', sub: 'Account & business details', color: 'bg-primary/10 text-primary' },
    { id: 'subscription', icon: CreditCard, label: 'Subscription', sub: 'Plan expires in 24 days', color: 'bg-tertiary/10 text-tertiary' },
    { id: 'settings', icon: Settings, label: 'Store Settings', sub: 'Taxes, currency & branding', color: 'bg-secondary/10 text-secondary' },
    { id: 'security', icon: Shield, label: 'Security & Access', sub: 'Staff permissions & login', color: 'bg-primary/10 text-primary' },
    { id: 'notifications-settings', icon: Bell, label: 'Notifications', sub: 'Alerts & report preferences', color: 'bg-tertiary/10 text-tertiary' },
    { id: 'support', icon: HelpCircle, label: 'Help & Support', sub: 'Docs, chat & feedback', color: 'bg-secondary/10 text-secondary' },
];

const masterDataItems = [
    { id: 'master-categories', icon: Tags, label: 'Categories', sub: 'Product categories', color: 'bg-primary/10 text-primary' },
    { id: 'master-brands', icon: Award, label: 'Brands', sub: 'Brand directory', color: 'bg-tertiary/10 text-tertiary' },
    { id: 'master-suppliers', icon: Truck, label: 'Suppliers', sub: 'Vendor management', color: 'bg-secondary/10 text-secondary' },
    { id: 'master-customers', icon: Users, label: 'Customers', sub: 'Customer directory', color: 'bg-primary/10 text-primary' },
];

const navigateTo = (routeName: string) => {
    router.push({ name: routeName });
};

const handleLogout = () => {
    router.push({ name: 'auth' });
};
</script>

<template>
    <div class="px-5 pt-2 space-y-6 pb-40 max-w-md mx-auto">

        <!-- Profile Card -->
        <section>
            <SurfaceCard @click="navigateTo('profile')"
                class="p-5 flex items-center gap-5 border border-surface-container-high/30 cursor-pointer group active:scale-[0.98] transition-all">
                <div
                    class="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center text-white font-black text-xl shadow-xl shadow-primary/20 shrink-0 group-hover:scale-105 transition-transform">
                    {{ shopStore.selectedShop.name.charAt(0) }}
                </div>
                <div class="grow min-w-0">
                    <div class="flex items-center gap-2">
                        <h3 class="font-black text-on-surface text-lg leading-tight truncate">
                            {{ shopStore.selectedShop.name }}</h3>
                        <div class="flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-lg shrink-0">
                            <Crown class="w-3 h-3 text-primary" />
                            <span class="text-[8px] font-black text-primary uppercase tracking-wider">Pro</span>
                        </div>
                    </div>
                    <p class="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-wider mt-1">
                        {{ shopStore.selectedShop.branch }} • {{ shopStore.selectedShop.location }}
                    </p>
                </div>
                <ChevronRight
                    class="w-5 h-5 text-on-surface-variant/30 group-hover:text-primary transition-colors shrink-0" />
            </SurfaceCard>
        </section>

        <!-- Dark Mode Toggle -->
        <section>
            <div @click="themeStore.toggleTheme()"
                class="bg-surface-container-low p-4 rounded-4xl border border-surface-container-high/30 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all group">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500"
                        :class="themeStore.isDark ? 'bg-primary/20 text-primary' : 'bg-tertiary/10 text-tertiary'">
                        <Moon v-if="themeStore.isDark" class="w-6 h-6" />
                        <Sun v-else class="w-6 h-6" />
                    </div>
                    <div>
                        <h3 class="font-black text-on-surface text-base">
                            {{ themeStore.isDark ? 'Dark Mode' : 'Light Mode' }}
                        </h3>
                        <p class="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider mt-0.5">
                            Tap to switch appearance
                        </p>
                    </div>
                </div>
                <div :class="[
                    'w-14 h-8 rounded-full relative transition-all duration-300 p-1',
                    themeStore.isDark ? 'bg-primary' : 'bg-surface-container-highest'
                ]">
                    <div :class="[
                        'w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300',
                        themeStore.isDark ? 'translate-x-6' : 'translate-x-0'
                    ]"></div>
                </div>
            </div>
        </section>

        <!-- Menu Items -->
        <section class="space-y-2">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 px-1 mb-3">
                Settings
            </h3>

            <div class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 overflow-hidden">
                <div v-for="(item, index) in menuItems" :key="item.id" @click="navigateTo(item.id)" :class="[
                    'flex items-center justify-between p-4 px-5 cursor-pointer group transition-all active:scale-[0.98] hover:bg-surface-container-high/30',
                    index !== menuItems.length - 1 && 'border-b border-surface-container-high/20'
                ]">
                    <div class="flex items-center gap-4">
                        <div
                            :class="['w-11 h-11 rounded-2xl flex items-center justify-center transition-all group-hover:scale-105', item.color]">
                            <component :is="item.icon" class="w-5 h-5" />
                        </div>
                        <div>
                            <h3 class="font-black text-on-surface text-sm leading-tight">{{ item.label }}</h3>
                            <p class="text-[10px] font-bold text-on-surface-variant/40 mt-0.5">{{ item.sub }}</p>
                        </div>
                    </div>
                    <ChevronRight
                        class="w-4 h-4 text-on-surface-variant/20 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
            </div>
        </section>

        <!-- Master Data -->
        <section class="space-y-2">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 px-1 mb-3">
                Master Data
            </h3>

            <div class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 overflow-hidden">
                <div v-for="(item, index) in masterDataItems" :key="item.id" @click="navigateTo(item.id)" :class="[
                    'flex items-center justify-between p-4 px-5 cursor-pointer group transition-all active:scale-[0.98] hover:bg-surface-container-high/30',
                    index !== masterDataItems.length - 1 && 'border-b border-surface-container-high/20'
                ]">
                    <div class="flex items-center gap-4">
                        <div
                            :class="['w-11 h-11 rounded-2xl flex items-center justify-center transition-all group-hover:scale-105', item.color]">
                            <component :is="item.icon" class="w-5 h-5" />
                        </div>
                        <div>
                            <h3 class="font-black text-on-surface text-sm leading-tight">{{ item.label }}</h3>
                            <p class="text-[10px] font-bold text-on-surface-variant/40 mt-0.5">{{ item.sub }}</p>
                        </div>
                    </div>
                    <ChevronRight
                        class="w-4 h-4 text-on-surface-variant/20 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
            </div>
        </section>

        <!-- Logout -->
        <section>
            <button @click="handleLogout"
                class="w-full p-4 px-5 rounded-4xl bg-error/5 border border-error/10 flex items-center justify-between group hover:bg-error/10 transition-all active:scale-[0.98]">
                <div class="flex items-center gap-4">
                    <div
                        class="w-11 h-11 rounded-2xl bg-error/10 flex items-center justify-center text-error transition-all">
                        <LogOut class="w-5 h-5" />
                    </div>
                    <div class="text-left">
                        <span class="font-black text-error text-sm">Sign Out</span>
                        <p class="text-[10px] font-bold text-error/40 mt-0.5">End current session</p>
                    </div>
                </div>
                <ChevronRight class="w-4 h-4 text-error/30" />
            </button>
        </section>

        <!-- Footer -->
        <section class="flex flex-col items-center gap-2 py-4 opacity-30">
            <div class="flex items-center gap-2">
                <Sparkles class="w-4 h-4 text-on-surface-variant" />
                <span class="text-[10px] font-black uppercase tracking-[0.15em] text-on-surface-variant">
                    Conquer OS
                </span>
            </div>
            <span class="text-[9px] font-bold text-on-surface-variant/60">v2.4.0-pro • Built with ❤️</span>
        </section>
    </div>
</template>
