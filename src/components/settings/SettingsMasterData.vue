<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, type Component } from 'vue';
import { Award, Boxes, ChevronLeft, ChevronRight, Layers, Percent, Plus, Ruler, Tags, Truck, Users, Warehouse, X } from 'lucide-vue-next';
import { Button, SurfaceCard } from '..';
import { inventoryApi } from '../../services/inventoryApi';
import type { MasterCreateInput, MasterRecord, MasterType } from '../../types/masterData';
import MasterDataForm from './masterData/MasterDataForm.vue';
import MasterDataList from './masterData/MasterDataList.vue';
import MasterDataSearch from './masterData/MasterDataSearch.vue';

interface MasterDefinition {
    type: MasterType; label: string; singular: string; icon: Component; color: string;
    parentType?: MasterType; parentField?: 'category_id' | 'brand_id'; parentLabel?: string;
}

const definitions: MasterDefinition[] = [
    { type: 'categories', label: 'Categories', singular: 'Category', icon: Tags, color: 'bg-primary/10 text-primary' },
    { type: 'subcategories', label: 'Subcategories', singular: 'Subcategory', icon: Layers, color: 'bg-secondary/10 text-secondary', parentType: 'categories', parentField: 'category_id', parentLabel: 'Category' },
    { type: 'brands', label: 'Brands', singular: 'Brand', icon: Award, color: 'bg-tertiary/10 text-tertiary' },
    { type: 'subbrands', label: 'Sub-brands', singular: 'Sub-brand', icon: Boxes, color: 'bg-primary/10 text-primary', parentType: 'brands', parentField: 'brand_id', parentLabel: 'Brand' },
    { type: 'suppliers', label: 'Suppliers', singular: 'Supplier', icon: Truck, color: 'bg-secondary/10 text-secondary' },
    { type: 'customers', label: 'Customers', singular: 'Customer', icon: Users, color: 'bg-primary/10 text-primary' },
    { type: 'units', label: 'Units', singular: 'Unit', icon: Ruler, color: 'bg-tertiary/10 text-tertiary' },
    { type: 'taxes', label: 'Taxes', singular: 'Tax', icon: Percent, color: 'bg-primary/10 text-primary' },
    { type: 'warehouses', label: 'Warehouses', singular: 'Warehouse', icon: Warehouse, color: 'bg-secondary/10 text-secondary' },
];

const records = ref<Partial<Record<MasterType, MasterRecord[]>>>({});
const selected = ref<MasterDefinition>();
const editing = ref<MasterRecord>();
const showForm = ref(false);
const search = ref('');
const loading = ref(true);
const saving = ref(false);
const deletingId = ref('');
const error = ref('');

const selectedRecords = computed(() => selected.value ? records.value[selected.value.type] || [] : []);
const filteredRecords = computed(() => {
    const term = search.value.trim().toLowerCase();
    if (!term) return selectedRecords.value;
    return selectedRecords.value.filter((record) => [record.name, record.code, record.phone, record.email, record.symbol]
        .some((value) => String(value || '').toLowerCase().includes(term)));
});
const parentOptions = computed(() => selected.value?.parentType ? records.value[selected.value.parentType] || [] : []);

const load = async () => {
    loading.value = true; error.value = '';
    try {
        const data = await Promise.all(definitions.map(async (item) => [item.type, await inventoryApi.list(item.type)] as const));
        records.value = Object.fromEntries(data) as Partial<Record<MasterType, MasterRecord[]>>;
    } catch (cause) { error.value = cause instanceof Error ? cause.message : 'Unable to load master data.'; }
    finally { loading.value = false; }
};
const openManager = (definition: MasterDefinition) => { selected.value = definition; search.value = ''; showForm.value = false; editing.value = undefined; error.value = ''; };
const closeManager = () => { selected.value = undefined; showForm.value = false; editing.value = undefined; search.value = ''; error.value = ''; };
const openCreate = () => { editing.value = undefined; showForm.value = true; error.value = ''; };
const openEdit = (record: MasterRecord) => { editing.value = record; showForm.value = true; error.value = ''; };
const closeForm = () => { showForm.value = false; editing.value = undefined; error.value = ''; };

const save = async (payload: MasterCreateInput) => {
    if (!selected.value) return;
    saving.value = true; error.value = '';
    try {
        const saved = editing.value
            ? await inventoryApi.update(selected.value.type, editing.value.id, payload)
            : await inventoryApi.create(selected.value.type, payload);
        const current = records.value[selected.value.type] || [];
        records.value[selected.value.type] = editing.value
            ? current.map((record) => record.id === saved.id ? saved : record)
            : [...current, saved].sort((a, b) => a.name.localeCompare(b.name));
        closeForm();
    } catch (cause) { error.value = cause instanceof Error ? cause.message : 'Unable to save master record.'; }
    finally { saving.value = false; }
};

const remove = async (record: MasterRecord) => {
    if (!selected.value || !window.confirm(`Delete ${record.name}?`)) return;
    deletingId.value = record.id; error.value = '';
    try {
        await inventoryApi.remove(selected.value.type, record.id);
        records.value[selected.value.type] = selectedRecords.value.filter((item) => item.id !== record.id);
    } catch (cause) { error.value = cause instanceof Error ? cause.message : 'Unable to delete master record.'; }
    finally { deletingId.value = ''; }
};

onMounted(() => { void load(); window.addEventListener('cnq:store-changed', load); });
onUnmounted(() => window.removeEventListener('cnq:store-changed', load));
</script>

<template>
    <section class="space-y-3">
        <div class="flex items-center justify-between"><h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 px-1">Store Master Data</h3><span class="text-[9px] font-black text-primary uppercase tracking-widest">Create & Manage</span></div>
        <p v-if="error && !selected" class="rounded-2xl bg-error/10 px-4 py-3 text-xs font-bold text-error">{{ error }}</p>
        <div class="grid grid-cols-2 gap-3">
            <SurfaceCard v-for="item in definitions" :key="item.type" variant="low" class="p-4 rounded-3xl border border-surface-container-high/30 cursor-pointer active:scale-[0.98]" @click="openManager(item)">
                <div class="flex items-start justify-between"><div :class="['w-10 h-10 rounded-2xl flex items-center justify-center', item.color]"><component :is="item.icon" class="w-5 h-5" /></div><ChevronRight class="w-4 h-4 text-on-surface-variant/20" /></div>
                <h4 class="font-black text-on-surface text-sm mt-3">{{ item.label }}</h4><p class="text-[9px] font-bold text-on-surface-variant/40 mt-1">{{ loading ? 'Loading...' : `${records[item.type]?.length || 0} records` }}</p>
            </SurfaceCard>
        </div>

        <div v-if="selected" class="fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm flex items-end justify-center">
            <SurfaceCard class="w-full max-w-md h-[90vh] rounded-t-[2rem] p-5 pb-10 flex flex-col gap-4 overflow-hidden">
                <div class="flex items-center justify-between shrink-0">
                    <div class="flex items-center gap-3"><button v-if="showForm" class="w-9 h-9 rounded-xl bg-surface-container-high" @click="closeForm"><ChevronLeft class="w-5 h-5 mx-auto" /></button><div><p class="text-[9px] font-black uppercase tracking-widest text-primary">Master Data</p><h2 class="text-xl font-black mt-1">{{ showForm ? `${editing ? 'Edit' : 'New'} ${selected.singular}` : selected.label }}</h2></div></div>
                    <button class="w-10 h-10 rounded-2xl bg-surface-container-high" @click="closeManager"><X class="w-5 h-5 mx-auto" /></button>
                </div>

                <MasterDataForm v-if="showForm" :type="selected.type" :singular="selected.singular" :record="editing"
                    :parent-field="selected.parentField" :parent-label="selected.parentLabel" :parent-options="parentOptions"
                    :saving="saving" :error="error" @save="save" @cancel="closeForm" />
                <template v-else>
                    <p v-if="error" class="rounded-2xl bg-error/10 px-4 py-3 text-xs font-bold text-error shrink-0">{{ error }}</p>
                    <div class="flex gap-3 shrink-0"><MasterDataSearch v-model="search" class="grow" :placeholder="`Search ${selected.label.toLowerCase()}`" /><Button size="sm" @click="openCreate"><Plus class="w-4 h-4" /> Add</Button></div>
                    <p class="text-[10px] font-bold text-on-surface-variant/45 shrink-0">Showing {{ filteredRecords.length }} of {{ selectedRecords.length }} records</p>
                    <div class="overflow-y-auto min-h-0"><MasterDataList :records="filteredRecords" :singular="selected.singular" :deleting-id="deletingId" @edit="openEdit" @remove="remove" /></div>
                </template>
            </SurfaceCard>
        </div>
    </section>
</template>
