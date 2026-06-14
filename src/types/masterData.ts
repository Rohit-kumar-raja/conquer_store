export type MasterType =
    | 'categories'
    | 'subcategories'
    | 'brands'
    | 'subbrands'
    | 'suppliers'
    | 'customers'
    | 'units'
    | 'taxes'
    | 'warehouses';

export interface MasterRecord {
    id: string;
    store_id?: string;
    name: string;
    code?: string;
    description?: string;
    category_id?: string;
    brand_id?: string;
    symbol?: string;
    rate?: number;
    contact_person?: string;
    phone?: string;
    email?: string;
    gst_number?: string;
    address?: string;
    is_default?: boolean;
}

export type MasterCreateInput = Omit<MasterRecord, 'id' | 'store_id'>;
