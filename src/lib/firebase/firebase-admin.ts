import 'server-only';
import {cookies} from 'next/headers';
import {App, cert, getApps, initializeApp} from 'firebase-admin/app';
import {getAuth, SessionCookieOptions} from 'firebase-admin/auth';
import {Auth} from 'firebase-admin/lib/auth/auth';

const initApp = (): App => {
  const {privateKey} = JSON.parse(process.env.NEXT_PUBLIC_PRIVATE_KEY);

  return initializeApp({
      credential: cert({
        type: process.env.NEXT_PUBLIC_TYPE,
        projectId: process.env.PROJECT_ID,
        privateKeyId: process.env.NEXT_PUBLIC_PROJECT_ID,
        privateKey,
        clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        authUri: process.env.NEXT_PUBLIC_AUTH_URI,
        tokenUri: process.env.NEXT_PUBLIC_TOKEN_URI,
        authProviderX509CertUrl: process.env.NEXT_PUBLIC_AUTH_PROVIDER_X509_CERT_URL,
        clientX509CertUrl: process.env.NEXT_PUBLIC_CLIENT_X509_CERT_URL,
        universeDomain: process.env.NEXT_PUBLIC_UNIVERSE_DOMAIN,
      }),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    },
    'data-meter-keep'
  );
};

const firebaseApp: App = getApps().find((app) => app.name === 'data-meter-keep') || initApp();

const firebaseAdminAuth: Auth = getAuth(firebaseApp);

async function getSession() {
  try {
    return cookies().get('__session')?.value;
  } catch (error) {
    return undefined;
  }
}

async function getCurrentUser() {
  const session = await getSession();

  if (!(await isUserAuthenticated(session))) {
    return null;
  }

  const decodedIdToken = await firebaseAdminAuth.verifySessionCookie(session!);

  return await firebaseAdminAuth.getUser(decodedIdToken.uid);
}

async function isUserAuthenticated(session: string | undefined = undefined) {
  const _session = session ?? (await getSession());

  if (!_session) {
    return false;
  }

  try {
    const isRevoked = !(await firebaseAdminAuth.verifySessionCookie(_session, true));

    return !isRevoked;
  } catch (error) {
    console.warn(error);
    return false;
  }
}

async function createSessionCookie(idToken: string, sessionCookieOptions: SessionCookieOptions) {
  return firebaseAdminAuth.createSessionCookie(idToken, sessionCookieOptions);
}

async function revokeAllSessions(session: string) {
  const decodedIdToken = await firebaseAdminAuth.verifySessionCookie(session);

  return await firebaseAdminAuth.revokeRefreshTokens(decodedIdToken.sub);
}

export {firebaseApp, firebaseAdminAuth, isUserAuthenticated, getCurrentUser, createSessionCookie, revokeAllSessions};
