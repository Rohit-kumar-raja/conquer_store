import { Capacitor } from '@capacitor/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import {
    PhoneAuthProvider,
    signInWithCredential,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    updateProfile,
    type ConfirmationResult,
} from 'firebase/auth';
import { auth } from '../firebase';

let webConfirmationResult: ConfirmationResult | null = null;
let nativeVerificationId: string | null = null;

/**
 * Send OTP to phone number.
 * On native (Android/iOS): uses Capacitor Firebase plugin (auto-verifies on Android).
 * On web: uses Firebase JS SDK with reCAPTCHA.
 */
export const sendOtp = async (phoneNumber: string): Promise<void> => {
    const isNative = Capacitor.isNativePlatform();

    if (isNative) {
        nativeVerificationId = null;

        await new Promise<void>(async (resolve, reject) => {
            const cleanup = async () => {
                await Promise.allSettled([
                    codeSentHandle?.remove(),
                    verificationFailedHandle?.remove(),
                ]);
            };

            const codeSentHandle = await FirebaseAuthentication.addListener('phoneCodeSent', async event => {
                nativeVerificationId = event.verificationId;
                await cleanup();
                resolve();
            });

            const verificationFailedHandle = await FirebaseAuthentication.addListener('phoneVerificationFailed', async event => {
                await cleanup();
                reject(new Error(event.message));
            });

            try {
                await FirebaseAuthentication.signInWithPhoneNumber({
                    phoneNumber,
                });
            } catch (error) {
                await cleanup();
                reject(error);
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

        const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            size: 'invisible',
        });

        webConfirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
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

        const credential = PhoneAuthProvider.credential(nativeVerificationId, otpCode);
        const userCredential = await signInWithCredential(auth, credential);
        nativeVerificationId = null;
        return userCredential.user;
    } else {
        if (!webConfirmationResult) {
            throw new Error('No confirmation result. Call sendOtp first.');
        }

        const userCredential = await webConfirmationResult.confirm(otpCode);
        webConfirmationResult = null;
        return userCredential.user;
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
    if (!auth.currentUser) {
        throw new Error('No authenticated Firebase user.');
    }

    await updateProfile(auth.currentUser, { displayName });
};
