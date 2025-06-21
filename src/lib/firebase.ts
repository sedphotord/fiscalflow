import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

// --- CONFIGURACIÓN DE FIREBASE ---
// ¡ACCIÓN REQUERIDA! Has encontrado la "Clave de Cuenta de Servicio", ¡gracias!
// Sin embargo, para una aplicación web como esta, necesitamos la "Clave de API web".

// PASOS PARA ENCONTRAR TU API KEY:
// 1. Ve a la consola de Firebase: https://console.firebase.google.com/
// 2. Selecciona tu proyecto (fiscalflow-j6b89).
// 3. Haz clic en el ícono de engranaje (⚙️) junto a "Project Overview" y ve a "Project settings".
// 4. En la pestaña "General", baja hasta la sección "Your apps".
// 5. Deberías ver tu aplicación web. Haz clic en ella.
// 6. En la configuración, verás un objeto llamado `firebaseConfig`. Copia el valor de la propiedad `apiKey`.
// 7. Pega esa clave aquí abajo, reemplazando el texto del marcador de posición.

const firebaseConfig = {
  // Pega aquí la clave que copiaste de la consola de Firebase.
  // NO uses la "Clave de Cuenta de Servicio" que encontraste antes.
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
