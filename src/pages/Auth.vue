<script setup lang="ts">
import { ref } from 'vue';
import {
    Store,
    Lock,
    EyeOff,
    LogIn,
    Fingerprint,
    ShieldCheck,
    CreditCard,
    Cloud,
    Zap,
    Eye
} from 'lucide-vue-next';
import { Input, Button, SurfaceCard } from '../components';

const emit = defineEmits(['login']);

const showPassword = ref(false);
const role = ref<'cashier' | 'admin'>('cashier');

const handleLogin = () => {
    emit('login');
};
</script>

<template>
    <div
        class="min-h-screen bg-surface flex items-center justify-center p-6 bg-[radial-gradient(at_0%_0%,rgba(63,81,181,0.05)_0px,transparent_50%),radial-gradient(at_100%_100%,rgba(36,56,156,0.05)_0px,transparent_50%)]">
        <SurfaceCard variant="lowest"
            class="w-full max-w-md rounded-4xl overflow-hidden shadow-2xl border border-surface-container-high">
            <!-- Form -->
            <div class="p-10 flex flex-col justify-center">
                <div class="flex items-center gap-3 mb-12">
                    <Zap class="w-8 h-8 text-primary" />
                    <span class="text-2xl font-extrabold text-on-surface tracking-tight">Predictive Surface</span>
                </div>

                <header class="mb-12">
                    <h2 class="text-4xl font-extrabold text-on-surface mb-2 tracking-tight">Authentication</h2>
                    <p class="text-on-surface-variant font-medium">Enter your credentials to access the terminal.</p>
                </header>

                <form class="space-y-8" @submit.prevent="handleLogin">
                    <!-- Role Switcher -->
                    <div class="flex p-1.5 bg-surface-container-high rounded-2xl gap-1">
                        <button type="button" @click="role = 'cashier'"
                            :class="['flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all', role === 'cashier' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface']">
                            Cashier
                        </button>
                        <button type="button" @click="role = 'admin'"
                            :class="['flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all', role === 'admin' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface']">
                            Admin
                        </button>
                    </div>

                    <div class="space-y-6">
                        <Input label="Store ID" placeholder="Enter terminal ID">
                            <template #icon>
                                <Store class="w-5 h-5" />
                            </template>
                        </Input>
                        <Input label="Password" placeholder="••••••••" :type="showPassword ? 'text' : 'password'">
                            <template #icon>
                                <Lock class="w-5 h-5" />
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

                    <div class="flex items-center justify-between">
                        <label class="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox"
                                class="w-5 h-5 rounded-lg border-surface-container-highest text-primary focus:ring-primary/20 transition-all" />
                            <span
                                class="text-sm font-bold text-on-surface-variant group-hover:text-on-surface transition-colors">Remember
                                device</span>
                        </label>
                        <button type="button" class="text-sm font-bold text-primary hover:underline">Forgot
                            Access?</button>
                    </div>

                    <div class="flex gap-4">
                        <Button type="submit" class="flex-3" size="xl">
                            <template #icon>
                                <LogIn class="w-6 h-6" />
                            </template>
                            Sign In
                        </Button>
                        <Button type="button" variant="secondary" class="flex-1" size="xl">
                            <template #icon>
                                <Fingerprint class="w-8 h-8" />
                            </template>
                        </Button>
                    </div>
                </form>

                <footer class="mt-16 pt-8 border-t border-surface-container-high flex flex-col items-center gap-6">
                    <p class="text-[10px] text-on-surface-variant font-bold uppercase tracking-[0.2em]">Secure Terminal
                        • v4.2.0</p>
                    <div class="flex gap-8 text-surface-container-highest">
                        <ShieldCheck class="w-6 h-6" />
                        <CreditCard class="w-6 h-6" />
                        <Cloud class="w-6 h-6" />
                    </div>
                </footer>
            </div>
        </SurfaceCard>
    </div>
</template>
