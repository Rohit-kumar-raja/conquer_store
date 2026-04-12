import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

export interface Shop {
    id: number;
    name: string;
    branch: string;
    location: string;
}

export const useShopStore = defineStore('shop', () => {
    const toast = useToast();

    const shops = ref<Shop[]>([
        { id: 1, name: 'Indigo Nexus', branch: 'Store #402', location: 'Mumbai' },
        { id: 2, name: 'Conquer Retail', branch: 'Main Wing', location: 'Bangalore' },
        { id: 3, name: 'Pulse Point', branch: 'Express', location: 'Delhi' },
    ]);

    const selectedShop = ref<Shop>(shops.value[0]);
    const isSwitcherOpen = ref(false);

    const switchShop = (shop: Shop) => {
        selectedShop.value = shop;
        isSwitcherOpen.value = false;
        toast.add({
            severity: 'success',
            summary: 'Store Switched',
            detail: `Now managing ${shop.name}`,
            life: 3000
        });
    };

    const toggleSwitcher = () => {
        isSwitcherOpen.value = !isSwitcherOpen.value;
    };

    return {
        shops,
        selectedShop,
        isSwitcherOpen,
        switchShop,
        toggleSwitcher
    };
});
