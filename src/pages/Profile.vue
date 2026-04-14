<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
    User, Mail, Phone, MapPin, Camera,
    Shield, Briefcase, BadgeCheck, Crown, Store, Calendar, Edit3
} from 'lucide-vue-next';
import { useShopStore } from '../stores/useShopStore';

const router = useRouter();
const shopStore = useShopStore();
</script>

<template>
    <div class="px-5 pt-2 space-y-6 pb-40 max-w-md mx-auto">

        <!-- Avatar + Name Card -->
        <section class="flex flex-col items-center text-center pt-4">
            <div class="relative group">
                <div
                    class="w-24 h-24 rounded-[1.8rem] bg-primary flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-primary/20 ring-4 ring-surface-container-lowest">
                    R
                </div>
                <button
                    class="absolute -bottom-1.5 -right-1.5 p-2 bg-primary text-white rounded-xl shadow-lg border-3 border-surface-container-lowest active:scale-90 transition-all">
                    <Camera class="w-3.5 h-3.5" />
                </button>
            </div>

            <div class="mt-4 space-y-1">
                <div class="flex items-center justify-center gap-2">
                    <h2 class="text-2xl font-black text-on-surface tracking-tight">Raaj Kumar</h2>
                    <BadgeCheck class="w-5 h-5 text-primary fill-primary/10" />
                </div>
                <p class="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-[0.2em]">
                    {{ shopStore.selectedShop.name }} • {{ shopStore.selectedShop.location }}
                </p>
                <div class="flex items-center justify-center gap-2 pt-1">
                    <span
                        class="text-[8px] font-black uppercase tracking-wider bg-primary/10 text-primary px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <Crown class="w-3 h-3" /> Owner
                    </span>
                    <span
                        class="text-[8px] font-black uppercase tracking-wider bg-tertiary/10 text-tertiary px-2.5 py-1 rounded-lg">
                        Pro Plan
                    </span>
                </div>
            </div>
        </section>

        <!-- Quick Info Row -->
        <section>
            <div class="grid grid-cols-3 gap-3">
                <div
                    class="bg-surface-container-low rounded-3xl p-4 text-center border border-surface-container-high/20">
                    <Store class="w-5 h-5 text-primary mx-auto mb-2" />
                    <p class="text-lg font-black text-on-surface">2</p>
                    <p class="text-[8px] font-black text-on-surface-variant/40 uppercase tracking-wider">Stores</p>
                </div>
                <div
                    class="bg-surface-container-low rounded-3xl p-4 text-center border border-surface-container-high/20">
                    <Shield class="w-5 h-5 text-tertiary mx-auto mb-2" />
                    <p class="text-lg font-black text-on-surface">Full</p>
                    <p class="text-[8px] font-black text-on-surface-variant/40 uppercase tracking-wider">Access</p>
                </div>
                <div
                    class="bg-surface-container-low rounded-3xl p-4 text-center border border-surface-container-high/20">
                    <Calendar class="w-5 h-5 text-secondary mx-auto mb-2" />
                    <p class="text-lg font-black text-on-surface">1y</p>
                    <p class="text-[8px] font-black text-on-surface-variant/40 uppercase tracking-wider">Active</p>
                </div>
            </div>
        </section>

        <!-- Contact Details -->
        <section class="space-y-3">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 px-1">
                Contact Details
            </h3>

            <div class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 overflow-hidden">
                <div v-for="(item, index) in [
                    { icon: User, label: 'Full Name', value: 'Raaj Kumar' },
                    { icon: Mail, label: 'Email', value: 'raaj@conquer.in' },
                    { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
                    { icon: MapPin, label: 'Location', value: 'Mumbai, Maharashtra' },
                ]" :key="item.label" :class="[
                    'p-4 px-5 flex items-center justify-between group transition-all',
                    index !== 3 && 'border-b border-surface-container-high/20'
                ]">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-10 h-10 rounded-xl bg-surface-container-high/50 flex items-center justify-center text-on-surface-variant/60">
                            <component :is="item.icon" class="w-4.5 h-4.5" />
                        </div>
                        <div>
                            <p class="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-wider">{{
                                item.label }}</p>
                            <p class="font-black text-on-surface text-sm mt-0.5">{{ item.value }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Business Info -->
        <section class="space-y-3">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 px-1">
                Business Info
            </h3>

            <div class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 overflow-hidden">
                <div v-for="(item, index) in [
                    { icon: Store, label: 'Business Name', value: shopStore.selectedShop.name },
                    { icon: Briefcase, label: 'GSTIN', value: '27AABCU9603R1ZP' },
                    { icon: MapPin, label: 'Branch', value: shopStore.selectedShop.branch },
                ]" :key="item.label" :class="[
                    'p-4 px-5 flex items-center justify-between group transition-all',
                    index !== 2 && 'border-b border-surface-container-high/20'
                ]">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-10 h-10 rounded-xl bg-surface-container-high/50 flex items-center justify-center text-on-surface-variant/60">
                            <component :is="item.icon" class="w-4.5 h-4.5" />
                        </div>
                        <div>
                            <p class="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-wider">{{
                                item.label }}</p>
                            <p class="font-black text-on-surface text-sm mt-0.5">{{ item.value }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Roles -->
        <section class="space-y-3">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 px-1">
                Access Level
            </h3>

            <div class="grid grid-cols-2 gap-3">
                <div class="bg-surface-container-low p-4 rounded-3xl border border-primary/10">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <Shield class="w-5 h-5" />
                        </div>
                        <div>
                            <p class="font-black text-on-surface text-sm">Owner</p>
                            <p class="text-[8px] font-black text-primary uppercase tracking-wider">Full Control</p>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-1">
                        <span
                            class="text-[7px] font-bold bg-primary/5 text-primary/60 px-2 py-0.5 rounded-md">Billing</span>
                        <span
                            class="text-[7px] font-bold bg-primary/5 text-primary/60 px-2 py-0.5 rounded-md">Stock</span>
                        <span
                            class="text-[7px] font-bold bg-primary/5 text-primary/60 px-2 py-0.5 rounded-md">Reports</span>
                        <span
                            class="text-[7px] font-bold bg-primary/5 text-primary/60 px-2 py-0.5 rounded-md">Settings</span>
                    </div>
                </div>

                <div
                    class="bg-surface-container-low p-4 rounded-3xl border border-surface-container-high/20 opacity-50">
                    <div class="flex items-center gap-3 mb-3">
                        <div
                            class="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
                            <Briefcase class="w-5 h-5" />
                        </div>
                        <div>
                            <p class="font-black text-on-surface text-sm">Admin</p>
                            <p class="text-[8px] font-black text-on-surface-variant uppercase tracking-wider">System</p>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-1">
                        <span
                            class="text-[7px] font-bold bg-surface-container-highest text-on-surface-variant/50 px-2 py-0.5 rounded-md">Read</span>
                        <span
                            class="text-[7px] font-bold bg-surface-container-highest text-on-surface-variant/50 px-2 py-0.5 rounded-md">Write</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Edit Button -->
        <section class="pt-2">
            <button
                class="w-full p-4 rounded-3xl bg-primary text-white flex items-center justify-center gap-3 font-black text-sm uppercase tracking-wider shadow-xl shadow-primary/20 active:scale-[0.97] transition-all">
                <Edit3 class="w-5 h-5" />
                Edit Profile
            </button>
        </section>
    </div>
</template>
