import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

// --- Firebase Web Configuration ---
// This configuration is for connecting the web application to your Firebase project.
// It is recommended to use environment variables for security.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// --- Firebase Initialization ---
let app: FirebaseApp;
let db: Firestore;

try {
    // A missing or placeholder API key is a clear sign that Firebase is not configured.
    if (!firebaseConfig.apiKey) {
        throw new Error("Firebase configuration is missing or incomplete. Please check your environment variables.");
    }
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
} catch (error) {
    console.error("Firebase initialization failed:", error);
    // In case of an error, app and db will be undefined, which can be handled as an offline state.
    // @ts-ignore
    app = null;
    // @ts-ignore
    db = null;
}

export { app, db };
