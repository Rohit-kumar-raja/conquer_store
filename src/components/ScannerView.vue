<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { CameraOff } from 'lucide-vue-next';
import { cn } from '../lib/utils';
import appIcon from '../assets/icon.png';

const props = withDefaults(defineProps<{
    confidence: number;
    isScanning?: boolean;
}>(), {
    isScanning: true
});

const videoRef = ref<HTMLVideoElement | null>(null);
const stream = ref<MediaStream | null>(null);
const error = ref<string | null>(null);

const startCamera = async () => {
    try {
        error.value = null;
        const constraints = {
            video: {
                facingMode: 'environment', // Use back camera
                width: { ideal: 1920 }, // Increased ideal resolution
                height: { ideal: 1080 }
            }
        };

        stream.value = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.value) {
            videoRef.value.srcObject = stream.value;
        }
    } catch (err: any) {
        console.error('Camera access error:', err);
        error.value = "Camera Access Denied";
    }
};

const stopCamera = () => {
    if (stream.value) {
        stream.value.getTracks().forEach(track => track.stop());
        stream.value = null;
    }
};

onMounted(() => {
    startCamera();
});

onUnmounted(() => {
    stopCamera();
});

const captureFrame = () => {
    if (videoRef.value) {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.value.videoWidth;
        canvas.height = videoRef.value.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(videoRef.value, 0, 0);
        return canvas.toDataURL('image/jpeg', 0.8);
    }
    return null;
};

defineExpose({ captureFrame });
</script>

<template>
    <div class="relative overflow-hidden w-full h-full bg-black group">
        <!-- Full-Screen Camera Feed -->
        <video ref="videoRef" autoplay playsinline muted class="absolute inset-0 w-full h-full object-cover"></video>

        <!-- Fallback / Error State -->
        <div v-if="error"
            class="absolute inset-0 flex flex-col items-center justify-center bg-surface-container-highest text-on-surface-variant p-10 text-center space-y-4">
            <CameraOff class="w-12 h-12 opacity-20" />
            <p class="font-black text-sm uppercase tracking-widest opacity-40">{{ error }}</p>
        </div>

        <!-- AR HUD Overlay (Adjusted for full screen) -->
        <div class="absolute inset-0 flex flex-col justify-center items-center p-12 pointer-events-none">
            <!-- Corner Brackets -->
            <div class="absolute top-12 left-12 w-16 h-16 border-t-4 border-l-4 border-primary/40 rounded-tl-3xl" />
            <div class="absolute top-12 right-12 w-16 h-16 border-t-4 border-r-4 border-primary/40 rounded-tr-3xl" />
            <div class="absolute bottom-12 left-12 w-16 h-16 border-b-4 border-l-4 border-primary/40 rounded-bl-3xl" />
            <div class="absolute bottom-12 right-12 w-16 h-16 border-b-4 border-r-4 border-primary/40 rounded-br-3xl" />

            <!-- Scanning Line -->
            <div v-if="isScanning && stream"
                class="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_#3f51b5] animate-scanner" />

            <!-- Bottom Tracking HUD -->
            <div v-if="stream" class="absolute bottom-40 left-12 flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                    <span class="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Neural Lock
                        Active</span>
                </div>
                <div
                    class="flex items-center gap-1.5 px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
                    <span class="text-[9px] font-bold text-white/60">CONFIDENCE:</span>
                    <span class="text-[10px] font-black text-white">{{ confidence }}%</span>
                </div>
            </div>
        </div>

        <!-- Top Status Bar -->
        <div v-if="stream"
            class="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-2.5 bg-black/60 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
            <img :src="appIcon" alt="" class="w-3.5 h-3.5 rounded object-cover animate-pulse" />
            <span class="text-[11px] font-black text-white uppercase tracking-[0.2em]">High Definition Optic
                Field</span>
        </div>
    </div>
</template>

<style scoped>
@keyframes scanner {
    0% {
        top: 30%;
        opacity: 0.2;
    }

    50% {
        top: 70%;
        opacity: 1;
    }

    100% {
        top: 30%;
        opacity: 0.2;
    }
}

.animate-scanner {
    animation: scanner 4s ease-in-out infinite;
}

video {
    /* Slight sharpen effect for 'High Definition' look */
    filter: brightness(1.1) contrast(1.1) saturate(1.1);
}
</style>
