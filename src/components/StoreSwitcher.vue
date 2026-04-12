<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { Store as StoreIcon, Plus, Check } from 'lucide-vue-next';
import { useStoreManager } from '../composables/useStoreManager';

const { stores, selectedStore, showStoreSwitcher, switchStore } = useStoreManager();
</script>

<template>
    <Dialog v-model:visible="showStoreSwitcher" modal header="Switch Store" :draggable="false"
        class="w-[90%] max-w-sm mx-4" :pt="{
            root: { class: 'rounded-4xl border-none shadow-2xl bg-surface' },
            header: { class: 'p-6 pb-2 text-2xl font-black text-on-surface' },
            content: { class: 'p-6' },
            mask: { class: 'backdrop-blur-md bg-on-surface/5' }
        }">
        <div class="space-y-4">
            <div v-for="store in stores" :key="store.id" @click="switchStore(store)" :class="[
                'p-4 rounded-3xl border transition-all cursor-pointer flex items-center justify-between group',
                selectedStore.id === store.id
                    ? 'bg-primary/5 border-primary shadow-sm'
                    : 'bg-surface-container-low border-transparent hover:bg-surface-container-high'
            ]">
                <div class="flex items-center gap-4">
                    <div :class="[
                        'w-12 h-12 rounded-2xl flex items-center justify-center transition-colors',
                        selectedStore.id === store.id ? 'bg-primary text-white' : 'bg-surface-container-highest text-on-surface-variant group-hover:bg-primary-container group-hover:text-primary'
                    ]">
                        <StoreIcon class="w-6 h-6" />
                    </div>
                    <div>
                        <h3 class="font-bold text-on-surface">{{ store.name }}</h3>
                        <p class="text-xs text-on-surface-variant font-medium">{{ store.branch }} • {{ store.location }}
                        </p>
                    </div>
                </div>
                <div v-if="selectedStore.id === store.id"
                    class="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check class="w-4 h-4 text-white" stroke-width="4" />
                </div>
            </div>

            <button
                class="w-full p-4 rounded-3xl border-2 border-dashed border-surface-container-highest flex items-center gap-4 hover:border-primary hover:bg-primary/5 transition-all text-on-surface-variant hover:text-primary group active:scale-[0.98]">
                <div
                    class="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center group-hover:bg-primary-container transition-colors">
                    <Plus class="w-6 h-6" />
                </div>
                <span class="font-bold">Add New Store</span>
            </button>
        </div>
    </Dialog>
</template>
