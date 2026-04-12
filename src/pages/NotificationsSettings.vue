<script setup lang="ts">
import { Bell, Mail, Smartphone, MessageSquare, AlertTriangle, TrendingUp, Shield } from 'lucide-vue-next';
import { SurfaceCard } from '../components';
import InputSwitch from 'primevue/inputswitch';
import { ref } from 'vue';

const settings = ref({
    instock: true,
    sales: true,
    security: true,
    marketing: false
});
</script>

<template>
    <div class="px-6 py-8 space-y-8 pb-40">
        <div>
            <h2 class="text-3xl font-black text-on-surface">Alerts</h2>
            <p class="text-xs text-on-surface-variant font-bold uppercase tracking-widest mt-1">Manage your information
                flow</p>
        </div>

        <div class="space-y-6">
            <div class="space-y-4">
                <h3 class="text-xs font-black uppercase tracking-widest text-primary">Channel Preferences</h3>
                <SurfaceCard class="p-6 grid grid-cols-3 gap-4">
                    <button v-for="channel in [
                        { icon: Smartphone, label: 'Push', active: true },
                        { icon: Mail, label: 'Email', active: false },
                        { icon: MessageSquare, label: 'SMS', active: true }
                    ]" :key="channel.label" :class="[
                        'flex flex-col items-center gap-2 p-4 rounded-2xl transition-all',
                        channel.active ? 'bg-primary/5 text-primary border border-primary/20 shadow-sm shadow-primary/10' : 'bg-surface-container-high text-on-surface-variant grayscale'
                    ]">
                        <component :is="channel.icon" class="w-6 h-6" />
                        <span class="text-[10px] font-black uppercase tracking-widest">{{ channel.label }}</span>
                    </button>
                </SurfaceCard>
            </div>

            <div class="space-y-4">
                <h3 class="text-xs font-black uppercase tracking-widest text-primary">Notification Types</h3>
                <SurfaceCard class="p-4 space-y-2">
                    <div v-for="(val, key) in settings" :key="key"
                        class="flex items-center justify-between p-3 hover:bg-surface-container-high rounded-2xl transition-colors">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center">
                                <component
                                    :is="key === 'instock' ? AlertTriangle : key === 'sales' ? TrendingUp : key === 'security' ? Shield : Bell"
                                    class="w-5 h-5 text-on-surface" />
                            </div>
                            <div>
                                <p class="text-sm font-bold capitalize text-on-surface">{{ key.replace('instock', 
                                'Low Stock') }}</p>
                                <p class="text-[10px] font-medium text-on-surface-variant uppercase">Critical updates
                                    only</p>
                            </div>
                        </div>
                        <ToggleButton v-model="settings[key]" />
                    </div>
                </SurfaceCard>
            </div>
        </div>
    </div>
</template>
