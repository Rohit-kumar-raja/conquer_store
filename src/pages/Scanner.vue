<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
    ArrowLeft,
    Camera,
    X,
    Receipt,
    Maximize2,
    CheckCircle2
} from 'lucide-vue-next';
import { ScannerView, Button, SurfaceCard } from '../components';
import Skeleton from 'primevue/skeleton';

const router = useRouter();

interface CapturedProduct {
    id: number;
    image?: string;
    name?: string;
    price?: string;
    sku?: string;
    stock?: number;
    loading: boolean;
}

const capturedProducts = ref<CapturedProduct[]>([]);
const isCapturing = ref(false);

const capture = () => {
    isCapturing.value = true;
    const tempId = Date.now();

    // 1. Add skeleton immediately
    capturedProducts.value.unshift({
        id: tempId,
        loading: true
    });

    // 2. Wait 2 seconds (skeleton duration)
    setTimeout(() => {
        const products = [
            { name: 'Organic Almond Milk (1L)', price: '₹140', sku: 'MLK-ORG-01', stock: 24 },
            { name: 'AuraPods Pro Gen 2', price: '₹4,999', sku: 'AUD-APP-G2', stock: 12 },
            { name: 'X-Watch series 9', price: '₹24,999', sku: 'WCH-X9-SLV', stock: 8 },
            { name: 'MagSafe Gen 2', price: '₹3,499', sku: 'PWR-MAG-G2', stock: 45 }
        ];

        const randomItem = products[Math.floor(Math.random() * products.length)];

        // Find and replace the skeleton with real info
        const index = capturedProducts.value.findIndex(p => p.id === tempId);
        if (index !== -1) {
            capturedProducts.value[index] = {
                id: tempId,
                image: `https://picsum.photos/seed/${tempId}/400/400`,
                loading: false,
                ...randomItem
            };
        }
        isCapturing.value = false;
    }, 2000);
};

const removeProduct = (id: number) => {
    capturedProducts.value = capturedProducts.value.filter(p => p.id !== id);
};
</script>

<template>
    <div class="min-h-screen bg-on-surface flex flex-col relative overflow-hidden">
        <!-- Neural Overlay Header -->

        <!-- Viewfinder -->
        <div class="flex-1 relative flex flex-col items-center justify-center p-6 pb-44">
            <ScannerView class="w-full h-full shadow-none border-none ring-0 opacity-90"
                image="https://picsum.photos/seed/inventory-shelf/800/1200" :confidence="99" />

            <!-- Targeting Frame -->
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none p-16">
                <div
                    class="w-full aspect-square border-2 border-white/5 rounded-[4rem] relative flex items-center justify-center">
                    <div
                        :class="['w-full h-full border-2 border-primary rounded-[4rem] transition-all duration-300', isCapturing ? 'scale-90 opacity-100' : 'scale-100 opacity-20']">
                    </div>
                </div>
            </div>
        </div>

        <!-- Dashboard Action Layer -->
        <div
            class="bg-surface/95 backdrop-blur-3xl rounded-t-[4rem] p-6 pb-12 space-y-6 shadow-[0_-30px_80px_rgba(0,0,0,0.8)] z-30 relative min-h-[50vh] flex flex-col">
            <!-- Shutter Action -->
            <div class="flex justify-center -mt-16 mb-4">
                <button @click="capture" :disabled="isCapturing"
                    class="w-20 h-20 rounded-full bg-primary-gradient p-1 shadow-2xl shadow-primary/40 active:scale-90 transition-all group ring-8 ring-surface relative">
                    <div
                        class="w-full h-full rounded-full bg-primary flex items-center justify-center border-4 border-white/20 overflow-hidden relative">
                        <div v-if="isCapturing" class="absolute inset-0 bg-white/20 animate-pulse"></div>
                        <Camera v-else class="w-8 h-8 text-white" />
                    </div>
                </button>
            </div>

            <!-- Vertical Feed Container -->
            <div class="flex-1 space-y-4 overflow-y-auto max-h-[40vh] hide-scrollbar pr-1 -mx-2 px-2">
                <div v-if="!capturedProducts.length"
                    class="h-40 flex flex-col items-center justify-center border-2 border-dashed border-surface-container-highest rounded-3xl space-y-2 opacity-20">
                    <Maximize2 class="w-8 h-8" />
                    <p class="text-[10px] font-black uppercase tracking-widest text-center">Awaiting Pulse Scan</p>
                </div>

                <div v-for="product in capturedProducts" :key="product.id"
                    class="animate-in fade-in slide-in-from-top-4 duration-300">
                    <!-- Skeleton Loader -->
                    <div v-if="product.loading" class="bg-surface-container-high rounded-3xl p-4 space-y-3">
                        <div class="flex gap-4">
                            <Skeleton shape="circle" size="4rem" class="shrink-0 bg-surface-container-highest" />
                            <div class="grow space-y-2">
                                <Skeleton width="60%" height="1rem" class="bg-surface-container-highest" />
                                <Skeleton width="40%" height="0.6rem" class="bg-surface-container-highest" />
                                <div class="flex justify-between pt-2">
                                    <Skeleton width="30%" height="1.5rem" class="bg-surface-container-highest" />
                                    <Skeleton width="20%" height="0.8rem" class="bg-surface-container-highest" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Resolved Product Card -->
                    <SurfaceCard v-else variant="low"
                        class="p-4 bg-surface-container-low border border-surface-container-high/50 shadow-lg rounded-3xl hover:bg-surface-container-high transition-colors group">
                        <div class="flex gap-4">
                            <div
                                class="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-surface-container-highest">
                                <img :src="product.image" class="w-full h-full object-cover" />
                            </div>
                            <div class="grow space-y-1">
                                <div class="flex justify-between items-start">
                                    <h4 class="text-xs font-black text-on-surface uppercase tracking-tight">{{
                                        product.name }}</h4>
                                    <button @click="removeProduct(product.id)"
                                        class="text-on-surface-variant/40 hover:text-error transition-colors">
                                        <X class="w-4 h-4" />
                                    </button>
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="flex items-center gap-1 text-primary">
                                        <CheckCircle2 class="w-3 h-3" />
                                        <span class="text-[9px] font-black uppercase tracking-widest">Captured</span>
                                    </div>
                                    <span
                                        class="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">SKU:
                                        {{ product.sku }}</span>
                                </div>
                                <div class="flex justify-between items-end pt-2">
                                    <p class="text-lg font-black text-on-surface leading-none">{{ product.price }}</p>
                                    <p class="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">
                                        {{ product.stock }} IN UNIT</p>
                                </div>
                            </div>
                        </div>
                    </SurfaceCard>
                </div>
            </div>

            <!-- Persistent Action -->
            <div class="pt-4 border-t border-surface-container-high">
                <Button @click="router.push({ name: 'bill' })" :disabled="!capturedProducts.some(p => !p.loading)"
                    class="w-full rounded-2xl h-16 bg-primary-gradient font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary/30 active:scale-95 transition-all">
                    <template #icon>
                        <Receipt class="w-5 h-5" />
                    </template>
                    Finalize Transaction ({{capturedProducts.filter(p => !p.loading).length}})
                </Button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
