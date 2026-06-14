import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { inventoryApi } from '../services/inventoryApi';
import type { BackendStore } from '../services/authApi';

export interface Shop extends BackendStore {
    branch: string;
    location: string;
    image?: string;
}

const readStoredShops = (): Shop[] => {
    try {
        const value = localStorage.getItem('cnq_stores');
        if (!value) return [];
        return (JSON.parse(value) as BackendStore[]).map((store) => ({
            ...store,
            branch: store.code,
            location: store.city || 'Location not set',
        }));
    } catch {
        return [];
    }
};

export const useShopStore = defineStore('shop', () => {
    const toast = useToast();
    const shops = ref<Shop[]>(readStoredShops());
    const selectedStoreId = ref(localStorage.getItem('cnq_active_store_id'));
    const isSwitcherOpen = ref(false);
    const loading = ref(false);

    const selectedShop = computed<Shop>(() =>
        shops.value.find((store) => store.id === selectedStoreId.value)
        || shops.value[0]
        || {
            id: '',
            name: 'Conquer',
            code: 'NO-STORE',
            branch: 'No store selected',
            location: 'Backend store',
            is_default: false,
        }
    );

    const loadStores = async () => {
        loading.value = true;
        try {
            shops.value = (await inventoryApi.getStores()).map((store) => ({
                ...store,
                branch: store.code,
                location: store.city || 'Location not set',
            }));
            const selected = shops.value.find((store) => store.id === selectedStoreId.value)
                || shops.value.find((store) => store.is_default)
                || shops.value[0];
            if (selected) {
                selectedStoreId.value = selected.id;
                localStorage.setItem('cnq_active_store_id', selected.id);
            }
            localStorage.setItem('cnq_stores', JSON.stringify(shops.value));
        } finally {
            loading.value = false;
        }
    };

    const createShop = async (data: { name: string; code?: string; city?: string }) => {
        const store = await inventoryApi.createStore(data);
        const shop: Shop = {
            ...store,
            branch: store.code,
            location: store.city || data.city?.trim() || 'Location not set',
        };
        shops.value.push(shop);
        localStorage.setItem('cnq_stores', JSON.stringify(shops.value));
        switchShop(shop);
        return shop;
    };

    const switchShop = (shop: Shop) => {
        selectedStoreId.value = shop.id;
        localStorage.setItem('cnq_active_store_id', shop.id);
        isSwitcherOpen.value = false;
        toast.add({
            severity: 'success',
            summary: 'Store Switched',
            detail: `Now managing ${shop.name}`,
            life: 2500,
        });
        window.dispatchEvent(new CustomEvent('cnq:store-changed', { detail: shop.id }));
    };

    return {
        shops,
        selectedShop,
        isSwitcherOpen,
        loading,
        loadStores,
        createShop,
        switchShop,
        toggleSwitcher: () => { isSwitcherOpen.value = !isSwitcherOpen.value; },
    };
});
