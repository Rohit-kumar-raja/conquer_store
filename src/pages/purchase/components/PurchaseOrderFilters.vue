<script setup lang="ts">
import { computed } from 'vue';
import { Filter, Search, X } from 'lucide-vue-next';
import { Button, Select, SurfaceCard } from '../../../components';
import type { ProductOption } from '../../../services/productService';
import type { PurchaseOrderFilters } from '../../../types/purchase';

const props = defineProps<{
    modelValue: PurchaseOrderFilters;
    suppliers: ProductOption[];
}>();

const emit = defineEmits<{
    'update:modelValue': [filters: PurchaseOrderFilters];
}>();

const statusOptions = [
    { id: '', name: 'All statuses' },
    { id: 'draft', name: 'Draft' },
    { id: 'pending_approval', name: 'Pending approval' },
    { id: 'approved', name: 'Approved' },
    { id: 'sent', name: 'Sent' },
    { id: 'acknowledged', name: 'Acknowledged' },
    { id: 'confirmed', name: 'Confirmed' },
    { id: 'partially_received', name: 'Partially received' },
    { id: 'received', name: 'Received' },
    { id: 'rejected', name: 'Rejected' },
];

const supplierOptions = computed(() => [
    { id: '', name: 'All suppliers' },
    ...props.suppliers,
]);

const update = (field: keyof PurchaseOrderFilters, value: string) => {
    emit('update:modelValue', { ...props.modelValue, [field]: value });
};

const clear = () => emit('update:modelValue', { search: '', supplier_id: '', status: '' });
</script>

<template>
    <SurfaceCard variant="low" class="p-4 rounded-3xl border border-surface-container-high/30 space-y-3">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <Filter class="w-4 h-4 text-primary" />
                <h3 class="text-xs font-black uppercase tracking-wider text-on-surface">Filter Orders</h3>
            </div>
            <button v-if="modelValue.search || modelValue.supplier_id || modelValue.status"
                type="button" class="flex items-center gap-1 text-[9px] font-black uppercase text-error"
                @click="clear">
                <X class="w-3 h-3" /> Clear
            </button>
        </div>

        <label class="relative block">
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40" />
            <input :value="modelValue.search" type="search" placeholder="Search PO number or supplier"
                class="w-full bg-surface-container-high rounded-2xl py-3.5 pl-11 pr-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20"
                @input="update('search', ($event.target as HTMLInputElement).value)" />
        </label>

        <div class="grid grid-cols-2 gap-3">
            <Select :model-value="modelValue.supplier_id" label="Supplier" :options="supplierOptions"
                option-label="name" option-value="id" filter append-to="body"
                @update:model-value="update('supplier_id', $event || '')" />
            <Select :model-value="modelValue.status" label="Status" :options="statusOptions"
                option-label="name" option-value="id" append-to="body"
                @update:model-value="update('status', $event || '')" />
        </div>
    </SurfaceCard>
</template>
