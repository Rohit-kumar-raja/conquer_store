<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next';
import { SurfaceCard } from '../index';
import { useThemeStore } from '../../stores/useThemeStore';

const themeStore = useThemeStore();
</script>

<template>
    <section class="space-y-3">
        <div class="flex items-center justify-between px-1">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Appearance</h3>
            <span class="text-[9px] font-black text-primary uppercase tracking-widest">
                {{ themeStore.isDark ? 'Dark' : 'Light' }}
            </span>
        </div>

        <SurfaceCard variant="low" class="p-0 rounded-4xl overflow-hidden border border-surface-container-high/30">
            <div class="p-5 flex items-center justify-between">
                <div class="flex items-center gap-5">
                    <div class="w-12 h-12 rounded-2xl flex items-center justify-center border border-primary/5 transition-colors"
                        :class="themeStore.isDark ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'">
                        <Moon v-if="themeStore.isDark" class="w-6 h-6" />
                        <Sun v-else class="w-6 h-6" />
                    </div>
                    <div>
                        <p class="font-black text-on-surface text-sm">Display Mode</p>
                        <p class="text-[10px] text-on-surface-variant/45 font-bold mt-0.5">
                            {{ themeStore.isDark ? 'Dark theme active' : 'Light theme active' }}
                        </p>
                    </div>
                </div>
                <button @click="themeStore.toggleTheme()" :class="[
                    'w-14 h-8 rounded-full relative transition-all duration-300 p-1',
                    themeStore.isDark ? 'bg-primary' : 'bg-surface-container-highest'
                ]">
                    <div :class="[
                        'w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300',
                        themeStore.isDark ? 'translate-x-6' : 'translate-x-0'
                    ]"></div>
                </button>
            </div>
        </SurfaceCard>
    </section>
</template>
