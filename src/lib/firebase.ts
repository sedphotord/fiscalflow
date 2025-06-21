import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

// --- Firebase Web Configuration ---
// This configuration is for connecting the web application to your Firebase project.
const firebaseConfig = {
  apiKey: "AIzaSyANaxZb57mg9OxvutfRmodLiFAoQ6VWp6Y",
  authDomain: "fiscalflow-j6b89.firebaseapp.com",
  projectId: "fiscalflow-j6b89",
  storageBucket: "fiscalflow-j6b89.appspot.com",
  messagingSenderId: "931089868673",
  appId: "1:931089868673:web:355d95d1059f804e12c1b2"
};

// --- Firebase Initialization ---
let app: FirebaseApp;
let db: Firestore;

try {
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
