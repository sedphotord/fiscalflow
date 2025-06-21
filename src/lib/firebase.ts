import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

// --- CONFIGURACIÓN DE FIREBASE ---
// ¡ACCIÓN REQUERIDA! Como has descubierto, falta la clave de API.
// 1. Ve a la configuración de tu proyecto en Firebase.
// 2. Asegúrate de tener una "Aplicación web" registrada. Si no, créala.
// 3. Copia la `apiKey` que te proporciona Firebase.
// 4. Pégala en el campo `apiKey` de abajo, reemplazando el texto de marcador de posición.
const firebaseConfig = {
  apiKey: "REEMPLAZA_ESTO_CON_TU_API_KEY_REAL", // <--- ¡AQUÍ!
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
    // Verificamos que la apiKey no sea el placeholder antes de inicializar
    if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "REEMPLAZA_ESTO_CON_TU_API_KEY_REAL") {
      app = getApps().length ? getApp() : initializeApp(firebaseConfig);
      db = getFirestore(app);
      console.log("Firebase inicializado correctamente con el proyecto:", firebaseConfig.projectId);
    } else {
      console.error("CONFIGURACIÓN DE FIREBASE INCOMPLETA: Falta la 'apiKey'. Por favor, añádela en 'src/lib/firebase.ts'.");
      // Mantenemos db como null para que la app entre en modo sin conexión.
    }
} catch (error) {
    console.error("Error al inicializar Firebase. Verifica tu configuración en src/lib/firebase.ts.", error);
    app = null;
    db = null;
}

export { app, db };
