import { type FirebaseApp } from 'firebase/app';
import { type Firestore } from 'firebase/firestore';

// --- FIREBASE TEMPORARILY DISABLED FOR DEBUGGING ---
// The app is currently using mock data from /src/context/app-provider.tsx
// to isolate an internal server error.

const app: FirebaseApp | null = null;
const db: Firestore | null = null;

console.warn(
  "ATENCIÓN: La conexión con Firebase está deshabilitada temporalmente para depuración. La aplicación está usando datos de muestra."
);

export { app, db };
