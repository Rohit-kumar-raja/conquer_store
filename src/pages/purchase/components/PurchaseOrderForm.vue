<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Minus, Plus, X } from 'lucide-vue-next';
import { Button, Select, SurfaceCard } from '../../../components';
import type { Product, ProductOption } from '../../../services/productService';
import type { CreatePurchaseOrderInput, PurchaseOrderItem, PurchaseOrderMode, PurchaseRequisition } from '../../../types/purchase';

const props = defineProps<{
    mode: PurchaseOrderMode;
    suppliers: ProductOption[];
    warehouses: ProductOption[];
    products: Product[];
    requisitions: PurchaseRequisition[];
    saving?: boolean;
}>();
const emit = defineEmits<{ close: []; submit: [input: CreatePurchaseOrderInput] }>();

const supplierId = ref('');
const warehouseId = ref('');
const requisitionId = ref('');
const expectedDate = ref('');
const items = ref<PurchaseOrderItem[]>([blankItem()]);
const selectedProductIds = ref<string[]>(['']);

function blankItem(): PurchaseOrderItem {
    return { item_name: '', sku: '', ordered_qty: 1, unit_price: 0, tax_rate: 0 };
}

watch(requisitionId, (id) => {
    const requisition = props.requisitions.find((item) => item.id === id);
    if (!requisition) {
        if (props.mode === 'requisition_optional') {
            warehouseId.value = '';
            items.value = [blankItem()];
            selectedProductIds.value = [''];
        }
        return;
    }
    warehouseId.value = requisition.warehouse_id;
    items.value = requisition.items.map((item) => ({
        requisition_item_id: item.id,
        item_name: item.item_name,
        sku: item.sku,
        unit_id: item.unit_id,
        ordered_qty: item.approved_qty ?? item.requested_qty,
        unit_price: 0,
        tax_rate: 0,
    }));
});

const total = computed(() => items.value.reduce((sum, item) => {
    const subtotal = item.ordered_qty * item.unit_price;
    return sum + subtotal + subtotal * item.tax_rate / 100;
}, 0));

const requisitionEnabled = computed(() => props.mode !== 'direct');
const requisitionRequired = computed(() => props.mode === 'requisition_required');

const productOptions = computed(() => props.products.map((product) => ({
    id: product.id,
    name: `${product.name} · ${product.sku}`,
})));

const chooseProduct = (index: number, productId: string) => {
    const product = props.products.find((item) => item.id === productId);
    if (!product) return;
    items.value[index] = { ...items.value[index], item_name: product.name, sku: product.sku, unit_price: product.sellingPrice || 0 };
};

const addItem = () => {
    items.value.push(blankItem());
    selectedProductIds.value.push('');
};

const removeItem = (index: number) => {
    items.value.splice(index, 1);
    selectedProductIds.value.splice(index, 1);
};

const submit = () => {
    if (!supplierId.value || !warehouseId.value || items.value.some((item) => !item.item_name || item.ordered_qty <= 0)) return;
    emit('submit', {
        requisition_id: requisitionId.value || undefined,
        supplier_id: supplierId.value,
        warehouse_id: warehouseId.value,
        expected_delivery_date: expectedDate.value || undefined,
        items: items.value,
    });
};
</script>

<template>
    <div class="fixed inset-0 z-[80] bg-black/45 backdrop-blur-sm flex items-end justify-center">
        <SurfaceCard class="w-full max-w-md max-h-[92vh] overflow-y-auto rounded-t-[2rem] p-5 pb-10 space-y-5">
            <div class="flex items-center justify-between">
                <div><h2 class="text-xl font-black text-on-surface">New Purchase Order</h2><p class="text-[10px] font-bold text-on-surface-variant/45 mt-1">{{ mode === 'requisition_required' ? 'Select a submitted requisition' : mode === 'requisition_optional' ? 'Link a requisition or create directly' : 'Create directly for a supplier' }}</p></div>
                <button class="w-10 h-10 rounded-2xl bg-surface-container-high flex items-center justify-center" @click="emit('close')"><X class="w-5 h-5" /></button>
            </div>

            <div v-if="requisitionEnabled" class="space-y-2">
                <Select v-model="requisitionId" :label="requisitionRequired ? 'Requisition *' : 'Requisition (Optional)'" :options="requisitions"
                    option-label="number" option-value="id" placeholder="Select requisition" filter append-to="body" />
                <p v-if="!requisitions.length" :class="['text-xs font-bold', requisitionRequired ? 'text-error' : 'text-on-surface-variant/50']">No submitted requisitions are available.</p>
            </div>
            <div class="grid grid-cols-2 gap-3">
                <Select v-model="supplierId" label="Supplier *" :options="suppliers" option-label="name"
                    option-value="id" placeholder="Select supplier" filter append-to="body" />
                <Select v-model="warehouseId" label="Warehouse *" :options="warehouses" option-label="name"
                    option-value="id" placeholder="Select warehouse" filter append-to="body" :disabled="!!requisitionId" />
            </div>
            <label class="block space-y-1"><span class="text-[9px] font-black uppercase text-on-surface-variant/50">Expected delivery</span><input v-model="expectedDate" type="date" class="w-full bg-surface-container-high rounded-2xl p-4 font-bold" /></label>

            <section class="space-y-3">
                <div class="flex justify-between"><h3 class="text-sm font-black">Order Items</h3><button v-if="!requisitionId" type="button" class="text-xs font-black text-primary" @click="addItem"><Plus class="w-4 h-4 inline" /> Add</button></div>
                <div v-for="(item, index) in items" :key="index" class="p-4 rounded-3xl bg-surface-container-low space-y-3">
                    <div class="flex items-center gap-2">
                        <Select v-if="!requisitionId" v-model="selectedProductIds[index]" label="Product *"
                            container-class="flex-1" :options="productOptions" option-label="name" option-value="id"
                            placeholder="Select product" filter append-to="body"
                            @update:model-value="chooseProduct(index, $event)" />
                        <p v-else class="flex-1 text-sm font-black">{{ item.item_name }}</p>
                        <button v-if="!requisitionId && items.length > 1" type="button"
                            class="w-10 h-10 rounded-xl bg-error/10" @click="removeItem(index)">
                            <Minus class="w-4 h-4 text-error mx-auto" />
                        </button>
                    </div>
                    <div class="grid grid-cols-3 gap-2"><input v-model.number="item.ordered_qty" type="number" min="0.001" step="0.001" placeholder="Qty" class="bg-surface-container-high rounded-xl p-3 text-sm font-bold" /><input v-model.number="item.unit_price" type="number" min="0" step="0.01" placeholder="Price" class="bg-surface-container-high rounded-xl p-3 text-sm font-bold" /><input v-model.number="item.tax_rate" type="number" min="0" step="0.01" placeholder="Tax %" class="bg-surface-container-high rounded-xl p-3 text-sm font-bold" /></div>
                </div>
            </section>
            <div class="flex items-center justify-between"><span class="text-xs font-black uppercase text-on-surface-variant/45">Order total</span><strong class="text-xl">₹{{ total.toFixed(2) }}</strong></div>
            <Button class="w-full" :disabled="saving || (requisitionRequired && !requisitionId)" @click="submit">{{ saving ? 'Creating...' : 'Create Draft PO' }}</Button>
        </SurfaceCard>
    </div>
</template>
