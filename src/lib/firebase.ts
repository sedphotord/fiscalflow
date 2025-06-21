import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore, enableNetwork } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "fiscalflow-j6b89.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

if (firebaseConfig.projectId && firebaseConfig.apiKey) {
    try {
        app = getApps().length ? getApp() : initializeApp(firebaseConfig);
        const firestoreDb = getFirestore(app);
        
        // Attempt to explicitly enable the network as requested.
        enableNetwork(firestoreDb).catch((err) => {
            console.error("Error al intentar habilitar la red de Firestore:", err);
        });
        
        db = firestoreDb;
        console.log("Firebase initialized. Network explicitly enabled.");

    } catch (error) {
        console.error("Firebase initialization failed:", error);
        app = null;
        db = null;
    }
} else {
    console.warn("Firebase configuration is missing or incomplete. The application will operate in a simulated offline mode.");
}

export { app, db };
