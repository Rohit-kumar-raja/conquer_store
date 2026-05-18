export interface StockInLineItem {
    id: string;
    name: string;
    sku: string;
    batch: string;
    quantity: number;
    costPrice: number;
    sellingPrice: number;
    expiryDate?: string;
}

export interface StockInDraft {
    id: string;
    supplier: string;
    invoiceNumber: string;
    invoiceDate: string;
    receivedDate: string;
    status: 'scanned' | 'received';
    items: StockInLineItem[];
}

const STOCK_IN_DRAFT_KEY = 'cnq_stock_in_draft';
const STOCK_IN_HISTORY_KEY = 'cnq_stock_in_history';

const readDraft = (): StockInDraft | null => {
    const storedValue = localStorage.getItem(STOCK_IN_DRAFT_KEY);
    if (!storedValue) return null;

    try {
        return JSON.parse(storedValue) as StockInDraft;
    } catch {
        return null;
    }
};

const writeDraft = (draft: StockInDraft) => {
    localStorage.setItem(STOCK_IN_DRAFT_KEY, JSON.stringify(draft));
};

const readHistory = (): StockInDraft[] => {
    const storedValue = localStorage.getItem(STOCK_IN_HISTORY_KEY);
    if (!storedValue) return [];

    try {
        const parsed = JSON.parse(storedValue) as StockInDraft[];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const writeHistory = (items: StockInDraft[]) => {
    localStorage.setItem(STOCK_IN_HISTORY_KEY, JSON.stringify(items));
};

const createMockScannedBill = (): StockInDraft => ({
    id: String(Date.now()),
    supplier: 'Lumina Tech Logistics',
    invoiceNumber: `LTL-${String(Date.now()).slice(-6)}`,
    invoiceDate: '2026-05-18',
    receivedDate: '2026-05-18',
    status: 'scanned',
    items: [
        {
            id: 'line-1',
            name: 'Precision Pro SmartWatch X1',
            sku: 'PRC-SW-X1-2024',
            batch: 'WCH-MAY-01',
            quantity: 48,
            costPrice: 189,
            sellingPrice: 249,
            expiryDate: '2026-10-24'
        },
        {
            id: 'line-2',
            name: 'AuraPods Pro Gen 2',
            sku: 'AUD-APP-G2',
            batch: 'AUD-MAY-07',
            quantity: 72,
            costPrice: 3199,
            sellingPrice: 4999
        },
        {
            id: 'line-3',
            name: 'MagSafe Gen 2',
            sku: 'PWR-MAG-G2',
            batch: 'PWR-MAY-03',
            quantity: 60,
            costPrice: 2199,
            sellingPrice: 3499
        }
    ]
});

export const stockInService = {
    async getDraft(): Promise<StockInDraft | null> {
        return readDraft();
    },

    async scanSupplierBill(): Promise<StockInDraft> {
        const draft = createMockScannedBill();
        writeDraft(draft);
        return draft;
    },

    async saveDraft(draft: StockInDraft): Promise<StockInDraft> {
        writeDraft(draft);
        return draft;
    },

    async receiveDraft(): Promise<StockInDraft | null> {
        const draft = readDraft();
        if (!draft) return null;

        const receivedDraft: StockInDraft = {
            ...draft,
            status: 'received'
        };

        writeHistory([receivedDraft, ...readHistory()]);
        localStorage.removeItem(STOCK_IN_DRAFT_KEY);
        return receivedDraft;
    },

    async getHistory(): Promise<StockInDraft[]> {
        return readHistory();
    },

    async clearDraft(): Promise<void> {
        localStorage.removeItem(STOCK_IN_DRAFT_KEY);
    }
};
