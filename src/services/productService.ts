export type ProductStockStatus = 'critical' | 'healthy' | 'out' | 'attention';

export interface Product {
    id: string;
    name: string;
    sku: string;
    image: string;
    stock: number;
    maxStock: number;
    category: string;
    brand: string;
    supplier: string;
    description: string;
    sellingPrice: number;
    status: ProductStockStatus;
    createdAt: string;
}

export interface CreateProductInput {
    name: string;
    sku: string;
    image?: string;
    stock: number;
    category: string;
    brand: string;
    supplier: string;
    description?: string;
    sellingPrice: number;
}

const PRODUCT_STORAGE_KEY = 'cnq_products';

const seedProducts: Product[] = [
    {
        id: '1',
        name: 'Quantum Pulse X1',
        sku: 'QPX-2024-RED',
        image: 'https://picsum.photos/seed/shoe1/200/200',
        stock: 12,
        maxStock: 150,
        category: 'Footwear',
        brand: 'Quantum',
        supplier: 'Reliance Distribution',
        description: 'Lightweight daily footwear with breathable upper and cushioned sole.',
        sellingPrice: 2499,
        status: 'critical',
        createdAt: new Date('2026-05-01').toISOString()
    },
    {
        id: '2',
        name: 'Aura Chronos Smart',
        sku: 'AUR-WCH-SLV',
        image: 'https://picsum.photos/seed/watch1/200/200',
        stock: 412,
        maxStock: 500,
        category: 'Electronics',
        brand: 'Aura',
        supplier: 'Lumina Tech Logistics',
        description: 'Smart wearable with health tracking, notifications and long battery life.',
        sellingPrice: 24999,
        status: 'healthy',
        createdAt: new Date('2026-05-02').toISOString()
    },
    {
        id: '3',
        name: 'Sonic Boom ANC',
        sku: 'SNB-HD-BLK',
        image: 'https://picsum.photos/seed/audio1/200/200',
        stock: 0,
        maxStock: 200,
        category: 'Audio',
        brand: 'Sonic',
        supplier: 'Bajaj Wholesale',
        description: 'Wireless ANC headphones tuned for clear calls and deep bass.',
        sellingPrice: 4999,
        status: 'out',
        createdAt: new Date('2026-05-03').toISOString()
    },
    {
        id: '4',
        name: 'Vortex Prime 85mm',
        sku: 'VTX-LNS-85',
        image: 'https://picsum.photos/seed/camera1/200/200',
        stock: 45,
        maxStock: 100,
        category: 'Imaging',
        brand: 'Vortex',
        supplier: 'Metro Cash & Carry',
        description: 'Portrait lens with fast focus and clean low-light performance.',
        sellingPrice: 18999,
        status: 'attention',
        createdAt: new Date('2026-05-04').toISOString()
    }
];

const getStatus = (stock: number, maxStock: number): ProductStockStatus => {
    if (stock <= 0) return 'out';
    if (stock <= Math.max(5, maxStock * 0.12)) return 'critical';
    if (stock <= Math.max(15, maxStock * 0.35)) return 'attention';
    return 'healthy';
};

const readProducts = (): Product[] => {
    const storedValue = localStorage.getItem(PRODUCT_STORAGE_KEY);
    if (!storedValue) return seedProducts;

    try {
        const parsed = JSON.parse(storedValue) as Product[];
        return Array.isArray(parsed) ? parsed : seedProducts;
    } catch {
        return seedProducts;
    }
};

const writeProducts = (products: Product[]) => {
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
};

export const productService = {
    async getProducts(): Promise<Product[]> {
        const products = readProducts();
        writeProducts(products);
        return products;
    },

    async createProduct(input: CreateProductInput): Promise<Product> {
        const products = readProducts();
        const maxStock = Math.max(100, input.stock);
        const product: Product = {
            id: String(Date.now()),
            name: input.name,
            sku: input.sku,
            image: input.image || `https://picsum.photos/seed/${input.sku || Date.now()}/200/200`,
            stock: input.stock,
            maxStock,
            category: input.category,
            brand: input.brand,
            supplier: input.supplier,
            description: input.description?.trim() || 'No product description added.',
            sellingPrice: input.sellingPrice,
            status: getStatus(input.stock, maxStock),
            createdAt: new Date().toISOString()
        };

        const withoutSameSku = products.filter((item) => item.sku !== product.sku);
        writeProducts([product, ...withoutSameSku]);
        return product;
    }
};
