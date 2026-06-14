import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
    sendOtp as firebaseSendOtp,
    verifyOtp as firebaseVerifyOtp,
    firebaseSignOut,
    updateCurrentUserProfile,
} from '../services/firebaseAuth';
import { exchangeFirebaseToken, type BackendStore } from '../services/authApi';

export interface User {
    id: string;
    name: string;
    phone: string;
    uid?: string;
}

interface PendingRegistration {
    phone: string;
    token: string;
    uid: string;
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const token = ref<string | null>(localStorage.getItem('cnq_token'));
    const pendingRegistration = ref<PendingRegistration | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const isAuthenticated = computed(() => !!token.value);

    // Restore user from localStorage on init
    const storedUser = localStorage.getItem('cnq_user');
    if (storedUser) {
        try { user.value = JSON.parse(storedUser); } catch { /* ignore */ }
    }

    const persistBackendSession = (
        accessToken: string,
        backendUser: User,
        stores: BackendStore[]
    ) => {
        token.value = accessToken;
        user.value = backendUser;
        localStorage.setItem('cnq_token', accessToken);
        localStorage.setItem('cnq_user', JSON.stringify(backendUser));
        localStorage.setItem('cnq_stores', JSON.stringify(stores));

        const currentStoreId = localStorage.getItem('cnq_active_store_id');
        if (!currentStoreId || !stores.some((store) => store.id === currentStoreId)) {
            const defaultStore = stores.find((store) => store.is_default) || stores[0];
            if (defaultStore) localStorage.setItem('cnq_active_store_id', defaultStore.id);
        }
    };

    const completeSignIn = async (firebaseUser: Awaited<ReturnType<typeof firebaseVerifyOtp>>, phone: string): Promise<boolean> => {
        const idToken = await firebaseUser.getIdToken();
        const backendSession = await exchangeFirebaseToken(idToken);
        const isNewUser = backendSession.is_new_user || backendSession.stores.length === 0;

        if (isNewUser) {
            pendingRegistration.value = {
                phone,
                token: idToken,
                uid: firebaseUser.uid,
            };
            user.value = null;
            token.value = null;
            localStorage.removeItem('cnq_token');
            localStorage.removeItem('cnq_user');
        } else {
            pendingRegistration.value = null;
            persistBackendSession(
                backendSession.access_token,
                {
                    id: backendSession.user.id,
                    name: backendSession.user.name || firebaseUser.displayName || '',
                    phone: backendSession.user.phone || phone,
                    uid: firebaseUser.uid,
                },
                backendSession.stores
            );
        }

        return isNewUser;
    };

    /**
     * Send OTP to phone number via Firebase
     */
    const sendOtp = async (phoneNumber: string) => {
        loading.value = true;
        error.value = null;
        try {
            const autoVerifiedUser = await firebaseSendOtp(phoneNumber);
            if (!autoVerifiedUser) {
                return { autoVerified: false, isNewUser: false };
            }

            const isNewUser = await completeSignIn(autoVerifiedUser, phoneNumber);
            return { autoVerified: true, isNewUser };
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
            return await completeSignIn(firebaseUser, phone);
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
    const register = async (name: string, phone: string, businessName?: string) => {
        const pending = pendingRegistration.value;
        if (!pending || pending.phone !== phone) {
            throw new Error('No verified phone session found. Please verify OTP again.');
        }

        await updateCurrentUserProfile(name);

        const backendSession = await exchangeFirebaseToken(pending.token, {
            name,
            businessName: businessName?.trim() || `${name}'s Store`,
        });
        persistBackendSession(
            backendSession.access_token,
            {
                id: backendSession.user.id,
                name: backendSession.user.name || name,
                phone: backendSession.user.phone || phone,
                uid: pending.uid,
            },
            backendSession.stores
        );
        pendingRegistration.value = null;
    };

    const clearPendingRegistration = async () => {
        pendingRegistration.value = null;
        user.value = null;
        token.value = null;
        localStorage.removeItem('cnq_token');
        localStorage.removeItem('cnq_user');
        localStorage.removeItem('cnq_stores');
        localStorage.removeItem('cnq_active_store_id');

        try {
            await firebaseSignOut();
        } catch {
            /* ignore signout errors */
        }
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
        pendingRegistration.value = null;
        localStorage.removeItem('cnq_token');
        localStorage.removeItem('cnq_user');
        localStorage.removeItem('cnq_stores');
        localStorage.removeItem('cnq_active_store_id');
    };

    return {
        user,
        token,
        loading,
        error,
        isAuthenticated,
        sendOtp,
        verifyOtp,
        register,
        clearPendingRegistration,
        logout,
    };
});
