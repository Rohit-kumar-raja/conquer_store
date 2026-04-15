<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Zap } from 'lucide-vue-next';
import { useAuthStore } from '../stores/useAuthStore';
import AuthLogin from '../components/auth/AuthLogin.vue';
import AuthRegister from '../components/auth/AuthRegister.vue';

const router = useRouter();
const authStore = useAuthStore();

const view = ref<'login' | 'register'>('login');
const verifiedPhone = ref('');

const onPhoneVerified = async (phone: string, otp: string) => {
    try {
        const isNewUser = await authStore.verifyOtp(otp, phone);
        verifiedPhone.value = phone;

        if (isNewUser) {
            view.value = 'register';
        } else {
            router.push({ name: 'dashboard' });
        }
    } catch (e) {
        console.error('OTP Verification failed:', e);
    }
};

const onRegistrationComplete = async (name: string, _businessName: string) => {
    try {
        await authStore.register(name, verifiedPhone.value);
        router.push({ name: 'dashboard' });
    } catch (e) {
        console.error('Registration failed:', e);
    }
};

const goBackToLogin = async () => {
    await authStore.clearPendingRegistration();
    verifiedPhone.value = '';
    view.value = 'login';
};
</script>

<template>
    <div
        class="grow flex flex-col px-6 py-8 md:items-center md:justify-center relative overflow-hidden bg-surface-container-lowest">
        <!-- Background -->
        <div class="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full -mr-36 -mt-36 blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-80 h-80 bg-tertiary/5 rounded-full -ml-40 -mb-40 blur-3xl"></div>

        <div class="w-full max-w-md flex flex-col relative z-10">
            <!-- Brand -->
            <div class="flex items-center gap-3 mb-10">
                <div
                    class="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                    <Zap class="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 class="text-xl font-black text-on-surface leading-none tracking-tight">CONQUER</h1>
                    <p class="text-[9px] font-bold text-primary uppercase tracking-[0.2em] mt-0.5">Store Management</p>
                </div>
            </div>

            <!-- Auth Components -->
            <AuthLogin v-if="view === 'login'" @verified="onPhoneVerified" />
            <AuthRegister v-else :phone="verifiedPhone" @complete="onRegistrationComplete" @back="goBackToLogin" />

            <!-- Footer -->
            <footer class="mt-auto pt-12 flex flex-col items-center gap-3">
                <div class="flex items-center gap-2">
                    <Zap class="w-3.5 h-3.5 text-on-surface-variant/15" />
                    <span class="text-[9px] font-black text-on-surface-variant/15 uppercase tracking-[0.2em]">
                        Conquer OS • v2.4.0
                    </span>
                </div>
            </footer>
        </div>
    </div>
</template>
