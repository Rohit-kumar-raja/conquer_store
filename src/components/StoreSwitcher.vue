<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Check, Plus, Store as StoreIcon, X } from 'lucide-vue-next';
import { useShopStore } from '../stores/useShopStore';

const shopStore = useShopStore();
const showAddForm = ref(false);
const name = ref('');
const code = ref('');
const city = ref('');
const submitting = ref(false);
const error = ref('');

const resetForm = () => {
    showAddForm.value = false;
    name.value = '';
    code.value = '';
    city.value = '';
    error.value = '';
};

const close = () => {
    shopStore.isSwitcherOpen = false;
    resetForm();
};

const createStore = async () => {
    if (!name.value.trim() || submitting.value) return;
    submitting.value = true;
    error.value = '';
    try {
        await shopStore.createShop({
            name: name.value.trim(),
            code: code.value.trim() || undefined,
            city: city.value.trim() || undefined,
        });
        resetForm();
    } catch (cause) {
        error.value = cause instanceof Error ? cause.message : 'Unable to create store.';
    } finally {
        submitting.value = false;
    }
};

onMounted(() => {
    if (!shopStore.shops.length) void shopStore.loadStores();
});
</script>

<template>
    <Teleport to="body">
        <div v-if="shopStore.isSwitcherOpen" class="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            @click="close"></div>
        <div v-if="shopStore.isSwitcherOpen" class="fixed bottom-0 left-0 right-0 z-[101] max-w-md mx-auto">
            <div class="bg-surface-container-lowest rounded-t-[2rem] shadow-2xl p-6 pb-10">
                <div class="flex items-center justify-between mb-5">
                    <div>
                        <h2 class="text-xl font-black text-on-surface">Your Stores</h2>
                        <p class="text-[10px] font-bold text-on-surface-variant/50">Loaded from Conquer API</p>
                    </div>
                    <button @click="close"
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

                    <form v-if="showAddForm" class="mt-4 p-4 rounded-3xl bg-surface-container-low space-y-3"
                        @submit.prevent="createStore">
                        <h3 class="text-sm font-black text-on-surface">Create New Store</h3>
                        <input v-model="name" required type="text" placeholder="Store name"
                            class="w-full bg-surface-container-high text-on-surface rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30" />
                        <div class="grid grid-cols-2 gap-3">
                            <input v-model="code" type="text" placeholder="Store code"
                                class="min-w-0 bg-surface-container-high text-on-surface rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30" />
                            <input v-model="city" type="text" placeholder="City"
                                class="min-w-0 bg-surface-container-high text-on-surface rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30" />
                        </div>
                        <p v-if="error" class="text-xs font-bold text-error">{{ error }}</p>
                        <div class="flex gap-3">
                            <button type="submit" :disabled="submitting || !name.trim()"
                                class="grow bg-primary text-white py-3 rounded-2xl text-xs font-black uppercase tracking-wider disabled:opacity-50">
                                {{ submitting ? 'Creating...' : 'Create Store' }}
                            </button>
                            <button type="button" @click="resetForm"
                                class="px-4 py-3 rounded-2xl bg-surface-container-highest text-on-surface-variant text-xs font-black uppercase">
                                Cancel
                            </button>
                        </div>
                    </form>

                    <button v-else @click="showAddForm = true"
                        class="w-full mt-4 p-4 rounded-3xl border-2 border-dashed border-surface-container-highest flex items-center gap-4 text-on-surface-variant active:scale-[0.98] transition-all">
                        <div class="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                            <Plus class="w-5 h-5" />
                        </div>
                        <div class="text-left">
                            <p class="font-black text-sm text-on-surface">Create New Store</p>
                            <p class="text-[9px] font-bold text-on-surface-variant/50">Register another branch or location</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>
