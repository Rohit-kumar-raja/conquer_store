<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
    Barcode,
    Boxes,
    DollarSign,
    FileText,
    Hash,
    Layers,
    Package,
    Plus,
    Save,
    ScanLine,
    Tag,
    Truck,
    Warehouse,
    X,
} from 'lucide-vue-next';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import { Button, Input, Select } from '../components';
import { productScanService, type ProductScanDraft } from '../services/productScanService';
import {
    productService,
    type ProductOption,
    type ProductOptions,
} from '../services/productService';

const router = useRouter();
const emptyOptions = (): ProductOptions => ({
    categories: [],
    subcategories: [],
    brands: [],
    suppliers: [],
    units: [],
    warehouses: [],
    tracking_types: [],
    valuation_methods: [],
});

const options = ref<ProductOptions>(emptyOptions());
const loadingOptions = ref(true);
const saving = ref(false);
const error = ref('');

const productName = ref('');
const sku = ref('');
const description = ref('');
const barcode = ref('');
const hsnCode = ref('');
const selectedCategory = ref<string>();
const selectedSubcategory = ref<string>();
const selectedBrand = ref<string>();
const selectedSupplier = ref<string>();
const trackingType = ref('none');
const baseUomId = ref<string>();
const purchaseUomId = ref<string>();
const purchaseConversionRatio = ref(1);
const warehouseId = ref<string>();
const valuationMethod = ref('FIFO');
const costPrice = ref<number | null>(null);
const mrp = ref<number | null>(null);
const sellingPrice = ref<number | null>(null);
const gstRate = ref<number | null>(null);
const stock = ref(0);
const reorderPoint = ref<number | null>(null);
const reorderQty = ref<number | null>(null);
const leadTimeDays = ref<number | null>(null);
const isPurchasable = ref(true);
const isSellable = ref(true);
const trackInventory = ref(true);
const allowNegativeStock = ref(false);

const showCategoryDialog = ref(false);
const showBrandDialog = ref(false);
const newCategoryName = ref('');
const newBrandName = ref('');

const subcategories = computed(() =>
    options.value.subcategories.filter(
        (item) => !selectedCategory.value || item.category_id === selectedCategory.value
    )
);

const loadOptions = async () => {
    loadingOptions.value = true;
    error.value = '';
    try {
        options.value = await productService.getProductOptions();
        trackingType.value = options.value.tracking_types[0]?.id || 'none';
        valuationMethod.value = options.value.valuation_methods[0]?.id || 'FIFO';
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Could not load product options.';
    } finally {
        loadingOptions.value = false;
    }
};

const addNewCategory = async () => {
    const name = newCategoryName.value.trim();
    if (!name) return;
    try {
        const category = await productService.createCategory(name);
        options.value.categories.push(category);
        selectedCategory.value = category.id;
        newCategoryName.value = '';
        showCategoryDialog.value = false;
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Could not create category.';
    }
};

const addNewBrand = async () => {
    const name = newBrandName.value.trim();
    if (!name) return;
    try {
        const brand = await productService.createBrand(name);
        options.value.brands.push(brand);
        selectedBrand.value = brand.id;
        newBrandName.value = '';
        showBrandDialog.value = false;
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Could not create brand.';
    }
};

const applyScannedDraft = (draft: ProductScanDraft) => {
    productName.value = draft.name;
    sku.value = draft.sku;
    sellingPrice.value = draft.sellingPrice;
    stock.value = draft.stock;
    selectedCategory.value = options.value.categories.find(
        (item) => item.name === draft.categoryName
    )?.id;
    selectedBrand.value = options.value.brands.find(
        (item) => item.name === draft.brandName
    )?.id;
};

const saveProduct = async () => {
    if (!productName.value.trim() || !sku.value.trim()) {
        error.value = 'Product name and SKU are required.';
        return;
    }

    saving.value = true;
    error.value = '';
    try {
        await productService.createProduct({
            name: productName.value.trim(),
            sku: sku.value.trim(),
            description: description.value.trim(),
            categoryId: selectedCategory.value,
            subcategoryId: selectedSubcategory.value,
            brandId: selectedBrand.value,
            supplierId: selectedSupplier.value,
            hsnCode: hsnCode.value.trim(),
            barcode: barcode.value.trim(),
            trackingType: trackingType.value,
            baseUomId: baseUomId.value,
            purchaseUomId: purchaseUomId.value,
            purchaseConversionRatio: Number(purchaseConversionRatio.value || 1),
            costPrice: costPrice.value ?? undefined,
            mrp: mrp.value ?? undefined,
            sellingPrice: Number(sellingPrice.value || 0),
            gstRate: gstRate.value ?? undefined,
            leadTimeDays: leadTimeDays.value ?? undefined,
            reorderPoint: reorderPoint.value ?? undefined,
            reorderQty: reorderQty.value ?? undefined,
            warehouseId: warehouseId.value,
            valuationMethod: valuationMethod.value,
            stock: Number(stock.value || 0),
            isPurchasable: isPurchasable.value,
            isSellable: isSellable.value,
            trackInventory: trackInventory.value,
            allowNegativeStock: allowNegativeStock.value,
        });
        await productScanService.clearDraft();
        router.push({ name: 'inventory' });
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Could not create product.';
    } finally {
        saving.value = false;
    }
};

onMounted(async () => {
    await loadOptions();
    const draft = await productScanService.getDraft();
    if (draft) applyScannedDraft(draft);
});
</script>

<template>
    <div class="px-6 pt-6 space-y-8 pb-32 max-w-md mx-auto">
        <button @click="router.push({ name: 'scanner', query: { mode: 'add-product' } })"
            class="w-full p-5 rounded-3xl border-2 border-dashed border-primary/20 bg-primary/5 text-primary flex items-center justify-center gap-3 font-black text-xs uppercase tracking-wider">
            <ScanLine class="w-5 h-5" />
            Scan Product
        </button>

        <p v-if="loadingOptions" class="text-sm font-bold text-on-surface-variant">Loading backend options...</p>
        <p v-if="error" class="rounded-2xl bg-error/10 px-4 py-3 text-sm font-bold text-error">{{ error }}</p>

        <section class="space-y-5">
            <p class="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-1">Identification</p>
            <Input v-model="productName" label="Product Name" placeholder="Product name">
                <template #icon><Package class="w-5 h-5" /></template>
            </Input>
            <Input v-model="sku" label="SKU" placeholder="Unique store SKU">
                <template #icon><Hash class="w-5 h-5" /></template>
            </Input>
            <Input v-model="barcode" label="Barcode" placeholder="Optional barcode">
                <template #icon><Barcode class="w-5 h-5" /></template>
            </Input>
            <Input v-model="hsnCode" label="HSN Code" placeholder="Optional HSN code">
                <template #icon><Hash class="w-5 h-5" /></template>
            </Input>
            <div class="relative group">
                <label class="absolute left-4 -top-2.5 px-2 bg-surface-container-lowest text-[10px] font-bold uppercase tracking-widest text-primary z-10">Description</label>
                <div class="flex items-start bg-surface-container-high rounded-2xl px-5 py-4 min-h-28">
                    <FileText class="w-5 h-5 text-on-surface-variant mr-4 mt-1 shrink-0" />
                    <textarea v-model="description" rows="3" placeholder="Product description"
                        class="bg-transparent border-none w-full resize-none text-on-surface font-bold text-sm outline-none"></textarea>
                </div>
            </div>
        </section>

        <section class="space-y-5">
            <p class="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-1">Classification</p>
            <Select v-model="selectedCategory" label="Category" :options="options.categories" optionLabel="name" optionValue="id" placeholder="Select category">
                <template #icon><Layers class="w-5 h-5" /></template>
                <template #right>
                    <button @click.stop="showCategoryDialog = true" class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Plus class="w-5 h-5" />
                    </button>
                </template>
            </Select>
            <Select v-model="selectedSubcategory" label="Subcategory" :options="subcategories" optionLabel="name" optionValue="id" placeholder="Select subcategory">
                <template #icon><Boxes class="w-5 h-5" /></template>
            </Select>
            <Select v-model="selectedBrand" label="Brand" :options="options.brands" optionLabel="name" optionValue="id" placeholder="Select brand">
                <template #icon><Tag class="w-5 h-5" /></template>
                <template #right>
                    <button @click.stop="showBrandDialog = true" class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Plus class="w-5 h-5" />
                    </button>
                </template>
            </Select>
            <Select v-model="selectedSupplier" label="Preferred Supplier" :options="options.suppliers" optionLabel="name" optionValue="id" placeholder="Select supplier">
                <template #icon><Truck class="w-5 h-5" /></template>
            </Select>
        </section>

        <section class="space-y-5">
            <p class="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-1">Tracking & Units</p>
            <Select v-model="trackingType" label="Tracking Type" :options="options.tracking_types" optionLabel="name" optionValue="id" />
            <Select v-model="baseUomId" label="Base Unit" :options="options.units" optionLabel="name" optionValue="id" placeholder="Select base unit" />
            <Select v-model="purchaseUomId" label="Purchase Unit" :options="options.units" optionLabel="name" optionValue="id" placeholder="Select purchase unit" />
            <Input v-model="purchaseConversionRatio" label="Purchase Conversion Ratio" type="number" />
            <Select v-model="warehouseId" label="Default Warehouse" :options="options.warehouses" optionLabel="name" optionValue="id" placeholder="Select warehouse">
                <template #icon><Warehouse class="w-5 h-5" /></template>
            </Select>
            <Select v-model="valuationMethod" label="Valuation Method" :options="options.valuation_methods" optionLabel="name" optionValue="id" />
        </section>

        <section class="space-y-5">
            <p class="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-1">Pricing & Stock</p>
            <div class="grid grid-cols-2 gap-3">
                <Input v-model="costPrice" label="Cost Price" type="number"><template #icon><DollarSign class="w-5 h-5" /></template></Input>
                <Input v-model="sellingPrice" label="Selling Price" type="number"><template #icon><DollarSign class="w-5 h-5" /></template></Input>
                <Input v-model="mrp" label="MRP" type="number" />
                <Input v-model="gstRate" label="GST Rate %" type="number" />
                <Input v-model="stock" label="Opening Stock" type="number" />
                <Input v-model="reorderPoint" label="Reorder Point" type="number" />
                <Input v-model="reorderQty" label="Reorder Quantity" type="number" />
                <Input v-model="leadTimeDays" label="Lead Time Days" type="number" />
            </div>
        </section>

        <section class="bg-surface-container-low rounded-3xl p-5 space-y-4">
            <label class="flex items-center justify-between text-sm font-black text-on-surface">
                Purchasable
                <input v-model="isPurchasable" type="checkbox" class="w-5 h-5 accent-primary" />
            </label>
            <label class="flex items-center justify-between text-sm font-black text-on-surface">
                Sellable
                <input v-model="isSellable" type="checkbox" class="w-5 h-5 accent-primary" />
            </label>
            <label class="flex items-center justify-between text-sm font-black text-on-surface">
                Track inventory
                <input v-model="trackInventory" type="checkbox" class="w-5 h-5 accent-primary" />
            </label>
            <label class="flex items-center justify-between text-sm font-black text-on-surface">
                Allow negative stock
                <input v-model="allowNegativeStock" type="checkbox" class="w-5 h-5 accent-primary" />
            </label>
        </section>

        <div class="fixed bottom-0 left-0 right-0 w-full bg-surface/80 backdrop-blur-2xl border-t border-surface-container-high px-6 pb-10 pt-4 z-[60] flex gap-4 max-w-md mx-auto">
            <Button variant="secondary" class="flex-1 rounded-2xl font-black" @click="router.push({ name: 'inventory' })">Discard</Button>
            <Button class="flex-1 rounded-2xl font-black" :disabled="saving || loadingOptions" @click="saveProduct">
                <template #icon><Save class="w-5 h-5" /></template>
                {{ saving ? 'Saving' : 'Save Product' }}
            </Button>
        </div>

        <Dialog v-model:visible="showCategoryDialog" modal header="New Category" class="w-[90vw] max-w-sm">
            <div class="space-y-4">
                <InputText v-model="newCategoryName" placeholder="Category name" class="w-full" />
                <Button class="w-full" @click="addNewCategory">Create in Backend</Button>
            </div>
        </Dialog>
        <Dialog v-model:visible="showBrandDialog" modal header="New Brand" class="w-[90vw] max-w-sm">
            <div class="space-y-4">
                <InputText v-model="newBrandName" placeholder="Brand name" class="w-full" />
                <Button class="w-full" @click="addNewBrand">Create in Backend</Button>
            </div>
        </Dialog>
    </div>
</template>
