import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('../pages/Dashboard.vue'),
        name: 'dashboard'
    },
    {
        path: '/scanner',
        component: () => import('../pages/Scanner.vue'),
        name: 'scanner'
    },
    {
        path: '/bill',
        component: () => import('../pages/Bill.vue'),
        name: 'bill'
    },
    {
        path: '/inventory',
        component: () => import('../pages/StockManager.vue'),
        name: 'inventory'
    },
    {
        path: '/reports',
        component: () => import('../pages/Reports.vue'),
        name: 'reports'
    },
    {
        path: '/product/:id',
        component: () => import('../pages/ProductDetail.vue'),
        name: 'product-detail'
    },
    {
        path: '/product/add',
        component: () => import('../pages/AddProduct.vue'),
        name: 'add-product'
    },
    {
        path: '/menu',
        component: () => import('../pages/Menu.vue'),
        name: 'menu'
    },
    {
        path: '/menu/profile',
        component: () => import('../pages/Profile.vue'),
        name: 'profile'
    },
    {
        path: '/menu/subscription',
        component: () => import('../pages/Subscription.vue'),
        name: 'subscription'
    },
    {
        path: '/menu/settings',
        component: () => import('../pages/Settings.vue'),
        name: 'settings'
    },
    {
        path: '/menu/security',
        component: () => import('../pages/Security.vue'),
        name: 'security'
    },
    {
        path: '/menu/notifications',
        component: () => import('../pages/NotificationsSettings.vue'),
        name: 'notifications-settings'
    },
    {
        path: '/menu/support',
        component: () => import('../pages/Support.vue'),
        name: 'support'
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
