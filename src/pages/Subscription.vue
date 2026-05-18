<script setup lang="ts">
import {
    ArrowUpRight,
    CheckCircle2,
    CreditCard,
    Crown,
    IndianRupee,
    Landmark,
    ShieldCheck,
    Sparkles,
    Star,
    Store,
    Users,
    Zap
} from 'lucide-vue-next';
import { SurfaceCard, Button } from '../components';

const currentPlan = {
    name: 'Gold Growth',
    renewsOn: 'May 24, 2026',
    price: '₹2,499',
    billing: 'Monthly',
    usage: 72,
    stores: '3 / 5 stores',
    staff: '8 / 15 staff',
    invoices: '1,842 / 5,000 bills'
};

const plans = [
    {
        name: 'Silver Core',
        badge: 'Starter',
        price: '₹999',
        period: '/mo',
        icon: Star,
        tone: 'border-surface-container-high bg-surface-container-low',
        iconTone: 'bg-secondary/10 text-secondary',
        cta: 'Downgrade',
        active: false,
        features: ['1 store', '3 staff users', '1,000 bills / month', 'Basic inventory reports', 'Low stock alerts']
    },
    {
        name: 'Gold Growth',
        badge: 'Current Plan',
        price: '₹2,499',
        period: '/mo',
        icon: Crown,
        tone: 'border-primary/30 bg-primary/5 ring-2 ring-primary/15',
        iconTone: 'bg-primary text-white',
        cta: 'Current',
        active: true,
        features: ['5 stores', '15 staff users', '5,000 bills / month', 'Advanced reports', 'Batch and expiry tracking', 'Purchase orders']
    },
    {
        name: 'Platinum Scale',
        badge: 'Best for chains',
        price: '₹5,999',
        period: '/mo',
        icon: Zap,
        tone: 'border-tertiary/30 bg-tertiary/5',
        iconTone: 'bg-tertiary text-white',
        cta: 'Upgrade',
        active: false,
        features: ['Unlimited stores', 'Unlimited staff', 'Unlimited bills', 'AI reorder suggestions', 'Warehouse transfers', 'Priority support']
    }
];

const billingItems = [
    { label: 'Default Card', value: '•••• 4242', icon: CreditCard },
    { label: 'Tax Profile', value: 'GSTIN ending 7C2', icon: Landmark },
    { label: 'Account Health', value: 'Protected', icon: ShieldCheck }
];
</script>

<template>
    <div class="px-5 pt-2 space-y-6 pb-40 max-w-md mx-auto">
        <section class="space-y-4">
            <div>
                <p class="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">Subscription</p>
                <h2 class="text-3xl font-black tracking-tighter text-on-surface leading-tight mt-1">Plan & Billing</h2>
            </div>

            <SurfaceCard
                class="p-6 rounded-4xl bg-primary-gradient text-white shadow-xl shadow-primary/20 relative overflow-hidden">
                <div class="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-white/10"></div>
                <div class="absolute right-8 bottom-0 w-24 h-24 rounded-full bg-white/10 translate-y-14"></div>

                <div class="relative z-10 space-y-6">
                    <div class="flex items-start justify-between gap-4">
                        <div>
                            <div class="flex items-center gap-2 text-white/70">
                                <Sparkles class="w-4 h-4" />
                                <span class="text-[9px] font-black uppercase tracking-[0.2em]">Current Subscription</span>
                            </div>
                            <h3 class="text-3xl font-black tracking-tighter mt-2">{{ currentPlan.name }}</h3>
                            <p class="text-[10px] font-bold text-white/55 uppercase tracking-widest mt-1">
                                {{ currentPlan.billing }} billing • renews {{ currentPlan.renewsOn }}
                            </p>
                        </div>
                        <div class="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                            <Crown class="w-6 h-6" />
                        </div>
                    </div>

                    <div class="flex items-end justify-between gap-4">
                        <div>
                            <p class="text-[9px] font-black uppercase tracking-widest text-white/55">Current Charge</p>
                            <div class="flex items-center mt-1">
                                <IndianRupee class="w-7 h-7" />
                                <span class="text-4xl font-black tracking-tighter">{{ currentPlan.price.replace('₹', '') }}</span>
                                <span class="text-sm font-bold text-white/60 ml-1">/mo</span>
                            </div>
                        </div>
                        <button
                            class="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-white text-primary px-3 py-2 rounded-2xl">
                            Manage
                            <ArrowUpRight class="w-3 h-3" />
                        </button>
                    </div>

                    <div>
                        <div class="flex justify-between text-[10px] font-black uppercase tracking-wider text-white/60 mb-2">
                            <span>Usage</span>
                            <span>{{ currentPlan.usage }}%</span>
                        </div>
                        <div class="h-2.5 bg-white/15 rounded-full overflow-hidden">
                            <div class="h-full w-[72%] bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>
            </SurfaceCard>
        </section>

        <section class="grid grid-cols-3 gap-3">
            <SurfaceCard variant="low" class="p-4 rounded-3xl border border-surface-container-high/30">
                <Store class="w-5 h-5 text-primary mb-3" />
                <h4 class="text-sm font-black text-on-surface">{{ currentPlan.stores }}</h4>
                <p class="text-[8px] font-black text-on-surface-variant/45 uppercase tracking-wider mt-1">Stores</p>
            </SurfaceCard>
            <SurfaceCard variant="low" class="p-4 rounded-3xl border border-surface-container-high/30">
                <Users class="w-5 h-5 text-secondary mb-3" />
                <h4 class="text-sm font-black text-on-surface">{{ currentPlan.staff }}</h4>
                <p class="text-[8px] font-black text-on-surface-variant/45 uppercase tracking-wider mt-1">Staff</p>
            </SurfaceCard>
            <SurfaceCard variant="low" class="p-4 rounded-3xl border border-surface-container-high/30">
                <CreditCard class="w-5 h-5 text-tertiary mb-3" />
                <h4 class="text-sm font-black text-on-surface">5,000</h4>
                <p class="text-[8px] font-black text-on-surface-variant/45 uppercase tracking-wider mt-1">Bills/mo</p>
            </SurfaceCard>
        </section>

        <section class="space-y-3">
            <div class="flex items-center justify-between px-1">
                <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Choose Plan</h3>
                <span class="text-[9px] font-black text-primary uppercase tracking-widest">Monthly</span>
            </div>

            <div class="space-y-4">
                <SurfaceCard v-for="plan in plans" :key="plan.name"
                    :class="['p-5 rounded-4xl border', plan.tone]">
                    <div class="flex items-start justify-between gap-4">
                        <div class="flex items-center gap-4 min-w-0">
                            <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center shrink-0', plan.iconTone]">
                                <component :is="plan.icon" class="w-6 h-6" />
                            </div>
                            <div class="min-w-0">
                                <div class="flex items-center gap-2">
                                    <h4 class="text-lg font-black text-on-surface tracking-tight truncate">{{ plan.name }}</h4>
                                    <span
                                        :class="['text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded-lg shrink-0', plan.active ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant']">
                                        {{ plan.badge }}
                                    </span>
                                </div>
                                <div class="flex items-end mt-1">
                                    <span class="text-3xl font-black text-on-surface tracking-tighter">{{ plan.price }}</span>
                                    <span class="text-xs font-bold text-on-surface-variant/50 mb-1 ml-1">{{ plan.period }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-2 mt-5">
                        <div v-for="feature in plan.features" :key="feature" class="flex items-center gap-3">
                            <CheckCircle2 class="w-4 h-4 text-primary shrink-0" />
                            <span class="text-xs font-bold text-on-surface-variant">{{ feature }}</span>
                        </div>
                    </div>

                    <Button :variant="plan.active ? 'secondary' : 'primary'" class="w-full mt-5 rounded-2xl font-black"
                        :disabled="plan.active">
                        {{ plan.cta }}
                    </Button>
                </SurfaceCard>
            </div>
        </section>

        <section class="space-y-3">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 px-1">Billing Setup</h3>
            <div class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 overflow-hidden">
                <div v-for="(item, index) in billingItems" :key="item.label" :class="[
                    'p-4 flex items-center justify-between',
                    index !== billingItems.length - 1 && 'border-b border-surface-container-high/20'
                ]">
                    <div class="flex items-center gap-4">
                        <div class="w-11 h-11 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary">
                            <component :is="item.icon" class="w-5 h-5" />
                        </div>
                        <div>
                            <p class="text-sm font-black text-on-surface">{{ item.label }}</p>
                            <p class="text-[10px] font-bold text-on-surface-variant/40 mt-0.5">{{ item.value }}</p>
                        </div>
                    </div>
                    <ArrowUpRight class="w-4 h-4 text-on-surface-variant/25" />
                </div>
            </div>
        </section>

        <Button variant="ghost" class="w-full text-error hover:bg-error/5">Cancel Subscription</Button>
    </div>
</template>
