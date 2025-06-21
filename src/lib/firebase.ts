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

// Check if essential Firebase config keys are present
const isFirebaseConfigured = firebaseConfig.projectId && firebaseConfig.apiKey;

// Initialize Firebase
let app;
if (getApps().length === 0) {
  if (!isFirebaseConfigured) {
     console.warn("Firebase config is incomplete. The app will run in offline mode. Please set up your .env file to enable cloud features.");
     app = null;
  } else {
     app = initializeApp(firebaseConfig);
  }
} else {
    app = getApp();
}


const db = app ? getFirestore(app) : null;

export { app, db };
