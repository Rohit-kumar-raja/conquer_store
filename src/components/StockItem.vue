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
}>(), {
    isOutOfStock: false,
});

const emit = defineEmits(['remove', 'qtyChange', 'click']);

const attrs = useAttrs();
</script>

<template>
    <div @click="(e) => emit('click', e)" v-bind="(() => { const { class: _, ...rest } = attrs; return rest; })()"
        :class="cn(
            'bg-surface-container-low p-3 rounded-4xl flex items-center gap-5 transition-all active:scale-[0.98] cursor-pointer group border border-surface-container-highest/20',
            attrs.class as string
        )">

        <!-- Image -->
        <div class="w-20 h-20 rounded-3xl bg-surface-container overflow-hidden shrink-0 shadow-inner">
            <img :src="image" :alt="name" class="w-full h-full object-cover" />
        </div>

        <!-- Content Area -->
        <div class="flex-grow min-w-0 flex flex-col justify-between py-1">
            <div class="flex items-center justify-between gap-4">
                <div class="min-w-0">
                    <h3 class="font-black text-on-surface text-lg leading-tight truncate">{{ name }}</h3>
                    <p class="text-[10px] font-black tracking-widest text-primary/40 uppercase mt-1">SKU: {{ sku }}</p>
                </div>

                <!-- Qty Controls: Right of Title -->
                <div
                    class="flex items-center gap-1 bg-surface-container-highest/50 rounded-[1rem] p-1 shrink-0 border border-surface-container-highest/30">
                    <button @click.stop="emit('qtyChange', Math.max(0, (qty || 0) - 1))"
                        class="w-8 h-8 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all active:scale-90">
                        <Minus class="w-4 h-4" />
                    </button>
                    <span class="w-8 text-center text-sm font-black text-on-surface">{{ qty || 1 }}</span>
                    <button @click.stop="emit('qtyChange', (qty || 0) + 1)"
                        class="w-8 h-8 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all active:scale-90">
                        <Plus class="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div class="flex items-end justify-between mt-3">
                <div>
                    <span class="text-[9px] font-black text-on-surface-variant/40 block uppercase tracking-tighter">Unit
                        Price</span>
                    <p class="font-black text-primary text-base leading-none">{{ price }}</p>
                </div>

                <div v-if="total" class="text-right">
                    <span class="text-[9px] font-black text-on-surface-variant/40 block uppercase tracking-tighter">Item
                        Total</span>
                    <span class="font-black text-on-surface text-lg leading-none">{{ total }}</span>
                </div>
            </div>
        </div>

        <!-- Remove Action -->
        <button v-if="attrs.onRemove || $attrs.onRemove" @click.stop="emit('remove')"
            class="w-12 h-12 rounded-2xl bg-error/5 text-error/30 hover:bg-error/10 hover:text-error transition-all flex items-center justify-center active:scale-75">
            <X class="w-6 h-6" />
        </button>
    </div>
</template>
