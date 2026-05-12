import { Capacitor } from '@capacitor/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
    updateProfile,
    type ConfirmationResult,
    type User as WebFirebaseUser,
} from 'firebase/auth';
import { auth } from '../firebase';

export interface AuthUser {
    uid: string;
    displayName: string | null;
    getIdToken: () => Promise<string>;
}

let webConfirmationResult: ConfirmationResult | null = null;
let webRecaptchaVerifier: RecaptchaVerifier | null = null;
let nativeVerificationId: string | null = null;

const toWebAuthUser = (user: WebFirebaseUser): AuthUser => ({
    uid: user.uid,
    displayName: user.displayName,
    getIdToken: () => user.getIdToken(),
});

const toNativeAuthUser = (user: NonNullable<Awaited<ReturnType<typeof FirebaseAuthentication.confirmVerificationCode>>['user']>): AuthUser => ({
    uid: user.uid,
    displayName: user.displayName,
    getIdToken: async () => {
        const result = await FirebaseAuthentication.getIdToken();
        if (!result.token) {
            throw new Error('No Firebase ID token returned for native user.');
        }
        return result.token;
    },
});

/**
 * Send OTP to phone number.
 * On native (Android/iOS): uses Capacitor Firebase plugin (auto-verifies on Android).
 * On web: uses Firebase JS SDK with reCAPTCHA.
 */
export const sendOtp = async (phoneNumber: string): Promise<AuthUser | null> => {
    const isNative = Capacitor.isNativePlatform();

    if (isNative) {
        nativeVerificationId = null;

        return new Promise<AuthUser | null>(async (resolve, reject) => {
            const handles: Array<{ remove: () => Promise<void> }> = [];
            let settled = false;

            const cleanup = async () => {
                await Promise.allSettled(handles.map(handle => handle.remove()));
            };

            const settle = async (callback: () => void) => {
                if (settled) return;
                settled = true;
                await cleanup();
                callback();
            };

            const codeSentHandle = await FirebaseAuthentication.addListener('phoneCodeSent', async event => {
                await settle(() => {
                    nativeVerificationId = event.verificationId;
                    resolve(null);
                });
            });
            handles.push(codeSentHandle);

            const verificationFailedHandle = await FirebaseAuthentication.addListener('phoneVerificationFailed', async event => {
                await settle(() => reject(new Error(event.message)));
            });
            handles.push(verificationFailedHandle);

            const verificationCompletedHandle = await FirebaseAuthentication.addListener('phoneVerificationCompleted', async event => {
                await settle(() => {
                    nativeVerificationId = null;

                    if (!event.user) {
                        reject(new Error('Firebase native phone verification completed without a user.'));
                        return;
                    }

                    resolve(toNativeAuthUser(event.user));
                });
            });
            handles.push(verificationCompletedHandle);

            try {
                await FirebaseAuthentication.signInWithPhoneNumber({
                    phoneNumber,
                });
            } catch (error) {
                await settle(() => reject(error));
            }
        });
    } else {
        // Web: Firebase JS SDK with invisible reCAPTCHA
        let recaptchaContainer = document.getElementById('recaptcha-container');
        if (!recaptchaContainer) {
            recaptchaContainer = document.createElement('div');
            recaptchaContainer.id = 'recaptcha-container';
            recaptchaContainer.style.display = 'none';
            document.body.appendChild(recaptchaContainer);
        }

        webRecaptchaVerifier?.clear();
        webRecaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            size: 'invisible',
        });

        webConfirmationResult = await signInWithPhoneNumber(auth, phoneNumber, webRecaptchaVerifier);
        return null;
    }
};

/**
 * Verify OTP code.
 * Returns the Firebase User on success.
 */
export const verifyOtp = async (otpCode: string) => {
    const isNative = Capacitor.isNativePlatform();

    if (isNative) {
        if (!nativeVerificationId) {
            throw new Error('No verification ID. Call sendOtp first.');
        }

        const result = await FirebaseAuthentication.confirmVerificationCode({
            verificationId: nativeVerificationId,
            verificationCode: otpCode,
        });
        nativeVerificationId = null;
        if (!result.user) {
            throw new Error('Firebase native authentication did not return a user.');
        }
        return toNativeAuthUser(result.user);
    } else {
        if (!webConfirmationResult) {
            throw new Error('No confirmation result. Call sendOtp first.');
        }

        const userCredential = await webConfirmationResult.confirm(otpCode);
        webConfirmationResult = null;
        return toWebAuthUser(userCredential.user);
    }
};

/**
 * Sign out from Firebase.
 */
export const firebaseSignOut = async () => {
    await FirebaseAuthentication.signOut();
    await auth.signOut();
};

/**
 * Get current Firebase user if signed in.
 */
export const getCurrentUser = () => {
    return auth.currentUser;
};

/**
 * Update the signed-in Firebase user's display name.
 */
export const updateCurrentUserProfile = async (displayName: string) => {
    if (Capacitor.isNativePlatform()) {
        await FirebaseAuthentication.updateProfile({ displayName });
        return;
    }

    if (!auth.currentUser) {
        throw new Error('No authenticated Firebase user.');
    }

    await updateProfile(auth.currentUser, { displayName });
};
