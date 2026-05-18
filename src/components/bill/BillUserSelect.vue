<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Select from 'primevue/select';
import { Check, User, UserPlus, ChevronRight, Search } from 'lucide-vue-next';

interface UserType {
    name: string;
    phone: string;
    id: string;
}

const props = defineProps<{
    modelValue: UserType;
    users: UserType[];
}>();

const emit = defineEmits(['update:modelValue', 'createUser']);

const internalSelectedUser = ref(props.modelValue);
const searchQuery = ref('');
const formName = ref('');
const formPhone = ref('');
const showCreateSheet = ref(false);

const normalizedSearch = computed(() => searchQuery.value.trim().toLowerCase());
const hasMatchingUser = computed(() => {
    if (!normalizedSearch.value) return true;

    return props.users.some((user) =>
        user.name.toLowerCase().includes(normalizedSearch.value) ||
        user.phone.replace(/\s/g, '').includes(normalizedSearch.value.replace(/\s/g, ''))
    );
});

const shouldShowCreateForm = computed(() => !!normalizedSearch.value && !hasMatchingUser.value);

watch(() => props.modelValue, (newVal) => {
    internalSelectedUser.value = newVal;
});

watch(internalSelectedUser, (newVal) => {
    emit('update:modelValue', newVal);
});

const handleFilter = (event: { value?: string }) => {
    searchQuery.value = event.value || '';

    const digits = searchQuery.value.replace(/\D/g, '');
    if (digits.length >= 5) {
        formPhone.value = searchQuery.value;
        if (!formName.value) formName.value = '';
        return;
    }

    formName.value = searchQuery.value;
};

watch(shouldShowCreateForm, (shouldShow) => {
    if (shouldShow) {
        showCreateSheet.value = true;
    }
});

const createCustomer = () => {
    if (!formName.value.trim() || !formPhone.value.trim()) return;

    const newUser: UserType = {
        id: `cus-${Date.now()}`,
        name: formName.value.trim(),
        phone: formPhone.value.trim()
    };

    emit('createUser', newUser);
    internalSelectedUser.value = newUser;
    searchQuery.value = '';
    formName.value = '';
    formPhone.value = '';
    showCreateSheet.value = false;
};

const closeCreateSheet = () => {
    showCreateSheet.value = false;
};
</script>

<template>
    <section>
        <Select v-model="internalSelectedUser" :options="users" filter optionLabel="name" placeholder="Select Customer"
            autofocus @filter="handleFilter"
            class="w-full h-16 rounded-4xl bg-surface-container-low border border-surface-container-high/30 flex items-center px-2 group transition-all"
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
                <div v-if="slotProps.value" class="flex items-center gap-3 pl-2 min-w-0">
                    <div
                        class="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 shrink-0">
                        <User class="w-5 h-5" />
                    </div>
                    <div class="flex flex-col text-left min-w-0">
                        <h3 class="text-on-surface font-black text-sm leading-tight truncate">
                            {{ slotProps.value.name }}</h3>
                        <p class="text-[9px] text-on-surface-variant/45 font-bold uppercase tracking-[0.16em] truncate">{{
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
                <div
                    class="p-5 flex flex-col items-center justify-center gap-3 bg-primary/5 rounded-4xl border border-dashed border-primary/20">
                    <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <UserPlus class="w-6 h-6" />
                    </div>
                    <div class="text-center">
                        <p class="text-sm font-black text-on-surface uppercase tracking-tight">Customer Not Found</p>
                        <p class="text-[9px] font-bold text-primary uppercase tracking-widest mt-1">Use form below</p>
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

        <Teleport to="body">
            <Transition name="fade">
                <div v-if="showCreateSheet" class="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
                    @click="closeCreateSheet"></div>
            </Transition>

            <Transition name="slide-up">
                <div v-if="showCreateSheet" class="fixed bottom-0 left-0 right-0 z-[101] max-w-md mx-auto">
                    <div
                        class="bg-surface-container-lowest rounded-t-[2rem] shadow-2xl border-t border-surface-container-high/30 p-5 space-y-4">
                        <div class="flex justify-center">
                            <div class="w-10 h-1 rounded-full bg-on-surface-variant/15"></div>
                        </div>

                        <div class="flex items-center justify-between gap-4">
                            <div class="flex items-center gap-3">
                                <div class="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                    <UserPlus class="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 class="text-base font-black text-on-surface">Create Customer</h3>
                                    <p class="text-[9px] font-bold text-on-surface-variant/45 uppercase tracking-wider">
                                        Add name and number only
                                    </p>
                                </div>
                            </div>
                            <button @click="closeCreateSheet"
                                class="w-9 h-9 rounded-xl bg-surface-container-high/60 text-on-surface-variant flex items-center justify-center">
                                <ChevronRight class="w-5 h-5 rotate-90" />
                            </button>
                        </div>

                        <div class="grid grid-cols-1 gap-3">
                            <input v-model="formName" type="text" placeholder="Customer name"
                                class="w-full bg-surface-container-high/50 text-on-surface rounded-2xl px-4 py-3 text-sm font-bold placeholder:text-on-surface-variant/30 outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                            <input v-model="formPhone" type="tel" placeholder="Phone number"
                                class="w-full bg-surface-container-high/50 text-on-surface rounded-2xl px-4 py-3 text-sm font-bold placeholder:text-on-surface-variant/30 outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                        </div>

                        <button @click="createCustomer"
                            class="w-full h-12 rounded-2xl bg-primary text-white flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest active:scale-95 transition-all disabled:opacity-40"
                            :disabled="!formName.trim() || !formPhone.trim()">
                            <Check class="w-4 h-4" />
                            Create & Select
                        </button>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </section>
</template>
