import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

// --- Firebase Web Configuration ---
// This configuration is for connecting the web application to your Firebase project.
// TODO: Replace with your project's Firebase configuration from the Firebase console.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "fiscalflow.firebaseapp.com",
  projectId: "fiscalflow",
  storageBucket: "fiscalflow.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// --- Firebase Initialization ---
let app: FirebaseApp;
let db: Firestore;

try {
    // A missing or placeholder API key is a clear sign that Firebase is not configured.
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey.startsWith('YOUR_')) {
        throw new Error("Firebase configuration is missing or incomplete. Please update src/lib/firebase.ts with your project's credentials.");
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
