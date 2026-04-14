<script setup lang="ts">
import { ref, computed } from 'vue';
import { Plus, ChevronRight, Pencil, Trash2, Check, X, Crown, UserCog, Users } from 'lucide-vue-next';

export interface TeamMember {
    id: number;
    name: string;
    role: 'Admin' | 'Manager' | 'Staff';
    email: string;
    avatar: string;
    warehouses: string[];
    status: string;
}

const members = ref<TeamMember[]>([
    { id: 1, name: 'Raaj Philips', role: 'Admin', email: 'raaj@conquer.in', avatar: 'R', warehouses: ['All Warehouses'], status: 'Active Now' },
    { id: 2, name: 'Priya Sharma', role: 'Manager', email: 'priya@conquer.in', avatar: 'P', warehouses: ['Mumbai HQ', 'Pune DC'], status: '2h ago' },
    { id: 3, name: 'Ankit Mehta', role: 'Staff', email: 'ankit@conquer.in', avatar: 'A', warehouses: ['Mumbai HQ'], status: '1d ago' },
    { id: 4, name: 'Neha Gupta', role: 'Staff', email: 'neha@conquer.in', avatar: 'N', warehouses: ['Pune DC'], status: '3h ago' },
]);

const showForm = ref(false);
const editingId = ref<number | null>(null);
const formName = ref('');
const formEmail = ref('');
const formRole = ref<'Admin' | 'Manager' | 'Staff'>('Staff');

const roleColors: Record<string, string> = {
    'Admin': 'bg-primary/10 text-primary',
    'Manager': 'bg-tertiary/10 text-tertiary',
    'Staff': 'bg-secondary/10 text-secondary',
};

const avatarColors: Record<string, string> = {
    'Admin': 'bg-primary',
    'Manager': 'bg-tertiary',
    'Staff': 'bg-secondary',
};

const roles: Array<{ value: 'Admin' | 'Manager' | 'Staff'; icon: any }> = [
    { value: 'Admin', icon: Crown },
    { value: 'Manager', icon: UserCog },
    { value: 'Staff', icon: Users },
];

const adminCount = computed(() => members.value.filter(m => m.role === 'Admin').length);
const managerCount = computed(() => members.value.filter(m => m.role === 'Manager').length);
const staffCount = computed(() => members.value.filter(m => m.role === 'Staff').length);

const openCreate = () => {
    formName.value = '';
    formEmail.value = '';
    formRole.value = 'Staff';
    editingId.value = null;
    showForm.value = true;
};

const openEdit = (m: TeamMember) => {
    formName.value = m.name;
    formEmail.value = m.email;
    formRole.value = m.role;
    editingId.value = m.id;
    showForm.value = true;
};

const save = () => {
    if (!formName.value.trim() || !formEmail.value.trim()) return;
    if (editingId.value) {
        const m = members.value.find(x => x.id === editingId.value);
        if (m) {
            m.name = formName.value.trim();
            m.email = formEmail.value.trim();
            m.role = formRole.value;
        }
    } else {
        members.value.push({
            id: Date.now(),
            name: formName.value.trim(),
            email: formEmail.value.trim(),
            role: formRole.value,
            avatar: formName.value.trim().charAt(0).toUpperCase(),
            warehouses: [],
            status: 'Invited',
        });
    }
    showForm.value = false;
    formName.value = '';
    formEmail.value = '';
    editingId.value = null;
};

const remove = (id: number) => {
    members.value = members.value.filter(m => m.id !== id);
};

const cancel = () => {
    showForm.value = false;
    editingId.value = null;
};

defineExpose({ members, adminCount, managerCount, staffCount });
</script>

<template>
    <section class="space-y-3">
        <div class="flex items-center justify-between px-1">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">
                Team Members
            </h3>
            <button @click="openCreate"
                class="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider active:scale-95 transition-all">
                <Plus class="w-3.5 h-3.5" />
                Invite
            </button>
        </div>

        <!-- Inline Form -->
        <div v-if="showForm" class="bg-surface-container-low p-5 rounded-4xl border border-primary/20 space-y-3">
            <h3 class="text-sm font-black text-on-surface">
                {{ editingId ? 'Edit Member' : 'Invite Member' }}
            </h3>
            <input v-model="formName" type="text" placeholder="Full name"
                class="w-full bg-surface-container-high/50 text-on-surface rounded-2xl px-4 py-3 text-sm font-bold placeholder:text-on-surface-variant/30 outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
            <input v-model="formEmail" type="email" placeholder="Email address"
                class="w-full bg-surface-container-high/50 text-on-surface rounded-2xl px-4 py-3 text-sm font-bold placeholder:text-on-surface-variant/30 outline-none focus:ring-2 focus:ring-primary/30 transition-all" />

            <!-- Role Selector -->
            <div class="flex gap-2">
                <button v-for="r in roles" :key="r.value" @click="formRole = r.value" :class="[
                    'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-95',
                    formRole === r.value
                        ? roleColors[r.value].replace('/10', '') + ' ring-2 ring-current/20'
                        : 'bg-surface-container-high/50 text-on-surface-variant'
                ]">
                    <component :is="r.icon" class="w-3.5 h-3.5" />
                    {{ r.value }}
                </button>
            </div>

            <div class="flex gap-3 pt-1">
                <button @click="save"
                    class="grow flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-2xl text-xs font-black uppercase tracking-wider active:scale-95 transition-all">
                    <Check class="w-4 h-4" /> {{ editingId ? 'Update' : 'Invite' }}
                </button>
                <button @click="cancel"
                    class="px-5 py-3 rounded-2xl bg-surface-container-highest text-on-surface-variant text-xs font-black uppercase tracking-wider active:scale-95 transition-all">
                    Cancel
                </button>
            </div>
        </div>

        <!-- List -->
        <div class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 overflow-hidden">
            <div v-for="(member, index) in members" :key="member.id" :class="[
                'p-4 px-5 flex items-center justify-between group transition-all',
                index !== members.length - 1 && 'border-b border-surface-container-high/20'
            ]">
                <div class="flex items-center gap-4">
                    <div
                        :class="['w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-sm', avatarColors[member.role]]">
                        {{ member.avatar }}
                    </div>
                    <div class="min-w-0">
                        <div class="flex items-center gap-2">
                            <h4 class="font-black text-on-surface text-sm truncate">{{ member.name }}</h4>
                            <span
                                :class="['text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg', roleColors[member.role]]">
                                {{ member.role }}
                            </span>
                        </div>
                        <p class="text-[9px] font-bold text-on-surface-variant/40 mt-0.5 truncate">
                            {{ member.warehouses.join(', ') || 'No warehouse assigned' }}
                        </p>
                    </div>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    <button @click="openEdit(member)"
                        class="w-8 h-8 rounded-xl bg-surface-container-high/50 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all active:scale-90">
                        <Pencil class="w-3.5 h-3.5" />
                    </button>
                    <button @click="remove(member.id)"
                        class="w-8 h-8 rounded-xl bg-surface-container-high/50 flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/10 transition-all active:scale-90">
                        <Trash2 class="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
