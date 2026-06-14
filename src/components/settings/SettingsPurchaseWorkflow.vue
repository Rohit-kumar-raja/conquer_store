<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ClipboardCheck, LoaderCircle } from 'lucide-vue-next';
import { Button, SurfaceCard } from '..';
import { purchaseApi } from '../../services/purchaseApi';
import type { PurchaseOrderMode } from '../../types/purchase';

const mode = ref<PurchaseOrderMode>('direct');
const loading = ref(true);
const saving = ref(false);
const message = ref('');
const error = ref('');

onMounted(async () => {
    try {
        mode.value = (await purchaseApi.getSettings()).purchase_order_mode;
    } catch (cause) {
        error.value = cause instanceof Error ? cause.message : 'Unable to load purchase settings.';
    } finally {
        loading.value = false;
    }
});

const save = async () => {
    saving.value = true;
    message.value = '';
    error.value = '';
    try {
        await purchaseApi.updateSettings({ purchase_order_mode: mode.value });
        message.value = 'Purchase workflow updated.';
    } catch (cause) {
        error.value = cause instanceof Error ? cause.message : 'Unable to update purchase settings.';
    } finally {
        saving.value = false;
    }
};
</script>

<template>
    <SurfaceCard variant="low" class="p-5 rounded-4xl border border-surface-container-high/30 space-y-4">
        <div class="flex items-center gap-4">
            <div class="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <ClipboardCheck class="w-5 h-5" />
            </div>
            <div>
                <h3 class="text-sm font-black text-on-surface">Purchase Order Workflow</h3>
                <p class="text-[10px] font-bold text-on-surface-variant/45 mt-0.5">Choose how purchase orders begin</p>
            </div>
        </div>

        <div v-if="loading" class="flex items-center gap-2 text-xs font-bold text-on-surface-variant/50">
            <LoaderCircle class="w-4 h-4 animate-spin" /> Loading workflow
        </div>
        <div v-else class="grid gap-2">
            <button v-for="option in [
                { value: 'direct', title: 'Requisitions disabled', text: 'Create purchase orders directly.' },
                { value: 'requisition_optional', title: 'Requisitions optional', text: 'Create directly or link a submitted requisition.' },
                { value: 'requisition_required', title: 'Requisition required', text: 'A submitted requisition must be selected first.' }
            ]" :key="option.value" type="button" @click="mode = option.value as PurchaseOrderMode"
                :class="['text-left p-4 rounded-2xl border transition-all', mode === option.value ? 'border-primary bg-primary/10' : 'border-surface-container-high bg-surface-container-high/40']">
                <p class="text-sm font-black text-on-surface">{{ option.title }}</p>
                <p class="text-[10px] font-bold text-on-surface-variant/45 mt-1">{{ option.text }}</p>
            </button>
        </div>

        <p v-if="message" class="text-xs font-bold text-primary">{{ message }}</p>
        <p v-if="error" class="text-xs font-bold text-error">{{ error }}</p>
        <Button class="w-full" :disabled="loading || saving" @click="save">
            <LoaderCircle v-if="saving" class="w-4 h-4 animate-spin" />
            {{ saving ? 'Saving' : 'Save Purchase Workflow' }}
        </Button>
    </SurfaceCard>
</template>
