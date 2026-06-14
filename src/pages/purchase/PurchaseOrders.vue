<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { ClipboardList, Plus, RefreshCw } from 'lucide-vue-next';
import { Button, SurfaceCard } from '../../components';
import { productService, type Product, type ProductOptions } from '../../services/productService';
import { purchaseApi } from '../../services/purchaseApi';
import type { CreatePurchaseOrderInput, PurchaseOrder, PurchaseOrderFilters as OrderFilters, PurchaseOrderMode, PurchaseRequisition } from '../../types/purchase';
import PurchaseOrderCard from './components/PurchaseOrderCard.vue';
import PurchaseOrderFilters from './components/PurchaseOrderFilters.vue';
import PurchaseOrderForm from './components/PurchaseOrderForm.vue';

const orders = ref<PurchaseOrder[]>([]);
const requisitions = ref<PurchaseRequisition[]>([]);
const products = ref<Product[]>([]);
const options = ref<ProductOptions>({ categories: [], subcategories: [], brands: [], suppliers: [], units: [], warehouses: [], tracking_types: [], valuation_methods: [] });
const mode = ref<PurchaseOrderMode>('direct');
const loading = ref(true);
const saving = ref(false);
const busyId = ref('');
const showForm = ref(false);
const error = ref('');
const filters = ref<OrderFilters>({ search: '', supplier_id: '', status: '' });

const stats = computed(() => ({ draft: orders.value.filter((item) => item.status === 'draft').length, pending: orders.value.filter((item) => item.status === 'pending_approval').length, active: orders.value.filter((item) => ['approved', 'sent', 'acknowledged', 'confirmed'].includes(item.status)).length }));

const filteredOrders = computed(() => {
    const search = filters.value.search.trim().toLowerCase();
    return orders.value.filter((order) => {
        const matchesSearch = !search
            || order.number.toLowerCase().includes(search)
            || (order.supplier_name || '').toLowerCase().includes(search);
        const matchesSupplier = !filters.value.supplier_id || order.supplier_id === filters.value.supplier_id;
        const matchesStatus = !filters.value.status || order.status === filters.value.status;
        return matchesSearch && matchesSupplier && matchesStatus;
    });
});

const load = async () => {
    loading.value = true; error.value = '';
    try {
        const [orderData, settings, optionData, productData, requisitionData] = await Promise.all([purchaseApi.getPurchaseOrders(), purchaseApi.getSettings(), productService.getProductOptions(), productService.getProducts(), purchaseApi.getPurchaseRequisitions()]);
        orders.value = orderData; mode.value = settings.purchase_order_mode; options.value = optionData; products.value = productData; requisitions.value = requisitionData;
    } catch (cause) { error.value = cause instanceof Error ? cause.message : 'Unable to load purchase orders.'; }
    finally { loading.value = false; }
};

const create = async (input: CreatePurchaseOrderInput) => {
    saving.value = true; error.value = '';
    try { await purchaseApi.createPurchaseOrder(input); showForm.value = false; await load(); }
    catch (cause) { error.value = cause instanceof Error ? cause.message : 'Unable to create purchase order.'; }
    finally { saving.value = false; }
};

const action = async (name: 'submit' | 'approve' | 'send', order: PurchaseOrder) => {
    busyId.value = order.id; error.value = '';
    try {
        if (name === 'submit') await purchaseApi.submitPurchaseOrder(order.id);
        if (name === 'approve') await purchaseApi.approvePurchaseOrder(order.id);
        if (name === 'send') await purchaseApi.sendPurchaseOrder(order.id);
        await load();
    } catch (cause) { error.value = cause instanceof Error ? cause.message : 'Unable to update purchase order.'; }
    finally { busyId.value = ''; }
};

onMounted(load);
</script>

<template>
    <div class="px-5 pt-3 pb-36 max-w-md mx-auto space-y-5">
        <SurfaceCard class="p-5 rounded-4xl bg-primary-gradient text-white flex items-center justify-between"><div><p class="text-[9px] font-black uppercase tracking-widest text-white/60">Purchasing</p><h1 class="text-2xl font-black mt-1">Purchase Orders</h1><p class="text-[10px] font-bold text-white/60 mt-1">{{ mode === 'requisition_required' ? 'Requisition required' : mode === 'requisition_optional' ? 'Requisition optional' : 'Requisitions disabled' }}</p></div><ClipboardList class="w-10 h-10 text-white/80" /></SurfaceCard>
        <section class="grid grid-cols-3 gap-3"><SurfaceCard v-for="item in [{ label: 'Draft', value: stats.draft }, { label: 'Pending', value: stats.pending }, { label: 'Active', value: stats.active }]" :key="item.label" variant="low" class="p-4 rounded-3xl text-center"><strong class="text-xl text-primary">{{ item.value }}</strong><p class="text-[8px] font-black uppercase text-on-surface-variant/45 mt-1">{{ item.label }}</p></SurfaceCard></section>
        <p v-if="error" class="p-3 rounded-2xl bg-error/10 text-error text-xs font-bold">{{ error }}</p>
        <PurchaseOrderFilters v-model="filters" :suppliers="options.suppliers" />
        <div class="flex items-center justify-between"><h2 class="text-sm font-black">Recent Orders</h2><button class="text-primary" :disabled="loading" @click="load"><RefreshCw :class="['w-4 h-4', loading && 'animate-spin']" /></button></div>
        <div v-if="loading" class="py-12 text-center text-xs font-black text-on-surface-variant/45">Loading purchase orders...</div>
        <div v-else-if="!filteredOrders.length" class="py-12 text-center rounded-3xl bg-surface-container-low"><ClipboardList class="w-9 h-9 mx-auto text-primary/50" /><p class="text-sm font-black mt-3">{{ orders.length ? 'No orders match these filters' : 'No purchase orders yet' }}</p></div>
        <section v-else class="space-y-3"><PurchaseOrderCard v-for="order in filteredOrders" :key="order.id" :order="order" :busy="busyId === order.id" @action="action" /></section>
        <div class="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-surface/90 backdrop-blur-xl border-t border-surface-container-high p-4 pb-9 z-[60]"><Button class="w-full" @click="showForm = true"><Plus class="w-5 h-5" /> New Purchase Order</Button></div>
        <PurchaseOrderForm v-if="showForm" :mode="mode" :suppliers="options.suppliers" :warehouses="options.warehouses" :products="products" :requisitions="requisitions" :saving="saving" @close="showForm = false" @submit="create" />
    </div>
</template>
