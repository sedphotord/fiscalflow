import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app = null;
let db = null;

if (firebaseConfig.projectId && firebaseConfig.apiKey) {
    console.log(`Firebase config found for project: ${firebaseConfig.projectId}`);
    try {
        if (getApps().length === 0) {
            app = initializeApp(firebaseConfig);
            console.log("Firebase has been initialized.");
        } else {
            app = getApp();
            console.log("Re-using existing Firebase app instance.");
        }
        db = getFirestore(app);
    } catch (error) {
        console.error("Firebase initialization failed:", error);
        app = null;
        db = null;
    }
} else {
    console.warn("Firebase configuration is missing or incomplete. The application will operate in a simulated offline mode. Please ensure your .env file is correctly set up with all NEXT_PUBLIC_FIREBASE_ variables.");
}


export { app, db };
