<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
    ArrowLeft,
    Camera,
    Package,
    Hash,
    Layers,
    IndianRupee,
    Save,
    Plus,
    Minus,
    Tag,
    Barcode,
    Truck,
    ShieldCheck,
    FileText
} from 'lucide-vue-next';
import { Button, Input, Select, SurfaceCard } from '../components';

const router = useRouter();

const productName = ref('Precision Pro SmartWatch X1');
const description = ref('Premium smartwatch with AMOLED display, health tracking and durable strap.');
const sku = ref('PRC-SW-X1-2024');
const barcode = ref('7501031311309');
const selectedCategory = ref(2);
const selectedBrand = ref(2);
const selectedSupplier = ref(1);
const sellingPrice = ref(249);
const mrp = ref(319);
const reorderLevel = ref(18);
const stock = ref(142);

const categories = [
    { name: 'Wearables', id: 1 },
    { name: 'Electronics', id: 2 },
    { name: 'Audio', id: 3 },
    { name: 'Groceries', id: 4 }
];

const brands = [
    { name: 'Precision', id: 1 },
    { name: 'Aura', id: 2 },
    { name: 'Sonic', id: 3 },
    { name: 'Vortex', id: 4 }
];

const suppliers = [
    { name: 'Lumina Tech Logistics', id: 1 },
    { name: 'Metro Cash & Carry', id: 2 },
    { name: 'Reliance Distribution', id: 3 }
];
</script>

<template>
    <div class="px-6 pt-6 space-y-6 pb-32 max-w-md mx-auto">
        <section class="flex items-center gap-4">
            <button @click="router.back()"
                class="p-2 -ml-2 hover:bg-surface-container-high rounded-full transition-colors">
                <ArrowLeft class="w-6 h-6 text-primary" />
            </button>
            <div>
                <h2 class="text-3xl font-black tracking-tighter text-on-surface leading-tight">Edit Product</h2>
                <p class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 mt-1">
                    Catalog identity and stock rules
                </p>
            </div>
        </section>

        <section>
            <SurfaceCard variant="low" class="p-5 flex items-center gap-4 border border-surface-container-high/30">
                <div class="w-24 h-24 rounded-3xl bg-white overflow-hidden border border-surface-container-high shrink-0">
                    <img src="https://picsum.photos/seed/watch-hero/300/300" alt="Product"
                        class="w-full h-full object-contain" />
                </div>
                <div class="grow space-y-3">
                    <button
                        class="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-primary/10 text-primary text-xs font-black uppercase tracking-wider">
                        <Camera class="w-4 h-4" />
                        Replace Image
                    </button>
                    <div class="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant/50">
                        <ShieldCheck class="w-4 h-4 text-primary" />
                        Image ready for catalog and barcode label
                    </div>
                </div>
            </SurfaceCard>
        </section>

        <section class="space-y-4">
            <p class="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-1">Product Details</p>
            <Input v-model="productName" label="Product Name">
                <template #icon><Package class="w-5 h-5" /></template>
            </Input>
            <div class="relative group">
                <label
                    class="absolute left-4 -top-2.5 px-2 bg-surface-container-lowest text-[10px] font-bold uppercase tracking-widest text-primary z-10">
                    Description
                </label>
                <div
                    class="flex items-start bg-surface-container-high rounded-2xl px-5 py-4 min-h-28 transition-all focus-within:ring-2 focus-within:ring-primary/20 border border-transparent focus-within:border-primary/10">
                    <FileText class="w-5 h-5 text-on-surface-variant mr-4 mt-1 shrink-0" />
                    <textarea v-model="description" rows="3" placeholder="Add product description..."
                        class="bg-transparent border-none focus:ring-0 w-full resize-none text-on-surface placeholder:text-on-surface-variant/40 font-bold text-sm outline-none"></textarea>
                </div>
            </div>
            <Input v-model="sku" label="SKU Number">
                <template #icon><Hash class="w-5 h-5" /></template>
            </Input>
            <Input v-model="barcode" label="Barcode">
                <template #icon><Barcode class="w-5 h-5" /></template>
            </Input>
            <Select v-model="selectedCategory" label="Category" :options="categories" optionLabel="name"
                optionValue="id">
                <template #icon><Layers class="w-5 h-5" /></template>
            </Select>
            <Select v-model="selectedBrand" label="Brand" :options="brands" optionLabel="name" optionValue="id">
                <template #icon><Tag class="w-5 h-5" /></template>
            </Select>
            <Select v-model="selectedSupplier" label="Primary Supplier" :options="suppliers" optionLabel="name"
                optionValue="id">
                <template #icon><Truck class="w-5 h-5" /></template>
            </Select>
        </section>

        <section class="space-y-4">
            <p class="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-1">Pricing & Rules</p>
            <div class="grid grid-cols-2 gap-3">
                <Input v-model="sellingPrice" label="Selling Price" type="number">
                    <template #icon><IndianRupee class="w-5 h-5" /></template>
                </Input>
                <Input v-model="mrp" label="MRP" type="number">
                    <template #icon><IndianRupee class="w-5 h-5" /></template>
                </Input>
            </div>
            <SurfaceCard variant="low" class="p-5 space-y-4 border border-surface-container-high/30">
                <div class="flex justify-between items-center">
                    <span class="text-sm font-black text-on-surface">Current Stock</span>
                    <div class="flex items-center gap-3 bg-surface-container-high p-1 rounded-2xl">
                        <button @click="stock = Math.max(0, stock - 1)"
                            class="w-9 h-9 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary">
                            <Minus class="w-4 h-4" />
                        </button>
                        <span class="w-12 text-center font-black text-lg">{{ stock }}</span>
                        <button @click="stock++"
                            class="w-9 h-9 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary">
                            <Plus class="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <Input v-model="reorderLevel" label="Low Stock Alert Level" type="number">
                    <template #icon><ShieldCheck class="w-5 h-5" /></template>
                </Input>
            </SurfaceCard>
        </section>

        <div
            class="fixed bottom-0 left-0 right-0 w-full bg-surface/80 backdrop-blur-2xl border-t border-surface-container-high px-6 pb-10 pt-4 z-[60] flex gap-4 max-w-md mx-auto">
            <Button variant="secondary" class="flex-1 rounded-2xl font-black" @click="router.back()">Cancel</Button>
            <Button class="flex-1 rounded-2xl font-black" @click="router.push({ name: 'product-detail', params: { id: sku } })">
                <template #icon><Save class="w-5 h-5" /></template>
                Save
            </Button>
        </div>
    </div>
</template>
