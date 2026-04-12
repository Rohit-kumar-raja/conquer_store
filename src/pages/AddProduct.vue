<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import {
    ArrowLeft,
    Camera,
    Package,
    Hash,
    Layers,
    DollarSign,
    Save,
    Plus,
    Minus
} from 'lucide-vue-next';
import { SurfaceCard, Button, Input } from '../components';

const router = useRouter();
const emit = defineEmits(['navigate']);

const stock = ref(0);
</script>

<template>
    <div class="px-6 pt-6 space-y-8 pb-32">
        <section class="flex items-center gap-4">
            <button @click="router.push({ name: 'inventory' })"
                class="p-2 -ml-2 hover:bg-surface-container-high rounded-full transition-colors">
                <ArrowLeft class="w-6 h-6 text-primary" />
            </button>
            <h2 class="text-3xl font-extrabold tracking-tight text-on-surface leading-tight">Add Product</h2>
        </section>

        <!-- Image Upload Placeholder -->
        <section>
            <div
                class="w-full aspect-square bg-surface-container-low rounded-[3rem] border-2 border-dashed border-surface-container-highest flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-surface-container-high transition-all group active:scale-[0.98]">
                <div
                    class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Camera class="w-10 h-10" />
                </div>
                <div class="text-center">
                    <p class="font-bold text-on-surface">Upload Product Image</p>
                    <p class="text-xs text-on-surface-variant font-medium">PNG, JPG up to 10MB</p>
                </div>
            </div>
        </section>

        <!-- Form Fields -->
        <section class="space-y-6">
            <div class="space-y-4">
                <p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Basic
                    Information</p>
                <Input label="Product Name" placeholder="e.g. Quantum Pulse X1">
                    <template #icon>
                        <Package class="w-5 h-5" />
                    </template>
                </Input>
                <Input label="SKU Number" placeholder="e.g. QPX-2024-RED">
                    <template #icon>
                        <Hash class="w-5 h-5" />
                    </template>
                </Input>
                <Input label="Category" placeholder="e.g. Footwear">
                    <template #icon>
                        <Layers class="w-5 h-5" />
                    </template>
                </Input>
            </div>

            <div class="space-y-4">
                <p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Pricing & Stock
                </p>
                <Input label="Selling Price" placeholder="0.00" type="number">
                    <template #icon>
                        <DollarSign class="w-5 h-5" />
                    </template>
                </Input>

                <div class="bg-surface-container-low p-6 rounded-4xl space-y-4">
                    <div class="flex justify-between items-center">
                        <span class="text-sm font-bold text-on-surface">Initial Stock Level</span>
                        <div class="flex items-center gap-4 bg-surface-container-high p-1 rounded-2xl">
                            <button @click="stock = Math.max(0, stock - 1)"
                                class="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95">
                                <Minus class="w-5 h-5" />
                            </button>
                            <span class="w-12 text-center font-extrabold text-lg">{{ stock }}</span>
                            <button @click="stock++"
                                class="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95">
                                <Plus class="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <p class="text-[10px] text-on-surface-variant font-medium leading-relaxed">
                        Setting an initial stock level will automatically mark this item as "Healthy" or "Critical"
                        based on your
                        store's default thresholds.
                    </p>
                </div>
            </div>
        </section>

        <!-- Action Buttons -->
        <div
            class="fixed bottom-0 left-0 right-0 w-full bg-surface/80 backdrop-blur-2xl border-t border-surface-container-high px-6 pb-10 pt-4 z-50 flex gap-4 max-w-md mx-auto">
            <Button variant="secondary" class="flex-1" @click="router.push({ name: 'inventory' })">
                Cancel
            </Button>
            <Button class="flex-1" @click="router.push({ name: 'inventory' })">
                <template #icon>
                    <Save class="w-5 h-5" />
                </template>
                Save Product
            </Button>
        </div>
    </div>
</template>
