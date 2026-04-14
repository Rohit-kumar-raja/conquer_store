import { createRouter, createWebHistory } from 'vue-router';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.vue';
import GuestLayout from '../layouts/GuestLayout.vue';

const routes = [
    {
        path: '/',
        component: GuestLayout,
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
        children: [
            {
                path: '',
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
                path: 'product/add',
                component: () => import('../pages/AddProduct.vue'),
                name: 'add-product'
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

export default router;
