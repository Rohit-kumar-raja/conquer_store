<script setup lang="ts">
</script>

<template>
    <div class="min-h-screen bg-surface flex flex-col">
        <router-view v-slot="{ Component }">
            <transition name="fade-slide" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>
