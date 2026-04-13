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

        // Use Capacitor for Haptics (Physical feedback)
        await Haptics.impact({ style: ImpactStyle.Heavy });

        // Use Capacitor Camera to take the actual photo
        const photo = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Prompt, // Allows Camera or Gallery
            promptLabelHeader: 'Capture Intelligence',
            promptLabelPhoto: 'From Neural Gallery',
            promptLabelPicture: 'Target Node with Lens'
        });

        const tempId = Date.now();

        // 1. Add skeleton with the captured Capacitor image
        capturedProducts.value.unshift({
            id: tempId,
            image: photo.dataUrl,
            loading: true
        });

        // 2. Simulated Neural Resolution (API processing)
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
        console.error('Capacitor Camera Error:', error);
        isCapturing.value = false;
    }
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

        <!-- Viewfinder (Background Visual) -->
        <div class="absolute inset-0 z-0">
            <ScannerView ref="scannerRef"
                class="w-full h-full rounded-none border-none shadow-none ring-0 opacity-40 grayscale"
                :confidence="99" />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80"></div>
        </div>

        <!-- Dashboard Action Layer -->
        <div
            class="bg-surface/90 backdrop-blur-3xl rounded-t-[4rem] p-6 pb-12 space-y-6 shadow-[0_-30px_80px_rgba(0,0,0,1)] z-30 relative mt-auto flex flex-col h-[70vh]">
            <!-- Shutter Action -->
            <div class="flex justify-center -mt-16 mb-2">
                <button @click="capture" :disabled="isCapturing"
                    class="w-24 h-24 rounded-full bg-primary-gradient p-1 shadow-2xl shadow-primary/40 active:scale-90 transition-all group ring-[12px] ring-surface relative">
                    <div
                        class="w-full h-full rounded-full bg-primary flex items-center justify-center border-4 border-white/20 overflow-hidden relative">
                        <div v-if="isCapturing" class="absolute inset-0 bg-white/20 animate-pulse"></div>
                        <CameraIcon v-else class="w-10 h-10 text-white relative z-10" />
                    </div>
                </button>
            </div>

            <!-- Descriptive Header -->
            <div class="text-center space-y-1">
                <h2 class="text-lg font-black text-on-surface uppercase tracking-widest">Capacitor Neural Lens</h2>
                <p class="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-[0.2em]">Native Hardware
                    Integration Active</p>
            </div>

            <!-- Vertical Feed Container -->
            <div class="flex-1 space-y-4 overflow-y-auto hide-scrollbar -mx-2 px-2">
                <div v-if="!capturedProducts.length"
                    class="h-full flex flex-col items-center justify-center space-y-4 opacity-20">
                    <div
                        class="w-20 h-20 rounded-[2.5rem] border-2 border-dashed border-primary flex items-center justify-center">
                        <Maximize2 class="w-8 h-8 text-primary" />
                    </div>
                    <p class="text-[10px] font-black uppercase tracking-[0.3em] text-center">Tap Shutter to Initialize
                        Scan</p>
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
                                        class="w-5 h-5 border-3 border-primary border-t-transparent rounded-full animate-spin">
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
                        class="p-4 bg-surface-container-low border border-surface-container-high shadow-lg rounded-[2.2rem] hover:bg-surface-container-high transition-colors group">
                        <div class="flex gap-4">
                            <div
                                class="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-surface-container-highest shadow-xl">
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
                                        <CheckCircle2 class="w-3.5 h-3.5" />
                                        <span class="text-[9px] font-black uppercase tracking-widest italic">Hardware
                                            Sync</span>
                                    </div>
                                    <span
                                        class="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest truncate">REF:
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
                    class="w-full rounded-[2.5rem] h-16 bg-primary-gradient font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary/30 active:scale-95 transition-all">
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
