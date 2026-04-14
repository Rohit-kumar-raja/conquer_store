<script setup lang="ts">
import { ref } from 'vue';
import { ChevronRight, Plus, Pencil, Trash2, X, Check, Tags } from 'lucide-vue-next';
import { SurfaceCard, Button } from '../../components';

interface Category {
    id: number;
    name: string;
    itemCount: number;
}

const categories = ref<Category[]>([
    { id: 1, name: 'Electronics', itemCount: 34 },
    { id: 2, name: 'Clothing', itemCount: 18 },
    { id: 3, name: 'Groceries', itemCount: 56 },
    { id: 4, name: 'Home & Kitchen', itemCount: 12 },
    { id: 5, name: 'Health & Beauty', itemCount: 8 },
]);

const showForm = ref(false);
const editingId = ref<number | null>(null);
const formName = ref('');

const openCreate = () => {
    formName.value = '';
    editingId.value = null;
    showForm.value = true;
};

const openEdit = (cat: Category) => {
    formName.value = cat.name;
    editingId.value = cat.id;
    showForm.value = true;
};

const save = () => {
    if (!formName.value.trim()) return;
    if (editingId.value) {
        const cat = categories.value.find(c => c.id === editingId.value);
        if (cat) cat.name = formName.value.trim();
    } else {
        categories.value.push({
            id: Date.now(),
            name: formName.value.trim(),
            itemCount: 0,
        });
    }
    showForm.value = false;
    formName.value = '';
    editingId.value = null;
};

const remove = (id: number) => {
    categories.value = categories.value.filter(c => c.id !== id);
};

const cancel = () => {
    showForm.value = false;
    formName.value = '';
    editingId.value = null;
};
</script>

<template>
    <div class="px-5 pt-2 space-y-6 pb-40 max-w-md mx-auto">

        <!-- Header -->
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-2xl font-black text-on-surface">Categories</h2>
                <p class="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider mt-0.5">
                    {{ categories.length }} categories
                </p>
            </div>
            <button @click="openCreate"
                class="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider active:scale-95 transition-all shadow-lg shadow-primary/20">
                <Plus class="w-4 h-4" />
                Add
            </button>
        </div>

        <!-- Inline Form -->
        <section v-if="showForm">
            <div class="bg-surface-container-low p-5 rounded-4xl border border-primary/20 space-y-4">
                <h3 class="text-sm font-black text-on-surface">
                    {{ editingId ? 'Edit Category' : 'New Category' }}
                </h3>
                <input v-model="formName" type="text" placeholder="Category name"
                    class="w-full bg-surface-container-high/50 text-on-surface rounded-2xl px-4 py-3 text-sm font-bold placeholder:text-on-surface-variant/30 outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                <div class="flex gap-3">
                    <button @click="save"
                        class="grow flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-2xl text-xs font-black uppercase tracking-wider active:scale-95 transition-all">
                        <Check class="w-4 h-4" />
                        {{ editingId ? 'Update' : 'Create' }}
                    </button>
                    <button @click="cancel"
                        class="px-5 py-3 rounded-2xl bg-surface-container-highest text-on-surface-variant text-xs font-black uppercase tracking-wider active:scale-95 transition-all">
                        Cancel
                    </button>
                </div>
            </div>
        </section>

        <!-- List -->
        <section>
            <div class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 overflow-hidden">
                <div v-for="(cat, index) in categories" :key="cat.id" :class="[
                    'p-4 px-5 flex items-center justify-between group transition-all',
                    index !== categories.length - 1 && 'border-b border-surface-container-high/20'
                ]">
                    <div class="flex items-center gap-4">
                        <div class="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                            <Tags class="w-5 h-5" />
                        </div>
                        <div>
                            <h4 class="font-black text-on-surface text-sm">{{ cat.name }}</h4>
                            <p class="text-[9px] font-bold text-on-surface-variant/40 mt-0.5">
                                {{ cat.itemCount }} items
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <button @click="openEdit(cat)"
                            class="w-9 h-9 rounded-xl bg-surface-container-high/50 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all active:scale-90">
                            <Pencil class="w-4 h-4" />
                        </button>
                        <button @click="remove(cat.id)"
                            class="w-9 h-9 rounded-xl bg-surface-container-high/50 flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/10 transition-all active:scale-90">
                            <Trash2 class="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Empty State -->
        <div v-if="categories.length === 0" class="text-center py-16 space-y-3">
            <Tags class="w-12 h-12 text-on-surface-variant/20 mx-auto" />
            <p class="text-sm font-black text-on-surface-variant/30">No categories yet</p>
            <button @click="openCreate" class="text-xs font-black text-primary uppercase tracking-wider">
                Create your first category
            </button>
        </div>
    </div>
</template>
