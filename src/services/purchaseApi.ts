import { apiRequest, getActiveStoreId } from './apiClient';
import type {
    CreatePurchaseOrderInput,
    GoodsReceiptSummary,
    PurchaseOrder,
    PurchaseRequisition,
    PurchaseSettings,
    StockMovementSummary,
} from '../types/purchase';

interface Envelope<T> {
    data: T;
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
    getPurchaseOrders: () => list<PurchaseOrder>('purchase-orders'),
    getPurchaseRequisitions: () => list<PurchaseRequisition>('purchase-requisitions'),
    async getSettings(): Promise<PurchaseSettings> {
        const storeId = getActiveStoreId();
        return (
            await apiRequest<Envelope<PurchaseSettings>>(
                `/inventory/purchase-settings?store_id=${encodeURIComponent(storeId)}`
            )
        ).data;
    },
    async updateSettings(settings: PurchaseSettings): Promise<PurchaseSettings> {
        const storeId = getActiveStoreId();
        return (
            await apiRequest<Envelope<PurchaseSettings>>(
                `/inventory/purchase-settings?store_id=${encodeURIComponent(storeId)}`,
                { method: 'PUT', body: JSON.stringify(settings) }
            )
        ).data;
    },
    async createPurchaseOrder(input: CreatePurchaseOrderInput): Promise<PurchaseOrder> {
        return (
            await apiRequest<Envelope<PurchaseOrder>>('/inventory/purchase-orders', {
                method: 'POST',
                body: JSON.stringify({ ...input, store_id: getActiveStoreId() }),
            })
        ).data;
    },
    async submitPurchaseOrder(id: string): Promise<void> {
        await apiRequest(`/inventory/purchase-orders/${id}/submit`, { method: 'POST' });
    },
    async approvePurchaseOrder(id: string): Promise<void> {
        await apiRequest(`/inventory/purchase-orders/${id}/approve`, { method: 'POST' });
    },
    async sendPurchaseOrder(id: string): Promise<void> {
        await apiRequest(`/inventory/purchase-orders/${id}/send`, { method: 'POST' });
    },
    getGoodsReceipts: () => list<GoodsReceiptSummary>('goods-receipts'),
    getStockMovements: () => list<StockMovementSummary>('stock-movements'),
};
