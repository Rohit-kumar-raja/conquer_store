<script setup lang="ts">
import { Clock } from 'lucide-vue-next';
import { SurfaceCard, Button } from '../index';
</script>

<template>
    <section class="pt-4">
        <SurfaceCard variant="lowest" class="p-6 bg-error/5 border border-error/10 flex items-center justify-between">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center text-error">
                    <Clock class="w-5 h-5" />
                </div>
                <div>
                    <p class="font-bold text-on-surface">Reset All Preferences</p>
                    <p class="text-xs text-on-surface-variant font-medium">Revert all settings to factory defaults</p>
                </div>
            </div>
            <Button variant="ghost"
                class="text-error hover:bg-error/10 font-black uppercase text-[10px] tracking-widest px-4 h-10 rounded-xl">
                Reset
            </Button>
        </SurfaceCard>
    </section>
</template>
