export type PurchaseOrderMode = 'direct' | 'requisition_optional' | 'requisition_required';

export interface PurchaseSettings {
    purchase_order_mode: PurchaseOrderMode;
}

export interface PurchaseOrderItem {
    id?: string;
    requisition_item_id?: string;
    item_name: string;
    sku?: string;
    unit_id?: string;
    ordered_qty: number;
    received_qty?: number;
    unit_price: number;
    tax_rate: number;
    line_total?: number;
}

export interface PurchaseOrder {
    id: string;
    number: string;
    requisition_id?: string;
    supplier_id: string;
    supplier_name?: string;
    warehouse_id: string;
    status: string;
    order_date?: string;
    expected_delivery_date?: string;
    delivery_terms?: string;
    payment_terms?: string;
    item_count: number;
    total: number;
    items: PurchaseOrderItem[];
}

export interface PurchaseRequisitionItem {
    id: string;
    item_name: string;
    sku?: string;
    unit_id?: string;
    requested_qty: number;
    approved_qty?: number;
}

export interface PurchaseRequisition {
    id: string;
    number: string;
    warehouse_id: string;
    required_by?: string;
    items: PurchaseRequisitionItem[];
}

export interface CreatePurchaseOrderInput {
    requisition_id?: string;
    supplier_id: string;
    warehouse_id: string;
    expected_delivery_date?: string;
    delivery_terms?: string;
    payment_terms?: string;
    items: PurchaseOrderItem[];
}

export interface PurchaseOrderFilters {
    search: string;
    supplier_id: string;
    status: string;
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
