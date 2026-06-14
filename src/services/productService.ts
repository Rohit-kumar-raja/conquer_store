import { apiRequest, getActiveStoreId } from './apiClient';

export type ProductStockStatus = 'critical' | 'healthy' | 'out' | 'attention';

export interface Product {
    id: string;
    storeId: string;
    name: string;
    sku: string;
    image: string;
    stock: number;
    maxStock: number;
    categoryId?: string;
    category: string;
    brandId?: string;
    brand: string;
    supplierId?: string;
    supplier: string;
    description: string;
    sellingPrice: number;
    status: ProductStockStatus;
    barcode?: string;
    createdAt: string;
}

export interface ProductOption {
    id: string;
    name: string;
    category_id?: string;
}

export interface ProductOptions {
    categories: ProductOption[];
    subcategories: ProductOption[];
    brands: ProductOption[];
    suppliers: ProductOption[];
    units: ProductOption[];
    warehouses: ProductOption[];
    tracking_types: ProductOption[];
    valuation_methods: ProductOption[];
}

export interface CreateProductInput {
    name: string;
    sku: string;
    description?: string;
    categoryId?: string;
    subcategoryId?: string;
    brandId?: string;
    supplierId?: string;
    hsnCode?: string;
    barcode?: string;
    trackingType: string;
    baseUomId?: string;
    purchaseUomId?: string;
    purchaseConversionRatio: number;
    costPrice?: number;
    mrp?: number;
    sellingPrice: number;
    gstRate?: number;
    leadTimeDays?: number;
    reorderPoint?: number;
    reorderQty?: number;
    warehouseId?: string;
    valuationMethod: string;
    stock: number;
    isPurchasable: boolean;
    isSellable: boolean;
    trackInventory: boolean;
    allowNegativeStock: boolean;
}

interface ApiEnvelope<T> {
    data: T;
}

export interface ApiProduct {
    id: string;
    store_id: string;
    name: string;
    sku: string;
    description?: string;
    hsn_code?: string;
    category_id?: string;
    subcategory_id?: string;
    category: string;
    brand_id?: string;
    brand: string;
    supplier_id?: string;
    supplier: string;
    stock: number;
    max_stock: number;
    selling_price: number;
    status: ProductStockStatus;
    barcode?: string;
    cost_price?: number;
    mrp?: number;
    gst_rate?: number;
    reorder_point?: number;
    reorder_qty?: number;
    lead_time_days?: number;
    tracking_type: string;
    base_uom_id?: string;
    purchase_uom_id?: string;
    purchase_conversion_ratio: number;
    default_warehouse_id?: string;
    valuation_method: string;
    is_purchasable: boolean;
    is_sellable: boolean;
    track_inventory: boolean;
    allow_negative_stock: boolean;
    created_at: string;
}

const mapProduct = (product: ApiProduct): Product => ({
    id: product.id,
    storeId: product.store_id,
    name: product.name,
    sku: product.sku,
    image: `https://picsum.photos/seed/${encodeURIComponent(product.sku)}/200/200`,
    stock: product.stock,
    maxStock: product.max_stock,
    categoryId: product.category_id,
    category: product.category,
    brandId: product.brand_id,
    brand: product.brand,
    supplierId: product.supplier_id,
    supplier: product.supplier,
    description: product.description || 'No product description added.',
    sellingPrice: product.selling_price,
    status: product.status,
    barcode: product.barcode,
    createdAt: product.created_at,
});

const optionalNumber = (value?: number | null) =>
    value === null || value === undefined || Number.isNaN(value) ? undefined : value;

export const productService = {
    async getProducts(): Promise<Product[]> {
        const storeId = getActiveStoreId();
        const response = await apiRequest<ApiEnvelope<ApiProduct[]>>(
            `/inventory/products?store_id=${encodeURIComponent(storeId)}`
        );
        return response.data.map(mapProduct);
    },

    async getProductOptions(): Promise<ProductOptions> {
        const storeId = getActiveStoreId();
        const response = await apiRequest<ApiEnvelope<ProductOptions>>(
            `/inventory/product-options?store_id=${encodeURIComponent(storeId)}`
        );
        return response.data;
    },

    async createCategory(name: string): Promise<ProductOption> {
        const response = await apiRequest<ApiEnvelope<ProductOption>>('/inventory/categories', {
            method: 'POST',
            body: JSON.stringify({
                store_id: getActiveStoreId(),
                name,
            }),
        });
        return response.data;
    },

    async createBrand(name: string): Promise<ProductOption> {
        const response = await apiRequest<ApiEnvelope<ProductOption>>('/inventory/brands', {
            method: 'POST',
            body: JSON.stringify({
                store_id: getActiveStoreId(),
                name,
            }),
        });
        return response.data;
    },

    async createProduct(input: CreateProductInput): Promise<Product> {
        const response = await apiRequest<ApiEnvelope<ApiProduct>>('/inventory/products', {
            method: 'POST',
            body: JSON.stringify({
                store_id: getActiveStoreId(),
                name: input.name,
                sku: input.sku,
                description: input.description || null,
                category_id: input.categoryId || null,
                subcategory_id: input.subcategoryId || null,
                brand_id: input.brandId || null,
                preferred_supplier_id: input.supplierId || null,
                hsn_code: input.hsnCode || null,
                barcode: input.barcode || null,
                tracking_type: input.trackingType,
                base_uom_id: input.baseUomId || null,
                purchase_uom_id: input.purchaseUomId || null,
                purchase_conversion_ratio: input.purchaseConversionRatio,
                cost_price: optionalNumber(input.costPrice),
                mrp: optionalNumber(input.mrp),
                selling_price: input.sellingPrice,
                gst_rate: optionalNumber(input.gstRate),
                lead_time_days: optionalNumber(input.leadTimeDays),
                reorder_point: optionalNumber(input.reorderPoint),
                reorder_qty: optionalNumber(input.reorderQty),
                default_warehouse_id: input.warehouseId || null,
                valuation_method: input.valuationMethod,
                opening_stock: input.stock,
                is_purchasable: input.isPurchasable,
                is_sellable: input.isSellable,
                track_inventory: input.trackInventory,
                allow_negative_stock: input.allowNegativeStock,
            }),
        });
        return mapProduct(response.data);
    },

    async getProduct(id: string): Promise<ApiProduct> {
        return (await apiRequest<ApiEnvelope<ApiProduct>>(`/inventory/products/${id}`)).data;
    },

    async updateProduct(id: string, input: Partial<CreateProductInput>): Promise<ApiProduct> {
        const fieldMap: Record<string, unknown> = {};
        const mappings: Array<[keyof CreateProductInput, string]> = [
            ['name', 'name'], ['sku', 'sku'], ['description', 'description'],
            ['categoryId', 'category_id'], ['subcategoryId', 'subcategory_id'],
            ['brandId', 'brand_id'], ['supplierId', 'preferred_supplier_id'],
            ['hsnCode', 'hsn_code'], ['barcode', 'barcode'],
            ['trackingType', 'tracking_type'], ['baseUomId', 'base_uom_id'],
            ['purchaseUomId', 'purchase_uom_id'],
            ['purchaseConversionRatio', 'purchase_conversion_ratio'],
            ['costPrice', 'cost_price'], ['mrp', 'mrp'],
            ['sellingPrice', 'selling_price'], ['gstRate', 'gst_rate'],
            ['leadTimeDays', 'lead_time_days'], ['reorderPoint', 'reorder_point'],
            ['reorderQty', 'reorder_qty'], ['warehouseId', 'default_warehouse_id'],
            ['valuationMethod', 'valuation_method'], ['stock', 'opening_stock'],
            ['isPurchasable', 'is_purchasable'], ['isSellable', 'is_sellable'],
            ['trackInventory', 'track_inventory'],
            ['allowNegativeStock', 'allow_negative_stock'],
        ];
        for (const [source, target] of mappings) {
            if (source in input) fieldMap[target] = input[source] ?? null;
        }
        return (
            await apiRequest<ApiEnvelope<ApiProduct>>(`/inventory/products/${id}`, {
                method: 'PUT',
                body: JSON.stringify(fieldMap),
            })
        ).data;
    },

    async deleteProduct(id: string): Promise<void> {
        await apiRequest<void>(`/inventory/products/${id}`, { method: 'DELETE' });
    },
};
