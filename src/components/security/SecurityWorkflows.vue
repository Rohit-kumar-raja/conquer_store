<script setup lang="ts">
import { ref } from 'vue';
import { GitBranch, ChevronRight, Plus, Check, Trash2, X } from 'lucide-vue-next';

interface Workflow {
    id: number;
    name: string;
    steps: string[];
    status: 'Active' | 'Draft';
}

const workflows = ref<Workflow[]>([
    { id: 1, name: 'Stock Transfer', steps: ['Staff Request', 'Manager Review', 'Admin Approve'], status: 'Active' },
    { id: 2, name: 'Price Override', steps: ['Staff Request', 'Admin Approve'], status: 'Active' },
    { id: 3, name: 'Refund Processing', steps: ['Staff Request', 'Manager Review', 'Admin Approve', 'Finance Confirm'], status: 'Draft' },
]);

const showForm = ref(false);
const editingId = ref<number | null>(null);
const formName = ref('');
const formSteps = ref<string[]>([]);
const newStep = ref('');
const formStatus = ref<'Active' | 'Draft'>('Draft');

const openCreate = () => {
    formName.value = '';
    formSteps.value = ['Staff Request'];
    newStep.value = '';
    formStatus.value = 'Draft';
    editingId.value = null;
    showForm.value = true;
};

const openEdit = (wf: Workflow) => {
    formName.value = wf.name;
    formSteps.value = [...wf.steps];
    formStatus.value = wf.status;
    editingId.value = wf.id;
    showForm.value = true;
};

const addStep = () => {
    if (!newStep.value.trim()) return;
    formSteps.value.push(newStep.value.trim());
    newStep.value = '';
};

const removeStep = (i: number) => {
    formSteps.value.splice(i, 1);
};

const save = () => {
    if (!formName.value.trim() || formSteps.value.length < 2) return;
    if (editingId.value) {
        const wf = workflows.value.find(w => w.id === editingId.value);
        if (wf) {
            wf.name = formName.value.trim();
            wf.steps = [...formSteps.value];
            wf.status = formStatus.value;
        }
    } else {
        workflows.value.push({
            id: Date.now(),
            name: formName.value.trim(),
            steps: [...formSteps.value],
            status: formStatus.value,
        });
    }
    showForm.value = false;
};

const remove = (id: number) => {
    workflows.value = workflows.value.filter(w => w.id !== id);
};

const toggleStatus = (wf: Workflow) => {
    wf.status = wf.status === 'Active' ? 'Draft' : 'Active';
};

const cancel = () => {
    showForm.value = false;
    editingId.value = null;
};
</script>

<template>
    <section class="space-y-3">
        <div class="flex items-center justify-between px-1">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">
                Approval Workflows
            </h3>
            <button @click="openCreate"
                class="flex items-center gap-1.5 text-primary text-[9px] font-black uppercase tracking-wider active:scale-95 transition-all">
                <Plus class="w-3.5 h-3.5" /> New
            </button>
        </div>

        <!-- Inline Form -->
        <div v-if="showForm" class="bg-surface-container-low p-5 rounded-4xl border border-primary/20 space-y-3">
            <h3 class="text-sm font-black text-on-surface">
                {{ editingId ? 'Edit Workflow' : 'New Workflow' }}
            </h3>

            <input v-model="formName" type="text" placeholder="Workflow name (e.g. Stock Transfer)"
                class="w-full bg-surface-container-high/50 text-on-surface rounded-2xl px-4 py-3 text-sm font-bold placeholder:text-on-surface-variant/30 outline-none focus:ring-2 focus:ring-primary/30 transition-all" />

            <!-- Steps builder -->
            <div>
                <p class="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-wider mb-2 px-1">
                    Steps (min 2)
                </p>
                <div class="space-y-2">
                    <div v-for="(step, i) in formSteps" :key="i"
                        class="flex items-center gap-2 bg-surface-container-high/30 px-3 py-2 rounded-xl">
                        <span
                            class="w-5 h-5 rounded-md bg-primary/10 text-primary text-[9px] font-black flex items-center justify-center">{{
                            i + 1 }}</span>
                        <span class="text-xs font-bold text-on-surface grow">{{ step }}</span>
                        <button @click="removeStep(i)"
                            class="w-6 h-6 rounded-md flex items-center justify-center text-on-surface-variant/30 hover:text-error hover:bg-error/10 transition-all">
                            <X class="w-3 h-3" />
                        </button>
                    </div>
                    <div class="flex gap-2">
                        <input v-model="newStep" @keydown.enter="addStep" type="text" placeholder="Add step..."
                            class="grow bg-surface-container-high/50 text-on-surface rounded-xl px-3 py-2 text-xs font-bold placeholder:text-on-surface-variant/30 outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                        <button @click="addStep"
                            class="px-3 py-2 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase active:scale-95 transition-all">
                            <Plus class="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <!-- Status -->
            <div class="flex gap-2">
                <button @click="formStatus = 'Active'" :class="[
                    'flex-1 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-95',
                    formStatus === 'Active' ? 'bg-primary text-white' : 'bg-surface-container-high/50 text-on-surface-variant'
                ]">Active</button>
                <button @click="formStatus = 'Draft'" :class="[
                    'flex-1 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-95',
                    formStatus === 'Draft' ? 'bg-surface-container-highest text-on-surface' : 'bg-surface-container-high/50 text-on-surface-variant'
                ]">Draft</button>
            </div>

            <div class="flex gap-3 pt-1">
                <button @click="save" :class="[
                    'grow flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all',
                    formSteps.length >= 2
                        ? 'bg-primary text-white active:scale-95'
                        : 'bg-surface-container-highest text-on-surface-variant/30 cursor-not-allowed'
                ]" :disabled="formSteps.length < 2">
                    <Check class="w-4 h-4" /> {{ editingId ? 'Update' : 'Create' }}
                </button>
                <button @click="cancel"
                    class="px-5 py-3 rounded-2xl bg-surface-container-highest text-on-surface-variant text-xs font-black uppercase tracking-wider active:scale-95 transition-all">
                    Cancel
                </button>
            </div>
        </div>

        <!-- List -->
        <div class="space-y-2.5">
            <div v-for="workflow in workflows" :key="workflow.id"
                class="bg-surface-container-low p-4 px-5 rounded-3xl border border-surface-container-high/30 group transition-all">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                        <GitBranch class="w-4 h-4 text-primary" />
                        <h4 class="font-black text-on-surface text-sm">{{ workflow.name }}</h4>
                    </div>
                    <div class="flex items-center gap-2">
                        <button @click="toggleStatus(workflow)" :class="['text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg cursor-pointer active:scale-90 transition-all',
                            workflow.status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-surface-container-highest text-on-surface-variant/40'
                        ]">{{ workflow.status }}</button>
                        <button @click="openEdit(workflow)"
                            class="w-7 h-7 rounded-lg bg-surface-container-high/50 flex items-center justify-center text-on-surface-variant/30 hover:text-primary hover:bg-primary/10 transition-all active:scale-90 opacity-0 group-hover:opacity-100">
                            <GitBranch class="w-3 h-3" />
                        </button>
                        <button @click="remove(workflow.id)"
                            class="w-7 h-7 rounded-lg bg-surface-container-high/50 flex items-center justify-center text-on-surface-variant/30 hover:text-error hover:bg-error/10 transition-all active:scale-90 opacity-0 group-hover:opacity-100">
                            <Trash2 class="w-3 h-3" />
                        </button>
                    </div>
                </div>
                <div class="flex items-center gap-1 flex-wrap">
                    <div v-for="(step, i) in workflow.steps" :key="step" class="flex items-center gap-1">
                        <div class="bg-surface-container-high/50 px-2.5 py-1 rounded-lg">
                            <span class="text-[8px] font-black text-on-surface-variant/60 uppercase tracking-wider">{{
                                step }}</span>
                        </div>
                        <ChevronRight v-if="i !== workflow.steps.length - 1"
                            class="w-3 h-3 text-on-surface-variant/20 shrink-0" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
