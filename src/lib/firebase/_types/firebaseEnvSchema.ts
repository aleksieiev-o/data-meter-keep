import {z} from 'zod';

const envSchema = z.object({
  apiKey: z.string().trim(),
  authDomain: z.string().trim(),
  databaseURL: z.string().trim().url(),
  projectId: z.string().trim(),
  messagingSenderId: z.string().trim(),
  appId: z.string().trim(),
  measurementId: z.string().trim().optional(),
});

type TEnvSchema = z.infer<typeof envSchema>;

export const firebaseEnvSchema: TEnvSchema = envSchema.parse({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});
