<script setup lang="ts">
import { ref } from 'vue';
import { Plus, Pencil, Trash2, Check, Truck, Phone, MapPin } from 'lucide-vue-next';

interface Supplier {
    id: number;
    name: string;
    phone: string;
    location: string;
    itemCount: number;
}

const suppliers = ref<Supplier[]>([
    { id: 1, name: 'Reliance Distribution', phone: '+91 98765 43210', location: 'Mumbai', itemCount: 42 },
    { id: 2, name: 'Metro Cash & Carry', phone: '+91 87654 32109', location: 'Pune', itemCount: 28 },
    { id: 3, name: 'Bajaj Wholesale', phone: '+91 76543 21098', location: 'Delhi', itemCount: 15 },
]);

const showForm = ref(false);
const editingId = ref<number | null>(null);
const formName = ref('');
const formPhone = ref('');
const formLocation = ref('');

const openCreate = () => { formName.value = ''; formPhone.value = ''; formLocation.value = ''; editingId.value = null; showForm.value = true; };
const openEdit = (s: Supplier) => { formName.value = s.name; formPhone.value = s.phone; formLocation.value = s.location; editingId.value = s.id; showForm.value = true; };

const save = () => {
    if (!formName.value.trim()) return;
    if (editingId.value) {
        const s = suppliers.value.find(x => x.id === editingId.value);
        if (s) { s.name = formName.value.trim(); s.phone = formPhone.value.trim(); s.location = formLocation.value.trim(); }
    } else {
        suppliers.value.push({ id: Date.now(), name: formName.value.trim(), phone: formPhone.value.trim(), location: formLocation.value.trim(), itemCount: 0 });
    }
    showForm.value = false; formName.value = ''; formPhone.value = ''; formLocation.value = ''; editingId.value = null;
};

const remove = (id: number) => { suppliers.value = suppliers.value.filter(s => s.id !== id); };
const cancel = () => { showForm.value = false; formName.value = ''; formPhone.value = ''; formLocation.value = ''; editingId.value = null; };
</script>

<template>
    <div class="px-5 pt-2 space-y-6 pb-40 max-w-md mx-auto">
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-2xl font-black text-on-surface">Suppliers</h2>
                <p class="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider mt-0.5">
                    {{ suppliers.length }} vendors
                </p>
            </div>
            <button @click="openCreate"
                class="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider active:scale-95 transition-all shadow-lg shadow-primary/20">
                <Plus class="w-4 h-4" /> Add
            </button>
        </div>

        <section v-if="showForm">
            <div class="bg-surface-container-low p-5 rounded-4xl border border-primary/20 space-y-3">
                <h3 class="text-sm font-black text-on-surface">{{ editingId ? 'Edit Supplier' : 'New Supplier' }}</h3>
                <input v-model="formName" type="text" placeholder="Supplier name"
                    class="w-full bg-surface-container-high/50 text-on-surface rounded-2xl px-4 py-3 text-sm font-bold placeholder:text-on-surface-variant/30 outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                <input v-model="formPhone" type="tel" placeholder="Phone number"
                    class="w-full bg-surface-container-high/50 text-on-surface rounded-2xl px-4 py-3 text-sm font-bold placeholder:text-on-surface-variant/30 outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                <input v-model="formLocation" type="text" placeholder="Location"
                    class="w-full bg-surface-container-high/50 text-on-surface rounded-2xl px-4 py-3 text-sm font-bold placeholder:text-on-surface-variant/30 outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
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
        </section>

        <section>
            <div class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 overflow-hidden">
                <div v-for="(sup, index) in suppliers" :key="sup.id" :class="[
                    'p-4 px-5 flex items-center justify-between group transition-all',
                    index !== suppliers.length - 1 && 'border-b border-surface-container-high/20'
                ]">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-11 h-11 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                            <Truck class="w-5 h-5" />
                        </div>
                        <div class="min-w-0">
                            <h4 class="font-black text-on-surface text-sm truncate">{{ sup.name }}</h4>
                            <div class="flex items-center gap-2 mt-0.5">
                                <span class="text-[9px] font-bold text-on-surface-variant/40 flex items-center gap-1">
                                    <MapPin class="w-3 h-3" /> {{ sup.location }}
                                </span>
                                <span class="w-0.5 h-0.5 rounded-full bg-on-surface-variant/20"></span>
                                <span class="text-[9px] font-bold text-on-surface-variant/40">{{ sup.itemCount }}
                                    items</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <button @click="openEdit(sup)"
                            class="w-9 h-9 rounded-xl bg-surface-container-high/50 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all active:scale-90">
                            <Pencil class="w-4 h-4" />
                        </button>
                        <button @click="remove(sup.id)"
                            class="w-9 h-9 rounded-xl bg-surface-container-high/50 flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/10 transition-all active:scale-90">
                            <Trash2 class="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <div v-if="suppliers.length === 0" class="text-center py-16 space-y-3">
            <Truck class="w-12 h-12 text-on-surface-variant/20 mx-auto" />
            <p class="text-sm font-black text-on-surface-variant/30">No suppliers yet</p>
            <button @click="openCreate" class="text-xs font-black text-primary uppercase tracking-wider">Add your first
                supplier</button>
        </div>
    </div>
</template>
