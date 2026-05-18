export interface ProductScanDraft {
    id: string;
    name: string;
    sku: string;
    categoryName: string;
    brandName: string;
    sellingPrice: number;
    stock: number;
    image?: string;
}

const PRODUCT_SCAN_DRAFT_KEY = 'cnq_product_scan_draft';

const createMockProductDraft = (image?: string): ProductScanDraft => {
    const products: ProductScanDraft[] = [
        {
            id: String(Date.now()),
            name: 'AuraPods Pro Gen 2',
            sku: 'AUD-APP-G2',
            categoryName: 'Audio',
            brandName: 'Aura',
            sellingPrice: 4999,
            stock: 12,
            image
        },
        {
            id: String(Date.now()),
            name: 'X-Watch series 9',
            sku: 'WCH-X9-SLV',
            categoryName: 'Electronics',
            brandName: 'Aura',
            sellingPrice: 24999,
            stock: 8,
            image
        },
        {
            id: String(Date.now()),
            name: 'MagSafe Gen 2',
            sku: 'PWR-MAG-G2',
            categoryName: 'Electronics',
            brandName: 'Vortex',
            sellingPrice: 3499,
            stock: 45,
            image
        }
    ];

    return products[Math.floor(Math.random() * products.length)];
};

export const productScanService = {
    async scanProduct(image?: string): Promise<ProductScanDraft> {
        const draft = createMockProductDraft(image);
        localStorage.setItem(PRODUCT_SCAN_DRAFT_KEY, JSON.stringify(draft));
        return draft;
    },

    async getDraft(): Promise<ProductScanDraft | null> {
        const storedValue = localStorage.getItem(PRODUCT_SCAN_DRAFT_KEY);
        if (!storedValue) return null;

        try {
            return JSON.parse(storedValue) as ProductScanDraft;
        } catch {
            return null;
        }
    },

    async clearDraft(): Promise<void> {
        localStorage.removeItem(PRODUCT_SCAN_DRAFT_KEY);
    }
};
