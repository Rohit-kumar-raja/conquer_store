<script setup lang="ts">
import { Clock } from 'lucide-vue-next';
import { SurfaceCard, Button } from '../index';
</script>

<template>
    <section class="space-y-3 pt-2">
        <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-error/60 px-1">Danger Zone</h3>
        <SurfaceCard variant="lowest"
            class="p-5 rounded-4xl bg-error/5 border border-error/10 flex items-center justify-between gap-4">
            <div class="flex items-center gap-4">
                <div class="w-11 h-11 rounded-2xl bg-error/10 flex items-center justify-center text-error shrink-0">
                    <Clock class="w-5 h-5" />
                </div>
                <div class="min-w-0">
                    <p class="font-black text-on-surface text-sm">Reset Preferences</p>
                    <p class="text-[10px] text-on-surface-variant/45 font-bold mt-0.5">
                        Revert settings to factory defaults
                    </p>
                </div>
            </div>
            <Button variant="ghost"
                class="text-error hover:bg-error/10 font-black uppercase text-[10px] tracking-widest px-4 h-10 rounded-xl shrink-0">
                Reset
            </Button>
        </SurfaceCard>
    </section>
</template>
