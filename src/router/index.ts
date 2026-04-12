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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
