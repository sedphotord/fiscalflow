import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

// --- CONFIGURACIÓN DE FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyCj5uBV6MqnDJlnllkyUzCmzGAizF33Ryg",
  authDomain: "fiscalflow-j6b89.firebaseapp.com",
  projectId: "fiscalflow-j6b89",
  storageBucket: "fiscalflow-j6b89.appspot.com",
  messagingSenderId: "421206740920",
  appId: "1:421206740920:web:7cd85cc1149750067a494d"
};
// --- FIN DE LA CONFIGURACIÓN ---


// NO EDITAR DEBAJO DE ESTA LÍNEA
let app: FirebaseApp | null = null;
let db: Firestore | null = null;

try {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("Firebase inicializado correctamente con el proyecto:", firebaseConfig.projectId);
} catch (error) {
    console.error("Error al inicializar Firebase. Verifica que tu configuración en src/lib/firebase.ts sea correcta.", error);
    app = null;
    db = null;
}

export { app, db };
