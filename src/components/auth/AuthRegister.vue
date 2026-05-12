<script setup lang="ts">
import { ref, computed } from 'vue';
import { User, Phone, ShieldCheck, ArrowRight, RotateCcw } from 'lucide-vue-next';
import appIcon from '../../assets/icon.png';

const props = defineProps<{
    phone: string;
}>();

const emit = defineEmits<{
    complete: [name: string, businessName: string];
    back: [];
}>();

const regName = ref('');
const regBusinessName = ref('');

const isValid = computed(() => regName.value.trim().length >= 2);

const submit = () => {
    if (!isValid.value) return;
    emit('complete', regName.value.trim(), regBusinessName.value.trim());
};
</script>

<template>
    <div class="flex flex-col">
        <button @click="$emit('back')"
            class="text-[10px] font-black uppercase tracking-wider text-primary flex items-center gap-1.5 mb-6 active:scale-95 transition-all self-start">
            <RotateCcw class="w-3.5 h-3.5" /> Back
        </button>

        <header class="mb-8">
            <h2 class="text-3xl font-black text-on-surface tracking-tight">Almost there</h2>
            <p class="text-sm font-bold text-on-surface-variant/50 mt-1">Set up your account to get started</p>
        </header>

        <div class="space-y-5">
            <!-- Name -->
            <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-[0.15em] text-on-surface-variant/50 px-1">Your
                    Name</label>
                <div class="relative">
                    <User class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/30" />
                    <input v-model="regName" type="text" placeholder="Full name"
                        class="w-full h-14 rounded-2xl bg-surface-container-high/50 text-on-surface pl-12 pr-4 text-base font-bold placeholder:text-on-surface-variant/25 outline-none focus:ring-2 focus:ring-primary/30 border border-transparent focus:border-primary/20 transition-all"
                        @keydown.enter="submit" />
                </div>
            </div>

            <!-- Business Name -->
            <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-[0.15em] text-on-surface-variant/50 px-1">
                    Business Name <span class="text-on-surface-variant/20">(optional)</span>
                </label>
                <div class="relative">
                    <img :src="appIcon" alt="" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded object-cover opacity-30" />
                    <input v-model="regBusinessName" type="text" placeholder="Store or business name"
                        class="w-full h-14 rounded-2xl bg-surface-container-high/50 text-on-surface pl-12 pr-4 text-base font-bold placeholder:text-on-surface-variant/25 outline-none focus:ring-2 focus:ring-primary/30 border border-transparent focus:border-primary/20 transition-all" />
                </div>
            </div>

            <!-- Verified Phone -->
            <div class="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Phone class="w-5 h-5" />
                </div>
                <div>
                    <p class="text-[9px] font-black uppercase tracking-wider text-primary/50">Verified Number</p>
                    <p class="text-sm font-black text-on-surface">{{ phone }}</p>
                </div>
                <ShieldCheck class="w-5 h-5 text-primary ml-auto" />
            </div>

            <!-- Submit -->
            <button @click="submit" :class="[
                'w-full h-14 rounded-2xl text-sm font-black uppercase tracking-wider flex items-center justify-center gap-3 transition-all',
                isValid
                    ? 'bg-primary text-white shadow-xl shadow-primary/20 active:scale-[0.97]'
                    : 'bg-surface-container-highest/50 text-on-surface-variant/30 cursor-not-allowed'
            ]" :disabled="!isValid">
                <ArrowRight class="w-5 h-5" />
                Get Started
            </button>

            <p class="text-[9px] font-bold text-on-surface-variant/25 text-center leading-relaxed px-4">
                By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
        </div>
    </div>
</template>
