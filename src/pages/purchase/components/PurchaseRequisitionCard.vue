<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next';
import { Button, SurfaceCard } from '../../../components';
import type { PurchaseRequisition } from '../../../types/purchase';

defineProps<{ requisition: PurchaseRequisition; busy?: boolean }>();
defineEmits<{ submit: [requisition: PurchaseRequisition] }>();
</script>

<template>
    <SurfaceCard variant="low" class="p-4 rounded-3xl border border-surface-container-high/30 space-y-3">
        <div class="flex items-start justify-between gap-3">
            <div>
                <h3 class="text-sm font-black text-on-surface">{{ requisition.number }}</h3>
                <p class="text-[10px] font-bold text-on-surface-variant/45 mt-1">
                    {{ requisition.items.length }} items<span v-if="requisition.required_by"> · Required {{ requisition.required_by }}</span>
                </p>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[8px] font-black uppercase">
                {{ requisition.status.replaceAll('_', ' ') }}
            </span>
        </div>
        <div v-if="requisition.status === 'draft'" class="flex justify-end">
            <Button size="sm" :disabled="busy" @click="$emit('submit', requisition)">
                <ArrowUpRight class="w-4 h-4" /> Submit
            </Button>
        </div>
    </SurfaceCard>
</template>
