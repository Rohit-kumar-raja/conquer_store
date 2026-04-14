<script setup lang="ts">
import {
    ShieldCheck, Fingerprint, Smartphone, Key, History, Lock,
    ShieldAlert, ChevronRight, Users, Crown, UserCog, Warehouse,
    ClipboardCheck, KeyRound, GitBranch, Eye, Plus, MoreHorizontal
} from 'lucide-vue-next';
import { SurfaceCard, IntelligenceBadge, Button } from '../components';
import ToggleSwitch from 'primevue/toggleswitch';
import { ref } from 'vue';

const mfa = ref(true);
const sso = ref(false);
const loginAlerts = ref(true);
const appLock = ref(false);

const teamMembers = [
    { name: 'Raaj Philips', role: 'Admin', email: 'raaj@conquer.in', avatar: 'R', color: 'bg-primary', status: 'Active Now', warehouses: ['All Warehouses'] },
    { name: 'Priya Sharma', role: 'Manager', email: 'priya@conquer.in', avatar: 'P', color: 'bg-tertiary', status: '2h ago', warehouses: ['Mumbai HQ', 'Pune DC'] },
    { name: 'Ankit Mehta', role: 'Staff', email: 'ankit@conquer.in', avatar: 'A', color: 'bg-secondary', status: '1d ago', warehouses: ['Mumbai HQ'] },
    { name: 'Neha Gupta', role: 'Staff', email: 'neha@conquer.in', avatar: 'N', color: 'bg-primary', status: '3h ago', warehouses: ['Pune DC'] },
];

const activityLogs = [
    { user: 'Raaj Philips', action: 'Updated pricing for AuraPods Pro', time: '5m ago', type: 'edit' },
    { user: 'Priya Sharma', action: 'Approved stock transfer #TR-441', time: '22m ago', type: 'approve' },
    { user: 'Ankit Mehta', action: 'Created new bill #TX-9024', time: '1h ago', type: 'create' },
    { user: 'Neha Gupta', action: 'Logged in from new device', time: '3h ago', type: 'login' },
];

const approvalWorkflows = [
    { name: 'Stock Transfer', steps: ['Staff Request', 'Manager Review', 'Admin Approve'], status: 'Active' },
    { name: 'Price Override', steps: ['Staff Request', 'Admin Approve'], status: 'Active' },
    { name: 'Refund Processing', steps: ['Staff Request', 'Manager Review', 'Admin Approve', 'Finance Confirm'], status: 'Draft' },
];

const roleColors: Record<string, string> = {
    'Admin': 'bg-primary/10 text-primary',
    'Manager': 'bg-tertiary/10 text-tertiary',
    'Staff': 'bg-secondary/10 text-secondary',
};
</script>

<template>
    <div class="px-5 pt-2 space-y-6 pb-40 max-w-md mx-auto">

        <!-- Security Status Card -->
        <section>
            <SurfaceCard variant="low" class="p-5 bg-primary/5 border border-primary/15 relative overflow-hidden">
                <div class="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl">
                </div>
                <div class="relative z-10 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-14 h-14 rounded-3xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/30">
                            <ShieldCheck class="w-7 h-7" />
                        </div>
                        <div>
                            <p class="text-on-surface text-lg font-black">Access Control</p>
                            <div class="flex items-center gap-2 mt-1">
                                <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                <span class="text-[9px] font-black uppercase tracking-[0.15em] text-primary">
                                    4 Users • 2FA Enabled
                                </span>
                            </div>
                        </div>
                    </div>
                    <IntelligenceBadge label="Secure" variant="primary" pulse />
                </div>
            </SurfaceCard>
        </section>

        <!-- Team Members -->
        <section class="space-y-3">
            <div class="flex items-center justify-between px-1">
                <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">
                    Team Members
                </h3>
                <button
                    class="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider active:scale-95 transition-all">
                    <Plus class="w-3.5 h-3.5" />
                    Invite
                </button>
            </div>

            <div class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 overflow-hidden">
                <div v-for="(member, index) in teamMembers" :key="member.email" :class="[
                    'p-4 px-5 flex items-center justify-between cursor-pointer group transition-all hover:bg-surface-container-high/30 active:scale-[0.98]',
                    index !== teamMembers.length - 1 && 'border-b border-surface-container-high/20'
                ]">
                    <div class="flex items-center gap-4">
                        <div
                            :class="['w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-sm', member.color]">
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
                            <div class="flex items-center gap-2 mt-0.5">
                                <span class="text-[9px] font-bold text-on-surface-variant/40 truncate">{{
                                    member.warehouses.join(', ') }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 shrink-0">
                        <div class="text-right hidden">
                            <span :class="['text-[9px] font-black uppercase tracking-wider',
                                member.status === 'Active Now' ? 'text-primary' : 'text-on-surface-variant/40']">
                                {{ member.status }}
                            </span>
                        </div>
                        <ChevronRight
                            class="w-4 h-4 text-on-surface-variant/20 group-hover:text-primary transition-colors" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Role-Based Permissions -->
        <section class="space-y-3">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 px-1">
                Roles & Permissions
            </h3>

            <div class="grid grid-cols-3 gap-2.5">
                <div v-for="role in [
                    { name: 'Admin', icon: Crown, desc: 'Full access', count: 1, color: 'text-primary', bg: 'bg-primary/10 border-primary/15' },
                    { name: 'Manager', icon: UserCog, desc: 'Limited write', count: 1, color: 'text-tertiary', bg: 'bg-tertiary/10 border-tertiary/15' },
                    { name: 'Staff', icon: Users, desc: 'Read & bill', count: 2, color: 'text-secondary', bg: 'bg-secondary/10 border-secondary/15' }
                ]" :key="role.name"
                    :class="['p-4 rounded-3xl border flex flex-col gap-3 cursor-pointer active:scale-95 transition-all group', role.bg]">
                    <div class="flex items-center justify-between">
                        <component :is="role.icon" :class="['w-5 h-5', role.color]" />
                        <span
                            class="text-[9px] font-black text-on-surface-variant/40 bg-surface-container-highest/30 px-2 py-0.5 rounded-lg">
                            {{ role.count }}
                        </span>
                    </div>
                    <div>
                        <p :class="['text-sm font-black', role.color]">{{ role.name }}</p>
                        <p class="text-[9px] font-bold text-on-surface-variant/40 mt-0.5">{{ role.desc }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Per-Warehouse Permissions -->
        <section class="space-y-3">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 px-1">
                Warehouse Access
            </h3>

            <div class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 overflow-hidden">
                <div v-for="(wh, index) in [
                    { name: 'Mumbai HQ', users: 4, modules: ['Billing', 'Stock', 'Reports'], status: 'active' },
                    { name: 'Pune DC', users: 2, modules: ['Stock', 'Reports'], status: 'active' },
                    { name: 'Delhi Express', users: 0, modules: [], status: 'inactive' }
                ]" :key="wh.name" :class="[
                    'p-4 px-5 flex items-center justify-between cursor-pointer group transition-all hover:bg-surface-container-high/30',
                    index !== 2 && 'border-b border-surface-container-high/20'
                ]">
                    <div class="flex items-center gap-4">
                        <div
                            :class="['w-11 h-11 rounded-2xl flex items-center justify-center',
                                wh.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-surface-container-highest text-on-surface-variant/30']">
                            <Warehouse class="w-5 h-5" />
                        </div>
                        <div>
                            <h4 class="font-black text-on-surface text-sm">{{ wh.name }}</h4>
                            <div class="flex items-center gap-2 mt-0.5">
                                <span class="text-[9px] font-bold text-on-surface-variant/40">{{ wh.users }}
                                    users</span>
                                <span v-if="wh.modules.length" class="text-[9px] font-bold text-primary/50">•
                                    {{ wh.modules.join(', ') }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <ChevronRight
                        class="w-4 h-4 text-on-surface-variant/20 group-hover:text-primary transition-colors" />
                </div>
            </div>
        </section>

        <!-- 2FA / SSO Settings -->
        <section class="space-y-3">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 px-1">
                Authentication
            </h3>

            <div class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 overflow-hidden">
                <div v-for="(item, index) in [
                    { icon: Fingerprint, label: 'Two-Factor (2FA)', sub: 'TOTP authenticator app', model: mfa },
                    { icon: KeyRound, label: 'SSO / SAML', sub: 'Connect identity provider', model: sso },
                    { icon: Smartphone, label: 'Login Alerts', sub: 'Notify on new device', model: loginAlerts },
                    { icon: Lock, label: 'Auto-Lock', sub: 'Lock after 15m inactivity', model: appLock }
                ]" :key="item.label" :class="[
                    'p-4 px-5 flex items-center justify-between group transition-all',
                    index !== 3 && 'border-b border-surface-container-high/20'
                ]">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-11 h-11 rounded-2xl bg-surface-container-high/50 flex items-center justify-center text-on-surface group-hover:text-primary transition-colors">
                            <component :is="item.icon" class="w-5 h-5" />
                        </div>
                        <div>
                            <p class="font-black text-on-surface text-sm">{{ item.label }}</p>
                            <p class="text-[9px] font-bold text-on-surface-variant/40 mt-0.5">{{ item.sub }}</p>
                        </div>
                    </div>
                    <ToggleSwitch v-model="item.model"  />
                </div>
            </div>
        </section>

        <!-- Approval Workflows -->
        <section class="space-y-3">
            <div class="flex items-center justify-between px-1">
                <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">
                    Approval Workflows
                </h3>
                <button class="flex items-center gap-1.5 text-primary text-[9px] font-black uppercase tracking-wider">
                    <Plus class="w-3.5 h-3.5" />
                    New
                </button>
            </div>

            <div class="space-y-2.5">
                <div v-for="workflow in approvalWorkflows" :key="workflow.name"
                    class="bg-surface-container-low p-4 px-5 rounded-3xl border border-surface-container-high/30 cursor-pointer group hover:bg-surface-container-high/30 transition-all active:scale-[0.98]">
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center gap-3">
                            <GitBranch class="w-4 h-4 text-primary" />
                            <h4 class="font-black text-on-surface text-sm">{{ workflow.name }}</h4>
                        </div>
                        <span :class="['text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg',
                            workflow.status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-surface-container-highest text-on-surface-variant/40'
                        ]">{{ workflow.status }}</span>
                    </div>
                    <!-- Steps visualization -->
                    <div class="flex items-center gap-1">
                        <div v-for="(step, i) in workflow.steps" :key="step" class="flex items-center gap-1">
                            <div class="bg-surface-container-high/50 px-2.5 py-1 rounded-lg">
                                <span
                                    class="text-[8px] font-black text-on-surface-variant/60 uppercase tracking-wider">{{
                                        step }}</span>
                            </div>
                            <ChevronRight v-if="i !== workflow.steps.length - 1"
                                class="w-3 h-3 text-on-surface-variant/20 shrink-0" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Activity Logs -->
        <section class="space-y-3">
            <div class="flex items-center justify-between px-1">
                <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">
                    Activity Log
                </h3>
                <button class="text-[9px] font-black text-primary uppercase tracking-wider flex items-center gap-1">
                    <Eye class="w-3.5 h-3.5" />
                    View All
                </button>
            </div>

            <div class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 overflow-hidden">
                <div v-for="(log, index) in activityLogs" :key="index" :class="[
                    'p-4 px-5 flex items-start gap-4',
                    index !== activityLogs.length - 1 && 'border-b border-surface-container-high/20'
                ]">
                    <div :class="['w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5',
                        log.type === 'approve' ? 'bg-primary/10 text-primary' :
                            log.type === 'edit' ? 'bg-tertiary/10 text-tertiary' :
                                log.type === 'create' ? 'bg-secondary/10 text-secondary' :
                                    'bg-surface-container-highest text-on-surface-variant/50'
                    ]">
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

        <!-- Emergency Lock -->
        <section class="pb-4">
            <button
                class="w-full p-4 px-5 rounded-4xl bg-error/5 border border-error/10 flex items-center justify-between group hover:bg-error/10 transition-all active:scale-[0.98]">
                <div class="flex items-center gap-4">
                    <div class="w-11 h-11 rounded-2xl bg-error/10 flex items-center justify-center text-error">
                        <ShieldAlert class="w-5 h-5" />
                    </div>
                    <div class="text-left">
                        <span class="font-black text-error text-sm">Lock All Access</span>
                        <p class="text-[9px] font-bold text-error/40 mt-0.5">Emergency lockout for all staff</p>
                    </div>
                </div>
                <ChevronRight class="w-4 h-4 text-error/30" />
            </button>
        </section>
    </div>
</template>
