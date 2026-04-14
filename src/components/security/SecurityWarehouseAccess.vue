<script setup lang="ts">
import { ref } from 'vue';
import { Warehouse, ChevronRight, Plus, Check, X } from 'lucide-vue-next';

interface WarehouseItem {
    id: number;
    name: string;
    users: number;
    modules: string[];
    status: 'active' | 'inactive';
}

const warehouses = ref<WarehouseItem[]>([
    { id: 1, name: 'Mumbai HQ', users: 4, modules: ['Billing', 'Stock', 'Reports'], status: 'active' },
    { id: 2, name: 'Pune DC', users: 2, modules: ['Stock', 'Reports'], status: 'active' },
    { id: 3, name: 'Delhi Express', users: 0, modules: [], status: 'inactive' },
]);

const showForm = ref(false);
const formName = ref('');
const editingId = ref<number | null>(null);

const allModules = ['Billing', 'Stock', 'Reports'];
const selectedModules = ref<string[]>([]);

const openCreate = () => {
    formName.value = '';
    selectedModules.value = [];
    editingId.value = null;
    showForm.value = true;
};

const toggleModule = (mod: string) => {
    const idx = selectedModules.value.indexOf(mod);
    if (idx >= 0) selectedModules.value.splice(idx, 1);
    else selectedModules.value.push(mod);
};

const save = () => {
    if (!formName.value.trim()) return;
    if (editingId.value) {
        const wh = warehouses.value.find(w => w.id === editingId.value);
        if (wh) {
            wh.name = formName.value.trim();
            wh.modules = [...selectedModules.value];
            wh.status = selectedModules.value.length > 0 ? 'active' : 'inactive';
        }
    } else {
        warehouses.value.push({
            id: Date.now(),
            name: formName.value.trim(),
            users: 0,
            modules: [...selectedModules.value],
            status: selectedModules.value.length > 0 ? 'active' : 'inactive',
        });
    }
    showForm.value = false;
};

const openEdit = (wh: WarehouseItem) => {
    formName.value = wh.name;
    selectedModules.value = [...wh.modules];
    editingId.value = wh.id;
    showForm.value = true;
};

const toggleStatus = (wh: WarehouseItem) => {
    wh.status = wh.status === 'active' ? 'inactive' : 'active';
    if (wh.status === 'inactive') wh.modules = [];
};

const cancel = () => {
    showForm.value = false;
    editingId.value = null;
};
</script>

<template>
    <section class="space-y-3">
        <div class="flex items-center justify-between px-1">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">
                Warehouse Access
            </h3>
            <button @click="openCreate"
                class="flex items-center gap-1.5 text-primary text-[9px] font-black uppercase tracking-wider active:scale-95 transition-all">
                <Plus class="w-3.5 h-3.5" /> Add
            </button>
        </div>

        <!-- Inline Form -->
        <div v-if="showForm" class="bg-surface-container-low p-5 rounded-4xl border border-primary/20 space-y-3">
            <h3 class="text-sm font-black text-on-surface">
                {{ editingId ? 'Edit Warehouse' : 'New Warehouse' }}
            </h3>
            <input v-model="formName" type="text" placeholder="Warehouse name"
                class="w-full bg-surface-container-high/50 text-on-surface rounded-2xl px-4 py-3 text-sm font-bold placeholder:text-on-surface-variant/30 outline-none focus:ring-2 focus:ring-primary/30 transition-all" />

            <div>
                <p class="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-wider mb-2 px-1">Modules
                </p>
                <div class="flex gap-2">
                    <button v-for="mod in allModules" :key="mod" @click="toggleModule(mod)" :class="[
                        'flex-1 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-95',
                        selectedModules.includes(mod)
                            ? 'bg-primary text-white shadow-md shadow-primary/20'
                            : 'bg-surface-container-high/50 text-on-surface-variant'
                    ]">
                        {{ mod }}
                    </button>
                </div>
            </div>

            <div class="flex gap-3 pt-1">
                <button @click="save"
                    class="grow flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-2xl text-xs font-black uppercase tracking-wider active:scale-95 transition-all">
                    <Check class="w-4 h-4" /> {{ editingId ? 'Update' : 'Create' }}
                </button>
                <button @click="cancel"
                    class="px-5 py-3 rounded-2xl bg-surface-container-highest text-on-surface-variant text-xs font-black uppercase tracking-wider active:scale-95 transition-all">
                    Cancel
                </button>
            </div>
        </div>

        <!-- List -->
        <div class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 overflow-hidden">
            <div v-for="(wh, index) in warehouses" :key="wh.id" @click="openEdit(wh)" :class="[
                'p-4 px-5 flex items-center justify-between cursor-pointer group transition-all hover:bg-surface-container-high/30 active:scale-[0.98]',
                index !== warehouses.length - 1 && 'border-b border-surface-container-high/20'
            ]">
                <div class="flex items-center gap-4">
                    <div
                        :class="['w-11 h-11 rounded-2xl flex items-center justify-center',
                            wh.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-surface-container-highest text-on-surface-variant/30']">
                        <Warehouse class="w-5 h-5" />
                    </div>
                    <div>
                        <h4 class="font-black text-on-surface text-sm">{{ wh.name }}</h4>
                        <div class="flex items-center gap-2 mt-0.5">
                            <span class="text-[9px] font-bold text-on-surface-variant/40">{{ wh.users }} users</span>
                            <span v-if="wh.modules.length" class="text-[9px] font-bold text-primary/50">•
                                {{ wh.modules.join(', ') }}</span>
                            <span v-else class="text-[9px] font-bold text-on-surface-variant/20">• No modules</span>
                        </div>
                    </div>
                </div>
                <ChevronRight class="w-4 h-4 text-on-surface-variant/20 group-hover:text-primary transition-colors" />
            </div>
        </div>
    </section>
</template>
