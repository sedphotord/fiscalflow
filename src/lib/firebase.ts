import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

// --- CONFIGURACIÓN DE FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyANaxZb57mg9OxvutfRmodLiFAoQ6VWp6Y",
  authDomain: "fiscalflow-j6b89.firebaseapp.com",
  projectId: "fiscalflow-j6b89",
  storageBucket: "fiscalflow-j6b89.appspot.com",
  messagingSenderId: "421206740920",
  appId: "1:421206740920:web:7cd85cc1149750067a494d"
};
// --- FIN DE LA CONFIGURACIÓN ---


// NO EDITAR DEBAJO DE ESTA LÍNEA
let app: FirebaseApp;
let db: Firestore;

// Inicializa Firebase
if (getApps().length) {
    app = getApp();
} else {
    app = initializeApp(firebaseConfig);
}

db = getFirestore(app);

console.log("Firebase inicializado correctamente con el proyecto:", firebaseConfig.projectId);

export { app, db };
