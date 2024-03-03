import { initializeApp, FirebaseApp, FirebaseOptions, getApps, getApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';
import {Auth, getAuth} from '@firebase/auth';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const firebaseAuth: Auth = getAuth(firebaseApp);
const firebaseDataBase: Database = getDatabase(firebaseApp);

export { firebaseAuth, firebaseDataBase };
