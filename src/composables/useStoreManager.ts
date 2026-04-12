import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

export interface Store {
    id: number;
    name: string;
    branch: string;
    location: string;
}

const stores = ref<Store[]>([
    { id: 1, name: 'Indigo Nexus', branch: 'Store #402', location: 'Mumbai' },
    { id: 2, name: 'Conquer Retail', branch: 'Main Wing', location: 'Bangalore' },
    { id: 3, name: 'Pulse Point', branch: 'Express', location: 'Delhi' },
]);

const selectedStore = ref<Store>(stores.value[0]);
const showStoreSwitcher = ref(false);

export function useStoreManager() {
    const toast = useToast();

    const switchStore = (store: Store) => {
        selectedStore.value = store;
        showStoreSwitcher.value = false;
        toast.add({
            severity: 'success',
            summary: 'Store Switched',
            detail: `Now managing ${store.name}`,
            life: 3000
        });
    };

    const toggleStoreSwitcher = () => {
        showStoreSwitcher.value = !showStoreSwitcher.value;
    };

    return {
        stores,
        selectedStore,
        showStoreSwitcher,
        switchStore,
        toggleStoreSwitcher
    };
}
