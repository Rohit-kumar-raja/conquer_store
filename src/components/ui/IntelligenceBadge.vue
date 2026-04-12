<script setup lang="ts">
import { cn } from '../../lib/utils';
import { useAttrs } from 'vue';
import PVTag from 'primevue/tag';


defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<{
    label: string;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'error';
    pulse?: boolean;
}>(), {
    variant: 'primary',
    pulse: false
});

const attrs = useAttrs();

const variants = {
    primary: 'bg-primary/5 text-primary',
    secondary: 'bg-secondary/5 text-secondary',
    tertiary: 'bg-tertiary/5 text-tertiary',
    error: 'bg-error/5 text-error'
};

const dotColors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary',
    error: 'bg-error'
};
</script>

<template>
    <PVTag unstyled v-bind="(() => { const { class: _, ...rest } = attrs; return rest; })()" :class="cn(
        'px-4 py-1.5 rounded-full flex items-center gap-2 w-fit',
        variants[props.variant],
        attrs.class as string
    )">
        <span v-if="props.pulse" :class="cn('w-2 h-2 rounded-full animate-pulse', dotColors[props.variant])" />
        <span v-if="$slots.icon" class="w-3.5 h-3.5">
            <slot name="icon"></slot>
        </span>
        <span class="text-[10px] font-bold uppercase tracking-widest">{{ label }}</span>
    </PVTag>
</template>
