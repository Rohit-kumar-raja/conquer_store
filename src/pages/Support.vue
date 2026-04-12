<script setup lang="ts">
import { MessageCircle, BookOpen, Video, PhoneCall, ExternalLink, Globe } from 'lucide-vue-next';
import { SurfaceCard, Button } from '../components';
</script>

<template>
    <div class="px-6 py-8 space-y-8 pb-40">
        <div>
            <h2 class="text-3xl font-black text-on-surface">Support</h2>
            <p class="text-xs text-on-surface-variant font-bold uppercase tracking-widest mt-1">Direct access to the
                experts</p>
        </div>

        <div class="grid grid-cols-1 gap-4">
            <SurfaceCard
                class="bg-primary p-6 flex items-center justify-between group cursor-pointer active:scale-[0.98] transition-all">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                        <MessageCircle class="w-6 h-6" />
                    </div>
                    <div>
                        <p class="text-white font-black text-lg">Live Chat</p>
                        <p class="text-white/60 text-[10px] font-black uppercase tracking-widest">Wait time: < 2
                                mins</p>
                    </div>
                </div>
                <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <ExternalLink class="w-4 h-4" />
                </div>
            </SurfaceCard>

            <div class="grid grid-cols-2 gap-4">
                <SurfaceCard v-for="item in [
                    { icon: BookOpen, label: 'Docs', sub: 'Guides' },
                    { icon: Video, label: 'Tutorials', sub: 'Master' },
                    { icon: PhoneCall, label: 'Call', sub: 'Priority' },
                    { icon: Globe, label: 'Portal', sub: 'Support' }
                ]" :key="item.label"
                    class="p-4 flex flex-col gap-4 group cursor-pointer hover:bg-surface-container-high transition-all">
                    <div
                        class="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-white transition-all">
                        <component :is="item.icon" class="w-5 h-5" />
                    </div>
                    <div>
                        <p
                            class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">
                            {{ item.sub }}</p>
                        <p class="text-sm font-bold text-on-surface">{{ item.label }}</p>
                    </div>
                </SurfaceCard>
            </div>
        </div>

        <div class="space-y-4">
            <h3 class="text-sm font-black uppercase tracking-widest text-on-surface-variant">Popular Topics</h3>
            <div class="space-y-2">
                <div v-for="topic in ['How to add multi-inventory?', 'Configuring VAT for Mumbai', 'Printing on Thermal labels', 'Staff permission levels']"
                    :key="topic"
                    class="p-4 bg-surface-container rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-primary/5 transition-all">
                    <span
                        class="text-xs font-bold text-on-surface-variant group-hover:text-on-surface transition-colors">{{
                        topic }}</span>
                    <ChevronRight class="w-4 h-4 text-on-surface-variant" />
                </div>
            </div>
        </div>
    </div>
</template>
