<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Camera,
    Check
} from 'lucide-vue-next';
import { SurfaceCard, Button, Input } from '../components';

const router = useRouter();
</script>

<template>
    <div class="px-6 py-8 space-y-8 pb-40">
        <div class="flex items-center gap-4">
            <div class="relative">
                <div
                    class="w-24 h-24 rounded-4xl bg-primary-container overflow-hidden border-4 border-surface shadow-xl">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBif5fpPe2EEqcu1ZbteVYNAjet40-NQX_9ALU7bOEoVni_wOLgEGq_y0CJe3MNfL2hRmEYipcFLWOuMQ0rejCioXBghLEXIihmEqtGwntNvoT5d6g2CXCWpio-h7vlr0bEiYLz4OJ-u6AR8yughIppTKA9RL3VWkkeCINs9vUhzN3x99cxP90I6AKowti-_xTGW6rWtdaNaiRjO6S4HVzcvNTWdz_w7No0jl1r5dHW8APEHcc4HJJv2QLj_u62NoxmmXCCHuwZ"
                        alt="Profile" class="w-full h-full object-cover" />
                </div>
                <button
                    class="absolute -bottom-2 -right-2 p-2 bg-primary text-white rounded-2xl shadow-lg border-4 border-surface">
                    <Camera class="w-4 h-4" />
                </button>
            </div>
            <div>
                <h2 class="text-2xl font-black text-on-surface">Raaj Kumar</h2>
                <p class="text-[10px] font-bold uppercase tracking-widest text-primary">Chief Executive • Premium</p>
            </div>
        </div>

        <div class="space-y-6">
            <Input label="Full Name" value="Raaj Kumar">
                <template #icon>
                    <User class="w-5 h-5" />
                </template>
            </Input>
            <Input label="Email Address" value="raaj@nexus.inc">
                <template #icon>
                    <Mail class="w-5 h-5" />
                </template>
            </Input>
            <Input label="Phone Number" value="+91 98765 43210">
                <template #icon>
                    <Phone class="w-5 h-5" />
                </template>
            </Input>
            <Input label="Business Location" value="Mumbai, India">
                <template #icon>
                    <MapPin class="w-5 h-5" />
                </template>
            </Input>
        </div>

        <div class="space-y-4">
            <h3 class="text-sm font-black uppercase tracking-widest text-on-surface-variant">Active Roles</h3>
            <div class="flex flex-wrap gap-2">
                <div class="px-4 py-2 bg-primary/5 border border-primary/20 rounded-2xl flex items-center gap-2">
                    <Check class="w-4 h-4 text-primary" />
                    <span class="text-xs font-bold text-on-surface">Owner</span>
                </div>
                <div class="px-4 py-2 bg-surface-container-high rounded-2xl flex items-center gap-2">
                    <Check class="w-4 h-4 text-on-surface-variant" />
                    <span class="text-xs font-bold text-on-surface-variant">Admin</span>
                </div>
            </div>
        </div>

        <Button class="w-full" size="xl">Update Identity</Button>
    </div>
</template>
