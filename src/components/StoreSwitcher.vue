<script setup lang="ts">
import { onMounted } from 'vue';
import { Check, Store as StoreIcon, X } from 'lucide-vue-next';
import { useShopStore } from '../stores/useShopStore';

const shopStore = useShopStore();

onMounted(() => {
    if (!shopStore.shops.length) void shopStore.loadStores();
});
</script>

<template>
    <Teleport to="body">
        <div v-if="shopStore.isSwitcherOpen" class="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            @click="shopStore.isSwitcherOpen = false"></div>
        <div v-if="shopStore.isSwitcherOpen" class="fixed bottom-0 left-0 right-0 z-[101] max-w-md mx-auto">
            <div class="bg-surface-container-lowest rounded-t-[2rem] shadow-2xl p-6 pb-10">
                <div class="flex items-center justify-between mb-5">
                    <div>
                        <h2 class="text-xl font-black text-on-surface">Your Stores</h2>
                        <p class="text-[10px] font-bold text-on-surface-variant/50">Loaded from Conquer API</p>
                    </div>
                    <button @click="shopStore.isSwitcherOpen = false"
                        class="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center">
                        <X class="w-4 h-4" />
                    </button>
                </div>
                <p v-if="shopStore.loading" class="text-sm font-bold text-on-surface-variant">Loading stores...</p>
                <div v-else class="space-y-2">
                    <button v-for="store in shopStore.shops" :key="store.id" @click="shopStore.switchShop(store)"
                        class="w-full p-4 rounded-3xl bg-surface-container-low flex items-center gap-4 text-left">
                        <div class="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                            <StoreIcon class="w-5 h-5" />
                        </div>
                        <div class="grow">
                            <p class="font-black text-on-surface">{{ store.name }}</p>
                            <p class="text-[10px] font-bold text-on-surface-variant/50">{{ store.code }}</p>
                        </div>
                        <Check v-if="shopStore.selectedShop?.id === store.id" class="w-5 h-5 text-primary" />
                    </button>
                    <p v-if="!shopStore.shops.length" class="text-sm font-bold text-on-surface-variant">
                        No stores are assigned to this account.
                    </p>
                </div>
            </div>
        </div>
    </Teleport>
</template>
