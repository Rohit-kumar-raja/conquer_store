<script setup lang="ts">
import { FileCheck2, Percent, Shield } from 'lucide-vue-next';
import { SurfaceCard } from '../index';
</script>

<template>
    <section class="space-y-3">
        <div class="flex items-center justify-between px-1">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Tax & Compliance</h3>
            <span class="text-[9px] font-black text-primary uppercase tracking-widest">Ready</span>
        </div>

        <div class="grid grid-cols-1 gap-3">
            <SurfaceCard variant="low" class="p-5 rounded-4xl border border-surface-container-high/30">
                <div class="flex items-center justify-between gap-4">
                    <div class="flex items-center gap-4">
                        <div class="w-11 h-11 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                            <Percent class="w-5 h-5" />
                        </div>
                        <div>
                            <p class="font-black text-on-surface text-sm">Default GST Rate</p>
                            <p class="text-[10px] font-bold text-on-surface-variant/40 mt-0.5">
                                Applied to all new products by default
                            </p>
                        </div>
                    </div>
                    <div class="text-right shrink-0">
                        <p class="text-2xl font-black text-on-surface">18%</p>
                        <p class="text-[8px] font-black text-primary uppercase tracking-wider">Compliant</p>
                    </div>
                </div>
            </SurfaceCard>

            <SurfaceCard variant="low" class="p-5 rounded-4xl border border-surface-container-high/30">
                <div class="flex items-center justify-between gap-4">
                    <div class="flex items-center gap-4">
                        <div class="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <Shield class="w-5 h-5" />
                        </div>
                        <div>
                            <p class="font-black text-on-surface text-sm">HSN Enforcement</p>
                            <p class="text-[10px] font-bold text-on-surface-variant/40 mt-0.5">
                                Keeps GST filing and invoices compatible
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-2 rounded-2xl shrink-0">
                        <FileCheck2 class="w-4 h-4" />
                        <span class="text-[9px] font-black uppercase tracking-wider">Auto</span>
                    </div>
                </div>
            </SurfaceCard>
        </div>
    </section>
</template>
