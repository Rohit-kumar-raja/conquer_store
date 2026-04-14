<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next';
import { SurfaceCard } from '../index';
import { useThemeStore } from '../../stores/useThemeStore';

const themeStore = useThemeStore();
</script>

<template>
    <section class="space-y-4">
        <div class="flex items-center gap-3">
            <div class="w-1.5 h-6 bg-primary rounded-full"></div>
            <h3 class="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/70">Appearance</h3>
        </div>

        <SurfaceCard variant="low" class="p-0 overflow-hidden border border-surface-container-high/50">
            <div class="p-6 flex items-center justify-between">
                <div class="flex items-center gap-5">
                    <div class="w-12 h-12 rounded-2xl flex items-center justify-center border border-primary/5 transition-colors"
                        :class="themeStore.isDark ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'">
                        <Moon v-if="themeStore.isDark" class="w-6 h-6" />
                        <Sun v-else class="w-6 h-6" />
                    </div>
                    <div>
                        <p class="font-bold text-on-surface text-lg">Dark Mode</p>
                        <p class="text-xs text-on-surface-variant font-medium">
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
