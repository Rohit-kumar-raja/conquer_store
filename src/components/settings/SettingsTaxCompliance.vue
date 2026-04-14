<script setup lang="ts">
import { Globe, Percent, Shield } from 'lucide-vue-next';
import { SurfaceCard, Input, IntelligenceBadge } from '../index';
</script>

<template>
    <section class="space-y-4">
        <div class="flex items-center gap-3">
            <div class="w-1.5 h-6 bg-primary rounded-full"></div>
            <h3 class="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/70">Tax & Compliance</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SurfaceCard variant="low" class="p-8 border border-surface-container-high/50">
                <div class="flex flex-col gap-6">
                    <div class="flex items-start justify-between">
                        <div
                            class="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                            <Percent class="w-6 h-6" />
                        </div>
                        <IntelligenceBadge label="Compliant" variant="tertiary" />
                    </div>
                    <Input label="Default GST Rate (%)" value="18" container-class="w-full">
                        <template #icon>
                            <Percent class="w-5 h-5" />
                        </template>
                    </Input>
                    <p class="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">
                        Applied to all new products by default
                    </p>
                </div>
            </SurfaceCard>

            <SurfaceCard variant="low" class="p-8 border border-surface-container-high/50">
                <div class="flex flex-col gap-6">
                    <div class="flex items-start justify-between">
                        <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <Globe class="w-6 h-6" />
                        </div>
                        <div class="flex items-center gap-1">
                            <div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                            <span class="text-[10px] font-black text-primary uppercase">Automated</span>
                        </div>
                    </div>
                    <Input label="HSN Mandatory" value="Yes (Automated)" container-class="w-full">
                        <template #icon>
                            <Shield class="w-5 h-5" />
                        </template>
                    </Input>
                    <p class="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">
                        Ensures GST filing compatibility
                    </p>
                </div>
            </SurfaceCard>
        </div>
    </section>
</template>
