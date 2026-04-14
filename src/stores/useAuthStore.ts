import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { sendOtp as firebaseSendOtp, verifyOtp as firebaseVerifyOtp, firebaseSignOut } from '../services/firebaseAuth';

export interface User {
    id: string;
    name: string;
    phone: string;
    uid?: string;
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const token = ref<string | null>(localStorage.getItem('cnq_token'));
    const loading = ref(false);
    const error = ref<string | null>(null);

    const isAuthenticated = computed(() => !!token.value);

    // Restore user from localStorage on init
    const storedUser = localStorage.getItem('cnq_user');
    if (storedUser) {
        try { user.value = JSON.parse(storedUser); } catch { /* ignore */ }
    }

    /**
     * Send OTP to phone number via Firebase
     */
    const sendOtp = async (phoneNumber: string) => {
        loading.value = true;
        error.value = null;
        try {
            await firebaseSendOtp(phoneNumber);
        } catch (e: any) {
            error.value = e?.message || 'Failed to send OTP';
            throw e;
        } finally {
            loading.value = false;
        }
    };

    /**
     * Verify OTP and sign in
     * Returns whether user is new (needs registration)
     */
    const verifyOtp = async (otpCode: string, phone: string): Promise<boolean> => {
        loading.value = true;
        error.value = null;
        try {
            const firebaseUser = await firebaseVerifyOtp(otpCode);

            // Store Firebase token
            const idToken = await firebaseUser.getIdToken();
            token.value = idToken;
            localStorage.setItem('cnq_token', idToken);

            // Check if user has display name (existing vs new)
            const isNewUser = !firebaseUser.displayName;

            if (!isNewUser) {
                // Existing user — restore profile
                user.value = {
                    id: firebaseUser.uid,
                    name: firebaseUser.displayName || '',
                    phone,
                    uid: firebaseUser.uid,
                };
                localStorage.setItem('cnq_user', JSON.stringify(user.value));
            }

            return isNewUser;
        } catch (e: any) {
            error.value = e?.message || 'Invalid OTP';
            throw e;
        } finally {
            loading.value = false;
        }
    };

    /**
     * Complete registration for new user
     */
    const register = (name: string, phone: string) => {
        const uid = user.value?.uid || `local_${Date.now()}`;
        user.value = {
            id: uid,
            name,
            phone,
            uid,
        };
        localStorage.setItem('cnq_user', JSON.stringify(user.value));
    };

    /**
     * Logout
     */
    const logout = async () => {
        try {
            await firebaseSignOut();
        } catch { /* ignore signout errors */ }
        user.value = null;
        token.value = null;
        localStorage.removeItem('cnq_token');
        localStorage.removeItem('cnq_user');
    };

    return { user, token, loading, error, isAuthenticated, sendOtp, verifyOtp, register, logout };
});
