<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Plus, Save } from 'lucide-vue-next';
import { Button, Select } from '../..';
import type { MasterCreateInput, MasterRecord, MasterType } from '../../../types/masterData';

const props = defineProps<{
    type: MasterType;
    singular: string;
    record?: MasterRecord;
    parentField?: 'category_id' | 'brand_id';
    parentLabel?: string;
    parentOptions?: MasterRecord[];
    saving?: boolean;
    error?: string;
}>();
const emit = defineEmits<{ save: [payload: MasterCreateInput]; cancel: [] }>();
const inputClass = 'w-full bg-surface-container-high rounded-2xl px-4 py-3.5 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20';

const form = ref<Record<string, string | number | boolean>>({});
const reset = () => {
    const record = props.record;
    form.value = {
        name: record?.name || '', code: record?.code || '', description: record?.description || '',
        category_id: record?.category_id || '', brand_id: record?.brand_id || '', symbol: record?.symbol || '',
        rate: record?.rate || 0, contact_person: record?.contact_person || '', phone: record?.phone || '',
        email: record?.email || '', gst_number: record?.gst_number || '', address: record?.address || '',
        is_default: record?.is_default || false,
    };
};
watch(() => props.record, reset, { immediate: true });

const valid = computed(() => {
    if (!String(form.value.name || '').trim()) return false;
    if (props.parentField && !form.value[props.parentField]) return false;
    if (props.type === 'units' && !String(form.value.symbol || '').trim()) return false;
    if (props.type === 'warehouses' && !String(form.value.code || '').trim()) return false;
    return true;
});

const submit = () => {
    if (!valid.value) return;
    const payload: MasterCreateInput = { name: String(form.value.name).trim() };
    const strings = ['code', 'description', 'contact_person', 'phone', 'email', 'gst_number', 'address', 'symbol'] as const;
    for (const field of strings) {
        const value = String(form.value[field] || '').trim();
        if (value || props.record) payload[field] = value || undefined;
    }
    if (props.parentField) payload[props.parentField] = String(form.value[props.parentField]);
    if (props.type === 'taxes') payload.rate = Number(form.value.rate || 0);
    if (props.type === 'warehouses') payload.is_default = Boolean(form.value.is_default);
    emit('save', payload);
};
</script>

<template>
    <div class="space-y-4">
        <p v-if="error" class="rounded-2xl bg-error/10 px-4 py-3 text-xs font-bold text-error">{{ error }}</p>
        <Select v-if="parentField" v-model="form[parentField]" :label="`${parentLabel} *`"
            :options="parentOptions || []" option-label="name" option-value="id" filter append-to="body" />
        <input v-model="form.name" :placeholder="`${singular} name *`" :class="inputClass" />
        <input v-if="type !== 'taxes'" v-model="form.code" :placeholder="type === 'warehouses' ? 'Code *' : 'Code (optional)'" :class="inputClass" />
        <input v-if="type === 'units'" v-model="form.symbol" placeholder="Symbol * (e.g. kg, pcs)" :class="inputClass" />
        <input v-if="type === 'taxes'" v-model.number="form.rate" type="number" min="0" step="0.01" placeholder="Tax rate %" :class="inputClass" />
        <template v-if="type === 'suppliers' || type === 'customers'">
            <input v-if="type === 'suppliers'" v-model="form.contact_person" placeholder="Contact person" :class="inputClass" />
            <div class="grid grid-cols-2 gap-3"><input v-model="form.phone" placeholder="Phone" :class="inputClass" /><input v-model="form.email" type="email" placeholder="Email" :class="inputClass" /></div>
            <input v-model="form.gst_number" placeholder="GST number" :class="inputClass" />
        </template>
        <textarea v-if="['warehouses', 'suppliers', 'customers'].includes(type)" v-model="form.address" rows="2" placeholder="Address" :class="[inputClass, 'resize-none']" />
        <textarea v-else v-model="form.description" rows="2" placeholder="Description (optional)" :class="[inputClass, 'resize-none']" />
        <label v-if="type === 'warehouses'" class="flex items-center gap-3 p-4 rounded-2xl bg-surface-container-high"><input v-model="form.is_default" type="checkbox" class="w-5 h-5 accent-primary" /><span class="text-sm font-black">Default warehouse</span></label>
        <div class="grid grid-cols-2 gap-3">
            <Button variant="secondary" @click="emit('cancel')">Cancel</Button>
            <Button :disabled="saving || !valid" @click="submit">
                <Save v-if="record" class="w-4 h-4" /><Plus v-else class="w-4 h-4" />
                {{ saving ? 'Saving...' : record ? 'Update' : 'Create' }}
            </Button>
        </div>
    </div>
</template>
