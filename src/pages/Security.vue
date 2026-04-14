<script setup lang="ts">
import { ref } from 'vue';
import { ShieldCheck, ShieldAlert, ChevronRight } from 'lucide-vue-next';
import { SurfaceCard, IntelligenceBadge } from '../components';

import SecurityTeamMembers from '../components/security/SecurityTeamMembers.vue';
import SecurityRoles from '../components/security/SecurityRoles.vue';
import SecurityWarehouseAccess from '../components/security/SecurityWarehouseAccess.vue';
import SecurityAuthentication from '../components/security/SecurityAuthentication.vue';
import SecurityWorkflows from '../components/security/SecurityWorkflows.vue';
import SecurityActivityLogs from '../components/security/SecurityActivityLogs.vue';

const teamRef = ref<InstanceType<typeof SecurityTeamMembers> | null>(null);
</script>

<template>
    <div class="px-5 pt-2 space-y-6 pb-40 max-w-md mx-auto">

        <!-- Security Status Card -->
        <section>
            <SurfaceCard variant="low" class="p-5 bg-primary/5 border border-primary/15 relative overflow-hidden">
                <div class="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
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
                                    {{ teamRef?.members?.length || 0 }} Users • 2FA Enabled
                                </span>
                            </div>
                        </div>
                    </div>
                    <IntelligenceBadge label="Secure" variant="primary" pulse />
                </div>
            </SurfaceCard>
        </section>

        <SecurityTeamMembers ref="teamRef" />

        <SecurityRoles :admin-count="teamRef?.adminCount || 0" :manager-count="teamRef?.managerCount || 0"
            :staff-count="teamRef?.staffCount || 0" />

        <SecurityWarehouseAccess />

        <SecurityAuthentication />

        <SecurityWorkflows />

        <SecurityActivityLogs />

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
