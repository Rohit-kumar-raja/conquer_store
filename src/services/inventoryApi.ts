import { apiRequest, getActiveStoreId } from './apiClient';
import type { BackendStore } from './authApi';
import type { MasterCreateInput, MasterRecord, MasterType } from '../types/masterData';

interface Envelope<T> {
    data: T;
}

export const inventoryApi = {
    async getStores(): Promise<BackendStore[]> {
        return (await apiRequest<Envelope<BackendStore[]>>('/inventory/stores')).data;
    },

    async createStore(data: { name: string; code?: string; city?: string }): Promise<BackendStore> {
        return (
            await apiRequest<Envelope<BackendStore>>('/inventory/stores', {
                method: 'POST',
                body: JSON.stringify(data),
            })
        ).data;
    },

    async list(type: MasterType): Promise<MasterRecord[]> {
        const storeId = getActiveStoreId();
        return (
            await apiRequest<Envelope<MasterRecord[]>>(
                `/inventory/${type}?store_id=${encodeURIComponent(storeId)}`
            )
        ).data;
    },

    async create(
        type: MasterType,
        data: MasterCreateInput
    ): Promise<MasterRecord> {
        return (
            await apiRequest<Envelope<MasterRecord>>(`/inventory/${type}`, {
                method: 'POST',
                body: JSON.stringify({ ...data, store_id: getActiveStoreId() }),
            })
        ).data;
    },

    async update(
        type: MasterType,
        id: string,
        data: Partial<MasterCreateInput>
    ): Promise<MasterRecord> {
        return (
            await apiRequest<Envelope<MasterRecord>>(`/inventory/${type}/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
            })
        ).data;
    },

    async remove(type: MasterType, id: string): Promise<void> {
        await apiRequest<void>(`/inventory/${type}/${id}`, { method: 'DELETE' });
    },
};
