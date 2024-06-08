import {object, string, z} from 'zod';

const envSchema = object({
  credential: object({
    type: string().trim(),
    projectId: string().trim(),
    privateKeyId: string().trim(),
    privateKey: string().trim(),
    clientEmail: string().trim().email(),
    clientId: string().trim(),
    authUri: string().trim().url(),
    tokenUri: string().trim().url(),
    authProviderX509CertUrl: string().trim().url(),
    clientX509CertUrl: string().trim().url(),
    universeDomain: string().trim(),
  }),
  databaseURL: string().trim().url(),
  appName: string().trim(),
});

type TEnvSchema = z.infer<typeof envSchema>;

const {privateKey} = JSON.parse(process.env.NEXT_PUBLIC_PRIVATE_KEY as string);

export const firebaseAdminEnvSchema: TEnvSchema = envSchema.parse({
  credential: {
    type: process.env.NEXT_PUBLIC_TYPE,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    privateKeyId: process.env.NEXT_PUBLIC_PRIVATE_KEY_ID,
    privateKey,
    clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    authUri: process.env.NEXT_PUBLIC_AUTH_URI,
    tokenUri: process.env.NEXT_PUBLIC_TOKEN_URI,
    authProviderX509CertUrl:
      process.env.NEXT_PUBLIC_AUTH_PROVIDER_X509_CERT_URL,
    clientX509CertUrl: process.env.NEXT_PUBLIC_CLIENT_X509_CERT_URL,
    universeDomain: process.env.NEXT_PUBLIC_UNIVERSE_DOMAIN,
  },
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  appName: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
});
