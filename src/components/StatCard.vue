<script setup lang="ts">
import { TrendingUp, TrendingDown } from 'lucide-vue-next';
import { cn } from '../lib/utils';
import SurfaceCard from './SurfaceCard.vue';
import { useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<{
    label: string;
    value: string | number;
    trend?: string;
    trendLabel?: string;
    trendDirection?: 'up' | 'down';
    variant?: 'default' | 'primary';
}>(), {
    trendDirection: 'up',
    variant: 'default'
});

const attrs = useAttrs();
</script>

<template>
    <SurfaceCard v-bind="(() => { const { class: _, ...rest } = attrs; return rest; })()"
        :class="cn('relative overflow-hidden group', attrs.class as string)">
        <div :class="cn(
            'absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl transition-all',
            props.variant === 'primary' ? 'bg-primary/5 group-hover:bg-primary/10' : 'bg-secondary/5'
        )" />

        <div v-if="$slots.icon" class="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-all">
            <slot name="icon"></slot>
        </div>

        <div class="flex flex-col gap-2 relative z-10">
            <span class="text-[11px] font-bold uppercase tracking-[0.15em] text-on-surface-variant leading-none">
                {{ label }}
            </span>
            <span :class="cn(
                'text-4xl font-extrabold tracking-tight font-headline leading-tight',
                props.variant === 'primary' ? 'text-primary' : 'text-on-surface'
            )">
                {{ value }}
            </span>

            <div v-if="trend || trendLabel" class="flex items-center gap-1 mt-2">
                <span v-if="trend" :class="cn(
                    'font-bold text-xs flex items-center',
                    props.trendDirection === 'up' ? 'text-primary' : 'text-error'
                )">
                    <TrendingUp v-if="props.trendDirection === 'up'" class="w-3 h-3 mr-1" />
                    <TrendingDown v-else class="w-3 h-3 mr-1" />
                    {{ trend }}
                </span>
                <span class="text-on-surface-variant text-[10px] font-medium">
                    {{ trendLabel }}
                </span>
            </div>
        </div>
    </SurfaceCard>
</template>
