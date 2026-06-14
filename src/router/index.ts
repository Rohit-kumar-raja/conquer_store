import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.vue';
import GuestLayout from '../layouts/GuestLayout.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/',
        component: GuestLayout,
        meta: { guest: true },
        children: [
            {
                path: 'login',
                component: () => import('../pages/Auth.vue'),
                name: 'login'
            }
        ]
    },
    {
        path: '',
        component: AuthenticatedLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: 'dashboard',
                component: () => import('../pages/Dashboard.vue'),
                name: 'dashboard'
            },
            {
                path: 'scanner',
                component: () => import('../pages/Scanner.vue'),
                name: 'scanner'
            },
            {
                path: 'bill',
                component: () => import('../pages/Bill.vue'),
                name: 'bill'
            },
            {
                path: 'bill/history',
                component: () => import('../pages/BillHistory.vue'),
                name: 'bill-history'
            },
            {
                path: 'notifications',
                component: () => import('../pages/Notifications.vue'),
                name: 'notifications'
            },
            {
                path: 'inventory',
                component: () => import('../pages/StockManager.vue'),
                name: 'inventory'
            },
            {
                path: 'reports',
                component: () => import('../pages/Reports.vue'),
                name: 'reports'
            },
            {
                path: 'product/:id',
                component: () => import('../pages/ProductDetail.vue'),
                name: 'product-detail'
            },
            {
                path: 'product/:id/edit',
                component: () => import('../pages/EditProduct.vue'),
                name: 'edit-product'
            },
            {
                path: 'product/add',
                component: () => import('../pages/AddProduct.vue'),
                name: 'add-product'
            },
            {
                path: 'inventory/stock-in',
                component: () => import('../pages/inventory/InventoryWorkflow.vue'),
                name: 'inventory-stock-in'
            },
            {
                path: 'inventory/stock-out',
                component: () => import('../pages/inventory/InventoryWorkflow.vue'),
                name: 'inventory-stock-out'
            },
            {
                path: 'inventory/movements',
                component: () => import('../pages/inventory/InventoryWorkflow.vue'),
                name: 'inventory-movements'
            },
            {
                path: 'inventory/purchase-orders',
                component: () => import('../pages/purchase/PurchaseOrders.vue'),
                name: 'inventory-purchase-orders'
            },
            {
                path: 'inventory/purchase-requisitions',
                component: () => import('../pages/purchase/PurchaseRequisitions.vue'),
                name: 'inventory-purchase-requisitions'
            },
            {
                path: 'inventory/goods-received',
                component: () => import('../pages/inventory/InventoryWorkflow.vue'),
                name: 'inventory-goods-received'
            },
            {
                path: 'inventory/barcodes',
                component: () => import('../pages/inventory/InventoryWorkflow.vue'),
                name: 'inventory-barcodes'
            },
            {
                path: 'inventory/batches',
                component: () => import('../pages/inventory/InventoryWorkflow.vue'),
                name: 'inventory-batches'
            },
            {
                path: 'inventory/low-stock',
                component: () => import('../pages/inventory/InventoryWorkflow.vue'),
                name: 'inventory-low-stock'
            },
            {
                path: 'inventory/transfers',
                component: () => import('../pages/inventory/InventoryWorkflow.vue'),
                name: 'inventory-transfers'
            },
            {
                path: 'inventory/stock-count',
                component: () => import('../pages/inventory/InventoryWorkflow.vue'),
                name: 'inventory-stock-count'
            },
            {
                path: 'inventory/variants',
                component: () => import('../pages/inventory/InventoryWorkflow.vue'),
                name: 'inventory-variants'
            },
            {
                path: 'inventory/supplier-products',
                component: () => import('../pages/inventory/InventoryWorkflow.vue'),
                name: 'inventory-supplier-products'
            },
            {
                path: 'inventory/valuation',
                component: () => import('../pages/inventory/InventoryWorkflow.vue'),
                name: 'inventory-valuation'
            },
            {
                path: 'inventory/dead-stock',
                component: () => import('../pages/inventory/InventoryWorkflow.vue'),
                name: 'inventory-dead-stock'
            },
            {
                path: 'inventory/returns',
                component: () => import('../pages/inventory/InventoryWorkflow.vue'),
                name: 'inventory-returns'
            },
            {
                path: 'inventory/reorder-rules',
                component: () => import('../pages/inventory/InventoryWorkflow.vue'),
                name: 'inventory-reorder-rules'
            },
            {
                path: 'inventory/import-export',
                component: () => import('../pages/inventory/InventoryWorkflow.vue'),
                name: 'inventory-import-export'
            },
            {
                path: 'menu',
                component: () => import('../pages/Menu.vue'),
                name: 'menu'
            },
            {
                path: 'menu/profile',
                component: () => import('../pages/Profile.vue'),
                name: 'profile'
            },
            {
                path: 'menu/subscription',
                component: () => import('../pages/Subscription.vue'),
                name: 'subscription'
            },
            {
                path: 'menu/settings',
                component: () => import('../pages/Settings.vue'),
                name: 'settings'
            },
            {
                path: 'menu/security',
                component: () => import('../pages/Security.vue'),
                name: 'security'
            },
            {
                path: 'menu/notifications',
                component: () => import('../pages/NotificationsSettings.vue'),
                name: 'notifications-settings'
            },
            {
                path: 'menu/support',
                component: () => import('../pages/Support.vue'),
                name: 'support'
            },
            {
                path: 'menu/masterdata/categories',
                component: () => import('../pages/masterdata/CategoryManagement.vue'),
                name: 'master-categories'
            },
            {
                path: 'menu/masterdata/brands',
                component: () => import('../pages/masterdata/BrandManagement.vue'),
                name: 'master-brands'
            },
            {
                path: 'menu/masterdata/suppliers',
                component: () => import('../pages/masterdata/SupplierManagement.vue'),
                name: 'master-suppliers'
            },
            {
                path: 'menu/masterdata/customers',
                component: () => import('../pages/masterdata/CustomerManagement.vue'),
                name: 'master-customers'
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Navigation guard
router.beforeEach((to, _from, next) => {
    const token = localStorage.getItem('cnq_token');
    const isAuthenticated = !!token;

    if (to.matched.some(r => r.meta.requiresAuth) && !isAuthenticated) {
        next({ name: 'login' });
    } else if (to.matched.some(r => r.meta.guest) && isAuthenticated && to.name === 'login') {
        next({ name: 'dashboard' });
    } else {
        next();
    }
});

export default router;
