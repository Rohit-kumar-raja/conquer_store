<script setup lang="ts">
import { cn } from '../../lib/utils';
import { useAttrs } from 'vue';
import Select from 'primevue/select';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
    label: string;
    containerClass?: string;
    options: any[];
    optionLabel?: string;
    optionValue?: string;
    placeholder?: string;
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
            class="flex items-center bg-surface-container-high rounded-2xl h-16 transition-all focus-within:ring-2 focus-within:ring-primary/20 border border-transparent focus-within:border-primary/10 overflow-hidden">
            <div v-if="$slots.icon" class="text-on-surface-variant ml-5">
                <slot name="icon"></slot>
            </div>
            <Select v-bind="(() => { const { class: _, ...rest } = attrs; return rest; })()" :options="options"
                :optionLabel="optionLabel" :optionValue="optionValue" :placeholder="placeholder"
                class="flex-1 bg-transparent border-none shadow-none ring-0 w-full" :pt="{
                    root: { class: 'bg-transparent border-none ring-0 shadow-none h-full flex items-center px-5' },
                    label: { class: 'p-0 text-on-surface font-bold text-sm' },
                    dropdown: { class: 'hidden' },
                    overlay: { class: 'bg-surface-container-high border-surface-container-highest rounded-2xl shadow-2xl p-2 mt-2' },
                    list: { class: 'p-0' },
                    option: { class: 'rounded-xl p-3 font-bold text-sm text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all cursor-pointer' }
                }" />
            <div v-if="$slots.right" class="mr-2">
                <slot name="right"></slot>
            </div>
        </div>
    </div>
</template>

<style>
/* Remove PrimeVue default ring and border */
.p-select {
    box-shadow: none !important;
}

.p-select-label {
    padding: 0 !important;
}
</style>
