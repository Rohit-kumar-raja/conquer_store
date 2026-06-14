<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Barcode, Hash, Package, Save } from 'lucide-vue-next';
import { Button, Input, Select } from '../components';
import {
    productService,
    type ProductOptions,
} from '../services/productService';

const route = useRoute();
const router = useRouter();
const productId = String(route.params.id);
const options = ref<ProductOptions>({
    categories: [], subcategories: [], brands: [], suppliers: [],
    units: [], warehouses: [], tracking_types: [], valuation_methods: [],
});
const loading = ref(true);
const saving = ref(false);
const error = ref('');

const name = ref('');
const sku = ref('');
const barcode = ref('');
const description = ref('');
const categoryId = ref<string>();
const brandId = ref<string>();
const supplierId = ref<string>();
const sellingPrice = ref<number | null>(null);
const mrp = ref<number | null>(null);
const costPrice = ref<number | null>(null);
const gstRate = ref<number | null>(null);
const stock = ref<number | null>(null);
const reorderPoint = ref<number | null>(null);

const load = async () => {
    try {
        const [product, productOptions] = await Promise.all([
            productService.getProduct(productId),
            productService.getProductOptions(),
        ]);
        options.value = productOptions;
        name.value = product.name;
        sku.value = product.sku;
        barcode.value = product.barcode || '';
        description.value = product.description || '';
        categoryId.value = product.category_id;
        brandId.value = product.brand_id;
        supplierId.value = product.supplier_id;
        sellingPrice.value = product.selling_price;
        mrp.value = product.mrp ?? null;
        costPrice.value = product.cost_price ?? null;
        gstRate.value = product.gst_rate ?? null;
        stock.value = product.stock;
        reorderPoint.value = product.reorder_point ?? null;
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Could not load product.';
    } finally {
        loading.value = false;
    }
};

const save = async () => {
    saving.value = true;
    error.value = '';
    try {
        await productService.updateProduct(productId, {
            name: name.value.trim(),
            sku: sku.value.trim(),
            barcode: barcode.value.trim(),
            description: description.value.trim(),
            categoryId: categoryId.value,
            brandId: brandId.value,
            supplierId: supplierId.value,
            sellingPrice: Number(sellingPrice.value || 0),
            mrp: mrp.value ?? undefined,
            costPrice: costPrice.value ?? undefined,
            gstRate: gstRate.value ?? undefined,
            stock: Number(stock.value || 0),
            reorderPoint: reorderPoint.value ?? undefined,
        });
        router.push({ name: 'product-detail', params: { id: productId } });
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Could not update product.';
    } finally {
        saving.value = false;
    }
};

onMounted(load);
</script>

<template>
    <div class="px-6 pt-6 pb-36 max-w-md mx-auto space-y-5">
        <p v-if="loading" class="text-sm font-bold text-on-surface-variant">Loading backend product...</p>
        <p v-if="error" class="rounded-2xl bg-error/10 px-4 py-3 text-sm font-bold text-error">{{ error }}</p>
        <template v-if="!loading">
            <Input v-model="name" label="Product Name"><template #icon><Package class="w-5 h-5" /></template></Input>
            <Input v-model="sku" label="SKU"><template #icon><Hash class="w-5 h-5" /></template></Input>
            <Input v-model="barcode" label="Barcode"><template #icon><Barcode class="w-5 h-5" /></template></Input>
            <textarea v-model="description" placeholder="Description"
                class="w-full min-h-28 bg-surface-container-high rounded-2xl p-4 text-sm font-bold outline-none"></textarea>
            <Select v-model="categoryId" label="Category" :options="options.categories" optionLabel="name" optionValue="id" />
            <Select v-model="brandId" label="Brand" :options="options.brands" optionLabel="name" optionValue="id" />
            <Select v-model="supplierId" label="Preferred Supplier" :options="options.suppliers" optionLabel="name" optionValue="id" />
            <div class="grid grid-cols-2 gap-3">
                <Input v-model="costPrice" label="Cost Price" type="number" />
                <Input v-model="sellingPrice" label="Selling Price" type="number" />
                <Input v-model="mrp" label="MRP" type="number" />
                <Input v-model="gstRate" label="GST %" type="number" />
                <Input v-model="stock" label="Stock" type="number" />
                <Input v-model="reorderPoint" label="Reorder Point" type="number" />
            </div>
        </template>
        <div class="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 pb-10 bg-surface/90 backdrop-blur-xl flex gap-3">
            <Button variant="secondary" class="flex-1" @click="router.back()">Cancel</Button>
            <Button class="flex-1" :disabled="saving || loading" @click="save">
                <template #icon><Save class="w-4 h-4" /></template>
                {{ saving ? 'Saving' : 'Save' }}
            </Button>
        </div>
    </div>
</template>
