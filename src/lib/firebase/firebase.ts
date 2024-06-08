import {
  initializeApp,
  FirebaseApp,
  FirebaseOptions,
  getApps,
  getApp,
} from 'firebase/app';
import {getDatabase, Database} from 'firebase/database';
import {Auth, getAuth} from '@firebase/auth';
import {firebaseEnvSchema} from '@/lib/firebase/_types/firebaseEnvSchema';

const firebaseConfig: FirebaseOptions = firebaseEnvSchema;

const firebaseApp: FirebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

const firebaseAuth: Auth = getAuth(firebaseApp);
const firebaseDataBase: Database = getDatabase(firebaseApp);

export {firebaseAuth, firebaseDataBase};
