<script setup lang="ts">
import { cn } from '../lib/utils';
import { useAttrs } from 'vue';
import PVButton from 'primevue/button';


defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<{
    variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'xl';
}>(), {
    variant: 'primary',
    size: 'md'
});

const attrs = useAttrs();

const variants = {
    primary: 'primary-gradient text-white shadow-lg shadow-primary/20 hover:shadow-xl',
    secondary: 'bg-surface-container-high text-on-secondary-container hover:bg-surface-container-highest',
    tertiary: 'bg-tertiary text-white shadow-lg shadow-tertiary/20',
    ghost: 'bg-transparent text-on-surface-variant hover:bg-surface-container-low'
};

const sizes = {
    sm: 'px-4 py-2 text-xs rounded-xl',
    md: 'px-6 py-3 text-sm rounded-2xl',
    lg: 'px-8 py-4 text-base rounded-2xl',
    xl: 'px-10 py-5 text-lg rounded-3xl'
};
</script>

<template>
    <PVButton unstyled v-bind="(() => { const { class: _, ...rest } = attrs; return rest; })()" :class="cn(
        'font-bold transition-all active:scale-95 flex items-center justify-center gap-2',
        variants[props.variant],
        sizes[props.size],
        attrs.class as string
    )">
        <span v-if="$slots.icon" class="flex items-center justify-center">
            <slot name="icon"></slot>
        </span>
        <slot></slot>
    </PVButton>
</template>
