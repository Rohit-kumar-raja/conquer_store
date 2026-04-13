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
const scannerRef = ref();

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

    // Capture actual frame from the camera component
    const capturedFrame = scannerRef.value?.captureFrame();

    // 1. Add skeleton immediately with the captured frame as a preview if available
    capturedProducts.value.unshift({
        id: tempId,
        image: capturedFrame,
        loading: true
    });

    // 2. Wait 2 seconds (simulated neural processing)
    setTimeout(() => {
        const products = [
            { name: 'Organic Almond Milk (1L)', price: '₹140', sku: 'MLK-ORG-01', stock: 24 },
            { name: 'AuraPods Pro Gen 2', price: '₹4,999', sku: 'AUD-APP-G2', stock: 12 },
            { name: 'X-Watch series 9', price: '₹24,999', sku: 'WCH-X9-SLV', stock: 8 },
            { name: 'MagSafe Gen 2', price: '₹3,499', sku: 'PWR-MAG-G2', stock: 45 }
        ];

        const randomItem = products[Math.floor(Math.random() * products.length)];

        const index = capturedProducts.value.findIndex(p => p.id === tempId);
        if (index !== -1) {
            capturedProducts.value[index] = {
                ...capturedProducts.value[index],
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
    <div class="h-screen bg-on-surface flex flex-col relative overflow-hidden">
        <!-- Floating Back Button -->
        <button @click="router.back()"
            class="absolute top-6 left-6 z-50 w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white active:scale-95 transition-all">
            <ArrowLeft class="w-6 h-6" />
        </button>

        <!-- Viewfinder with Actual Camera (Expanded) -->
        <div class="absolute inset-0 z-0 pb-64">
            <ScannerView ref="scannerRef" class="w-full h-full rounded-none border-none shadow-none ring-0"
                :confidence="99" />

            <!-- Targeting Frame (Expanded) -->
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none p-12">
                <div
                    class="w-full max-w-sm aspect-square border-2 border-white/5 rounded-[4rem] relative flex items-center justify-center">
                    <div
                        :class="['w-full h-full border-2 border-primary rounded-[4rem] transition-all duration-300', isCapturing ? 'scale-90 opacity-100 shadow-[0_0_50px_rgba(var(--primary),0.5)]' : 'scale-100 opacity-20']">
                    </div>
                </div>
            </div>

            <!-- Top Gradient Overlay for readability -->
            <div
                class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
            </div>
        </div>

        <!-- Dashboard Action Layer -->
        <div
            class="bg-surface/90 backdrop-blur-3xl rounded-t-[4rem] p-6 pb-12 space-y-6 shadow-[0_-30px_80px_rgba(0,0,0,0.9)] z-30 relative mt-auto flex flex-col h-[55vh]">
            <!-- Shutter Action -->
            <div class="flex justify-center -mt-16 mb-4">
                <button @click="capture" :disabled="isCapturing"
                    class="w-20 h-20 rounded-full bg-primary-gradient p-1 shadow-2xl shadow-primary/40 active:scale-90 transition-all group ring-8 ring-surface relative">
                    <div
                        class="w-full h-full rounded-full bg-primary flex items-center justify-center border-4 border-white/20 overflow-hidden relative">
                        <div v-if="isCapturing" class="absolute inset-0 bg-white/20 animate-pulse"></div>
                        <Camera v-else class="w-8 h-8 text-white relative z-10" />
                    </div>
                </button>
            </div>

            <!-- Vertical Feed Container -->
            <div class="flex-1 space-y-4 overflow-y-auto hide-scrollbar pr-1 -mx-2 px-2">
                <div v-if="!capturedProducts.length"
                    class="h-40 flex flex-col items-center justify-center border-2 border-dashed border-surface-container-highest rounded-3xl space-y-2 opacity-10">
                    <Maximize2 class="w-8 h-8" />
                    <p class="text-[10px] font-black uppercase tracking-widest text-center">Optic Field Empty</p>
                </div>

                <div v-for="product in capturedProducts" :key="product.id"
                    class="animate-in fade-in slide-in-from-top-4 duration-300">
                    <!-- Skeleton Loader -->
                    <div v-if="product.loading" class="bg-surface-container-high rounded-3xl p-4">
                        <div class="flex gap-4">
                            <div
                                class="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-primary/20 relative">
                                <img v-if="product.image" :src="product.image"
                                    class="w-full h-full object-cover blur-sm opacity-50" />
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <div
                                        class="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin">
                                    </div>
                                </div>
                            </div>
                            <div class="grow space-y-3 pt-1">
                                <Skeleton width="80%" height="0.8rem" class="bg-surface-container-highest" />
                                <Skeleton width="40%" height="0.6rem" class="bg-surface-container-highest" />
                                <div class="flex justify-between pt-2">
                                    <Skeleton width="40%" height="1.2rem" class="bg-surface-container-highest" />
                                    <Skeleton width="20%" height="0.6rem" class="bg-surface-container-highest" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Resolved Product Card -->
                    <SurfaceCard v-else variant="low"
                        class="p-4 bg-surface-container-low border border-surface-container-high/50 shadow-lg rounded-[2rem] hover:bg-surface-container-high transition-colors group">
                        <div class="flex gap-4">
                            <div
                                class="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-surface-container-highest shadow-sm">
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
                                        <span
                                            class="text-[9px] font-black uppercase tracking-widest italic">Resolved</span>
                                    </div>
                                    <span
                                        class="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest truncate">SKU:
                                        {{ product.sku }}</span>
                                </div>
                                <div class="flex justify-between items-end pt-2">
                                    <p class="text-lg font-black text-on-surface leading-none">{{ product.price }}</p>
                                    <p class="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">
                                        Stock: {{ product.stock }}</p>
                                </div>
                            </div>
                        </div>
                    </SurfaceCard>
                </div>
            </div>

            <!-- Persistent Action -->
            <div class="pt-4 border-t border-surface-container-high">
                <Button @click="router.push({ name: 'bill' })" :disabled="!capturedProducts.some(p => !p.loading)"
                    class="w-full rounded-[2rem] h-16 bg-primary-gradient font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary/30">
                    <template #icon>
                        <Receipt class="w-5 h-5" />
                    </template>
                    Generate Bill ({{capturedProducts.filter(p => !p.loading).length}})
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
