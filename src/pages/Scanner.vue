<script setup lang="ts">
import { ref } from 'vue';
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
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

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

const capture = async () => {
    try {
        isCapturing.value = true;

        // Physical feedback remains via Capacitor
        await Haptics.impact({ style: ImpactStyle.Heavy });

        // Direct capture from our custom Lens (No Native Dialogs)
        const photoData = scannerRef.value?.captureFrame();

        const tempId = Date.now();

        capturedProducts.value.unshift({
            id: tempId,
            image: photoData || undefined,
            loading: true
        });

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
    <div class="fixed inset-0 bg-on-surface  flex flex-col overflow-hidden">
        <!-- Floating Back Button -->
        <button @click="router.back()"
            class="absolute top-8 left-6 z-50 w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white active:scale-95 transition-all shadow-2xl">
            <ArrowLeft class="w-6 h-6" />
        </button>

        <!-- Viewfinder (Full Screen Background) -->
        <div class="absolute inset-0 z-0">
            <ScannerView ref="scannerRef" class="w-full h-full" :confidence="99" />
            <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90"></div>
        </div>

        <!-- Dashboard Action Layer (Floating Bottom) -->
        <div
            class="mt-auto bg-surface/80 backdrop-blur-3xl rounded-t-[4rem] p space-y-6 shadow-[0_-30px_100px_rgba(0,0,0,1)]  relative flex flex-col border-t border-white/5">
            <!-- Shutter Action -->
            <div class="flex justify-center -mt-16 mb-2">
                <button @click="capture" :disabled="isCapturing"
                    class="w-24 h-24 rounded-full bg-primary-gradient p-1 shadow-2xl shadow-primary/40 active:scale-90 transition-all group ring-[12px] ring-surface/40 relative">
                    <div
                        class="w-full h-full rounded-full bg-primary flex items-center justify-center border-4 border-white/20 overflow-hidden relative">
                        <div v-if="isCapturing" class="absolute inset-0 bg-white/20 animate-pulse"></div>
                        <CameraIcon v-else class="w-10 h-10 text-white relative z-10" />
                    </div>
                </button>
            </div>

            <!-- Descriptive Header -->
            <div class="text-center space-y-1">
                <h2 class="text-lg font-black text-on-surface uppercase tracking-widest">Neural Scanner</h2>
                <div class="flex items-center justify-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></div>
                    <p class="text-[9px] font-bold text-on-surface-variant/60 uppercase tracking-[0.2em]">Optic Hardware
                        Linked</p>
                </div>
            </div>

            <!-- Vertical Feed Container -->
            <div class="flex-1 space-y-4 overflow-y-auto hide-scrollbar -mx-2 px-2">
                <div v-if="!capturedProducts.length"
                    class="h-full flex flex-col items-center justify-center space-y-4 opacity-10">
                    <Maximize2 class="w-10 h-10" />
                    <p class="text-[10px] font-black uppercase tracking-[0.4em] text-center">Field Analysis Awaiting
                        Snapshot</p>
                </div>

                <div v-for="product in capturedProducts" :key="product.id"
                    class="animate-in fade-in slide-in-from-top-4 duration-300">
                    <!-- Skeleton Loader -->
                    <div v-if="product.loading"
                        class="bg-surface-container-high rounded-[2.5rem] p-4 border border-primary/10">
                        <div class="flex gap-4">
                            <div
                                class="w-20 h-20 rounded-[1.5rem] overflow-hidden shrink-0 border border-primary/20 relative">
                                <img v-if="product.image" :src="product.image"
                                    class="w-full h-full object-cover blur-md opacity-40 scale-125" />
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <div
                                        class="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin">
                                    </div>
                                </div>
                            </div>
                            <div class="grow space-y-3 pt-1">
                                <Skeleton width="85%" height="0.8rem"
                                    class="bg-surface-container-highest rounded-full" />
                                <Skeleton width="45%" height="0.6rem"
                                    class="bg-surface-container-highest rounded-full" />
                                <div class="flex justify-between pt-2">
                                    <Skeleton width="35%" height="1.4rem"
                                        class="bg-surface-container-highest rounded-xl" />
                                    <Skeleton width="25%" height="0.8rem"
                                        class="bg-surface-container-highest rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Resolved Product Card -->
                    <SurfaceCard v-else variant="low"
                        class="p-4 bg-surface-container-low border border-surface-container-high shadow-2xl rounded-[2.5rem] hover:bg-surface-container-high transition-all active:scale-[0.98] group">
                        <div class="flex gap-4">
                            <div
                                class="w-20 h-20 rounded-[1.5rem] overflow-hidden shrink-0 border border-surface-container-highest shadow-xl">
                                <img :src="product.image" class="w-full h-full object-cover" />
                            </div>
                            <div class="grow space-y-1">
                                <div class="flex justify-between items-start">
                                    <h4 class="text-xs font-black text-on-surface uppercase tracking-tight">{{
                                        product.name }}</h4>
                                    <button @click="removeProduct(product.id)"
                                        class="text-on-surface-variant/30 hover:text-error transition-colors p-1">
                                        <X class="w-4 h-4" />
                                    </button>
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="flex items-center gap-1 text-primary">
                                        <CheckCircle2 class="w-3.5 h-3.5" />
                                        <span class="text-[9px] font-black uppercase tracking-widest italic">Sync
                                            Validated</span>
                                    </div>
                                    <span
                                        class="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-widest truncate">NODE:
                                        {{ product.sku }}</span>
                                </div>
                                <div class="flex justify-between items-end pt-2">
                                    <p class="text-xl font-black text-on-surface tracking-tighter leading-none">{{
                                        product.price }}</p>
                                    <p
                                        class="text-[9px] font-black text-primary uppercase tracking-[0.2em] bg-primary/10 px-2 py-0.5 rounded-full">
                                        Unit Ready</p>
                                </div>
                            </div>
                        </div>
                    </SurfaceCard>
                </div>
            </div>

            <!-- Persistent Action -->
            <div class="pt-4">
                <Button @click="router.push({ name: 'bill' })" :disabled="!capturedProducts.some(p => !p.loading)"
                    class="w-full rounded-[2.5rem] h-16 bg-primary-gradient font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary/30">
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
