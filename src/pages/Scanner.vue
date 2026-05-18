<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
    ArrowLeft,
    Camera as CameraIcon,
    CheckCircle2,
    Maximize2,
    Receipt,
    Settings2,
    X
} from 'lucide-vue-next';
import { ScannerView } from '../components';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { billService, type ScannedBillProduct } from '../services/billService';

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

type ScanQuality = 'fast' | 'hd' | 'max';

const qualityOptions: Array<{ id: ScanQuality; label: string; captureQuality: number; confidence: number }> = [
    { id: 'fast', label: 'Fast', captureQuality: 0.62, confidence: 88 },
    { id: 'hd', label: 'HD', captureQuality: 0.82, confidence: 96 },
    { id: 'max', label: 'Max', captureQuality: 0.94, confidence: 99 }
];

const selectedQuality = ref<ScanQuality>('hd');
const capturedProducts = ref<CapturedProduct[]>([]);
const isCapturing = ref(false);

const readyProducts = computed(() => capturedProducts.value.filter((product) => !product.loading));
const activeQuality = computed(() => qualityOptions.find((option) => option.id === selectedQuality.value) ?? qualityOptions[1]);

const parsePrice = (price: string) => Number(price.replace(/[^\d.]/g, '')) || 0;

const getScannedBillProducts = (): ScannedBillProduct[] => {
    return capturedProducts.value.filter((product) =>
        !product.loading && product.name && product.sku && product.price
    ).map((product) => {
        const sku = product.sku || '';
        return {
            name: product.name || '',
            sku,
            price: parsePrice(product.price || '0'),
            image: product.image || `https://picsum.photos/seed/${sku}/200/200`
        };
    });
};

const finalizeTransaction = async () => {
    await billService.addScannedProducts(getScannedBillProducts());
    router.push({ name: 'bill' });
};

const capture = async () => {
    try {
        isCapturing.value = true;
        await Haptics.impact({ style: ImpactStyle.Heavy });

        const photoData = scannerRef.value?.captureFrame(activeQuality.value.captureQuality);
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
        }, 900);
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
    <div class="fixed inset-0 bg-black overflow-hidden">
        <ScannerView ref="scannerRef" class="absolute inset-0 w-full h-full" :confidence="activeQuality.confidence"
            :quality="selectedQuality" />
        <div class="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55 pointer-events-none"></div>

        <!-- Top Controls -->
        <div class="absolute top-10 left-0 right-0 z-40 px-5">
            <div class="flex items-center justify-between gap-3">
                <button @click="router.back()"
                    class="w-11 h-11 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white active:scale-95 transition-all">
                    <ArrowLeft class="w-5 h-5" />
                </button>

                <div
                    class="h-11 px-4 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/10 flex items-center gap-2 text-white">
                    <Maximize2 class="w-4 h-4 text-primary" />
                    <span class="text-[10px] font-black uppercase tracking-[0.2em]">Full Screen Scan</span>
                </div>

                <div class="w-11 h-11 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white">
                    <span class="text-[10px] font-black">{{ readyProducts.length }}</span>
                </div>
            </div>
        </div>

        <!-- Scanned Product Popover -->
        <div v-if="capturedProducts.length"
            class="absolute top-28 left-0 right-0 z-30 px-5 space-y-2 max-h-[34vh] overflow-y-auto hide-scrollbar pointer-events-auto">
            <div v-for="product in capturedProducts" :key="product.id"
                class="bg-black/55 backdrop-blur-2xl border border-white/10 rounded-3xl p-3 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-300">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-2xl overflow-hidden bg-white/10 border border-white/10 shrink-0 relative">
                        <img v-if="product.image" :src="product.image" class="w-full h-full object-cover" />
                        <div v-if="product.loading" class="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div class="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                        </div>
                    </div>

                    <div class="grow min-w-0">
                        <template v-if="product.loading">
                            <div class="h-3 w-32 rounded-full bg-white/20 animate-pulse"></div>
                            <div class="h-2 w-20 rounded-full bg-white/10 animate-pulse mt-2"></div>
                        </template>
                        <template v-else>
                            <div class="flex items-center gap-1.5">
                                <CheckCircle2 class="w-3.5 h-3.5 text-primary shrink-0" />
                                <h4 class="text-xs font-black text-white uppercase tracking-tight truncate">
                                    {{ product.name }}
                                </h4>
                            </div>
                            <p class="text-[9px] font-bold text-white/45 uppercase tracking-widest mt-1 truncate">
                                {{ product.sku }} • {{ product.price }} • {{ product.stock }} left
                            </p>
                        </template>
                    </div>

                    <button @click="removeProduct(product.id)"
                        class="w-8 h-8 rounded-xl bg-white/10 text-white/50 flex items-center justify-center active:scale-90 shrink-0">
                        <X class="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>

        <!-- Quality Selector -->
        <div
            class="absolute left-5 bottom-28 z-40 bg-black/45 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 flex items-center gap-1">
            <Settings2 class="w-4 h-4 text-white/60 mx-2" />
            <button v-for="option in qualityOptions" :key="option.id" @click="selectedQuality = option.id" :class="[
                'px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all',
                selectedQuality === option.id ? 'bg-primary text-white' : 'text-white/55'
            ]">
                {{ option.label }}
            </button>
        </div>

        <!-- Capture Button -->
        <button @click="capture" :disabled="isCapturing"
            class="absolute left-1/2 -translate-x-1/2 bottom-9 z-50 w-20 h-20 rounded-full bg-primary-gradient p-1 shadow-[0_18px_45px_rgba(36,56,156,0.45)] active:scale-90 transition-all ring-[10px] ring-black/35">
            <div class="w-full h-full rounded-full bg-primary flex items-center justify-center border-4 border-white/20 relative overflow-hidden">
                <div v-if="isCapturing" class="absolute inset-0 bg-white/30 animate-pulse"></div>
                <CameraIcon v-else class="w-9 h-9 text-white relative z-10" />
            </div>
        </button>

        <!-- Small Finalize Action -->
        <button v-if="readyProducts.length" @click="finalizeTransaction"
            class="absolute right-5 bottom-12 z-40 h-12 px-4 rounded-2xl bg-white text-primary shadow-2xl flex items-center gap-2 active:scale-95 transition-all">
            <Receipt class="w-4 h-4" />
            <span class="text-[10px] font-black uppercase tracking-widest">Bill {{ readyProducts.length }}</span>
        </button>
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
