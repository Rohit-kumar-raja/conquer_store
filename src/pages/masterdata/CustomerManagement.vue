<script setup lang="ts">
import { ref } from 'vue';
import { Plus, Pencil, Trash2, Check, Users, Phone, Mail } from 'lucide-vue-next';

interface Customer {
    id: number;
    name: string;
    phone: string;
    email: string;
    totalOrders: number;
}

const customers = ref<Customer[]>([
    { id: 1, name: 'Vikram Singh', phone: '+91 98765 43210', email: 'vikram@gmail.com', totalOrders: 24 },
    { id: 2, name: 'Meera Joshi', phone: '+91 87654 32109', email: 'meera@gmail.com', totalOrders: 12 },
    { id: 3, name: 'Arjun Patel', phone: '+91 76543 21098', email: 'arjun@gmail.com', totalOrders: 8 },
    { id: 4, name: 'Sneha Rao', phone: '+91 65432 10987', email: '', totalOrders: 3 },
]);

const showForm = ref(false);
const editingId = ref<number | null>(null);
const formName = ref('');
const formPhone = ref('');
const formEmail = ref('');

const openCreate = () => { formName.value = ''; formPhone.value = ''; formEmail.value = ''; editingId.value = null; showForm.value = true; };
const openEdit = (c: Customer) => { formName.value = c.name; formPhone.value = c.phone; formEmail.value = c.email; editingId.value = c.id; showForm.value = true; };

const save = () => {
    if (!formName.value.trim()) return;
    if (editingId.value) {
        const c = customers.value.find(x => x.id === editingId.value);
        if (c) { c.name = formName.value.trim(); c.phone = formPhone.value.trim(); c.email = formEmail.value.trim(); }
    } else {
        customers.value.push({ id: Date.now(), name: formName.value.trim(), phone: formPhone.value.trim(), email: formEmail.value.trim(), totalOrders: 0 });
    }
    showForm.value = false; formName.value = ''; formPhone.value = ''; formEmail.value = ''; editingId.value = null;
};

const remove = (id: number) => { customers.value = customers.value.filter(c => c.id !== id); };
const cancel = () => { showForm.value = false; formName.value = ''; formPhone.value = ''; formEmail.value = ''; editingId.value = null; };
</script>

<template>
    <div class="px-5 pt-2 space-y-6 pb-40 max-w-md mx-auto">
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-2xl font-black text-on-surface">Customers</h2>
                <p class="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider mt-0.5">
                    {{ customers.length }} registered
                </p>
            </div>
            <button @click="openCreate"
                class="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider active:scale-95 transition-all shadow-lg shadow-primary/20">
                <Plus class="w-4 h-4" /> Add
            </button>
        </div>

        <section v-if="showForm">
            <div class="bg-surface-container-low p-5 rounded-4xl border border-primary/20 space-y-3">
                <h3 class="text-sm font-black text-on-surface">{{ editingId ? 'Edit Customer' : 'New Customer' }}</h3>
                <input v-model="formName" type="text" placeholder="Full name"
                    class="w-full bg-surface-container-high/50 text-on-surface rounded-2xl px-4 py-3 text-sm font-bold placeholder:text-on-surface-variant/30 outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                <input v-model="formPhone" type="tel" placeholder="Phone number"
                    class="w-full bg-surface-container-high/50 text-on-surface rounded-2xl px-4 py-3 text-sm font-bold placeholder:text-on-surface-variant/30 outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                <input v-model="formEmail" type="email" placeholder="Email (optional)"
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
                <div v-for="(cust, index) in customers" :key="cust.id" :class="[
                    'p-4 px-5 flex items-center justify-between group transition-all',
                    index !== customers.length - 1 && 'border-b border-surface-container-high/20'
                ]">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-sm">
                            {{ cust.name.charAt(0) }}
                        </div>
                        <div class="min-w-0">
                            <h4 class="font-black text-on-surface text-sm truncate">{{ cust.name }}</h4>
                            <div class="flex items-center gap-2 mt-0.5">
                                <span class="text-[9px] font-bold text-on-surface-variant/40 flex items-center gap-1">
                                    <Phone class="w-3 h-3" /> {{ cust.phone }}
                                </span>
                                <span class="w-0.5 h-0.5 rounded-full bg-on-surface-variant/20"></span>
                                <span class="text-[9px] font-bold text-on-surface-variant/40">{{ cust.totalOrders }}
                                    orders</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <button @click="openEdit(cust)"
                            class="w-9 h-9 rounded-xl bg-surface-container-high/50 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all active:scale-90">
                            <Pencil class="w-4 h-4" />
                        </button>
                        <button @click="remove(cust.id)"
                            class="w-9 h-9 rounded-xl bg-surface-container-high/50 flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/10 transition-all active:scale-90">
                            <Trash2 class="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <div v-if="customers.length === 0" class="text-center py-16 space-y-3">
            <Users class="w-12 h-12 text-on-surface-variant/20 mx-auto" />
            <p class="text-sm font-black text-on-surface-variant/30">No customers yet</p>
            <button @click="openCreate" class="text-xs font-black text-primary uppercase tracking-wider">Add your first
                customer</button>
        </div>
    </div>
</template>
