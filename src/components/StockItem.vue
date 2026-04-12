<script setup lang="ts">
import { X, Minus, Plus } from 'lucide-vue-next';
import { cn } from '../lib/utils';
import { useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<{
    name: string;
    sku: string;
    price?: string;
    stock?: number;
    reorder?: number;
    qty?: number;
    total?: string;
    image: string;
    isOutOfStock?: boolean;
    variant?: 'list' | 'bill';
}>(), {
    isOutOfStock: false,
    variant: 'list'
});

const emit = defineEmits(['remove', 'qtyChange', 'click']);

const attrs = useAttrs();
</script>

<template>
    <div @click="(e) => emit('click', e)" v-bind="(() => { const { class: _, ...rest } = attrs; return rest; })()"
        :class="cn(
            'bg-surface-container-lowest p-4 rounded-4xl flex flex-col gap-4 group hover:bg-surface-container-low transition-all active:scale-[0.98] cursor-pointer border-l-4',
            props.isOutOfStock ? 'border-error' : 'border-transparent',
            props.variant === 'bill' && 'border-surface-container-high',
            attrs.class as string
        )">
        <div class="flex gap-4 items-start">
            <div class="w-20 h-20 rounded-2xl bg-surface-container overflow-hidden shrink-0">
                <img :src="image" :alt="name" class="w-full h-full object-cover" />
            </div>
            <div class="flex-grow">
                <div class="flex justify-between items-start">
                    <span class="text-[10px] font-bold tracking-widest text-primary uppercase">SKU: {{ sku }}</span>
                    <button v-if="attrs.onRemove || $attrs.onRemove" @click.stop="emit('remove')"
                        class="text-error/40 hover:text-error transition-colors">
                        <X class="w-4 h-4" />
                    </button>
                </div>
                <h3 class="font-bold text-lg mt-1 text-on-surface leading-tight">{{ name }}</h3>
                <p v-if="price" class="font-extrabold text-primary mt-1 text-lg">{{ price }}</p>
            </div>
        </div>

        <div class="flex items-center justify-between">
            <div v-if="props.variant === 'bill'"
                class="flex items-center gap-1 bg-surface-container-high p-1 rounded-2xl">
                <button @click.stop="emit('qtyChange', Math.max(0, (qty || 0) - 1))"
                    class="w-8 h-8 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                    <Minus class="w-4 h-4" />
                </button>
                <span class="w-10 text-center font-bold">{{ qty }}</span>
                <button @click.stop="emit('qtyChange', (qty || 0) + 1)"
                    class="w-8 h-8 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                    <Plus class="w-4 h-4" />
                </button>
            </div>
            <div v-else class="flex flex-col">
                <div :class="cn('text-lg font-extrabold', props.isOutOfStock ? 'text-error' : 'text-tertiary')">
                    {{ stock }} {{ stock === 1 ? 'Unit' : 'Units' }}
                </div>
                <div class="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant opacity-60">
                    {{ props.isOutOfStock ? 'Out of Stock' : `Reorder: ${reorder}` }}
                </div>
            </div>

            <div v-if="props.variant === 'bill'" class="text-right">
                <span class="text-[10px] font-bold text-on-surface-variant block uppercase tracking-tighter">Item
                    Total</span>
                <span class="font-bold text-on-surface">{{ total || price }}</span>
            </div>
        </div>
    </div>
</template>
