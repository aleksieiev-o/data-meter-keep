'use client';

import {firebaseAuth} from '@/lib/firebase/firebase';
import {
  ActionCodeSettings,
  AuthError,
  User,
  UserCredential,
} from 'firebase/auth';
import {FC, ReactElement, PropsWithChildren, createContext} from 'react';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignOut,
  useUpdateProfile,
  useVerifyBeforeUpdateEmail,
} from 'react-firebase-hooks/auth';

type Profile = {
  displayName?: string | null;
  photoURL?: string | null;
};

interface AppAuthProviderState {
  user: User | null | undefined;
  loading: boolean;

  signOut: () => Promise<boolean>;
  signOutLoading: boolean;

  updateProfile: (profile: Profile) => Promise<boolean>;
  updateProfileLoading: boolean;

  sendPasswordResetEmail: (
    email: string,
    actionCodeSettings?: ActionCodeSettings,
  ) => Promise<boolean>;
  sendPasswordResetEmailLoading: boolean;

  verifyBeforeUpdateEmail: (
    email: string,
    actionCodeSettings: ActionCodeSettings | null,
  ) => Promise<boolean>;
  verifyBeforeUpdateEmailLoading: boolean;

  signInWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<UserCredential | undefined>;
  signInLoading: boolean;
  signInError: AuthError | undefined;

  createUserWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<UserCredential | undefined>;
  signUpLoading: boolean;
  signUpError: AuthError | undefined;
}

const initialState: AppAuthProviderState = {
  user: undefined,
  loading: false,

  signOutLoading: false,
  signOut: function (): Promise<boolean> {
    throw new Error('Function not implemented.');
  },

  updateProfile: function (profile: Profile): Promise<boolean> {
    throw new Error('Function not implemented.');
  },
  updateProfileLoading: false,

  sendPasswordResetEmail: function (
    email: string,
    actionCodeSettings?: ActionCodeSettings | undefined,
  ): Promise<boolean> {
    throw new Error('Function not implemented.');
  },
  sendPasswordResetEmailLoading: false,

  verifyBeforeUpdateEmail: function (
    email: string,
    actionCodeSettings: ActionCodeSettings | null,
  ): Promise<boolean> {
    throw new Error('Function not implemented.');
  },
  verifyBeforeUpdateEmailLoading: false,

  signInWithEmailAndPassword: function () {
    throw new Error('Function not implemented.');
  },
  signInLoading: false,
  signInError: undefined,

  createUserWithEmailAndPassword: function () {
    throw new Error('Function not implemented.');
  },
  signUpLoading: false,
  signUpError: undefined,
};

export const AppAuthContext = createContext<AppAuthProviderState>(initialState);

const AppAuthProvider: FC<PropsWithChildren> = (props): ReactElement => {
  const {children} = props;
  const [user, loading] = useAuthState(firebaseAuth);
  const [signOut, signOutLoading] = useSignOut(firebaseAuth);
  const [updateProfile, updateProfileLoading] = useUpdateProfile(firebaseAuth);
  const [verifyBeforeUpdateEmail, verifyBeforeUpdateEmailLoading] =
    useVerifyBeforeUpdateEmail(firebaseAuth);
  const [sendPasswordResetEmail, sendPasswordResetEmailLoading] =
    useSendPasswordResetEmail(firebaseAuth);
  const [signInWithEmailAndPassword, , signInLoading, signInError] =
    useSignInWithEmailAndPassword(firebaseAuth);
  const [createUserWithEmailAndPassword, , signUpLoading, signUpError] =
    useCreateUserWithEmailAndPassword(firebaseAuth);

  const value: AppAuthProviderState = {
    user,
    loading,
    signOut,
    signOutLoading,
    updateProfile,
    updateProfileLoading,
    sendPasswordResetEmail,
    sendPasswordResetEmailLoading,
    verifyBeforeUpdateEmail,
    verifyBeforeUpdateEmailLoading,
    signInWithEmailAndPassword,
    signInLoading,
    signInError,
    createUserWithEmailAndPassword,
    signUpLoading,
    signUpError,
  };

  return (
    <AppAuthContext.Provider {...props} value={value}>
      {children}
    </AppAuthContext.Provider>
  );
};

export default AppAuthProvider;
