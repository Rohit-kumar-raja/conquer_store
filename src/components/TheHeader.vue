<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import {
    Bell,
    ArrowLeft,
    Share2,
    ChevronDown,
    BarChart3,
    BellRing,
    Bookmark,
    Boxes,
    CreditCard,
    FileText,
    FolderOpen,
    Package,
    ScanLine,
    Settings,
    Shield,
    ShoppingBag,
    Store,
    Tags,
    Truck,
    Users
} from 'lucide-vue-next';
import { useShopStore } from '../stores/useShopStore';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const shopStore = useShopStore();

const currentScreen = computed(() => route.name as string || 'dashboard');

const pageTitles: Record<string, string> = {
    'profile': 'Account',
    'subscription': 'Billing',
    'settings': 'Preferences',
    'security': 'Protection',
    'notifications-settings': 'Alert Hub',
    'support': 'Concierge',
    'menu': 'System',
    'notifications': 'Pulses',
    'bill-history': 'Bill History',
    'scanner': 'Optic Scan',
    'master-categories': 'Categories',
    'master-brands': 'Brands',
    'master-suppliers': 'Suppliers',
    'master-customers': 'Customers',
    'product-detail': 'Product Detail',
    'edit-product': 'Edit Product',
    'add-product': 'Add Product',
    'inventory-stock-in': 'Stock In',
    'inventory-stock-out': 'Stock Out',
    'inventory-movements': 'Movement History',
    'inventory-purchase-orders': 'Purchase Orders',
    'inventory-goods-received': 'Goods Received',
    'inventory-barcodes': 'Barcode / SKU',
    'inventory-batches': 'Batch & Expiry',
    'inventory-low-stock': 'Low Stock Alerts',
    'inventory-transfers': 'Transfers',
    'inventory-stock-count': 'Stock Count',
    'inventory-variants': 'Variants',
    'inventory-supplier-products': 'Supplier Products',
    'inventory-valuation': 'Valuation',
    'inventory-dead-stock': 'Dead Stock',
    'inventory-returns': 'Returns',
    'inventory-reorder-rules': 'Reorder Rules',
    'inventory-import-export': 'Import / Export',
};

const pageIcons: Record<string, unknown> = {
    dashboard: Store,
    bill: ShoppingBag,
    inventory: Boxes,
    reports: BarChart3,
    menu: FolderOpen,
    profile: Users,
    subscription: CreditCard,
    settings: Settings,
    security: Shield,
    'notifications-settings': BellRing,
    support: FileText,
    'bill-history': FileText,
    'add-product': Package,
    'edit-product': Package,
    scanner: ScanLine,
    'master-categories': Tags,
    'master-brands': Bookmark,
    'master-suppliers': Truck,
    'master-customers': Users,
    'inventory-stock-in': Package,
    'inventory-stock-out': Package,
    'inventory-movements': FileText,
    'inventory-purchase-orders': FileText,
    'inventory-goods-received': FileText,
    'inventory-barcodes': ScanLine,
    'inventory-batches': Calendar,
    'inventory-low-stock': BarChart3,
    'inventory-transfers': Truck,
    'inventory-stock-count': Check,
    'inventory-variants': Tags,
    'inventory-supplier-products': Truck,
    'inventory-valuation': CreditCard,
    'inventory-dead-stock': Package,
    'inventory-returns': RotateCcw,
    'inventory-reorder-rules': Settings,
    'inventory-import-export': FileText,
};

const currentIcon = computed(() => pageIcons[currentScreen.value] || Store);

const isMainScreen = computed(() =>
    ['dashboard', 'bill', 'inventory', 'reports', 'menu'].includes(currentScreen.value)
);
</script>

<template>
    <header
        class="sticky top-0 z-50 bg-surface/80 backdrop-blur-3xl px-6 py-3 flex justify-between items-center max-w-md mx-auto w-full transition-all duration-500">
        <div class="flex items-center gap-4">
            <!-- Dynamic Left Action -->
            <button v-if="!isMainScreen" @click="router.back()"
                class="w-10 h-10 flex items-center justify-center bg-surface-container-high rounded-2xl active:scale-95 transition-all">
                <ArrowLeft class="w-5 h-5 text-primary" />
            </button>

            <div v-else
                class="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-surface-container-highest shadow-sm relative group">
                <img v-if="shopStore.selectedShop.image" :src="shopStore.selectedShop.image" alt="Profile"
                    class="w-full h-full object-cover" />
                <div v-else
                    class="w-full h-full flex items-center justify-center bg-primary text-white font-black text-xs uppercase tracking-tighter">
                    {{ shopStore.selectedShop.name.charAt(0) }}
                </div>
            </div>

            <!-- Contextual Branding -->
            <div @click="shopStore.toggleSwitcher" class="flex flex-col cursor-pointer group">
                <div class="flex items-center gap-1.5">
                    <div v-if="!isMainScreen"
                        class="w-9 h-9 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <component :is="currentIcon" class="w-4.5 h-4.5" />
                    </div>
                    <h1
                        class="text-base font-black text-on-surface leading-tight tracking-tight group-hover:text-primary transition-all">
                        {{ isMainScreen ? shopStore.selectedShop.name : (pageTitles[currentScreen] || 'Layer') }}
                    </h1>
                    <ChevronDown v-if="isMainScreen"
                        class="w-3.5 h-3.5 text-on-surface-variant group-hover:translate-y-0.5 transition-transform" />
                </div>
                <p class="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60">
                    {{ isMainScreen ? shopStore.selectedShop.branch : 'Operational Mode' }}
                </p>
            </div>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center gap-1.5">
            <button v-if="currentScreen === 'product-detail'"
                class="w-10 h-10 flex items-center justify-center bg-surface-container-low rounded-2xl text-on-surface-variant active:scale-95 transition-all">
                <Share2 class="w-5 h-5" />
            </button>
            <button @click="router.push({ name: 'notifications' })"
                class="w-10 h-10 flex items-center justify-center bg-surface-container-low rounded-2xl text-primary relative active:scale-95 transition-all">
                <Bell class="w-5 h-5" />
                <span
                    class="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-surface shadow-sm" />
            </button>
        </div>
    </header>
</template>
