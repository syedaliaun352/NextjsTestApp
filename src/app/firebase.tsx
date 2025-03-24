import { getApp, getApps, initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged,
    User,
    signOut,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    ConfirmationResult
} from "firebase/auth";
import { firebaseConfig } from "./firebase_config";
import { useEffect, useState } from 'react';

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier;
    }
}

const initializeFirebaseApp = () => {
    if (!getApps().length) {
        initializeApp(firebaseConfig);
    }
    return getApp();
};

const app = initializeFirebaseApp();
const auth = getAuth(app);
auth.useDeviceLanguage();

const firebaseRegisterUser = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
};

const firebaseLogIn = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
};

const firebaseResetPassword = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
};

const firebaseSignOutUser = async () => {
    try {
        await signOut(auth);
    } catch (error: any) {
        console.error("Sign out error:", error);
        throw error;
    }
};

const onAuthStateChange = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};
export const useFirebaseAuth = () => {
    const [appVerifier, setAppVerifier] = useState<RecaptchaVerifier | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth,
                'sign-in-button',
                {
                    size: 'invisible',
                    callback: (response: any) => {
                        console.log("reCAPTCHA solved:", response);
                    }
                }
            );
        }
        setAppVerifier(window.recaptchaVerifier || null);

        return () => {
        };
    }, [auth]);

    const firebasePhoneRegister = async (phoneNumber: string) => {
        if (!appVerifier) {
            console.error("Recaptcha Verifier not initialized.");
            throw new Error("Recaptcha Verifier not initialized.");
        }
        try {
            const confirmResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
            return confirmResult;
        } catch (error: any) {
            console.error("Error sending phone verification code:", error);
            throw error;
        }
    };

    return {
        auth,
        firebaseRegisterUser,
        firebaseLogIn,
        firebaseResetPassword,
        onAuthStateChange,
        firebaseSignOutUser,
        firebasePhoneRegister,
        firebasePhoneVerifyCode,
        appVerifier
    };
};

const firebasePhoneVerifyCode = async (confirmationResult: ConfirmationResult, verificationCode: string) => {
    try {
        const userCredential = await confirmationResult.confirm(verificationCode);
        return userCredential.user;
    } catch (error: any) {
        console.error("Error verifying phone verification code:", error);
        throw error;
    }
};

export {
    auth,
    app,
    firebaseRegisterUser,
    firebaseLogIn,
    firebaseResetPassword,
    onAuthStateChange,
    firebaseSignOutUser,
    // firebasePhoneRegister,
    firebasePhoneVerifyCode,
    initializeFirebaseApp
};