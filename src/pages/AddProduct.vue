<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import {
    ArrowLeft,
    Camera,
    Package,
    Hash,
    Layers,
    DollarSign,
    Save,
    Plus,
    Minus,
    Tag,
    X
} from 'lucide-vue-next';
import { SurfaceCard, Button, Input, Select } from '../components';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

const router = useRouter();

const stock = ref(0);
const selectedCategory = ref();
const selectedBrand = ref();

const categories = ref([
    { name: 'Footwear', id: 1 },
    { name: 'Electronics', id: 2 },
    { name: 'Audio', id: 3 },
    { name: 'Imaging', id: 4 }
]);

const brands = ref([
    { name: 'Quantum', id: 1 },
    { name: 'Aura', id: 2 },
    { name: 'Sonic', id: 3 },
    { name: 'Vortex', id: 4 }
]);

const showCategoryDialog = ref(false);
const showBrandDialog = ref(false);
const newCategoryName = ref('');
const newBrandName = ref('');

const addNewCategory = () => {
    if (newCategoryName.value) {
        const newCat = { name: newCategoryName.value, id: Date.now() };
        categories.value.push(newCat);
        selectedCategory.value = newCat.id;
        newCategoryName.value = '';
        showCategoryDialog.value = false;
    }
};

const addNewBrand = () => {
    if (newBrandName.value) {
        const newBr = { name: newBrandName.value, id: Date.now() };
        brands.value.push(newBr);
        selectedBrand.value = newBr.id;
        newBrandName.value = '';
        showBrandDialog.value = false;
    }
};
</script>

<template>
    <div class="px-6 pt-6 space-y-8 pb-32 max-w-md mx-auto">
        <section class="flex items-center gap-4">
            <button @click="router.push({ name: 'inventory' })"
                class="p-2 -ml-2 hover:bg-surface-container-high rounded-full transition-colors">
                <ArrowLeft class="w-6 h-6 text-primary" />
            </button>
            <h2 class="text-3xl font-black tracking-tighter text-on-surface leading-tight">Add Product</h2>
        </section>

        <!-- Image Upload -->
        <section>
            <div
                class="w-full aspect-square bg-surface-container-low rounded-[3rem] border-2 border-dashed border-surface-container-highest flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-surface-container-high transition-all group active:scale-[0.98]">
                <div
                    class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Camera class="w-10 h-10" />
                </div>
                <div class="text-center">
                    <p class="font-bold text-on-surface">Upload Product Image</p>
                    <p class="text-[10px] text-on-surface-variant font-black uppercase tracking-widest">PNG, JPG up to
                        10MB</p>
                </div>
            </div>
        </section>

        <!-- Form Fields -->
        <section class="space-y-6">
            <div class="space-y-4">
                <p class="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-1">Basic
                    Intelligence</p>

                <Input label="Product Name" placeholder="e.g. Quantum Pulse X1">
                    <template #icon>
                        <Package class="w-5 h-5" />
                    </template>
                </Input>

                <Input label="SKU Number" placeholder="e.g. QPX-2024-RED">
                    <template #icon>
                        <Hash class="w-5 h-5" />
                    </template>
                </Input>

                <!-- Category with Add Button -->
                <Select v-model="selectedCategory" label="Category" placeholder="Select Category" :options="categories"
                    optionLabel="name" optionValue="id">
                    <template #icon>
                        <Layers class="w-5 h-5" />
                    </template>
                    <template #right>
                        <button @click.stop="showCategoryDialog = true"
                            class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center active:scale-90 transition-all">
                            <Plus class="w-5 h-5" />
                        </button>
                    </template>
                </Select>

                <!-- Brand with Add Button -->
                <Select v-model="selectedBrand" label="Brand" placeholder="Select Brand" :options="brands"
                    optionLabel="name" optionValue="id">
                    <template #icon>
                        <Tag class="w-5 h-5" />
                    </template>
                    <template #right>
                        <button @click.stop="showBrandDialog = true"
                            class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center active:scale-90 transition-all">
                            <Plus class="w-5 h-5" />
                        </button>
                    </template>
                </Select>
            </div>

            <div class="space-y-4">
                <p class="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-1">Pricing &
                    Payload</p>

                <Input label="Selling Price" placeholder="0.00" type="number">
                    <template #icon>
                        <DollarSign class="w-5 h-5" />
                    </template>
                </Input>

                <div
                    class="bg-surface-container-low p-6 rounded-[2.5rem] space-y-4 border border-surface-container-highest">
                    <div class="flex justify-between items-center">
                        <span class="text-sm font-black text-on-surface tracking-tight">Initial Stock Level</span>
                        <div class="flex items-center gap-4 bg-surface-container-high p-1 rounded-2xl">
                            <button @click="stock = Math.max(0, stock - 1)"
                                class="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary/40 hover:text-primary transition-all active:scale-95">
                                <Minus class="w-5 h-5" />
                            </button>
                            <span class="w-12 text-center font-black text-lg">{{ stock }}</span>
                            <button @click="stock++"
                                class="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary hover:text-primary transition-all active:scale-95">
                                <Plus class="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Action Buttons -->
        <div
            class="fixed bottom-0 left-0 right-0 w-full bg-surface/80 backdrop-blur-2xl border-t border-surface-container-high px-6 pb-10 pt-4 z-[60] flex gap-4 max-w-md mx-auto">
            <Button variant="secondary" class="flex-1 rounded-2xl font-black"
                @click="router.push({ name: 'inventory' })">
                Discard
            </Button>
            <Button class="flex-1 rounded-2xl font-black" @click="router.push({ name: 'inventory' })">
                <template #icon>
                    <Save class="w-5 h-5" />
                </template>
                Deploy
            </Button>
        </div>

        <!-- Add Category Dialog -->
        <Dialog v-model:visible="showCategoryDialog" modal header="New Category" :pt="{
            root: { class: 'bg-surface-container-high rounded-[2.5rem] border-none shadow-2xl w-[90vw] max-w-sm' },
            header: { class: 'p-6 flex justify-between items-center border-b border-surface-container-highest' },
            title: { class: 'text-xl font-black text-on-surface tracking-tighter' },
            content: { class: 'p-6 space-y-6' },
            pcCloseButton: { root: { class: 'hidden' } }
        }">
            <template #header>
                <h3 class="text-xl font-black text-on-surface tracking-tighter">New Intelligence Category</h3>
                <button @click="showCategoryDialog = false"
                    class="p-2 rounded-xl hover:bg-surface-container-highest transition-colors">
                    <X class="w-5 h-5 text-on-surface-variant" />
                </button>
            </template>
            <div class="space-y-6">
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Category
                        Label</label>
                    <InputText v-model="newCategoryName" placeholder="Enter name..."
                        class="w-full bg-surface-container-highest border-none rounded-2xl p-4 text-on-surface font-bold focus:ring-2 focus:ring-primary/20 shadow-none" />
                </div>
                <div class="flex gap-3">
                    <Button variant="secondary" class="flex-1 rounded-xl"
                        @click="showCategoryDialog = false">Cancel</Button>
                    <Button class="flex-1 rounded-xl" @click="addNewCategory">Initialize</Button>
                </div>
            </div>
        </Dialog>

        <!-- Add Brand Dialog -->
        <Dialog v-model:visible="showBrandDialog" modal header="New Brand" :pt="{
            root: { class: 'bg-surface-container-high rounded-[2.5rem] border-none shadow-2xl w-[90vw] max-w-sm' },
            header: { class: 'p-6 flex justify-between items-center border-b border-surface-container-highest' },
            title: { class: 'text-xl font-black text-on-surface tracking-tighter' },
            content: { class: 'p-6 space-y-6' },
            pcCloseButton: { root: { class: 'hidden' } }
        }">
            <template #header>
                <h3 class="text-xl font-black text-on-surface tracking-tighter">New Brand Node</h3>
                <button @click="showBrandDialog = false"
                    class="p-2 rounded-xl hover:bg-surface-container-highest transition-colors">
                    <X class="w-5 h-5 text-on-surface-variant" />
                </button>
            </template>
            <div class="space-y-6">
                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Brand
                        Identifier</label>
                    <InputText v-model="newBrandName" placeholder="Enter name..."
                        class="w-full bg-surface-container-highest border-none rounded-2xl p-4 text-on-surface font-bold focus:ring-2 focus:ring-primary/20 shadow-none" />
                </div>
                <div class="flex gap-3">
                    <Button variant="secondary" class="flex-1 rounded-xl"
                        @click="showBrandDialog = false">Cancel</Button>
                    <Button class="flex-1 rounded-xl" @click="addNewBrand">Establish</Button>
                </div>
            </div>
        </Dialog>
    </div>
</template>
