import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, User, signOut } from "firebase/auth";
import { firebaseConfig } from "./firebase_config";

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

const firebaseRegisterUser = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
};

const firebaseIogIn = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
};

const firebaseResetPassword = async (email: string) => {
    try {
        const reset = await sendPasswordResetEmail(auth, email)
        return reset;

    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        throw error;

    }
}

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

export { auth, app, firebaseRegisterUser, firebaseIogIn, firebaseResetPassword, onAuthStateChange, firebaseSignOutUser }

