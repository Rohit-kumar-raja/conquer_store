<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ClipboardPenLine, Plus, RefreshCw } from 'lucide-vue-next';
import { Button, SurfaceCard } from '../../components';
import { productService, type Product, type ProductOptions } from '../../services/productService';
import { purchaseApi } from '../../services/purchaseApi';
import type { CreatePurchaseRequisitionInput, PurchaseRequisition, PurchaseOrderMode } from '../../types/purchase';
import PurchaseRequisitionCard from './components/PurchaseRequisitionCard.vue';
import PurchaseRequisitionForm from './components/PurchaseRequisitionForm.vue';

const requisitions = ref<PurchaseRequisition[]>([]);
const products = ref<Product[]>([]);
const options = ref<ProductOptions>({ categories: [], subcategories: [], brands: [], suppliers: [], units: [], warehouses: [], tracking_types: [], valuation_methods: [] });
const mode = ref<PurchaseOrderMode>('direct');
const loading = ref(true); const saving = ref(false); const busyId = ref(''); const showForm = ref(false); const error = ref('');

const load = async () => {
    loading.value = true; error.value = '';
    try {
        const [data, settings, productData, optionData] = await Promise.all([purchaseApi.getPurchaseRequisitions(), purchaseApi.getSettings(), productService.getProducts(), productService.getProductOptions()]);
        requisitions.value = data; mode.value = settings.purchase_order_mode; products.value = productData; options.value = optionData;
    } catch (cause) { error.value = cause instanceof Error ? cause.message : 'Unable to load requisitions.'; }
    finally { loading.value = false; }
};
const create = async (input: CreatePurchaseRequisitionInput) => { saving.value = true; try { await purchaseApi.createPurchaseRequisition(input); showForm.value = false; await load(); } catch (cause) { error.value = cause instanceof Error ? cause.message : 'Unable to create requisition.'; } finally { saving.value = false; } };
const submit = async (item: PurchaseRequisition) => { busyId.value = item.id; try { await purchaseApi.submitPurchaseRequisition(item.id); await load(); } catch (cause) { error.value = cause instanceof Error ? cause.message : 'Unable to submit requisition.'; } finally { busyId.value = ''; } };
onMounted(load);
</script>

<template>
    <div class="px-5 pt-3 pb-36 max-w-md mx-auto space-y-5">
        <SurfaceCard class="p-5 rounded-4xl bg-primary-gradient text-white flex justify-between items-center"><div><p class="text-[9px] font-black uppercase tracking-widest text-white/60">Purchasing</p><h1 class="text-2xl font-black mt-1">Requisitions</h1><p class="text-[10px] font-bold text-white/60 mt-1">{{ mode === 'requisition_required' ? 'Required before purchase orders' : 'Optional purchasing workflow' }}</p></div><ClipboardPenLine class="w-10 h-10 text-white/80" /></SurfaceCard>
        <p v-if="mode === 'direct'" class="p-4 rounded-2xl bg-error/10 text-error text-xs font-bold">Requisitions are disabled in Store Settings.</p>
        <p v-if="error" class="p-3 rounded-2xl bg-error/10 text-error text-xs font-bold">{{ error }}</p>
        <div class="flex justify-between"><h2 class="text-sm font-black">Recent Requisitions</h2><button class="text-primary" @click="load"><RefreshCw :class="['w-4 h-4', loading && 'animate-spin']" /></button></div>
        <div v-if="loading" class="py-12 text-center text-xs font-black text-on-surface-variant/45">Loading requisitions...</div>
        <div v-else-if="!requisitions.length" class="py-12 text-center rounded-3xl bg-surface-container-low"><ClipboardPenLine class="w-9 h-9 mx-auto text-primary/50" /><p class="text-sm font-black mt-3">No requisitions yet</p></div>
        <section v-else class="space-y-3"><PurchaseRequisitionCard v-for="item in requisitions" :key="item.id" :requisition="item" :busy="busyId === item.id" @submit="submit" /></section>
        <div v-if="mode !== 'direct'" class="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-surface/90 backdrop-blur-xl border-t border-surface-container-high p-4 pb-9 z-[60]"><Button class="w-full" @click="showForm = true"><Plus class="w-5 h-5" /> New Requisition</Button></div>
        <PurchaseRequisitionForm v-if="showForm" :warehouses="options.warehouses" :products="products" :saving="saving" @close="showForm = false" @submit="create" />
    </div>
</template>
