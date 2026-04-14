import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface User {
    id: number;
    name: string;
    phone: string;
    email?: string;
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const token = ref<string | null>(localStorage.getItem('cnq_token'));

    const isAuthenticated = computed(() => !!token.value);

    // Restore user from localStorage on init
    const storedUser = localStorage.getItem('cnq_user');
    if (storedUser) {
        try { user.value = JSON.parse(storedUser); } catch { /* ignore */ }
    }

    const login = (phone: string) => {
        // Mock: create user from phone
        const mockUser: User = {
            id: Date.now(),
            name: '',
            phone,
        };
        user.value = mockUser;
        token.value = `cnq_${Date.now()}_${Math.random().toString(36).slice(2)}`;
        localStorage.setItem('cnq_token', token.value);
        localStorage.setItem('cnq_user', JSON.stringify(mockUser));
    };

    const register = (name: string, phone: string) => {
        const mockUser: User = {
            id: Date.now(),
            name,
            phone,
        };
        user.value = mockUser;
        token.value = `cnq_${Date.now()}_${Math.random().toString(36).slice(2)}`;
        localStorage.setItem('cnq_token', token.value);
        localStorage.setItem('cnq_user', JSON.stringify(mockUser));
    };

    const logout = () => {
        user.value = null;
        token.value = null;
        localStorage.removeItem('cnq_token');
        localStorage.removeItem('cnq_user');
    };

    return { user, token, isAuthenticated, login, register, logout };
});
