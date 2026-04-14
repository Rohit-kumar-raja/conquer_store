<script setup lang="ts">
import { useRoute } from 'vue-router';
import TheHeader from '../components/TheHeader.vue';
import TheBottomNav from '../components/TheBottomNav.vue';

const route = useRoute();
</script>

<template>
    <div class="min-h-screen bg-surface flex flex-col">
        <TheHeader v-if="route.name !== 'scanner'" />

        <!-- Main Content -->
        <main :class="['grow max-w-md mx-auto w-full', route.name !== 'scanner' ? 'pb-32' : '']">
            <router-view v-slot="{ Component }">
                <transition name="fade-slide" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </main>

        <TheBottomNav v-if="route.name !== 'scanner'" />
    </div>
</template>
