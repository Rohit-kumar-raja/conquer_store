<script setup lang="ts">
import { Crown, UserCog, Users } from 'lucide-vue-next';

defineProps<{
    adminCount: number;
    managerCount: number;
    staffCount: number;
}>();
</script>

<template>
    <section class="space-y-3">
        <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 px-1">
            Roles & Permissions
        </h3>

        <div class="grid grid-cols-3 gap-2.5">
            <div v-for="role in [
                { name: 'Admin', icon: Crown, desc: 'Full access', count: adminCount, color: 'text-primary', bg: 'bg-primary/10 border-primary/15' },
                { name: 'Manager', icon: UserCog, desc: 'Limited write', count: managerCount, color: 'text-tertiary', bg: 'bg-tertiary/10 border-tertiary/15' },
                { name: 'Staff', icon: Users, desc: 'Read & bill', count: staffCount, color: 'text-secondary', bg: 'bg-secondary/10 border-secondary/15' }
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
</template>
