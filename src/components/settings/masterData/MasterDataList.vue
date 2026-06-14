<script setup lang="ts">
import { Pencil, Trash2 } from 'lucide-vue-next';
import type { MasterRecord } from '../../../types/masterData';

defineProps<{ records: MasterRecord[]; singular: string; deletingId?: string }>();
defineEmits<{ edit: [record: MasterRecord]; remove: [record: MasterRecord] }>();

const detail = (record: MasterRecord) => {
    if (record.symbol) return `Symbol: ${record.symbol}`;
    if (record.rate !== undefined) return `Rate: ${record.rate}%`;
    if (record.phone) return record.phone;
    if (record.code) return record.code;
    if (record.is_default) return 'Default warehouse';
    return record.description || 'No additional details';
};
</script>

<template>
    <div class="rounded-3xl bg-surface-container-low overflow-hidden">
        <div v-for="record in records" :key="record.id"
            class="p-4 flex items-center gap-3 border-b border-surface-container-high/30 last:border-0">
            <div class="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black shrink-0">
                {{ record.name.charAt(0).toUpperCase() }}
            </div>
            <div class="grow min-w-0">
                <p class="font-black text-sm text-on-surface truncate">{{ record.name }}</p>
                <p class="text-[10px] font-bold text-on-surface-variant/45 truncate mt-0.5">{{ detail(record) }}</p>
            </div>
            <button type="button" class="w-9 h-9 rounded-xl bg-primary/10 text-primary shrink-0"
                @click="$emit('edit', record)"><Pencil class="w-4 h-4 mx-auto" /></button>
            <button type="button" :disabled="deletingId === record.id"
                class="w-9 h-9 rounded-xl bg-error/10 text-error shrink-0 disabled:opacity-40"
                @click="$emit('remove', record)"><Trash2 class="w-4 h-4 mx-auto" /></button>
        </div>
        <p v-if="!records.length" class="p-10 text-center text-sm font-bold text-on-surface-variant/50">
            No {{ singular.toLowerCase() }} records found.
        </p>
    </div>
</template>
