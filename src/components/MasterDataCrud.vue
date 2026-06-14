<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { Pencil, Plus, Trash2 } from 'lucide-vue-next';
import {
    inventoryApi,
} from '../services/inventoryApi';
import type { MasterRecord, MasterType } from '../types/masterData';

const props = defineProps<{
    title: string;
    type: MasterType;
    noun: string;
    showSupplierFields?: boolean;
}>();

const records = ref<MasterRecord[]>([]);
const loading = ref(true);
const saving = ref(false);
const error = ref('');
const editingId = ref<string>();
const showForm = ref(false);
const name = ref('');
const code = ref('');
const phone = ref('');
const email = ref('');
const address = ref('');

const load = async () => {
    loading.value = true;
    error.value = '';
    try {
        records.value = await inventoryApi.list(props.type);
    } catch (e) {
        error.value = e instanceof Error ? e.message : `Could not load ${props.title}.`;
    } finally {
        loading.value = false;
    }
};

const reset = () => {
    editingId.value = undefined;
    showForm.value = false;
    name.value = '';
    code.value = '';
    phone.value = '';
    email.value = '';
    address.value = '';
};

const edit = (record: MasterRecord) => {
    editingId.value = record.id;
    name.value = record.name;
    code.value = record.code || '';
    phone.value = record.phone || '';
    email.value = record.email || '';
    address.value = record.address || '';
    showForm.value = true;
};

const save = async () => {
    if (!name.value.trim()) return;
    saving.value = true;
    error.value = '';
    const payload = {
        name: name.value.trim(),
        code: code.value.trim() || undefined,
        ...(props.showSupplierFields
            ? {
                phone: phone.value.trim() || undefined,
                email: email.value.trim() || undefined,
                address: address.value.trim() || undefined,
            }
            : {}),
    };
    try {
        if (editingId.value) {
            await inventoryApi.update(props.type, editingId.value, payload);
        } else {
            await inventoryApi.create(props.type, payload);
        }
        reset();
        await load();
    } catch (e) {
        error.value = e instanceof Error ? e.message : `Could not save ${props.noun}.`;
    } finally {
        saving.value = false;
    }
};

const remove = async (id: string) => {
    error.value = '';
    try {
        await inventoryApi.remove(props.type, id);
        records.value = records.value.filter((record) => record.id !== id);
    } catch (e) {
        error.value = e instanceof Error ? e.message : `Could not delete ${props.noun}.`;
    }
};

onMounted(() => {
    void load();
    window.addEventListener('cnq:store-changed', load);
});
onUnmounted(() => window.removeEventListener('cnq:store-changed', load));
</script>

<template>
    <div class="px-5 pt-2 space-y-6 pb-40 max-w-md mx-auto">
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-2xl font-black text-on-surface">{{ title }}</h2>
                <p class="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider">
                    {{ records.length }} from backend
                </p>
            </div>
            <button @click="showForm = true"
                class="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-2xl text-xs font-black uppercase">
                <Plus class="w-4 h-4" /> Add
            </button>
        </div>

        <p v-if="error" class="rounded-2xl bg-error/10 px-4 py-3 text-sm font-bold text-error">{{ error }}</p>

        <div v-if="showForm" class="bg-surface-container-low p-5 rounded-3xl space-y-3">
            <input v-model="name" :placeholder="`${noun} name`"
                class="w-full bg-surface-container-high rounded-2xl px-4 py-3 text-sm font-bold outline-none" />
            <input v-model="code" placeholder="Code (optional)"
                class="w-full bg-surface-container-high rounded-2xl px-4 py-3 text-sm font-bold outline-none" />
            <template v-if="showSupplierFields">
                <input v-model="phone" placeholder="Phone"
                    class="w-full bg-surface-container-high rounded-2xl px-4 py-3 text-sm font-bold outline-none" />
                <input v-model="email" placeholder="Email"
                    class="w-full bg-surface-container-high rounded-2xl px-4 py-3 text-sm font-bold outline-none" />
                <textarea v-model="address" placeholder="Address"
                    class="w-full bg-surface-container-high rounded-2xl px-4 py-3 text-sm font-bold outline-none"></textarea>
            </template>
            <div class="flex gap-3">
                <button @click="save" :disabled="saving"
                    class="grow bg-primary text-white py-3 rounded-2xl text-xs font-black uppercase">
                    {{ saving ? 'Saving' : editingId ? 'Update' : 'Create' }}
                </button>
                <button @click="reset"
                    class="px-5 bg-surface-container-highest rounded-2xl text-xs font-black uppercase">Cancel</button>
            </div>
        </div>

        <p v-if="loading" class="text-sm font-bold text-on-surface-variant">Loading...</p>
        <div v-else class="bg-surface-container-low rounded-3xl overflow-hidden">
            <div v-for="record in records" :key="record.id"
                class="p-4 flex items-center gap-4 border-b border-surface-container-high/30 last:border-0">
                <div class="grow min-w-0">
                    <p class="font-black text-on-surface truncate">{{ record.name }}</p>
                    <p class="text-[10px] font-bold text-on-surface-variant/50">
                        {{ record.code || record.phone || 'No code' }}
                    </p>
                </div>
                <button @click="edit(record)" class="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Pencil class="w-4 h-4" />
                </button>
                <button @click="remove(record.id)" class="w-9 h-9 rounded-xl bg-error/10 text-error flex items-center justify-center">
                    <Trash2 class="w-4 h-4" />
                </button>
            </div>
            <p v-if="!records.length" class="p-8 text-center text-sm font-bold text-on-surface-variant">
                No {{ title.toLowerCase() }} found for this store.
            </p>
        </div>
    </div>
</template>
