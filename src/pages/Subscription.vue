<script setup lang="ts">
import { CreditCard, Zap, Calendar, ArrowUpRight, CheckCircle2 } from 'lucide-vue-next';
import { SurfaceCard, Button, IntelligenceBadge } from '../components';
</script>

<template>
    <div class="px-6 py-8 space-y-8 pb-40">
        <div class="flex flex-col items-center py-6">
            <IntelligenceBadge label="Premium Active" variant="primary" pulse />
            <h2 class="text-4xl font-black text-on-surface mt-4">Enterprise</h2>
            <p class="text-xs text-on-surface-variant font-bold uppercase tracking-widest mt-2">Scale your retail empire
            </p>
        </div>

        <SurfaceCard class="bg-primary p-6 relative overflow-hidden">
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div class="relative z-10 flex flex-col gap-4">
                <div class="flex justify-between items-start">
                    <div class="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                        <Zap class="w-6 h-6 fill-current" />
                    </div>
                    <span class="text-[10px] font-black uppercase tracking-widest text-white/60">Annual Plan</span>
                </div>
                <div>
                    <p class="text-white/60 text-xs font-bold uppercase tracking-widest">Next Renewal</p>
                    <p class="text-white text-2xl font-black">May 24, 2026</p>
                </div>
                <div class="pt-4 border-t border-white/10 flex justify-between items-center text-white">
                    <span class="text-xs font-bold">2,450 Credits Remaining</span>
                    <button class="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest">
                        Top Up
                        <ArrowUpRight class="w-3 h-3" />
                    </button>
                </div>
            </div>
        </SurfaceCard>

        <div class="space-y-4">
            <h3 class="text-sm font-black uppercase tracking-widest text-on-surface-variant">Payment Methods</h3>
            <SurfaceCard class="p-4 flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center">
                        <CreditCard class="w-6 h-6 text-on-surface" />
                    </div>
                    <div>
                        <p class="text-sm font-bold text-on-surface">•••• 4242</p>
                        <p class="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">Exp 12/28
                        </p>
                    </div>
                </div>
                <IntelligenceBadge label="Default" variant="primary" />
            </SurfaceCard>
        </div>

        <div class="space-y-4">
            <h3 class="text-sm font-black uppercase tracking-widest text-on-surface-variant">Included perks</h3>
            <div class="grid grid-cols-1 gap-3">
                <div v-for="perk in ['Unlimited Transactions', 'Advanced AI Reports', 'Multi-Store Support', '24/7 Priority Support']"
                    :key="perk" class="flex items-center gap-3">
                    <CheckCircle2 class="w-5 h-5 text-primary" />
                    <span class="text-sm font-bold text-on-surface-variant">{{ perk }}</span>
                </div>
            </div>
        </div>

        <Button variant="ghost" class="w-full text-error hover:bg-error/5">Cancel Subscription</Button>
    </div>
</template>
