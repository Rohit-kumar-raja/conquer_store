<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Barcode, Edit3, IndianRupee, Trash2, Truck } from 'lucide-vue-next';
import { Button, SurfaceCard } from '../components';
import { productService, type ApiProduct } from '../services/productService';

const route = useRoute();
const router = useRouter();
const product = ref<ApiProduct>();
const loading = ref(true);
const error = ref('');

const load = async () => {
    try {
        product.value = await productService.getProduct(String(route.params.id));
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Could not load product.';
    } finally {
        loading.value = false;
    }
};

const remove = async () => {
    if (!product.value || !window.confirm(`Delete ${product.value.name}?`)) return;
    await productService.deleteProduct(product.value.id);
    router.push({ name: 'inventory' });
};

onMounted(load);
</script>

<template>
    <div class="px-6 pt-6 pb-36 max-w-md mx-auto space-y-5">
        <p v-if="loading" class="text-sm font-bold text-on-surface-variant">Loading product...</p>
        <p v-if="error" class="rounded-2xl bg-error/10 px-4 py-3 text-sm font-bold text-error">{{ error }}</p>
        <template v-if="product">
            <SurfaceCard class="p-6 space-y-5">
                <div>
                    <p class="text-[10px] font-black uppercase tracking-widest text-primary">
                        {{ product.category }} / {{ product.brand }}
                    </p>
                    <h1 class="text-3xl font-black text-on-surface mt-2">{{ product.name }}</h1>
                    <p class="text-sm font-bold text-on-surface-variant mt-1">SKU: {{ product.sku }}</p>
                </div>
                <p class="text-sm text-on-surface-variant">{{ product.description || 'No description' }}</p>
                <div class="grid grid-cols-2 gap-3">
                    <div class="bg-surface-container-low p-4 rounded-2xl">
                        <p class="text-[9px] font-black uppercase text-on-surface-variant">Stock</p>
                        <p class="text-2xl font-black text-primary">{{ product.stock }}</p>
                    </div>
                    <div class="bg-surface-container-low p-4 rounded-2xl">
                        <p class="text-[9px] font-black uppercase text-on-surface-variant">Selling Price</p>
                        <p class="text-2xl font-black flex items-center">
                            <IndianRupee class="w-5 h-5" />{{ product.selling_price }}
                        </p>
                    </div>
                </div>
            </SurfaceCard>

            <SurfaceCard class="p-5 space-y-4">
                <div class="flex items-center gap-3">
                    <Barcode class="w-5 h-5 text-primary" />
                    <div>
                        <p class="text-[9px] font-black uppercase text-on-surface-variant">Barcode</p>
                        <p class="font-bold">{{ product.barcode || 'Not assigned' }}</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <Truck class="w-5 h-5 text-primary" />
                    <div>
                        <p class="text-[9px] font-black uppercase text-on-surface-variant">Supplier</p>
                        <p class="font-bold">{{ product.supplier }}</p>
                    </div>
                </div>
            </SurfaceCard>
        </template>

        <div v-if="product" class="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 pb-10 bg-surface/90 backdrop-blur-xl flex gap-3">
            <Button variant="secondary" class="flex-1" @click="remove">
                <template #icon><Trash2 class="w-4 h-4" /></template>
                Delete
            </Button>
            <Button class="flex-1" @click="router.push({ name: 'edit-product', params: { id: product.id } })">
                <template #icon><Edit3 class="w-4 h-4" /></template>
                Edit
            </Button>
        </div>
    </div>
</template>
