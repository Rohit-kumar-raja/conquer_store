<script setup lang="ts">
import { ref } from 'vue';
import { Eye, ClipboardCheck, History } from 'lucide-vue-next';

interface ActivityLog {
    id: number;
    user: string;
    action: string;
    time: string;
    type: 'edit' | 'approve' | 'create' | 'login';
}

const showAll = ref(false);

const logs = ref<ActivityLog[]>([
    { id: 1, user: 'Raaj Philips', action: 'Updated pricing for AuraPods Pro', time: '5m ago', type: 'edit' },
    { id: 2, user: 'Priya Sharma', action: 'Approved stock transfer #TR-441', time: '22m ago', type: 'approve' },
    { id: 3, user: 'Ankit Mehta', action: 'Created new bill #TX-9024', time: '1h ago', type: 'create' },
    { id: 4, user: 'Neha Gupta', action: 'Logged in from new device', time: '3h ago', type: 'login' },
    { id: 5, user: 'Raaj Philips', action: 'Added new product Aura X1', time: '5h ago', type: 'create' },
    { id: 6, user: 'Priya Sharma', action: 'Exported monthly report', time: '8h ago', type: 'edit' },
    { id: 7, user: 'Ankit Mehta', action: 'Processed refund #RF-112', time: '1d ago', type: 'approve' },
    { id: 8, user: 'Neha Gupta', action: 'Updated stock for 12 items', time: '1d ago', type: 'edit' },
]);

const typeColors: Record<string, string> = {
    'approve': 'bg-primary/10 text-primary',
    'edit': 'bg-tertiary/10 text-tertiary',
    'create': 'bg-secondary/10 text-secondary',
    'login': 'bg-surface-container-highest text-on-surface-variant/50',
};

const visibleLogs = ref<ActivityLog[]>([]);

const updateVisible = () => {
    visibleLogs.value = showAll.value ? logs.value : logs.value.slice(0, 4);
};

updateVisible();

const toggleAll = () => {
    showAll.value = !showAll.value;
    updateVisible();
};
</script>

<template>
    <section class="space-y-3">
        <div class="flex items-center justify-between px-1">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">
                Activity Log
            </h3>
            <button @click="toggleAll"
                class="text-[9px] font-black text-primary uppercase tracking-wider flex items-center gap-1 active:scale-95 transition-all">
                <Eye class="w-3.5 h-3.5" />
                {{ showAll ? 'Show Less' : 'View All' }}
            </button>
        </div>

        <div class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 overflow-hidden">
            <div v-for="(log, index) in visibleLogs" :key="log.id" :class="[
                'p-4 px-5 flex items-start gap-4 transition-all',
                index !== visibleLogs.length - 1 && 'border-b border-surface-container-high/20'
            ]">
                <div
                    :class="['w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5', typeColors[log.type]]">
                    <ClipboardCheck v-if="log.type === 'approve'" class="w-4 h-4" />
                    <History v-else class="w-4 h-4" />
                </div>
                <div class="min-w-0 grow">
                    <p class="text-xs font-black text-on-surface leading-snug">{{ log.action }}</p>
                    <div class="flex items-center gap-2 mt-1">
                        <span class="text-[9px] font-bold text-on-surface-variant/40">{{ log.user }}</span>
                        <span class="w-0.5 h-0.5 rounded-full bg-on-surface-variant/20"></span>
                        <span class="text-[9px] font-bold text-on-surface-variant/30">{{ log.time }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
