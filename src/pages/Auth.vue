<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
    Store,
    Lock,
    EyeOff,
    LogIn,
    Fingerprint,
    ShieldCheck,
    Cloud,
    Zap,
    Eye,
    CreditCard
} from 'lucide-vue-next';
import { Input, Button } from '../components';

const router = useRouter();
const showPassword = ref(false);
const role = ref<'cashier' | 'admin'>('cashier');

const handleLogin = () => {
    // Authenticate logic here
    router.push({ name: 'dashboard' });
};
</script>

<template>
    <div class="grow flex flex-col px-6 py-12 md:items-center md:justify-center relative overflow-hidden bg-surface">
        <!-- Abstract Background -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-80 h-80 bg-tertiary/5 rounded-full -ml-40 -mb-40 blur-3xl"></div>

        <div class="w-full max-w-md flex flex-col relative z-10">
            <!-- Brand -->
            <div class="flex items-center gap-3 mb-10">
                <div
                    class="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                    <Zap class="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 class="text-xl font-black text-on-surface leading-none">CONQUER</h1>
                    <p class="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Intelligent Retail</p>
                </div>
            </div>

            <!-- Intro -->
            <header class="mb-10">
                <h2 class="text-4xl font-extrabold text-on-surface mb-3 tracking-tighter">Terminal Access</h2>
                <p class="text-on-surface-variant/70 font-bold leading-tight">Identify yourself to initialize the
                    terminal protocol.</p>
            </header>

            <form class="space-y-6" @submit.prevent="handleLogin">
                <!-- Advanced Role Switcher -->
                <div class="flex p-1 bg-surface-container-high rounded-2xl gap-1">
                    <button type="button" @click="role = 'cashier'"
                        :class="['flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all', role === 'cashier' ? 'bg-surface text-primary shadow-sm' : 'text-on-surface-variant/60']">
                        Cashier
                    </button>
                    <button type="button" @click="role = 'admin'"
                        :class="['flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all', role === 'admin' ? 'bg-surface text-primary shadow-sm' : 'text-on-surface-variant/60']">
                        Admin
                    </button>
                </div>

                <div class="space-y-5">
                    <div class="group">
                        <Input label="Protocol ID" placeholder="ST-9823-X" class="rounded-2xl">
                            <template #icon>
                                <Store
                                    class="w-5 h-5 text-on-surface-variant group-focus-within:text-primary transition-colors" />
                            </template>
                        </Input>
                    </div>

                    <div class="group">
                        <Input label="Access Key" placeholder="••••••••" :type="showPassword ? 'text' : 'password'"
                            class="rounded-2xl">
                            <template #icon>
                                <Lock
                                    class="w-5 h-5 text-on-surface-variant group-focus-within:text-primary transition-colors" />
                            </template>
                            <template #rightIcon>
                                <button type="button" @click="showPassword = !showPassword"
                                    class="text-on-surface-variant hover:text-primary transition-colors">
                                    <EyeOff v-if="showPassword" class="w-5 h-5" />
                                    <Eye v-else class="w-5 h-5" />
                                </button>
                            </template>
                        </Input>
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <label class="flex items-center gap-3 cursor-pointer group">
                        <div class="relative w-5 h-5">
                            <input type="checkbox" class="peer sr-only" />
                            <div
                                class="w-5 h-5 rounded-md border-2 border-surface-container-highest peer-checked:bg-primary peer-checked:border-primary transition-all">
                            </div>
                            <ShieldCheck
                                class="absolute inset-0 w-3 h-3 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span
                            class="text-[11px] font-black uppercase tracking-widest text-on-surface-variant/70 group-hover:text-on-surface transition-colors">Stay
                            Sync</span>
                    </label>
                    <button type="button"
                        class="text-[11px] font-black uppercase tracking-widest text-primary/80 hover:text-primary transition-colors">Lost
                        Code?</button>
                </div>

                <div class="flex flex-col gap-4 pt-4">
                    <Button type="submit"
                        class="w-full h-16 rounded-2xl shadow-xl shadow-primary/20 text-lg font-black tracking-tight"
                        size="xl">
                        <template #icon>
                            <LogIn class="w-6 h-6" />
                        </template>
                        Initialize Session
                    </Button>

                    <div class="flex items-center gap-4">
                        <div class="grow h-px bg-surface-container-high"></div>
                        <span
                            class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Secured
                            Biometrics</span>
                        <div class="grow h-px bg-surface-container-high"></div>
                    </div>

                    <Button type="button" variant="secondary"
                        class="w-full h-14 rounded-2xl border-2 font-black uppercase tracking-widest flex items-center justify-center gap-3"
                        size="lg">
                        <Fingerprint class="w-6 h-6" />
                        Face ID Access
                    </Button>
                </div>
            </form>

            <footer class="mt-auto pt-12 flex flex-col items-center gap-6">
                <div class="flex gap-10">
                    <Cloud class="w-5 h-5 text-on-surface-variant/30" />
                    <CreditCard class="w-5 h-5 text-on-surface-variant/30" />
                    <ShieldCheck class="w-5 h-5 text-on-surface-variant/30" />
                </div>
                <p class="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em]">Encrypted
                    Terminal •
                    v4.2.0-PRO</p>
            </footer>
        </div>
    </div>
</template>
