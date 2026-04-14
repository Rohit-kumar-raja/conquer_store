import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', () => {
    const isDark = ref(localStorage.getItem('theme') === 'dark');

    const applyTheme = () => {
        if (isDark.value) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const toggleTheme = () => {
        isDark.value = !isDark.value;
    };

    watch(isDark, (val) => {
        localStorage.setItem('theme', val ? 'dark' : 'light');
        applyTheme();
    }, { immediate: true });

    return { isDark, toggleTheme, applyTheme };
});
