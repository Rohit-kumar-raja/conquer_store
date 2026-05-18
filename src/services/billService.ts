export interface BillItem {
    id: number;
    name: string;
    sku: string;
    price: number;
    qty: number;
    image: string;
}

export interface BillCustomer {
    id: string;
    name: string;
    phone: string;
}

export type PaymentMethod = 'qr' | 'cash';

export interface BillRecord {
    id: string;
    invoiceNumber: string;
    customer: BillCustomer;
    items: BillItem[];
    subtotal: number;
    gst: number;
    total: number;
    paymentMethod: PaymentMethod;
    createdAt: string;
    status: 'paid';
}

export interface ScannedBillProduct {
    name: string;
    sku: string;
    price: number;
    image: string;
}

const BILL_STORAGE_KEY = 'cnq_bill_items';
const BILL_HISTORY_STORAGE_KEY = 'cnq_bill_history';

const readStoredBillItems = (): BillItem[] => {
    const storedValue = localStorage.getItem(BILL_STORAGE_KEY);
    if (!storedValue) return [];

    try {
        const parsed = JSON.parse(storedValue) as BillItem[];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const writeStoredBillItems = (items: BillItem[]) => {
    localStorage.setItem(BILL_STORAGE_KEY, JSON.stringify(items));
};

const readBillHistory = (): BillRecord[] => {
    const storedValue = localStorage.getItem(BILL_HISTORY_STORAGE_KEY);
    if (!storedValue) return [];

    try {
        const parsed = JSON.parse(storedValue) as BillRecord[];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const writeBillHistory = (bills: BillRecord[]) => {
    localStorage.setItem(BILL_HISTORY_STORAGE_KEY, JSON.stringify(bills));
};

const createInvoiceNumber = () => {
    const date = new Date();
    const stamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    return `#INV-${stamp}-${String(date.getTime()).slice(-4)}`;
};

export const billService = {
    async getDraftItems(): Promise<BillItem[]> {
        return readStoredBillItems();
    },

    async replaceDraftItems(items: BillItem[]): Promise<BillItem[]> {
        writeStoredBillItems(items);
        return items;
    },

    async updateDraftItemQty(id: number, qty: number): Promise<BillItem[]> {
        const items = readStoredBillItems().map((item) =>
            item.id === id ? { ...item, qty } : item
        );
        writeStoredBillItems(items);
        return items;
    },

    async removeDraftItem(id: number): Promise<BillItem[]> {
        const items = readStoredBillItems().filter((item) => item.id !== id);
        writeStoredBillItems(items);
        return items;
    },

    async addScannedProducts(products: ScannedBillProduct[]): Promise<BillItem[]> {
        const items = readStoredBillItems();

        products.forEach((product) => {
            const existing = items.find((item) => item.sku === product.sku);

            if (existing) {
                existing.qty += 1;
                existing.image = product.image || existing.image;
                return;
            }

            items.push({
                id: Date.now() + items.length,
                name: product.name,
                sku: product.sku,
                price: product.price,
                qty: 1,
                image: product.image || `https://picsum.photos/seed/${product.sku}/200/200`
            });
        });

        writeStoredBillItems(items);
        return items;
    },

    async getBillHistory(): Promise<BillRecord[]> {
        return readBillHistory().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },

    async finalizeDraft(customer: BillCustomer, paymentMethod: PaymentMethod): Promise<BillRecord | null> {
        const items = readStoredBillItems().filter((item) => item.qty > 0);
        if (!items.length) return null;

        const subtotal = items.reduce((total, item) => total + item.price * item.qty, 0);
        const gst = subtotal * 0.18;
        const bill: BillRecord = {
            id: String(Date.now()),
            invoiceNumber: createInvoiceNumber(),
            customer,
            items,
            subtotal,
            gst,
            total: subtotal + gst,
            paymentMethod,
            createdAt: new Date().toISOString(),
            status: 'paid'
        };

        writeBillHistory([bill, ...readBillHistory()]);
        localStorage.removeItem(BILL_STORAGE_KEY);
        return bill;
    },

    async clearDraft(): Promise<void> {
        localStorage.removeItem(BILL_STORAGE_KEY);
    },

    async clearHistory(): Promise<void> {
        localStorage.removeItem(BILL_HISTORY_STORAGE_KEY);
    }
};
