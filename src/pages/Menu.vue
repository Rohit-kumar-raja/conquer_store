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
    Users,
    PackagePlus,
    PackageMinus,
    History,
    ClipboardList,
    ClipboardCheck,
    Barcode,
    CalendarClock,
    AlertTriangle,
    Repeat,
    CheckCircle2,
    Layers,
    IndianRupee,
    ArchiveX,
    RotateCcw,
    SlidersHorizontal,
    FileSpreadsheet
} from 'lucide-vue-next';
import { SurfaceCard } from '../components';
import { useShopStore } from '../stores/useShopStore';
import { useThemeStore } from '../stores/useThemeStore';
import { useAuthStore } from '../stores/useAuthStore';

const router = useRouter();
const shopStore = useShopStore();
const themeStore = useThemeStore();
const authStore = useAuthStore();

const menuItems = [
    { id: 'profile', icon: User, label: 'Owner Profile', sub: 'Account & business details', color: 'bg-primary/10 text-primary' },
    { id: 'subscription', icon: CreditCard, label: 'Subscription', sub: 'Plan expires in 24 days', color: 'bg-tertiary/10 text-tertiary' },
    { id: 'bill-history', icon: History, label: 'Bill History', sub: 'Finalized bills and receipts', color: 'bg-primary/10 text-primary' },
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

const inventoryItems = [
    { id: 'inventory-stock-in', icon: PackagePlus, label: 'Stock In', sub: 'Receive supplier stock', color: 'bg-primary/10 text-primary' },
    { id: 'inventory-stock-out', icon: PackageMinus, label: 'Stock Out', sub: 'Damage, loss and correction', color: 'bg-error/10 text-error' },
    { id: 'inventory-movements', icon: History, label: 'Movement History', sub: 'Complete stock audit trail', color: 'bg-secondary/10 text-secondary' },
    { id: 'inventory-purchase-orders', icon: ClipboardList, label: 'Purchase Orders', sub: 'Order stock from suppliers', color: 'bg-tertiary/10 text-tertiary' },
    { id: 'inventory-goods-received', icon: ClipboardCheck, label: 'Goods Received', sub: 'GRN against purchase orders', color: 'bg-primary/10 text-primary' },
    { id: 'inventory-barcodes', icon: Barcode, label: 'Barcode / SKU', sub: 'Codes and label printing', color: 'bg-secondary/10 text-secondary' },
    { id: 'inventory-batches', icon: CalendarClock, label: 'Batch & Expiry', sub: 'Expiry and batch stock', color: 'bg-tertiary/10 text-tertiary' },
    { id: 'inventory-low-stock', icon: AlertTriangle, label: 'Low Stock Alerts', sub: 'Reorder required products', color: 'bg-error/10 text-error' },
    { id: 'inventory-transfers', icon: Repeat, label: 'Transfers', sub: 'Move stock between stores', color: 'bg-primary/10 text-primary' },
    { id: 'inventory-stock-count', icon: CheckCircle2, label: 'Stock Count', sub: 'Physical audit sessions', color: 'bg-secondary/10 text-secondary' },
    { id: 'inventory-variants', icon: Layers, label: 'Variants', sub: 'Size, color and model SKUs', color: 'bg-tertiary/10 text-tertiary' },
    { id: 'inventory-supplier-products', icon: Truck, label: 'Supplier Products', sub: 'Cost and lead-time mapping', color: 'bg-secondary/10 text-secondary' },
    { id: 'inventory-valuation', icon: IndianRupee, label: 'Valuation', sub: 'Stock value and margin', color: 'bg-primary/10 text-primary' },
    { id: 'inventory-dead-stock', icon: ArchiveX, label: 'Dead Stock', sub: 'Slow-moving inventory', color: 'bg-error/10 text-error' },
    { id: 'inventory-returns', icon: RotateCcw, label: 'Returns', sub: 'Customer and supplier returns', color: 'bg-tertiary/10 text-tertiary' },
    { id: 'inventory-reorder-rules', icon: SlidersHorizontal, label: 'Reorder Rules', sub: 'Min, max and auto alerts', color: 'bg-primary/10 text-primary' },
    { id: 'inventory-import-export', icon: FileSpreadsheet, label: 'Import / Export', sub: 'Bulk upload and reports', color: 'bg-secondary/10 text-secondary' },
];

const navigateTo = (routeName: string) => {
    router.push({ name: routeName });
};

const handleLogout = () => {
    authStore.logout();
    router.push({ name: 'login' });
};
</script>

<template>
    <div class="px-5 pt-2 space-y-6 pb-40 max-w-md mx-auto">

        <!-- Account Header -->
        <section>
            <SurfaceCard
                class="p-0 rounded-4xl overflow-hidden border border-surface-container-high/30 bg-surface-container-low">
                <div class="bg-primary-gradient p-5 text-white relative overflow-hidden">
                    <div class="absolute -right-8 -top-10 w-32 h-32 rounded-full bg-white/10"></div>
                    <div class="absolute right-10 bottom-0 w-20 h-20 rounded-full bg-white/10 translate-y-12"></div>

                    <div class="relative z-10 flex items-start justify-between gap-4">
                        <div class="flex items-center gap-4 min-w-0">
                            <button @click="navigateTo('profile')"
                                class="w-16 h-16 rounded-3xl bg-white/15 border border-white/15 flex items-center justify-center text-white font-black text-xl shadow-xl shadow-black/10 shrink-0 active:scale-95 transition-all">
                                {{ shopStore.selectedShop.name.charAt(0) }}
                            </button>
                            <div class="min-w-0">
                                <div class="flex items-center gap-2">
                                    <h3 class="font-black text-xl tracking-tight truncate">
                                        {{ shopStore.selectedShop.name }}
                                    </h3>
                                    <div class="flex items-center gap-1 bg-white text-primary px-2 py-0.5 rounded-lg shrink-0">
                                        <Crown class="w-3 h-3" />
                                        <span class="text-[8px] font-black uppercase tracking-wider">Pro</span>
                                    </div>
                                </div>
                                <p class="text-[10px] font-bold text-white/55 uppercase tracking-wider mt-1 truncate">
                                    {{ shopStore.selectedShop.branch }} • {{ shopStore.selectedShop.location }}
                                </p>
                            </div>
                        </div>

                        <button @click="themeStore.toggleTheme()"
                            class="w-11 h-11 rounded-2xl bg-white/15 border border-white/10 flex items-center justify-center active:scale-95 transition-all shrink-0">
                            <Moon v-if="themeStore.isDark" class="w-5 h-5" />
                            <Sun v-else class="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-3 divide-x divide-surface-container-high/40">
                    <button @click="shopStore.toggleSwitcher"
                        class="p-4 flex flex-col items-center gap-1.5 active:bg-surface-container-high/40 transition-all">
                        <Store class="w-5 h-5 text-primary" />
                        <span class="text-[8px] font-black text-on-surface-variant/45 uppercase tracking-wider">Switch</span>
                    </button>
                    <button @click="navigateTo('subscription')"
                        class="p-4 flex flex-col items-center gap-1.5 active:bg-surface-container-high/40 transition-all">
                        <CreditCard class="w-5 h-5 text-tertiary" />
                        <span class="text-[8px] font-black text-on-surface-variant/45 uppercase tracking-wider">Billing</span>
                    </button>
                    <button @click="navigateTo('security')"
                        class="p-4 flex flex-col items-center gap-1.5 active:bg-surface-container-high/40 transition-all">
                        <Shield class="w-5 h-5 text-secondary" />
                        <span class="text-[8px] font-black text-on-surface-variant/45 uppercase tracking-wider">Access</span>
                    </button>
                </div>
            </SurfaceCard>
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

        <!-- Inventory Tools -->
        <section class="space-y-2">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 px-1 mb-3">
                Inventory Tools
            </h3>

            <div class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 overflow-hidden">
                <div v-for="(item, index) in inventoryItems" :key="item.id" @click="navigateTo(item.id)" :class="[
                    'flex items-center justify-between p-4 px-5 cursor-pointer group transition-all active:scale-[0.98] hover:bg-surface-container-high/30',
                    index !== inventoryItems.length - 1 && 'border-b border-surface-container-high/20'
                ]">
                    <div class="flex items-center gap-4 min-w-0">
                        <div
                            :class="['w-11 h-11 rounded-2xl flex items-center justify-center transition-all group-hover:scale-105 shrink-0', item.color]">
                            <component :is="item.icon" class="w-5 h-5" />
                        </div>
                        <div class="min-w-0">
                            <h3 class="font-black text-on-surface text-sm leading-tight truncate">{{ item.label }}</h3>
                            <p class="text-[10px] font-bold text-on-surface-variant/40 mt-0.5 truncate">{{ item.sub }}</p>
                        </div>
                    </div>
                    <ChevronRight
                        class="w-4 h-4 text-on-surface-variant/20 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
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
