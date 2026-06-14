<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import {
    BadgeCheck, Briefcase, Calendar, Camera, Check, Crown, Edit3, LoaderCircle,
    Mail, MapPin, Phone, Shield, Store, User, X
} from 'lucide-vue-next';
import { ownerApi } from '../services/ownerApi';
import { resolveApiAssetUrl } from '../services/apiClient';
import { useAuthStore } from '../stores/useAuthStore';
import { useShopStore } from '../stores/useShopStore';
import type { OwnerProfile } from '../types/owner';

const authStore = useAuthStore();
const shopStore = useShopStore();
const toast = useToast();
const profile = ref<OwnerProfile | null>(null);
const loading = ref(true);
const saving = ref(false);
const uploadingAvatar = ref(false);
const editing = ref(false);
const error = ref('');
const avatarInput = ref<HTMLInputElement | null>(null);
const form = reactive({ firstName: '', lastName: '', email: '' });

const fullName = computed(() => {
    const name = [profile.value?.first_name, profile.value?.last_name].filter(Boolean).join(' ');
    return name || authStore.user?.name || 'Store Owner';
});
const initials = computed(() => fullName.value.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase());
const avatarUrl = computed(() => resolveApiAssetUrl(profile.value?.avatar || authStore.user?.avatar));
const displayEmail = computed(() => {
    const email = profile.value?.email || '';
    return email.endsWith('@firebase.local') ? 'Not set' : email;
});
const contactItems = computed(() => [
    { icon: User, label: 'Full Name', value: fullName.value },
    { icon: Mail, label: 'Email', value: displayEmail.value || 'Not set' },
    { icon: Phone, label: 'Verified Phone', value: profile.value?.phone || authStore.user?.phone || 'Not available' },
]);
const businessItems = computed(() => [
    { icon: Store, label: 'Business Name', value: shopStore.selectedShop.name },
    { icon: Briefcase, label: 'Store Code', value: shopStore.selectedShop.code },
    { icon: MapPin, label: 'Location', value: shopStore.selectedShop.location },
]);

const syncForm = () => {
    form.firstName = profile.value?.first_name || '';
    form.lastName = profile.value?.last_name || '';
    form.email = displayEmail.value === 'Not set' ? '' : displayEmail.value;
};

const loadProfile = async () => {
    loading.value = true;
    error.value = '';
    try {
        profile.value = await ownerApi.getProfile();
        syncForm();
    } catch (cause) {
        error.value = cause instanceof Error ? cause.message : 'Unable to load owner profile.';
    } finally {
        loading.value = false;
    }
};

const openEditor = () => {
    syncForm();
    editing.value = true;
    error.value = '';
};

const saveProfile = async () => {
    if (!form.firstName.trim() || saving.value) return;
    saving.value = true;
    error.value = '';
    try {
        profile.value = await ownerApi.updateProfile({
            first_name: form.firstName.trim(),
            last_name: form.lastName.trim() || undefined,
            email: form.email.trim() || undefined,
        });
        authStore.updateStoredUser({
            name: [profile.value.first_name, profile.value.last_name].filter(Boolean).join(' '),
            email: displayEmail.value === 'Not set' ? undefined : displayEmail.value,
        });
        editing.value = false;
        toast.add({ severity: 'success', summary: 'Profile Updated', detail: 'Owner details saved successfully.', life: 2500 });
    } catch (cause) {
        error.value = cause instanceof Error ? cause.message : 'Unable to update owner profile.';
    } finally {
        saving.value = false;
    }
};

const chooseAvatar = () => {
    if (!uploadingAvatar.value) avatarInput.value?.click();
};

const uploadAvatar = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        toast.add({ severity: 'error', summary: 'Invalid Image', detail: 'Choose a JPEG, PNG, or WebP image.', life: 3000 });
        return;
    }
    if (file.size > 5 * 1024 * 1024) {
        toast.add({ severity: 'error', summary: 'Image Too Large', detail: 'Profile images must be 5 MB or smaller.', life: 3000 });
        return;
    }

    uploadingAvatar.value = true;
    try {
        profile.value = await ownerApi.uploadAvatar(file);
        authStore.updateStoredUser({ avatar: profile.value.avatar || undefined });
        toast.add({ severity: 'success', summary: 'Photo Updated', detail: 'Your profile image has been saved.', life: 2500 });
    } catch (cause) {
        toast.add({
            severity: 'error',
            summary: 'Upload Failed',
            detail: cause instanceof Error ? cause.message : 'Unable to upload profile image.',
            life: 3500,
        });
    } finally {
        uploadingAvatar.value = false;
    }
};

onMounted(loadProfile);
</script>

<template>
    <div class="px-5 pt-2 space-y-6 pb-40 max-w-md mx-auto">
        <div v-if="loading" class="min-h-[55vh] flex flex-col items-center justify-center gap-3 text-primary">
            <LoaderCircle class="w-7 h-7 animate-spin" />
            <p class="text-xs font-black uppercase tracking-wider">Loading owner profile</p>
        </div>

        <template v-else>
            <div v-if="error && !profile" class="p-5 rounded-3xl bg-error/10 text-error text-sm font-bold">
                <p>{{ error }}</p>
                <button class="mt-3 text-xs font-black uppercase" @click="loadProfile">Try again</button>
            </div>

            <template v-else>
                <section class="flex flex-col items-center text-center pt-4">
                    <div class="relative">
                        <div class="w-24 h-24 rounded-[1.8rem] bg-primary flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-primary/20 ring-4 ring-surface-container-lowest overflow-hidden">
                            <img v-if="avatarUrl" :src="avatarUrl" :alt="fullName" class="w-full h-full object-cover" />
                            <span v-else>{{ initials }}</span>
                        </div>
                        <button type="button" :disabled="uploadingAvatar" @click="chooseAvatar"
                            class="absolute -bottom-1.5 -right-1.5 w-10 h-10 bg-primary text-white rounded-xl shadow-lg border-3 border-surface-container-lowest flex items-center justify-center active:scale-90 transition-all disabled:opacity-70">
                            <LoaderCircle v-if="uploadingAvatar" class="w-4 h-4 animate-spin" />
                            <Camera v-else class="w-4 h-4" />
                        </button>
                        <input ref="avatarInput" type="file" accept="image/jpeg,image/png,image/webp" class="hidden"
                            @change="uploadAvatar" />
                    </div>
                    <div class="mt-4 space-y-1">
                        <div class="flex items-center justify-center gap-2">
                            <h2 class="text-2xl font-black text-on-surface tracking-tight">{{ fullName }}</h2>
                            <BadgeCheck v-if="profile?.is_verified" class="w-5 h-5 text-primary fill-primary/10" />
                        </div>
                        <p class="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-[0.2em]">
                            {{ shopStore.selectedShop.name }} • {{ shopStore.selectedShop.location }}
                        </p>
                        <span class="inline-flex mt-2 text-[8px] font-black uppercase tracking-wider bg-primary/10 text-primary px-2.5 py-1 rounded-lg items-center gap-1">
                            <Crown class="w-3 h-3" /> Owner
                        </span>
                    </div>
                </section>

                <section class="grid grid-cols-3 gap-3">
                    <div class="bg-surface-container-low rounded-3xl p-4 text-center border border-surface-container-high/20">
                        <Store class="w-5 h-5 text-primary mx-auto mb-2" />
                        <p class="text-lg font-black text-on-surface">{{ shopStore.shops.length }}</p>
                        <p class="text-[8px] font-black text-on-surface-variant/40 uppercase tracking-wider">Stores</p>
                    </div>
                    <div class="bg-surface-container-low rounded-3xl p-4 text-center border border-surface-container-high/20">
                        <Shield class="w-5 h-5 text-tertiary mx-auto mb-2" />
                        <p class="text-lg font-black text-on-surface">Full</p>
                        <p class="text-[8px] font-black text-on-surface-variant/40 uppercase tracking-wider">Access</p>
                    </div>
                    <div class="bg-surface-container-low rounded-3xl p-4 text-center border border-surface-container-high/20">
                        <Calendar class="w-5 h-5 text-secondary mx-auto mb-2" />
                        <p class="text-lg font-black text-on-surface">Active</p>
                        <p class="text-[8px] font-black text-on-surface-variant/40 uppercase tracking-wider">Account</p>
                    </div>
                </section>

                <section v-for="section in [
                    { title: 'Contact Details', items: contactItems },
                    { title: 'Active Business', items: businessItems },
                ]" :key="section.title" class="space-y-3">
                    <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 px-1">{{ section.title }}</h3>
                    <div class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 overflow-hidden">
                        <div v-for="(item, index) in section.items" :key="item.label"
                            :class="['p-4 px-5 flex items-center gap-4', index !== section.items.length - 1 && 'border-b border-surface-container-high/20']">
                            <div class="w-10 h-10 rounded-xl bg-surface-container-high/50 flex items-center justify-center text-on-surface-variant/60">
                                <component :is="item.icon" class="w-4.5 h-4.5" />
                            </div>
                            <div class="min-w-0">
                                <p class="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-wider">{{ item.label }}</p>
                                <p class="font-black text-on-surface text-sm mt-0.5 truncate">{{ item.value }}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <button @click="openEditor" class="w-full p-4 rounded-3xl bg-primary text-white flex items-center justify-center gap-3 font-black text-sm uppercase tracking-wider shadow-xl shadow-primary/20 active:scale-[0.97] transition-all">
                    <Edit3 class="w-5 h-5" /> Edit Profile
                </button>
            </template>
        </template>

        <Teleport to="body">
            <div v-if="editing" class="fixed inset-0 z-[110] bg-black/45 backdrop-blur-sm" @click="editing = false"></div>
            <div v-if="editing" class="fixed bottom-0 left-0 right-0 z-[111] max-w-md mx-auto bg-surface-container-lowest rounded-t-[2rem] p-6 pb-10 shadow-2xl">
                <div class="flex items-center justify-between mb-5">
                    <div>
                        <h2 class="text-xl font-black text-on-surface">Edit Owner Profile</h2>
                        <p class="text-[10px] font-bold text-on-surface-variant/50">Your phone remains Firebase verified</p>
                    </div>
                    <button @click="editing = false" class="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center"><X class="w-4 h-4" /></button>
                </div>
                <form class="space-y-3" @submit.prevent="saveProfile">
                    <div class="grid grid-cols-2 gap-3">
                        <input v-model="form.firstName" required placeholder="First name" class="min-w-0 bg-surface-container-high text-on-surface rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30" />
                        <input v-model="form.lastName" placeholder="Last name" class="min-w-0 bg-surface-container-high text-on-surface rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <input v-model="form.email" type="email" placeholder="Email address" class="w-full bg-surface-container-high text-on-surface rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30" />
                    <div class="w-full bg-surface-container-low rounded-2xl px-4 py-3">
                        <p class="text-[9px] font-black uppercase tracking-wider text-on-surface-variant/40">Verified Phone</p>
                        <p class="text-sm font-black text-on-surface mt-0.5">{{ profile?.phone || authStore.user?.phone }}</p>
                    </div>
                    <p v-if="error" class="text-xs font-bold text-error">{{ error }}</p>
                    <button type="submit" :disabled="saving || !form.firstName.trim()" class="w-full bg-primary text-white py-4 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50">
                        <LoaderCircle v-if="saving" class="w-4 h-4 animate-spin" />
                        <Check v-else class="w-4 h-4" />
                        {{ saving ? 'Saving...' : 'Save Profile' }}
                    </button>
                </form>
            </div>
        </Teleport>
    </div>
</template>
