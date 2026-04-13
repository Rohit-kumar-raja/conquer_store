<script setup lang="ts">
import TheHeader from '../components/TheHeader.vue';
import TheBottomNav from '../components/TheBottomNav.vue';
</script>

<template>
    <div class="min-h-screen bg-surface flex flex-col">
        <TheHeader />

        <!-- Main Content -->
        <main class="grow pb-24 max-w-md mx-auto w-full">
            <router-view v-slot="{ Component }">
                <transition name="fade-slide" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </main>

        <TheBottomNav />
    </div>
</template>
