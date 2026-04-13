<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
    ArrowLeft,
    Camera as CameraIcon,
    X,
    Receipt,
    Maximize2,
    CheckCircle2
} from 'lucide-vue-next';
import { ScannerView, Button, SurfaceCard } from '../components';
import Skeleton from 'primevue/skeleton';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

const router = useRouter();
const scannerRef = ref();
const scrollContainer = ref<HTMLElement | null>(null);

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

const scrollToTop = () => {
    if (scrollContainer.value) {
        scrollContainer.value.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

const capture = async () => {
    try {
        isCapturing.value = true;
        await Haptics.impact({ style: ImpactStyle.Heavy });

        const photoData = scannerRef.value?.captureFrame();

        const tempId = Date.now();
        capturedProducts.value.unshift({
            id: tempId,
            image: photoData || undefined,
            loading: true
        });

        // Auto-scroll to top when user captures, so the UI doesn't "stay at the bottom"
        scrollToTop();

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
        }, 1500);

    } catch (error) {
        console.error('Capture Error:', error);
        isCapturing.value = false;
    }
};

const removeProduct = (id: number) => {
    capturedProducts.value = capturedProducts.value.filter(p => p.id !== id);
};
</script>

<template>
    <div class="fixed inset-0 bg-on-surface flex flex-col overflow-hidden">
        <!-- Floating Back Button -->
        <button @click="router.back()"
            class="absolute top-10 left-6 z-50 w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white active:scale-95 transition-all shadow-2xl">
            <ArrowLeft class="w-6 h-6" />
        </button>

        <!-- Viewfinder (Maximize Scan Area) -->
        <div class="absolute inset-0 z-0">
            <ScannerView ref="scannerRef" class="w-full h-full" :confidence="99" />
            <!-- Reduced top gradient to make capture area larger and clearer -->
            <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
        </div>

        <!-- Dashboard Action Layer (Minimized initially for larger scan area) -->
        <div class="mt-auto bg-surface/85 backdrop-blur-3xl rounded-t-[3.5rem] p-6 pb-12 space-y-6 shadow-[0_-40px_100px_rgba(0,0,0,0.8)] z-30 relative flex flex-col border-t border-white/10 transition-all duration-500"
            :class="capturedProducts.length > 0 ? 'h-[55vh]' : 'h-[28vh]'">
            <!-- Shutter Action (Anchored) -->
            <div class="flex justify-center -mt-16 mb-2">
                <button @click="capture" :disabled="isCapturing"
                    class="w-24 h-24 rounded-full bg-primary-gradient p-1 shadow-[0_20px_50px_rgba(var(--primary-rgb),0.5)] active:scale-90 transition-all group ring-[12px] ring-surface/60 relative z-50">
                    <div
                        class="w-full h-full rounded-full bg-primary flex items-center justify-center border-4 border-white/20 overflow-hidden relative">
                        <div v-if="isCapturing" class="absolute inset-0 bg-white/30 animate-pulse"></div>
                        <CameraIcon v-else class="w-10 h-10 text-white relative z-10" />
                    </div>
                </button>
            </div>

            <!-- Descriptive Header -->
            <div class="text-center space-y-1">
                <h2 class="text-base font-black text-on-surface uppercase tracking-[0.2em] italic">Intelligence Field
                </h2>
                <div class="flex items-center justify-center gap-1.5">
                    <div class="w-1 h-1 rounded-full bg-primary animate-pulse"></div>
                    <p class="text-[8px] font-bold text-on-surface-variant/40 uppercase tracking-[0.3em]">Hardware
                        Accelerated Scan</p>
                </div>
            </div>

            <!-- Vertical Feed Container (Scrollable) -->
            <div ref="scrollContainer" class="flex-1 space-y-4 overflow-y-auto hide-scrollbar -mx-2 px-2 pb-6">
                <div v-if="!capturedProducts.length"
                    class="h-full flex flex-col items-center justify-center space-y-3 opacity-20 py-8">
                    <Maximize2 class="w-8 h-8 text-primary" />
                    <p class="text-[9px] font-black uppercase tracking-[0.4em] text-center">Awaiting Node Detection</p>
                </div>

                <div v-for="product in capturedProducts" :key="product.id"
                    class="animate-in fade-in slide-in-from-top-4 duration-500">
                    <!-- Skeleton Loader -->
                    <div v-if="product.loading"
                        class="bg-surface-container-high/50 backdrop-blur-md rounded-[2.2rem] p-4 border border-primary/5">
                        <div class="flex gap-4">
                            <div
                                class="w-16 h-16 rounded-[1.2rem] overflow-hidden shrink-0 border border-primary/20 relative">
                                <img v-if="product.image" :src="product.image"
                                    class="w-full h-full object-cover blur-md opacity-40 scale-150" />
                                <div class="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <div
                                        class="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin">
                                    </div>
                                </div>
                            </div>
                            <div class="grow space-y-2.5 pt-1">
                                <Skeleton width="75%" height="0.7rem"
                                    class="bg-surface-container-highest rounded-full" />
                                <Skeleton width="35%" height="0.5rem"
                                    class="bg-surface-container-highest rounded-full" />
                            </div>
                        </div>
                    </div>

                    <!-- Resolved Product Card -->
                    <SurfaceCard v-else variant="low"
                        class="p-4 bg-surface-container-low/60 backdrop-blur-md border border-white/5 shadow-xl rounded-[2.2rem] hover:bg-surface-container-high/80 transition-all active:scale-[0.98] group">
                        <div class="flex gap-4">
                            <div
                                class="w-16 h-16 rounded-[1.2rem] overflow-hidden shrink-0 border border-surface-container-highest shadow-lg">
                                <img :src="product.image" class="w-full h-full object-cover" />
                            </div>
                            <div class="grow space-y-1">
                                <div class="flex justify-between items-start">
                                    <h4 class="text-[11px] font-black text-on-surface uppercase tracking-tight">{{
                                        product.name }}</h4>
                                    <button @click="removeProduct(product.id)"
                                        class="text-on-surface-variant/20 hover:text-error transition-colors p-1">
                                        <X class="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                <div class="flex items-center gap-2">
                                    <CheckCircle2 class="w-3 h-3 text-primary" />
                                    <span
                                        class="text-[8px] font-bold text-on-surface-variant/40 uppercase tracking-widest truncate">REF:
                                        {{ product.sku }}</span>
                                </div>
                                <div class="flex justify-between items-end pt-1">
                                    <p class="text-lg font-black text-on-surface tracking-tighter">{{ product.price }}
                                    </p>
                                    <p
                                        class="text-[8px] font-black text-primary uppercase tracking-[0.2em] bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                                        Synced</p>
                                </div>
                            </div>
                        </div>
                    </SurfaceCard>
                </div>
            </div>

            <!-- Persistent Action (Footer) -->
            <div v-if="capturedProducts.length > 0" class="pt-2 animate-in fade-in slide-in-from-bottom-4">
                <Button @click="router.push({ name: 'bill' })" :disabled="!capturedProducts.some(p => !p.loading)"
                    class="w-full rounded-[2.5rem] h-14 bg-primary-gradient font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/20">
                    <template #icon>
                        <Receipt class="w-4 h-4" />
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
