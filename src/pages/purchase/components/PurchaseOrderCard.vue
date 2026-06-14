<script setup lang="ts">
import { computed } from 'vue';
import { ArrowUpRight, Check, Send } from 'lucide-vue-next';
import { Button, SurfaceCard } from '../../../components';
import type { PurchaseOrder } from '../../../types/purchase';

const props = defineProps<{ order: PurchaseOrder; busy?: boolean }>();
const emit = defineEmits<{ action: [action: 'submit' | 'approve' | 'send', order: PurchaseOrder] }>();

const nextAction = computed(() => {
    if (props.order.status === 'draft' || props.order.status === 'rejected') return { key: 'submit' as const, label: 'Submit', icon: ArrowUpRight };
    if (props.order.status === 'pending_approval') return { key: 'approve' as const, label: 'Approve', icon: Check };
    if (props.order.status === 'approved') return { key: 'send' as const, label: 'Send', icon: Send };
    return null;
});

const money = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
</script>

<template>
    <SurfaceCard variant="low" class="p-4 rounded-3xl border border-surface-container-high/30 space-y-3">
        <div class="flex items-start justify-between gap-3">
            <div>
                <p class="text-sm font-black text-on-surface">{{ order.number }}</p>
                <p class="text-[10px] font-bold text-on-surface-variant/45 mt-1">{{ order.supplier_name || 'Supplier' }} · {{ order.item_count }} items</p>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[8px] font-black uppercase tracking-wider">{{ order.status.replaceAll('_', ' ') }}</span>
        </div>
        <div class="flex items-end justify-between gap-3">
            <div>
                <p class="text-lg font-black text-on-surface">{{ money(order.total) }}</p>
                <p v-if="order.expected_delivery_date" class="text-[9px] font-bold text-on-surface-variant/40">Due {{ order.expected_delivery_date }}</p>
            </div>
            <Button v-if="nextAction" size="sm" :disabled="busy" @click="emit('action', nextAction.key, order)">
                <component :is="nextAction.icon" class="w-4 h-4" /> {{ nextAction.label }}
            </Button>
        </div>
    </SurfaceCard>
</template>
