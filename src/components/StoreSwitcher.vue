<script setup lang="ts">
import { ref } from 'vue';
import { Store as StoreIcon, Plus, Check, X, MapPin, ChevronRight } from 'lucide-vue-next';
import { useShopStore } from '../stores/useShopStore';
import appIcon from '../assets/icon.png';

const shopStore = useShopStore();
const showAddForm = ref(false);
const newName = ref('');
const newBranch = ref('');
const newLocation = ref('');

const addStore = () => {
    if (!newName.value.trim()) return;
    const newShop = {
        id: Date.now(),
        name: newName.value.trim(),
        branch: newBranch.value.trim() || 'Main',
        location: newLocation.value.trim() || 'India',
    };
    shopStore.shops.push(newShop);
    shopStore.switchShop(newShop);
    showAddForm.value = false;
    newName.value = '';
    newBranch.value = '';
    newLocation.value = '';
};

const cancelAdd = () => {
    showAddForm.value = false;
    newName.value = '';
    newBranch.value = '';
    newLocation.value = '';
};

const close = () => {
    shopStore.isSwitcherOpen = false;
    showAddForm.value = false;
};
</script>

<template>
    <!-- Backdrop -->
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="shopStore.isSwitcherOpen" class="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
                @click="close">
            </div>
        </Transition>

        <!-- Bottom Sheet -->
        <Transition name="slide-up">
            <div v-if="shopStore.isSwitcherOpen" class="fixed bottom-0 left-0 right-0 z-[101] max-w-md mx-auto">
                <div
                    class="bg-surface-container-lowest rounded-t-[2rem] shadow-2xl border-t border-surface-container-high/30">

                    <!-- Handle Bar -->
                    <div class="flex justify-center pt-3 pb-1">
                        <div class="w-10 h-1 rounded-full bg-on-surface-variant/15"></div>
                    </div>

                    <!-- Header -->
                    <div class="px-6 pb-4 flex items-center justify-between">
                        <div>
                            <h2 class="text-xl font-black text-on-surface tracking-tight">Your Stores</h2>
                            <p
                                class="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] mt-0.5">
                                {{ shopStore.shops.length }} stores • Switch workspace
                            </p>
                        </div>
                        <button @click="close"
                            class="w-9 h-9 rounded-xl bg-surface-container-high/50 flex items-center justify-center text-on-surface-variant active:scale-90 transition-all">
                            <X class="w-4 h-4" />
                        </button>
                    </div>

                    <!-- Store List -->
                    <div class="px-5 pb-3 space-y-2 max-h-[50vh] overflow-y-auto">
                        <div v-for="store in shopStore.shops" :key="store.id" @click="shopStore.switchShop(store)"
                            :class="[
                                'p-4 rounded-3xl transition-all cursor-pointer flex items-center justify-between group active:scale-[0.97]',
                                shopStore.selectedShop.id === store.id
                                    ? 'bg-primary/8 ring-2 ring-primary/20'
                                    : 'bg-surface-container-low hover:bg-surface-container-high/50'
                            ]">
                            <div class="flex items-center gap-4">
                                <div :class="[
                                    'w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base transition-all',
                                    shopStore.selectedShop.id === store.id
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'bg-surface-container-highest text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary'
                                ]">
                                    {{ store.name.charAt(0) }}
                                </div>
                                <div>
                                    <div class="flex items-center gap-2">
                                        <h3 class="font-black text-on-surface text-sm">{{ store.name }}</h3>
                                        <div v-if="shopStore.selectedShop.id === store.id"
                                            class="flex items-center gap-1 bg-primary/10 px-1.5 py-0.5 rounded-md">
                                            <img :src="appIcon" alt="" class="w-2.5 h-2.5 rounded-sm object-cover" />
                                            <span class="text-[7px] font-black text-primary uppercase">Active</span>
                                        </div>
                                    </div>
                                    <p
                                        class="text-[10px] font-bold text-on-surface-variant/40 mt-0.5 flex items-center gap-1">
                                        <MapPin class="w-3 h-3" />
                                        {{ store.branch }} • {{ store.location }}
                                    </p>
                                </div>
                            </div>
                            <div v-if="shopStore.selectedShop.id === store.id"
                                class="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
                                <Check class="w-4 h-4 text-white" stroke-width="3" />
                            </div>
                            <ChevronRight v-else class="w-4 h-4 text-on-surface-variant/20 shrink-0" />
                        </div>
                    </div>

                    <!-- Add Store Section -->
                    <div class="px-5 pb-6 pt-1">
                        <Transition name="expand" mode="out-in">
                            <!-- Add Form -->
                            <div v-if="showAddForm"
                                class="bg-surface-container-low p-5 rounded-3xl border border-primary/15 space-y-3">
                                <h3 class="text-sm font-black text-on-surface">New Store</h3>
                                <input v-model="newName" type="text" placeholder="Store name"
                                    class="w-full bg-surface-container-high/50 text-on-surface rounded-2xl px-4 py-3 text-sm font-bold placeholder:text-on-surface-variant/30 outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                                <div class="grid grid-cols-2 gap-3">
                                    <input v-model="newBranch" type="text" placeholder="Branch"
                                        class="bg-surface-container-high/50 text-on-surface rounded-2xl px-4 py-3 text-sm font-bold placeholder:text-on-surface-variant/30 outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                                    <input v-model="newLocation" type="text" placeholder="City"
                                        class="bg-surface-container-high/50 text-on-surface rounded-2xl px-4 py-3 text-sm font-bold placeholder:text-on-surface-variant/30 outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                                </div>
                                <div class="flex gap-3 pt-1">
                                    <button @click="addStore"
                                        class="grow flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-2xl text-xs font-black uppercase tracking-wider active:scale-95 transition-all shadow-lg shadow-primary/20">
                                        <Plus class="w-4 h-4" /> Create Store
                                    </button>
                                    <button @click="cancelAdd"
                                        class="px-5 py-3 rounded-2xl bg-surface-container-highest text-on-surface-variant text-xs font-black uppercase tracking-wider active:scale-95 transition-all">
                                        Cancel
                                    </button>
                                </div>
                            </div>

                            <!-- Add Button -->
                            <button v-else @click="showAddForm = true"
                                class="w-full p-4 rounded-3xl border-2 border-dashed border-surface-container-highest/50 flex items-center gap-4 hover:border-primary/30 hover:bg-primary/5 transition-all text-on-surface-variant hover:text-primary group active:scale-[0.97]">
                                <div
                                    class="w-12 h-12 rounded-2xl bg-surface-container-high/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                    <Plus class="w-5 h-5" />
                                </div>
                                <div class="text-left">
                                    <span
                                        class="font-black text-sm text-on-surface group-hover:text-primary transition-colors">Add
                                        New Store</span>
                                    <p class="text-[9px] font-bold text-on-surface-variant/40 mt-0.5">Register a new
                                        branch or location</p>
                                </div>
                            </button>
                        </Transition>
                    </div>

                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-up-enter-active {
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-leave-active {
    transition: transform 0.25s ease-in;
}

.slide-up-enter-from,
.slide-up-leave-to {
    transform: translateY(100%);
}

.expand-enter-active,
.expand-leave-active {
    transition: all 0.25s ease;
}

.expand-enter-from,
.expand-leave-to {
    opacity: 0;
    transform: scale(0.97);
}
</style>
