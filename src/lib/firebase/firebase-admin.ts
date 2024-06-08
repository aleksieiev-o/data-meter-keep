import 'server-only';

import {cookies} from 'next/headers';
import {App, cert, getApps, initializeApp} from 'firebase-admin/app';
import {
  getAuth,
  SessionCookieOptions,
  Auth,
  UserRecord,
} from 'firebase-admin/auth';
import {firebaseAdminEnvSchema} from '@/lib/firebase/_types/firebaseAdminEnvSchema';

const initApp = (): App => {
  return initializeApp(
    {
      credential: cert(firebaseAdminEnvSchema.credential),
      databaseURL: firebaseAdminEnvSchema.databaseURL,
    },
    firebaseAdminEnvSchema.appName,
  );
};

const firebaseApp: App =
  getApps().find((app) => app.name === firebaseAdminEnvSchema.appName) ||
  initApp();

const firebaseAdminAuth: Auth = getAuth(firebaseApp);

async function getSession() {
  try {
    return cookies().get('__session')?.value;
  } catch (error) {
    return undefined;
  }
}

async function getCurrentUser(): Promise<null | UserRecord> {
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
    const isRevoked = !(await firebaseAdminAuth.verifySessionCookie(
      _session,
      true,
    ));

    return !isRevoked;
  } catch (error) {
    console.warn(error);
    return false;
  }
}

async function createSessionCookie(
  idToken: string,
  sessionCookieOptions: SessionCookieOptions,
) {
  return firebaseAdminAuth.createSessionCookie(idToken, sessionCookieOptions);
}

async function revokeAllSessions(session: string) {
  const decodedIdToken = await firebaseAdminAuth.verifySessionCookie(session);

  return await firebaseAdminAuth.revokeRefreshTokens(decodedIdToken.sub);
}

export {
  firebaseApp,
  firebaseAdminAuth,
  isUserAuthenticated,
  getCurrentUser,
  createSessionCookie,
  revokeAllSessions,
};
