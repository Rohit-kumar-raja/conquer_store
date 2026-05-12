<script setup lang="ts">
import { ref, computed } from 'vue';
import {
    Phone, Smartphone, ShieldCheck, RotateCcw, AlertTriangle, Loader2
} from 'lucide-vue-next';
import { useAuthStore } from '../../stores/useAuthStore';

const authStore = useAuthStore();

const emit = defineEmits<{
    verified: [phone: string, otp: string];
    autoVerified: [phone: string, isNewUser: boolean];
}>();

const step = ref<'phone' | 'otp'>('phone');
const loading = computed(() => authStore.loading);
const error = computed(() => authStore.error);

// Phone
const phone = ref('');
const countryCode = ref('+91');

// OTP
const otp = ref(['', '', '', '', '', '']);
const otpRefs = ref<(HTMLInputElement | null)[]>([]);
const resendTimer = ref(0);
let timerInterval: number | null = null;

const normalizedPhone = computed(() => `${countryCode.value}${phone.value.replace(/\D/g, '')}`);
const displayPhone = computed(() => `${countryCode.value} ${phone.value}`);
const isPhoneValid = computed(() => phone.value.replace(/\D/g, '').length >= 10);
const isOtpComplete = computed(() => otp.value.every(d => d !== ''));
const fullOtp = computed(() => otp.value.join(''));

const sendOtp = async () => {
    if (!isPhoneValid.value || loading.value) return;
    try {
        const result = await authStore.sendOtp(normalizedPhone.value);
        if (result.autoVerified) {
            emit('autoVerified', normalizedPhone.value, result.isNewUser);
            return;
        }

        step.value = 'otp';
        startResendTimer();
    } catch (e) {
        console.error('Send OTP Error:', e);
    }
};

const startResendTimer = () => {
    resendTimer.value = 30;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = window.setInterval(() => {
        resendTimer.value--;
        if (resendTimer.value <= 0 && timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }, 1000);
};

const resendOtp = async () => {
    if (resendTimer.value > 0 || loading.value) return;
    try {
        otp.value = ['', '', '', '', '', ''];
        const result = await authStore.sendOtp(normalizedPhone.value);
        if (result.autoVerified) {
            emit('autoVerified', normalizedPhone.value, result.isNewUser);
            return;
        }

        startResendTimer();
    } catch (e) {
        console.error('Resend OTP Error:', e);
    }
};

const handleOtpInput = (index: number, event: Event) => {
    const target = event.target as HTMLInputElement;
    const val = target.value.replace(/\D/g, '');
    otp.value[index] = val.slice(-1);

    if (val && index < 5) {
        otpRefs.value[index + 1]?.focus();
    }

    if (isOtpComplete.value) {
        verifyOtp();
    }
};

const handleOtpKeydown = (index: number, event: KeyboardEvent) => {
    if (event.key === 'Backspace' && !otp.value[index] && index > 0) {
        otpRefs.value[index - 1]?.focus();
    }
};

const handleOtpPaste = (event: ClipboardEvent) => {
    const paste = event.clipboardData?.getData('text')?.replace(/\D/g, '') || '';
    if (paste.length >= 6) {
        for (let i = 0; i < 6; i++) otp.value[i] = paste[i];
        otpRefs.value[5]?.focus();
        event.preventDefault();
        verifyOtp();
    }
};

const verifyOtp = () => {
    if (!isOtpComplete.value || loading.value) return;
    emit('verified', normalizedPhone.value, fullOtp.value);
};

const goBack = () => {
    step.value = 'phone';
    otp.value = ['', '', '', '', '', ''];
};
</script>


<template>
    <!-- Phone Step -->
    <div v-if="step === 'phone'" class="flex flex-col">
        <header class="mb-8">
            <h2 class="text-3xl font-black text-on-surface tracking-tight">Welcome</h2>
            <p class="text-sm font-bold text-on-surface-variant/50 mt-1">Enter your mobile number to continue</p>
        </header>

        <div class="space-y-5">
            <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-[0.15em] text-on-surface-variant/50 px-1">
                    Mobile Number
                </label>
                <div class="flex gap-3">
                    <div
                        class="w-20 h-14 rounded-2xl bg-surface-container-high/50 flex items-center justify-center border border-surface-container-highest/30">
                        <span class="text-sm font-black text-on-surface">{{ countryCode }}</span>
                    </div>
                    <div class="grow relative">
                        <Phone class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/30" />
                        <input v-model="phone" type="tel" placeholder="98765 43210" maxlength="12"
                            class="w-full h-14 rounded-2xl bg-surface-container-high/50 text-on-surface pl-12 pr-4 text-base font-bold placeholder:text-on-surface-variant/25 outline-none focus:ring-2 focus:ring-primary/30 border border-transparent focus:border-primary/20 transition-all"
                            :disabled="loading"
                            @keydown.enter="sendOtp" />
                    </div>
                </div>
            </div>

            <button @click="sendOtp" :class="[
                'relative w-full h-14 rounded-2xl text-sm font-black uppercase tracking-wider flex items-center justify-center gap-3 transition-all overflow-hidden',
                isPhoneValid
                    ? 'bg-primary text-white shadow-xl shadow-primary/20 active:scale-[0.97]'
                    : 'bg-surface-container-highest/50 text-on-surface-variant/30 cursor-not-allowed'
            ]" :disabled="!isPhoneValid || loading">
                <span v-if="loading" class="absolute inset-x-0 bottom-0 h-1 bg-white/20">
                    <span class="otp-progress-bar block h-full w-1/2 bg-white/80"></span>
                </span>
                <Loader2 v-if="loading" class="w-5 h-5 animate-spin" />
                <Smartphone v-else class="w-5 h-5" />
                {{ loading ? 'Sending OTP' : 'Send OTP' }}
            </button>

            <p class="text-[10px] font-bold text-on-surface-variant/30 text-center leading-relaxed px-6">
                We'll send a 6-digit verification code to your mobile number
            </p>

            <div v-if="error"
                class="flex items-start gap-2 rounded-2xl border border-error/20 bg-error/10 px-4 py-3 text-error">
                <AlertTriangle class="mt-0.5 h-4 w-4 shrink-0" />
                <p class="text-xs font-bold leading-relaxed">{{ error }}</p>
            </div>
        </div>
    </div>

    <!-- OTP Step -->
    <div v-else class="flex flex-col">
        <button @click="goBack"
            class="text-[10px] font-black uppercase tracking-wider text-primary flex items-center gap-1.5 mb-6 active:scale-95 transition-all self-start">
            <RotateCcw class="w-3.5 h-3.5" /> Change Number
        </button>

        <header class="mb-8">
            <h2 class="text-3xl font-black text-on-surface tracking-tight">Verify OTP</h2>
            <p class="text-sm font-bold text-on-surface-variant/50 mt-1">
                Code sent to <span class="text-on-surface">{{ displayPhone }}</span>
            </p>
        </header>

        <div class="space-y-6">
            <div class="flex gap-3 justify-center" @paste="handleOtpPaste">
                <input v-for="(_, i) in 6" :key="i" :ref="(el) => { otpRefs[i] = el as HTMLInputElement | null }"
                    :value="otp[i]" type="text" inputmode="numeric" maxlength="1"
                    class="w-12 h-14 rounded-2xl bg-surface-container-high/50 text-center text-xl font-black text-on-surface outline-none focus:ring-2 focus:ring-primary/30 border border-transparent focus:border-primary/20 transition-all caret-primary"
                    @input="handleOtpInput(i, $event)" @keydown="handleOtpKeydown(i, $event)" />
            </div>

            <div class="text-center">
                <button v-if="resendTimer > 0" disabled
                    class="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/30">
                    Resend in {{ resendTimer }}s
                </button>
                <button v-else @click="resendOtp"
                    class="text-[10px] font-black uppercase tracking-wider text-primary active:scale-95 transition-all">
                    Resend OTP
                </button>
            </div>

            <button @click="verifyOtp" :class="[
                'w-full h-14 rounded-2xl text-sm font-black uppercase tracking-wider flex items-center justify-center gap-3 transition-all',
                isOtpComplete
                    ? 'bg-primary text-white shadow-xl shadow-primary/20 active:scale-[0.97]'
                    : 'bg-surface-container-highest/50 text-on-surface-variant/30 cursor-not-allowed'
            ]" :disabled="!isOtpComplete || loading">
                <Loader2 v-if="loading" class="w-5 h-5 animate-spin" />
                <ShieldCheck v-else class="w-5 h-5" />
                {{ loading ? 'Verifying OTP' : 'Verify & Continue' }}
            </button>

            <div v-if="error"
                class="flex items-start gap-2 rounded-2xl border border-error/20 bg-error/10 px-4 py-3 text-error">
                <AlertTriangle class="mt-0.5 h-4 w-4 shrink-0" />
                <p class="text-xs font-bold leading-relaxed">{{ error }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.otp-progress-bar {
    animation: otp-progress 1.1s ease-in-out infinite;
}

@keyframes otp-progress {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(200%);
    }
}
</style>
