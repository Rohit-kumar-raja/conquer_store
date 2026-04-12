<script setup lang="ts">
import { cn } from '../lib/utils';
import { useAttrs } from 'vue';
import PVCard from 'primevue/card';


defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<{
    variant?: 'lowest' | 'low' | 'high' | 'highest' | 'glass';
    hover?: boolean;
}>(), {
    variant: 'lowest',
    hover: false
});

const attrs = useAttrs();

const variants = {
    lowest: 'bg-surface-container-lowest',
    low: 'bg-surface-container-low',
    high: 'bg-surface-container-high',
    highest: 'bg-surface-container-highest',
    glass: 'glass-panel'
};
</script>

<template>
    <PVCard unstyled v-bind="(() => { const { class: _, ...rest } = attrs; return rest; })()" :pt="{
        root: {
            class: cn(
                'rounded-[2.5rem] p-6 transition-all duration-300',
                variants[props.variant],
                props.hover && 'hover:bg-surface-container-low hover:scale-[1.01] cursor-pointer',
                attrs.onClick && 'active:scale-[0.98]',
                attrs.class as string
            )
        },
        body: { class: 'p-0 h-full' },
        content: { class: 'p-0 h-full' }
    }">
        <template #content>
            <slot></slot>
        </template>
    </PVCard>
</template>
