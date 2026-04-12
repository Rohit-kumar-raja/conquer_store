<script setup lang="ts">
import { Zap } from 'lucide-vue-next';
import { cn } from '../../lib/utils';
import { useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<{
    image: string;
    confidence: number;
    isScanning?: boolean;
}>(), {
    isScanning: true
});

const attrs = useAttrs();
</script>

<template>
    <div v-bind="(() => { const { class: _, ...rest } = attrs; return rest; })()" :class="cn(
        'relative overflow-hidden rounded-[2.5rem] aspect-[3/4] bg-on-surface group shadow-2xl',
        attrs.class as string
    )">
        <!-- Simulated Camera Feed -->
        <img :src="image" alt="Scanning" class="absolute inset-0 w-full h-full object-cover opacity-70" />

        <!-- AR HUD Overlay -->
        <div class="absolute inset-0 flex flex-col justify-center items-center p-8">
            <!-- Corner Brackets -->
            <div
                class="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-primary-container rounded-tl-xl shadow-[0_0_15px_rgba(63,81,181,0.5)]" />
            <div
                class="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-primary-container rounded-tr-xl shadow-[0_0_15px_rgba(63,81,181,0.5)]" />
            <div
                class="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-primary-container rounded-bl-xl shadow-[0_0_15px_rgba(63,81,181,0.5)]" />
            <div
                class="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-primary-container rounded-br-xl shadow-[0_0_15px_rgba(63,81,181,0.5)]" />

            <!-- Scanning Line -->
            <div v-if="isScanning"
                class="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary-container to-transparent shadow-[0_0_15px_#3f51b5] animate-scanner" />

            <!-- Confidence Tag -->
            <div
                class="relative bg-surface-container-lowest/60 backdrop-blur-xl p-4 rounded-full border border-white/40 flex items-center gap-3">
                <div :class="cn('w-2 h-2 rounded-full bg-primary-container', isScanning && 'animate-ping')" />
                <span class="text-on-surface font-headline font-bold text-sm tracking-tight">
                    {{ isScanning ? `Scanning... ${confidence}% confidence` : 'Scan Complete' }}
                </span>
            </div>
        </div>

        <!-- Neural OCR Tag -->
        <div
            class="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-on-surface/80 backdrop-blur-md rounded-full border border-white/10">
            <Zap class="w-3 h-3 text-primary-container" />
            <span class="text-[10px] font-bold text-white uppercase tracking-widest">Neural OCR Active</span>
        </div>
    </div>
</template>

<style scoped>
@keyframes scanner {
    0% {
        top: 20%;
    }

    50% {
        top: 80%;
    }

    100% {
        top: 20%;
    }
}

.animate-scanner {
    animation: scanner 3s linear infinite;
}
</style>
