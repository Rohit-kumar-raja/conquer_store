<script setup lang="ts">
import { ref, watch } from 'vue';
import Select from 'primevue/select';
import { User, UserPlus, ChevronRight, Search } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const router = useRouter();

interface UserType {
    name: string;
    phone: string;
    id: string;
}

const props = defineProps<{
    modelValue: UserType;
    users: UserType[];
}>();

const emit = defineEmits(['update:modelValue']);

const internalSelectedUser = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
    internalSelectedUser.value = newVal;
});

watch(internalSelectedUser, (newVal) => {
    emit('update:modelValue', newVal);
});
</script>

<template>
    <section class="animate-in fade-in slide-in-from-top-5 duration-500 delay-300">
        <Select v-model="internalSelectedUser" :options="users" filter optionLabel="name" placeholder="Select Customer"
            autofocus
            class="w-full h-18 rounded-4xl bg-primary/5  border-primary/10 flex items-center px-2 group transition-all"
            filter-placeholder="Search by Name or Phone..." :pt="{
                root: { class: 'focus:ring-2 focus:ring-primary/20 transition-all' },
                filterContainer: { class: 'relative flex items-center !border-none !shadow-none' },
                filterInput: { class: 'bg-surface-container-high rounded-2xl !border-none font-black text-xs !ring-0 h-12 pl-12 pr-4 placeholder:text-on-surface-variant/20 w-full transition-all focus:bg-surface-container-highest !shadow-none !outline-none' },
                filterIcon: { class: 'absolute left-4 top-1/2 -translate-y-1/2 z-10 text-primary w-5 h-5 pointer-events-none' },
                header: { class: 'bg-surface p-4 !border-none !shadow-none' },
                list: { class: 'p-2 space-y-1' },
                item: { class: 'rounded-2xl p-3 hover:bg-primary/10 transition-all cursor-pointer border border-transparent hover:border-primary/10' },
                content: { class: 'bg-surface/95 backdrop-blur-3xl border border-surface-container-highest  rounded-[2.5rem] overflow-hidden' }
            }">
            <template #filtericon>
                <Search class="w-5 h-5 text-primary" />
            </template>
            <template #value="slotProps">
                <div v-if="slotProps.value" class="flex items-center gap-4 pl-2">
                    <div
                        class="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                        <User class="w-6 h-6" />
                    </div>
                    <div class="flex flex-col text-left">
                        <h3
                            class="text-on-surface font-black text-xl leading-tight group-hover:text-primary transition-colors">
                            {{ slotProps.value.name }}</h3>
                        <p class="text-[9px] text-on-surface-variant font-bold uppercase tracking-[0.2em]">{{
                            slotProps.value.phone }}</p>
                    </div>
                </div>
            </template>
            <template #option="slotProps">
                <div class="flex items-center gap-4">
                    <div
                        class="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        <User class="w-6 h-6" />
                    </div>
                    <div class="flex flex-col">
                        <span class="font-black text-on-surface text-base tracking-tight leading-tight">{{
                            slotProps.option.name }}</span>
                        <span
                            class="text-[9px] font-black uppercase text-on-surface-variant/60 tracking-widest mt-0.5">{{
                                slotProps.option.phone }}</span>
                    </div>
                </div>
            </template>
            <template #emptyfilter>
                <div @click="router.push({ name: 'profile' })"
                    class="p-6 flex flex-col items-center justify-center gap-3 bg-primary/5 rounded-4xl border border-dashed border-primary/20 cursor-pointer hover:bg-primary/10 transition-all">
                    <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <UserPlus class="w-6 h-6" />
                    </div>
                    <div class="text-center">
                        <p class="text-sm font-black text-on-surface italic uppercase tracking-tight">Customer Not Found
                        </p>
                        <p class="text-[9px] font-bold text-primary uppercase tracking-widest mt-1">Create New Account?
                        </p>
                    </div>
                </div>
            </template>
            <template #dropdownicon>
                <div
                    class="w-10 h-10 rounded-xl bg-surface-container-highest/20 flex items-center justify-center text-on-surface-variant mr-1.5 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                    <ChevronRight class="w-5 h-5 rotate-90" />
                </div>
            </template>
        </Select>
    </section>
</template>
