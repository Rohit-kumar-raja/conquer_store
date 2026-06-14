<script setup lang="ts">
import { computed, ref } from 'vue';
import { Minus, Plus, X } from 'lucide-vue-next';
import { Button, Select, SurfaceCard } from '../../../components';
import type { Product, ProductOption } from '../../../services/productService';
import type { CreatePurchaseRequisitionInput } from '../../../types/purchase';

const props = defineProps<{ warehouses: ProductOption[]; products: Product[]; saving?: boolean }>();
const emit = defineEmits<{ close: []; submit: [input: CreatePurchaseRequisitionInput] }>();

const warehouseId = ref('');
const requiredBy = ref('');
const remarks = ref('');
const productIds = ref<string[]>(['']);
const items = ref<CreatePurchaseRequisitionInput['items']>([{ item_name: '', sku: '', requested_qty: 1 }]);
const productOptions = computed(() => props.products.map((item) => ({ id: item.id, name: `${item.name} · ${item.sku}` })));

const chooseProduct = (index: number, id: string) => {
    const product = props.products.find((item) => item.id === id);
    if (product) items.value[index] = { ...items.value[index], item_name: product.name, sku: product.sku };
};
const addItem = () => { productIds.value.push(''); items.value.push({ item_name: '', sku: '', requested_qty: 1 }); };
const removeItem = (index: number) => { productIds.value.splice(index, 1); items.value.splice(index, 1); };
const submit = () => {
    if (!warehouseId.value || items.value.some((item) => !item.item_name || item.requested_qty <= 0)) return;
    emit('submit', { warehouse_id: warehouseId.value, required_by: requiredBy.value || undefined, remarks: remarks.value || undefined, items: items.value });
};
</script>

<template>
    <div class="fixed inset-0 z-[80] bg-black/45 backdrop-blur-sm flex items-end justify-center">
        <SurfaceCard class="w-full max-w-md max-h-[92vh] overflow-y-auto rounded-t-[2rem] p-5 pb-10 space-y-5">
            <div class="flex items-center justify-between"><div><h2 class="text-xl font-black">New Requisition</h2><p class="text-[10px] font-bold text-on-surface-variant/45 mt-1">Request products before creating a PO</p></div><button class="w-10 h-10 rounded-2xl bg-surface-container-high" @click="emit('close')"><X class="w-5 h-5 mx-auto" /></button></div>
            <Select v-model="warehouseId" label="Warehouse *" :options="warehouses" option-label="name" option-value="id" placeholder="Select warehouse" filter append-to="body" />
            <label class="block space-y-1"><span class="text-[9px] font-black uppercase text-on-surface-variant/50">Required by</span><input v-model="requiredBy" type="date" class="w-full bg-surface-container-high rounded-2xl p-4 font-bold" /></label>
            <label class="block space-y-1"><span class="text-[9px] font-black uppercase text-on-surface-variant/50">Remarks</span><textarea v-model="remarks" rows="2" class="w-full bg-surface-container-high rounded-2xl p-4 font-bold resize-none" /></label>
            <section class="space-y-3">
                <div class="flex justify-between"><h3 class="text-sm font-black">Requested Items</h3><button class="text-xs font-black text-primary" @click="addItem"><Plus class="w-4 h-4 inline" /> Add</button></div>
                <div v-for="(item, index) in items" :key="index" class="p-4 rounded-3xl bg-surface-container-low space-y-3">
                    <div class="flex items-center gap-2"><Select v-model="productIds[index]" label="Product *" container-class="flex-1" :options="productOptions" option-label="name" option-value="id" filter append-to="body" @update:model-value="chooseProduct(index, $event)" /><button v-if="items.length > 1" class="w-10 h-10 rounded-xl bg-error/10" @click="removeItem(index)"><Minus class="w-4 h-4 text-error mx-auto" /></button></div>
                    <input v-model.number="item.requested_qty" type="number" min="0.001" step="0.001" placeholder="Requested quantity" class="w-full bg-surface-container-high rounded-xl p-3 text-sm font-bold" />
                </div>
            </section>
            <Button class="w-full" :disabled="saving" @click="submit">{{ saving ? 'Creating...' : 'Create Draft Requisition' }}</Button>
        </SurfaceCard>
    </div>
</template>
