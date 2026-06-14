import { apiRequest, getActiveStoreId } from './apiClient';

interface Envelope<T> {
    data: T;
}

export interface PurchaseOrderSummary {
    id: string;
    number: string;
    status: string;
    item_count: number;
    total: number;
    expected_delivery_date?: string;
}

export interface GoodsReceiptSummary {
    id: string;
    number: string;
    status: string;
    inspection_status: string;
    item_count: number;
    received_qty: number;
    receipt_date?: string;
}

export interface StockMovementSummary {
    id: string;
    item_name: string;
    sku?: string;
    reference_type: string;
    quantity_in: number;
    quantity_out: number;
    batch_no?: string;
    transaction_date?: string;
}

const list = async <T>(path: string): Promise<T[]> => {
    const storeId = getActiveStoreId();
    return (
        await apiRequest<Envelope<T[]>>(
            `/inventory/${path}?store_id=${encodeURIComponent(storeId)}`
        )
    ).data;
};

export const purchaseApi = {
    getPurchaseOrders: () => list<PurchaseOrderSummary>('purchase-orders'),
    getGoodsReceipts: () => list<GoodsReceiptSummary>('goods-receipts'),
    getStockMovements: () => list<StockMovementSummary>('stock-movements'),
};
