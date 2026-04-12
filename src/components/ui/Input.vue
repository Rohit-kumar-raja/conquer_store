<script setup lang="ts">
import { cn } from '../../lib/utils';
import { useAttrs } from 'vue';
import InputText from 'primevue/inputtext';


defineOptions({ inheritAttrs: false });

const props = defineProps<{
    label: string;
    containerClass?: string;
}>();

const attrs = useAttrs();
</script>

<template>
    <div :class="cn('relative group', props.containerClass)">
        <label
            class="absolute left-4 -top-2.5 px-2 bg-surface-container-lowest text-[10px] font-bold uppercase tracking-widest text-primary z-10">
            {{ label }}
        </label>
        <div
            class="flex items-center bg-surface-container-high rounded-2xl px-5 h-16 transition-all focus-within:ring-2 focus-within:ring-primary/20 border border-transparent focus-within:border-primary/10">
            <div v-if="$slots.icon" class="text-on-surface-variant mr-4">
                <slot name="icon"></slot>
            </div>
            <InputText v-bind="(() => { const { class: _, ...rest } = attrs; return rest; })()" :class="cn(
                'bg-transparent border-none focus:ring-0 w-full text-on-surface placeholder:text-on-surface-variant/40 font-bold shadow-none',
                attrs.class as string
            )" />
            <div v-if="$slots.rightIcon" class="ml-2">
                <slot name="rightIcon"></slot>
            </div>
        </div>
    </div>
</template>
