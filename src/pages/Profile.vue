<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Camera,
    Check,
    Briefcase,
    Shield,
    BadgeCheck
} from 'lucide-vue-next';
import { SurfaceCard, Button, Input, IntelligenceBadge } from '../components';

const router = useRouter();
</script>

<template>
    <div class="space-y-0 pb-40 min-h-screen bg-surface-container-lowest">
        <!-- Dramatic Header -->
        <div class="relative h-64 overflow-hidden">
            <div class="absolute inset-0 bg-primary-gradient opacity-10"></div>
            <div
                class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent">
            </div>

            <div class="absolute bottom-0 left-0 right-0 p-8 flex items-end gap-6 translate-y-8">
                <div class="relative group">
                    <div class="w-32 h-32 rounded-[2.5rem] bg-surface-container-lowest p-1.5 shadow-2xl relative z-10">
                        <div
                            class="w-full h-full rounded-[2.1rem] overflow-hidden bg-primary-container ring-1 ring-surface-container-high">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBif5fpPe2EEqcu1ZbteVYNAjet40-NQX_9ALU7bOEoVni_wOLgEGq_y0CJe3MNfL2hRmEYipcFLWOuMQ0rejCioXBghLEXIihmEqtGwntNvoT5d6g2CXCWpio-h7vlr0bEiYLz4OJ-u6AR8yughIppTKA9RL3VWkkeCINs9vUhzN3x99cxP90I6AKowti-_xTGW6rWtdaNaiRjO6S4HVzcvNTWdz_w7No0jl1r5dHW8APEHcc4HJJv2QLj_u62NoxmmXCCHuwZ"
                                alt="Profile"
                                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                    </div>
                    <button
                        class="absolute -bottom-2 -right-2 z-20 p-3 bg-primary text-white rounded-2xl shadow-xl border-4 border-surface-container-lowest hover:scale-110 active:scale-95 transition-all">
                        <Camera class="w-5 h-5" />
                    </button>
                </div>

                <div class="pb-10 flex-1">
                    <div class="flex items-center gap-2 mb-1">
                        <IntelligenceBadge label="Verified Executive" variant="primary" small />
                        <div class="flex items-center gap-1 text-primary">
                            <BadgeCheck class="w-4 h-4 fill-primary/10" />
                        </div>
                    </div>
                    <h2 class="text-4xl font-black text-on-surface tracking-tight">Raaj Kumar</h2>
                    <p class="text-sm font-bold text-on-surface-variant/70 uppercase tracking-widest mt-1 italic">
                        Conquer Nexus Hub • Mumbai</p>
                </div>
            </div>
        </div>

        <div class="px-8 mt-12 space-y-10">
            <!-- Information Grid -->
            <section class="space-y-6">
                <div class="flex items-center justify-between">
                    <h3 class="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/50">Core Identity
                    </h3>
                    <div class="h-px flex-1 bg-surface-container-high mx-4"></div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Full Name" value="Raaj Kumar" container-class="bg-surface-container-low/50">
                        <template #icon>
                            <User class="w-5 h-5" />
                        </template>
                    </Input>
                    <Input label="Email Address" value="raaj@nexus.inc" container-class="bg-surface-container-low/50">
                        <template #icon>
                            <Mail class="w-5 h-5" />
                        </template>
                    </Input>
                    <Input label="Phone Number" value="+91 98765 43210" container-class="bg-surface-container-low/50">
                        <template #icon>
                            <Phone class="w-5 h-5" />
                        </template>
                    </Input>
                    <Input label="Business Location" value="Mumbai, India"
                        container-class="bg-surface-container-low/50">
                        <template #icon>
                            <MapPin class="w-5 h-5" />
                        </template>
                    </Input>
                </div>
            </section>

            <!-- Roles & Permissions -->
            <section class="space-y-6">
                <div class="flex items-center justify-between">
                    <h3 class="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/50">Access
                        Hierarchy</h3>
                    <div class="h-px flex-1 bg-surface-container-high mx-4"></div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SurfaceCard variant="low" class="p-5 flex items-center justify-between border border-primary/10">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                                <Shield class="w-6 h-6" />
                            </div>
                            <div>
                                <p class="font-bold text-on-surface">Owner Account</p>
                                <p class="text-[10px] font-black uppercase tracking-widest text-primary">Full Control
                                </p>
                            </div>
                        </div>
                        <Check class="w-5 h-5 text-primary" />
                    </SurfaceCard>

                    <SurfaceCard variant="low" class="p-5 flex items-center justify-between opacity-60">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
                                <Briefcase class="w-6 h-6" />
                            </div>
                            <div>
                                <p class="font-bold text-on-surface">Administrator</p>
                                <p class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                                    System Access
                                </p>
                            </div>
                        </div>
                        <Check class="w-5 h-5 text-on-surface-variant/30" />
                    </SurfaceCard>
                </div>
            </section>
        </div>

        <!-- Footer Action -->
        <div class="fixed bottom-10 left-8 right-8 z-50">
            <Button class="w-full shadow-2xl shadow-primary/30 border-4 border-surface" size="xl">
                Update Identity
            </Button>
        </div>
    </div>
</template>
