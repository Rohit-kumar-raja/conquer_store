<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import {
    Bell,
    ArrowLeft,
    Share2,
    ChevronDown,
    BellRing,
    CreditCard,
    FileText,
    Settings,
    Shield,
    Store,
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

const pageSubtitles: Record<string, string> = {
    profile: 'Account and business details',
    subscription: 'Plan, billing, and usage',
    settings: 'Taxes, currency, and branding',
    security: 'Staff permissions and access',
    'notifications-settings': 'Alerts and report preferences',
    support: 'Docs, chat, and feedback',
    notifications: 'System alerts and activity',
    'bill-history': 'Saved bills and receipts',
    scanner: 'Scan products and bills',
    'master-categories': 'Manage product categories',
    'master-brands': 'Manage brand catalog',
    'master-suppliers': 'Manage vendor records',
    'master-customers': 'Manage customer records',
    'product-detail': 'Catalog details and stock view',
    'edit-product': 'Update product information',
    'add-product': 'Create a new product record',
    'inventory-stock-in': 'Receive stock from supplier bills',
    'inventory-stock-out': 'Adjust stock out and losses',
    'inventory-movements': 'Track stock movement history',
    'inventory-purchase-orders': 'Create supplier purchase orders',
    'inventory-goods-received': 'Confirm goods received notes',
    'inventory-barcodes': 'Print and manage codes',
    'inventory-batches': 'Batch and expiry tracking',
    'inventory-low-stock': 'Monitor low stock alerts',
    'inventory-transfers': 'Move stock between locations',
    'inventory-stock-count': 'Run stock audit counts',
    'inventory-variants': 'Manage product variants',
    'inventory-supplier-products': 'Map products to suppliers',
    'inventory-valuation': 'Review stock value and margin',
    'inventory-dead-stock': 'Review slow moving items',
    'inventory-returns': 'Handle customer and supplier returns',
    'inventory-reorder-rules': 'Set min and max stock rules',
    'inventory-import-export': 'Bulk import and export data',
};

const pageSubtitle = computed(() => pageSubtitles[currentScreen.value] || 'Operational Mode');

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
                    <h1
                        class="text-base font-black text-on-surface leading-tight tracking-tight group-hover:text-primary transition-all">
                        {{ isMainScreen ? shopStore.selectedShop.name : (pageTitles[currentScreen] || 'Layer') }}
                    </h1>
                    <ChevronDown v-if="isMainScreen"
                        class="w-3.5 h-3.5 text-on-surface-variant group-hover:translate-y-0.5 transition-transform" />
                </div>
                <p class="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60">
                    {{ isMainScreen ? shopStore.selectedShop.branch : pageSubtitle }}
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
