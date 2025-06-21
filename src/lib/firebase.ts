import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

// --- CONFIGURACIÓN DE FIREBASE ---
// ¡ACCIÓN REQUERIDA! Reemplaza "<TU_API_KEY_AQUÍ>" con tu API Key real de la consola de Firebase.
const firebaseConfig = {
  apiKey: "<TU_API_KEY_AQUÍ>",
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

if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes("<TU_API_KEY_AQUÍ>")) {
    console.error("La API Key de Firebase no está configurada en src/lib/firebase.ts. La aplicación no funcionará correctamente hasta que se reemplace el marcador de posición.");
} else {
    try {
        app = getApps().length ? getApp() : initializeApp(firebaseConfig);
        db = getFirestore(app);
    } catch (error) {
        console.error("Error al inicializar Firebase. Verifica que tu configuración en src/lib/firebase.ts sea correcta.", error);
        app = null;
        db = null;
    }
}


export { app, db };
