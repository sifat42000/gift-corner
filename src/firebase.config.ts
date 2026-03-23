import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * Firebase Configuration
 * 
 * TO SETUP FIREBASE:
 * 1. Go to Firebase Console (https://console.firebase.google.com/)
 * 2. Create a new project or select an existing one.
 * 3. Add a Web App to your project.
 * 4. Copy the `firebaseConfig` object provided by Firebase.
 * 5. Paste it below, replacing the placeholder object.
 */

const firebaseConfig = {
  apiKey: "AIzaSyChQvltiGYRK5tPGsV3tuu5128Cx7K_rnI",
  authDomain: "rongdhonu-gift-corner.firebaseapp.com",
  projectId: "rongdhonu-gift-corner",
  storageBucket: "rongdhonu-gift-corner.firebasestorage.app",
  messagingSenderId: "960225514264",
  appId: "1:960225514264:web:2dcaac14d57bc2a609846d"
};

// Initialize Firebase
// We check if an app is already initialized to avoid errors during hot reloads
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
